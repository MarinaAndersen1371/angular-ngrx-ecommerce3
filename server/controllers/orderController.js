import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { orderNotification, handleSubscription } from "./orderHelpers.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

//Desc: Fetch my orders
//Route: GET/api/orders
//Access: Private /  Customer
const getMyOrders = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

  const allOrders = await Order.find({}).populate(
    "user",
    "_id firstName lastName"
  );

  if (!allOrders) {
    res.json({ orders: [] });
    return;
  }

  const orders = allOrders.filter(
    (order) => order.user._id.toString() === userId
  );
  res.json({ orders });
});

//Desc:Get my order By Id
//Route: GET/api/orders/:id
//Access: Private / Customer
const getMyOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName"
  );

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  if (order && order.user._id.toString() === userId) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Create new order
//Route: POST/api/orders
//Access: Private
const addOrderItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  var cartItems = [];

  if (user && !user.deleted && user.cart.length > 0) {
    cartItems = [...user.cart];

    if (cartItems.length === 0) {
      res.status(400);
      throw new Error("No Order Items");
    }

    const order = new Order({
      orderItems: cartItems,
      user: req.body._id,
      shippingAddress: {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
      },
      invoiceAddress: {
        name: req.body.nameInvoice,
        address: req.body.addressInvoice,
        city: req.body.cityInvoice,
        postalCode: req.body.postalCodeInvoice,
        country: req.body.countryInvoice,
      },
      payment: {
        method: req.body.method,
        account: req.body.account,
      },
    });

    if (order && order.orderItems) {
      order.orderItems.forEach(async (item) => {
        const product = await Product.findById(item._id);
        if (product) {
          product.quantity -= +item.quantity;
          if (+product.quantity < 0) {
            throw new Error("One of the Items is out of stock");
          } else {
            await product.save();
          }
        }
      });

      order.itemsCost = order.orderItems
        .reduce((acc, item) => acc + +item.quantity * +item.pricePurchase, 0)
        .toFixed(2);

      order.itemsPrice = order.orderItems
        .reduce(
          (acc, item) =>
            acc +
            +item.quantity * +item.price -
            +item.quantity * +item.price * +item.discount +
            +item.quantity * +item.price * +item.warranty +
            +item.quantity * (+item.extra1 + +item.extra2) +
            +item.gift,
          0
        )
        .toFixed(2);

      order.extraPrice = order.orderItems
        .reduce(
          (acc, item) =>
            acc + +item.quantity * +item.extra1 + +item.quantity * +item.extra2,
          0
        )
        .toFixed(2);

      order.giftPrice = order.orderItems
        .reduce((acc, item) => acc + +item.gift, 0)
        .toFixed(2);

      order.primePrice = req.body.prime === "Yes" && !user.isPrime ? 70 : 0;

      order.franchisePrice =
        req.body.franchise === "Yes" && !user.testPaid ? 500 : 0;

      order.shippingPrice =
        +req.body.delivery === 10
          ? 10
          : +order.itemsPrice > 800 || +order.primePrice > 0 || user.isPrime
          ? 0
          : 5;

      order.taxPrice = (
        (+order.itemsPrice +
          +order.shippingPrice +
          +order.primePrice +
          +order.franchisePrice) *
        0.15
      ).toFixed(2);

      //Cost: gift= 10%, prime=10%, franchise=30%
      order.totalCost = (
        +order.itemsCost +
        +order.giftPrice * 0.1 +
        +order.primePrice * 0.1 +
        +order.franchisePrice * 0.3
      ).toFixed(2);

      order.totalPrice = (
        +order.itemsPrice +
        +order.taxPrice +
        +order.primePrice +
        +order.franchisePrice +
        +order.shippingPrice
      ).toFixed(2);

      user.cart = [];
      user.subtotal = 0;
      user.cartCount = 0;
      await user.save();

      await order.save();
      res.status(201).json(order);
    }
  }
});

//Desc:Update order to paid
//Route: PUT/api/order/:id/paid
//Access: Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  const user = await User.findById(order.user._id);

  if (order && !order.isPaid && !order.returnActive && user && !user.deleted) {
    order.isPaid = true;
    order.paidAt = Date.now();

    if (+order.primePrice === 70) {
      user.isPrime = true;
      user.primeFrom = Date.now();
      handleSubscription(
        order,
        "Premium Membership",
        `Your Premium Membership has started from ${order.paidAt}`
      );
    }

    if (+order.franchisePrice === 500) {
      user.testPaid = true;
      handleSubscription(
        order,
        "Franchise Association Membership",
        "In order to become a Member of the Franchise Association, you need to complete the training."
      );
    }

    await user.save();
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Submit customer voucher
//Route: PUT/api/order/:id/voucher
//Access: Private
const updateCustomerVoucher = asyncHandler(async (req, res) => {
  const voucherExists = await Order.findOne({
    voucher: req.body.voucher,
  });
  if (voucherExists) {
    res.status(400);
    throw new Error("This Voucher is already submitted!");
  }

  const order = await Order.findById(req.params.id);

  if (!order || order.returnActive) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.voucher = req.body.voucher;
  order.taxPrice = (
    (+order.itemsPrice +
      +order.shippingPrice +
      +order.primePrice +
      +order.franchisePrice -
      10) *
    0.15
  ).toFixed(2);

  order.totalPrice = (
    +order.itemsPrice +
    +order.taxPrice +
    +order.primePrice +
    +order.franchisePrice +
    +order.shippingPrice -
    10
  ).toFixed(2);

  await order.save();

  const user = await User.findById(req.body.userId);
  if (user && !user.deleted) {
    user.coupon = "00";
    await user.save();
  }

  res.json(order);
});

//Desc: Update Return to active
//Route: PUT/api/orders/:id/returnactive
//Access: Private
const updateReturnToActive = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || !order.orderItems) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.returnActive = true;
  order.isExtra = false;

  order.itemsPriceReturn = order.orderItems
    .reduce(
      (acc, item) =>
        acc +
        (+item.quantity * +item.price -
          +item.quantity * +item.price * +item.discount +
          +item.quantity * +item.price * +item.warranty +
          +item.quantity * (+item.extra1 + +item.extra2)),
      0
    )
    .toFixed(2);
  order.itemsCostReturn = order.orderItems
    .reduce((acc, item) => acc + +item.quantity * +item.pricePurchase, 0)
    .toFixed(2);
  order.shippingPriceReturn = order.isSent ? 0 : order.shippingPrice;
  order.taxPriceReturn = (
    (+order.itemsPriceReturn +
      +order.shippingPriceReturn -
      (order.voucher !== "00" ? 10 : 0)) *
    0.15
  ).toFixed(2);
  order.totalPriceReturn = (
    +order.itemsPriceReturn +
    +order.taxPriceReturn +
    +order.shippingPriceReturn -
    (order.voucher !== "00" ? 10 : 0)
  ).toFixed(2);

  order.totalCost = (+order.totalCost - +order.itemsCostReturn).toFixed(2);

  for (const item of order.orderItems) {
    const product = await Product.findById(item._id);
    if (product && !product.deleted) {
      product.quantity += +item.quantity;
      await product.save();
    }
  }
  await order.save();
  res.json(order);
});

export {
  getMyOrders,
  addOrderItems,
  getMyOrderById,
  updateOrderToPaid,
  updateCustomerVoucher,
  updateReturnToActive,
};
