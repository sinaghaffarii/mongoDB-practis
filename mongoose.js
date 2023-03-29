const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect("mongodb://0.0.0.0:27017/shopping")
  .then(() => {
    console.log("Connected!");
  })
  .catch(() => {
    console.log("Fail Connect!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    title: req.body.title,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
