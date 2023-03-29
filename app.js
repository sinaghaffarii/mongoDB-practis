const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("./mongoose");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoose.createProduct);
app.get("/products", mongoose.getProducts);

app.listen(8000);
