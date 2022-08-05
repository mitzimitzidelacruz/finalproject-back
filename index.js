const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todos");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoute);

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(3000);
