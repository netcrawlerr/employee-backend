import { Router } from "express";
import {
  userClockIn,
  userClockOut,
  userBreak,
  userResume,
  getAllUsers,
  
} from "../controllers/userController.js";

const router = Router();

router.post("/clock-in", userClockIn);
router.post("/clock-out", userClockOut);
router.post("/break", userBreak);
router.post("/resume", userResume);

router.get("/all-users", getAllUsers);
// router.get("/single-user/:id", getSingleUser);

export default router;
