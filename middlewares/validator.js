import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const commonValidator = (validate) => {
  return [
    ...validate,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log("error Messages are ====", errorMessages);
        req.validationErrors = errorMessages;
        return res.status(400).json({ validationErrors: errorMessages });
      }
      next();
    },
  ];
};

export const validateRegister = commonValidator([
  body("firstName").notEmpty().withMessage("First Name Is Required"),
  body("lastName").notEmpty().withMessage("Last Name Is Required"),
  body("username").notEmpty().withMessage("Username Is Required"),
  body("password")
    .notEmpty()
    .withMessage("Password Is Required")
    .isLength({ min: 8 })
    .withMessage("Password Must Be At Least 8 Characters ")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must include at least one special character"),
  body("securityQuestion").notEmpty().withMessage("Answer Security Question"),
  body("email")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email Already In Use");
      }
    }),
]);

export const validateLogin = commonValidator([
  body("loginIdentifier")
    .notEmpty()
    .withMessage("Username Or Email Is Required"),
  body("password").notEmpty().withMessage("Password Is Required"),
]);

export const validateResetPassword = commonValidator([
  body("email")
    .notEmpty()
    .withMessage("Email Can't Be Empty")
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User Doesn't Exist");
      }
    })
    .withMessage("User Doesn't Exist"),
  body("securityQuestion").notEmpty().withMessage("Incorrect Answer"),
  body("newPassword")
    .notEmpty()
    .withMessage("Password Is Required")
    .isLength({ min: 8 })
    .withMessage("Password Must Be At Least 8 Characters ")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must include at least one special character"),
]);
// export const validateResetPassword = commonValidator([
//   body("token")
//     .notEmpty()
//     .withMessage("Reset token is required")
//     .custom(async (token) => {
//       const isValidToken = await verifyResetToken(token); // Implement verifyResetToken
//       if (!isValidToken) {
//         throw new Error("Invalid or expired token");
//       }
//       return true;
//     }),

//   body("newPassword")
//     .notEmpty()
//     .withMessage("New password is required")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters long")
//     .matches(/[!@#$%^&*(),.?":{}|<>]/)
//     .withMessage("Password must include at least one special character"),

//   body("securityQuestion")
//     .notEmpty()
//     .withMessage("Answer to the security question is required")
//     .custom(async (answer, { req }) => {
//       const user = await User.findOne({ email: req.body.email }); // Ensure you have email in the request body
//       if (!user) {
//         throw new Error("User not found");
//       }
//       // Replace with your actual security question answer verification
//       if (user.securityQuestion !== answer) {
//         throw new Error("Incorrect security question answer");
//       }
//       return true;
//     }),
// ]);
