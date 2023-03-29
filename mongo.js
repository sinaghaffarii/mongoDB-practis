const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://0.0.0.0:27017/shopping";

const createProduct = async (req, res, next) => {
  const newProduct = {
    title: req.body.title,
    price: req.body.price,
  };
  const client = new mongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch (err) {
    return res.json({ message: "سرور با مشکل مواجه شده است" });
  }
  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new mongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (err) {
    return res.json({ message: "سرور با مشکل مواجه شده است" });
  }
  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
