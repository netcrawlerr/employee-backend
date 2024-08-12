import { Router } from "express";
import { sendNotification } from "../controllers/notificationController.js";
const router = Router();

router.post("/sendNotification", sendNotification);
export default router;
