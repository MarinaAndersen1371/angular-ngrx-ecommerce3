import express from "express";
import { protect, admin, manager } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProductReview,
} from "../controllers/productController.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productAdminController.js";

// Admin routes
const adminMiddleware = [protect, admin];
router
  .route("/admin")
  .get(adminMiddleware, getProducts)
  .post(adminMiddleware, createProduct);
router.route("/:id/deleted/admin").put(adminMiddleware, deleteProduct);
router
  .route("/:id/admin")
  .get(adminMiddleware, getProductById)
  .put(adminMiddleware, updateProduct);

// Manager routes
const managerMiddleware = [protect, manager];
router
  .route("/manager")
  .get(managerMiddleware, getProducts)
  .post(managerMiddleware, createProduct);
router.route("/:id/deleted/manager").put(managerMiddleware, deleteProduct);
router
  .route("/:id/manager")
  .get(managerMiddleware, getProductById)
  .put(managerMiddleware, updateProduct);

router.route("/").get(getProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id").get(getProductById);

export default router;
