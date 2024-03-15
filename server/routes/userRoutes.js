import express from "express";
import { protect, admin, manager } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateProfile,
  userTest,
} from "../controllers/userController.js";
import {
  getUsers,
  updateAdminUser,
  deleteUser,
} from "../controllers/userAdminController.js";
import {
  updateTestScore,
  updatePrimeCoupon,
  updateUserPassword,
} from "../controllers/userManagerController.js";

// Admin routes
const adminMiddleware = [protect, admin];
router.route("/admin").get(adminMiddleware, getUsers);
router.route("/:id/edit").put(adminMiddleware, updateAdminUser);
router.route("/:id/deleted").put(adminMiddleware, deleteUser);
router.route("/:id/admin").get(adminMiddleware, getUserById);

// Manager routes
const managerMiddleware = [protect, manager];
router.route("/manager").get(managerMiddleware, getUsers);
router.route("/:id/testscore").put(managerMiddleware, updateTestScore);
router.route("/:id/coupon").put(managerMiddleware, updatePrimeCoupon);
router.route("/:id/resetpassword").put(managerMiddleware, updateUserPassword);
router.route("/:id/manager").get(managerMiddleware, getUserById);

// User routes
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id/remove").put(protect, removeFromCart);
router.route("/:id/profile").put(protect, updateProfile);
router.route("/:id/test").put(protect, userTest);
router.route("/:id/buy").get(protect, getUserById).put(protect, addToCart);

export default router;
