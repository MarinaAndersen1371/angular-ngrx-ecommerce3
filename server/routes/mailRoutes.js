import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createMail,
  getMailById,
  getMails,
  deleteOut,
  deleteIn,
  updateMail,
  openMail,
} from "../controllers/mailController.js";

router.route("/").post(protect, createMail).get(protect, getMails);
router.route("/:id/open").put(protect, openMail);
router.route("/:id/in").put(protect, deleteIn);
router.route("/:id/out").put(protect, deleteOut);
router.route("/:id").get(protect, getMailById).put(protect, updateMail);

export default router;
