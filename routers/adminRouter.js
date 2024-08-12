import { Router } from "express";
import {
  createShift,
  updateShift,
  deleteShift,
} from "../controllers/adminController.js";
import { addUser } from "../controllers/adminController.js";
import { deleteUser } from "../controllers/adminController.js";
import { activateUser } from "../controllers/adminController.js";
import { deactivateUser } from "../controllers/adminController.js";

const router = Router();

router.post("/shifts/create", createShift);
router.post("/shifts/update/", updateShift);
router.delete("/shifts/delete", deleteShift);

router.post("/users/add", addUser);
router.post("/users/delete", deleteUser);
router.post("/users/activate", activateUser);
router.post("/users/deactivate", deactivateUser);

export default router;
