import { Router } from "express";
import {
  getAttendanceReport,
  exportReport,
} from "../controllers/reportController.js";
const router = Router();

router.get("/attendace", getAttendanceReport);
router.get("/export", exportReport);

export default router;
