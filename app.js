const express = require("express");
const bodyParser = require("body-parser");

const mongoClientProduct = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoClientProduct.createProduct);
app.get("/products", mongoClientProduct.getProducts);

app.listen(8000);
