import { Router } from "express";

import {
  getPayroll,
  getCalendarEvents,
} from "../controllers/integrationController.js";

const router = Router();

router.get("/payroll", getPayroll);

router.get("/calendar", getCalendarEvents);

export default router;
