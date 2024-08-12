import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../utils/tokenUtils.js";

export const registerUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = User.create(req.body);

  res.json({ msg: "User Registered" });
  // console.log("validation errors from validator", req.validationErrors);
};

export const loginUser = async (req, res) => {
  const query = req.body.loginIdentifier;

  try {
    const user = await User.findOne({
      $or: [{ email: query }, { username: query }],
    });

    const isValidUser =
      user && (await bcrypt.compare(req.body.password, user.password));

    if (!isValidUser) {
      return res.send("Invalid credentials");
    }

    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    const token = createJWTToken({
      payload,
    });

    res.cookie("token", token, {
      httpsOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: process.env.NODE_ENV === "production",
    });

    console.log("USer Logged in", user.securityQuestion);

    res.json({ msg: "User Logged In !!" });
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = (req, res) => {
  res.cookie("token", "logout", {
    httpsOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "User Logged Out" });
};

export const getProfile = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  console.log("Show profile");

  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
  res.status(200).json(userData);
};

export const resetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  console.log("to reset user", user);
  if (user.securityQuestion !== req.body.securityQuestion) {
    return res.status(400).json({ msg: "Wrong Security Question Answer" });
  }

  const newPassword = req.body.newPassword;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (await bcrypt.compare(newPassword, user.password)) {
    return res.json({ msg: "Can't Set Password Same As Previous One" });
  }

  user.password = hashedPassword;

  await user.save();

  console.log("reset password");
  res.json({ msg: "Updated Password Successfully !" });
};
