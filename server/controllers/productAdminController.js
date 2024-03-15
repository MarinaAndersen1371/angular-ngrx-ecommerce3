import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Desc: Create product
//Route: POST/api/products/admin
//Access: Private / Admin / Manager
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    pricePurchase,
    price,
    quantity,
    extra,
    imageUrl,
    modifiedBy,
  } = req.body;
  const product = await Product.create({
    name,
    brand,
    category,
    description,
    pricePurchase,
    price,
    quantity,
    extra,
    imageUrl,
    modifiedBy,
    lastModified: Date.now(),
  });

  if (product) {
    res.json({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      pricePurchase: product.pricePurchase,
      price: product.price,
      quantity: product.quantity,
      extra: product.extra,
      imageUrl: product.imageUrl,
      modifiedBy: product.modifiedBy,
      lastModified: product.lastModified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//Desc: Update product
//Route: PUT/api/products/:id/admin
//Access: Private / Admin / Manager
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.pricePurchase = req.body.pricePurchase || product.pricePurchase;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.extra = req.body.extra ?? product.extra;
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    product.modifiedBy = req.body.modifiedBy;
    product.lastModified = Date.now();

    await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Delete product
//Route: PUT/api/products/:id/deleted/admin
//Access: Private / Admin / Manager
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
    product.deleted = true;
    await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { createProduct, deleteProduct, updateProduct };
