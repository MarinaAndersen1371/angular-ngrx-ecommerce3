import asyncHandler from "express-async-handler";
import { statisticsProducts } from "./productHelpers.js";
import Product from "../models/productModel.js";

//Desc: Fetch all products
//Route: GET/api/products
//Access: Public / Private / Admin / Manager
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ deleted: false });
  const topProducts = await Product.find({ deleted: false })
    .sort({ rating: -1 })
    .limit(5);

  const statistics = statisticsProducts(products);

  res.json({ products, topProducts, statistics });
});

//Desc:Get product by Id
//Route: GET/api/products/:id
//Access: Public / Private / Admin / Manag
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { userName, userId, rating, comment } = req.body;

  if (comment.trim() === "") {
    res.status(400);
    throw new Error("No comment to submit");
  }

  const product = await Product.findById(req.params.id);

  if (product && !product.deleted) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.userId.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      userName,
      userId,
      rating: +rating,
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => +item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, createProductReview };
