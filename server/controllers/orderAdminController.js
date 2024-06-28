import asyncHandler from "express-async-handler";
import { calculateStatistics, orderNotification } from "./orderHelpers.js";
import Order from "../models/orderModel.js";

//Desc: Fetch all orders
//Route: GET/api/orders
//Access: Private / Admin / Manager / Support / Customer
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "user",
    "_id firstName lastName"
  );

  if (!orders) {
    res.json({ orders: [], statistics: {} });
    return;
  }

  const statistics = calculateStatistics(orders);
  res.json({ orders, statistics });
});

//Desc:Get order By Id
//Route: GET/api/orders/:id
//Access: Admin / Manager / Support
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update order to sent
//Route: PUT/api/orders/:id/sent/admin
//Access: Private / Admin / Manager / Support
const updateOrderToSent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order || !order.user || !order.isPaid || order.returnActive) {
    res.status(404);
    throw new Error("Order not found or invalid data");
  }

  order.isSent = true;
  order.sentAt = Date.now();
  await order.save();

  const role = req.body.role;
  let notificationEmail;

  if (role === "manager") {
    notificationEmail = "manager@web.de";
  } else if (role === "support") {
    notificationEmail = "support@web.de";
  } else {
    notificationEmail = "admin@web.de";
  }

  const notificationSubject = `${order.user.firstName}, Your Order has been sent!`;
  const notificationMessage = `Hello, ${order.user.firstName}!
  Your Order ${order._id} has been sent on ${order.sentAt}`;

  await orderNotification(
    order,
    notificationEmail,
    notificationSubject,
    notificationMessage
  );

  res.json(order);
});

//Desc:Update  invoice to sent
//Route: PUT/api/orders/:id/invoice/admin
//Access: Private / Admin  / Manager
const updateInvoiceToSent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order || !order.user || !order.isPaid || order.returnActive) {
    res.status(404);
    throw new Error("Order not found or invalid data");
  }

  order.invoiceSent = true;
  order.invoiceAt = Date.now();
  await order.save();

  const role = req.body.role;
  let notificationEmail;

  if (role === "manager") {
    notificationEmail = "manager@web.de";
  } else if (role === "support") {
    notificationEmail = "support@web.de";
  } else {
    notificationEmail = "admin@web.de";
  }

  const notificationSubject = `${order.user.firstName}, Your Invoice has been sent!`;
  const notificationMessage = `Hello, ${order.user.firstName}! Your Invoice to Order ${order._id} has been sent on ${order.invoiceAt}`;

  await orderNotification(
    order,
    notificationEmail,
    notificationSubject,
    notificationMessage
  );

  res.json(order);
});

//Desc:Update order to delivered
//Route: PUT/api/orders/:id/deliver/admin
//Access: Private / Admin  / Manager / Support
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order || !order.user || !order.isSent || order.returnActive) {
    res.status(404);
    throw new Error("Order not found or invalid data");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  if (+order.extraPrice > 0) {
    order.isExtra = true;
  }
  await order.save();

  const role = req.body.role;
  let notificationEmail;

  if (role === "manager") {
    notificationEmail = "manager@web.de";
  } else if (role === "support") {
    notificationEmail = "support@web.de";
  } else {
    notificationEmail = "admin@web.de";
  }

  const notificationSubject = `${order.user.firstName}, Your Order has been delivered!`;
  const notificationMessage = `Hello, ${order.user.firstName}!
  Your Order ${order._id} has been delivered on ${order.deliveredAt}`;

  await orderNotification(
    order,
    notificationEmail,
    notificationSubject,
    notificationMessage
  );

  res.json(order);
});

//Desc:Update return to received
//Route: PUT/api/orders/:id/returnreceived/admin
//Access: Private / Admin  / Manager / Support
const updateReturnToReceived = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order && order.isSent && !order.returnReceived && order.returnActive) {
    order.returnReceived = true;
    order.returnReceivedAt = Date.now();
    await order.save();

    const role = req.body.role;
    let notificationEmail;

    if (role === "manager") {
      notificationEmail = "manager@web.de";
    } else if (role === "support") {
      notificationEmail = "support@web.de";
    } else {
      notificationEmail = "admin@web.de";
    }

    const notificationSubject = `${order.user.firstName}, We have received Your Return!`;
    const notificationMessage = `Hello, ${order.user.firstName}!
  Your Return to Order ${order._id} has been received on ${order.returnReceivedAt}`;

    await orderNotification(
      order,
      notificationEmail,
      notificationSubject,
      notificationMessage
    );

    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update refund to paid
//Route: PUT/api/orders/:id/refund/admin
//Access: Private / Admin  / Manager / Support
const updateRefundToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order && order.isPaid && order.returnActive && !order.refund) {
    order.refund = true;
    order.refundAt = Date.now();
    await order.save();

    const role = req.body.role;
    let notificationEmail;

    if (role === "manager") {
      notificationEmail = "manager@web.de";
    } else if (role === "support") {
      notificationEmail = "support@web.de";
    } else {
      notificationEmail = "admin@web.de";
    }

    const notificationSubject = `${order.user.firstName}, Your Refund has been paid!`;
    const notificationMessage = `Hello, ${order.user.firstName}!
    Your Refund to Order ${order._id} has been paid on ${order.refundAt}`;

    await orderNotification(
      order,
      notificationEmail,
      notificationSubject,
      notificationMessage
    );

    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update return to closed
//Route: PUT/api/orders/:id/returnclosed/admin
//Access: Private / Admin  / Manager / Support
const updateReturnToClosed = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.returnActive && !order.returnClosed) {
    order.returnClosed = true;
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getOrders,
  getOrderById,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
  updateReturnToReceived,
  updateRefundToPaid,
  updateReturnToClosed,
};
