import express from "express";
const router = express.Router();
import {
  protect,
  admin,
  manager,
  support,
} from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  addOrderItems,
  getMyOrderById,
  updateOrderToPaid,
  updateCustomerVoucher,
  updateReturnToActive,
} from "../controllers/orderController.js";
import {
  getOrders,
  getOrderById,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
  updateReturnToReceived,
  updateRefundToPaid,
  updateReturnToClosed,
} from "../controllers/orderAdminController.js";

// Admin routes
const adminMiddleware = [protect, admin];
router.route("/admin").get(adminMiddleware, getOrders);
router.route("/:id/sent/admin").put(adminMiddleware, updateOrderToSent);
router.route("/:id/deliver/admin").put(adminMiddleware, updateOrderToDelivered);
router.route("/:id/invoice/admin").put(adminMiddleware, updateInvoiceToSent);
router.route("/:id/refund/admin").put(adminMiddleware, updateRefundToPaid);
router
  .route("/:id/returnreceived/admin")
  .put(adminMiddleware, updateReturnToReceived);
router
  .route("/:id/returnclosed/admin")
  .put(adminMiddleware, updateReturnToClosed);
router.route("/:id/admin").get(adminMiddleware, getOrderById);

// Manager routes
const managerMiddleware = [protect, manager];
router.route("/manager").get(managerMiddleware, getOrders);
router.route("/:id/sent/manager").put(managerMiddleware, updateOrderToSent);
router
  .route("/:id/deliver/manager")
  .put(managerMiddleware, updateOrderToDelivered);
router
  .route("/:id/invoice/manager")
  .put(managerMiddleware, updateInvoiceToSent);
router.route("/:id/refund/manager").put(managerMiddleware, updateRefundToPaid);
router
  .route("/:id/returnreceived/manager")
  .put(managerMiddleware, updateReturnToReceived);
router
  .route("/:id/returnclosed/manager")
  .put(managerMiddleware, updateReturnToClosed);
router.route("/:id/manager").get(managerMiddleware, getOrderById);

// Support routes
const supportMiddleware = [protect, support];
router.route("/support").get(supportMiddleware, getOrders);
router.route("/:id/support").get(supportMiddleware, getOrderById);
router.route("/:id/sent/support").put(supportMiddleware, updateOrderToSent);
router
  .route("/:id/deliver/support")
  .put(supportMiddleware, updateOrderToDelivered);
router.route("/:id/refund/support").put(supportMiddleware, updateRefundToPaid);
router
  .route("/:id/returnreceived/support")
  .put(supportMiddleware, updateReturnToReceived);
router
  .route("/:id/returnclosed/support")
  .put(supportMiddleware, updateReturnToClosed);

// Customer routes
router.route("/myorders").get(protect, getMyOrders);
router.route("/").post(addOrderItems);
router.route("/:id/paid").put(protect, updateOrderToPaid);
router.route("/:id/voucher").put(protect, updateCustomerVoucher);
router.route("/:id/requestreturn").put(protect, updateReturnToActive);
router.route("/:id").get(protect, getMyOrderById);

export default router;
