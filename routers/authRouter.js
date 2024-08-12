import { Router } from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getProfile,
  resetPassword,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../middlewares/validator.js";

const router = Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.post("/resetPassword", validateResetPassword, resetPassword);

router.get("/profile", getProfile);

router.get("/logout", logOutUser);

export default router;
