const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todos");
const userRoute = require("./routes/users");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoute);
app.use("/users", userRoute);

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(process.env.PORT || 3000);

console.log(process.env.PORT);