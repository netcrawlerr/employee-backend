import { Router } from "express";

import {
  getDailyLogs,
  getTimeSheets,
} from "../controllers/attendanceController.js";

const router = Router();

router.get("/daily", getDailyLogs);

router.get("/timesheets", getTimeSheets);

export default router;
