import express from "express";
const router = express.Router();
import {
  protect,
  admin,
  manager,
  support,
} from "../middleware/authMiddleware.js";

import {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  openTicket,
  updateTicket,
} from "../controllers/ticketController.js";

const adminMiddleware = [protect, admin];
const managerMiddleware = [protect, manager];
const supportMiddleware = [protect, support];

router.route("/").post(createTicket);

router.route("/admin").get(adminMiddleware, getTickets);
router
  .route("/:id/admin")
  .get(adminMiddleware, getTicketById)
  .delete(adminMiddleware, deleteTicket)
  .put(adminMiddleware, updateTicket);

router.route("/manager").get(managerMiddleware, getTickets);
router
  .route("/:id/manager")
  .get(managerMiddleware, getTicketById)
  .put(managerMiddleware, updateTicket);

router.route("/support").get(supportMiddleware, getTickets);
router
  .route("/:id/support")
  .get(supportMiddleware, getTicketById)
  .put(supportMiddleware, updateTicket);

router.route("/:id/open").put(openTicket);

export default router;
