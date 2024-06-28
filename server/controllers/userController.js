import asyncHandler from "express-async-handler";
import generateToken from "../generateToken.js";
import { calculateSubtotal, userNotification } from "./userHelpers.js";
import User from "../models/userModel.js";

//Desc: Login user
//Route: POST/api/users/login
//Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && !user.deleted && (await user.matchPassword(password))) {
    user.lastLogin = Date.now();
    await user.save();
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isSupport: user.isSupport,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      testPaid: user.testPaid,
      coupon: user.coupon,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid data");
  }
});

//Desc: Register user
//Route: POST/api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    purpose,
    birthday,
    gender,
  } = req.body;

  // Check if user with the same email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This email is already registered");
  }

  // Create the user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    purpose,
    birthday,
    gender,
    lastLogin: Date.now(),
    lastModified: Date.now(),
    modifiedBy: lastName,
  });

  if (user) {
    // Send welcome email
    const notificationEmail = "admin@web.de";
    const notificationSubject = `Welcome to MarWeb Trade, ${user.firstName}!`;
    const notificationMessage =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    await userNotification(
      user,
      notificationEmail,
      notificationSubject,
      notificationMessage
    );

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isSupport: user.isSupport,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      coupon: user.coupon,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Desc: Get user by Id
//Route: GET/api/users/:id
//Access: Private / Admin / Manager
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Add product to cart
//Route: PUT/api/users/:id
//Access: Private
const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { item: product, qty, warranty, gift, extra1, extra2 } = req.body;

  if (user && !user.deleted && user.cart) {
    const existingItem = user.cart.find(
      (x) => x._id.toString() === product._id.toString()
    );

    if (existingItem) {
      const newQuantity = +existingItem.quantity + +qty;

      if (newQuantity <= +product.quantity) {
        existingItem.quantity = newQuantity;
        existingItem.discount = newQuantity > 2 ? 0.05 : 0;
        existingItem.warranty = warranty === "Yes" ? 0.02 : 0;
        existingItem.gift = gift === "Yes" ? 5 : 0;
        existingItem.extra1 = extra1 === "Yes" ? 4 : 0;
        existingItem.extra2 = extra2 === "Yes" ? 5 : 0;
      } else {
        throw new Error("Product is out of stock");
      }
    } else {
      product.quantity = qty;
      product.discount = +product.quantity > 2 ? 0.05 : 0;
      product.warranty = warranty === "Yes" ? 0.02 : 0;
      product.gift = gift === "Yes" ? 5 : 0;
      product.extra1 = extra1 === "Yes" ? 4 : 0;
      product.extra2 = extra2 === "Yes" ? 5 : 0;

      user.cart.push(product);
    }

    user.subtotal = calculateSubtotal(user.cart);
    user.cartCount = user.cart.reduce(
      (acc, product) => acc + +product.quantity,
      0
    );

    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Remove item from cart
//Route: PUT/api/users/:id/remove
//Access: Private
const removeFromCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const item = req.body.item;

  if (user && !user.deleted && user.cart && user.cart.length > 0) {
    const removedItem = user.cart.find(
      (x) => x._id.toString() === item._id.toString()
    );

    if (removedItem) {
      user.cart.remove(removedItem);
      user.subtotal = calculateSubtotal(user.cart);
      user.cartCount = user.cart.reduce(
        (acc, product) => acc + +product.quantity,
        0
      );
      await user.save();
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Item not found in cart");
    }
  } else {
    res.status(404);
    throw new Error("User not found or cart is empty");
  }
});

//Desc: Update user profile
//Route: PUT/api/users/:id/profile
//Access: Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    req.body.password && (user.password = req.body.password);
    user.lastModified = Date.now();
    user.modifiedBy = user.lastName;

    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: User test completion
//Route: PUT/api/users/:id/test
//Access: Private
const userTest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    const tests = ["test1", "test2", "test3", "test4", "test5"];
    const answers = {
      test1: "A",
      test2: "B",
      test3: "C",
      test4: "D",
      test5: "A",
    };

    tests.forEach((test) => {
      user.test[test] = req.body[test] || user.test[test];
      user.testScore += user.test[test] === answers[test] ? 20 : 1;
    });

    var notificationSubject, notificationMessage;
    if (+user.testScore > 79) {
      user.isFranchise = true;
      user.franchiseFrom = Date.now();

      notificationSubject = `Test was successful, ${user.firstName}!`;
      notificationMessage = `Congratulations, you have completed the test with the score ${user.testScore}%`;
    } else {
      notificationSubject = `Test failed, ${user.firstName}!`;
      notificationMessage = `Unfortunately you have failed the test with the score ${user.testScore}%`;
    }

    const notificationEmail = "admin@web.de";
    await userNotification(
      user,
      notificationEmail,
      notificationSubject,
      notificationMessage
    );

    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateProfile,
  userTest,
};
