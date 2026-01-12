const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./userRoute");

const app = express();
app.use(bodyParser.json());
app.use(cors());  

mongoose.connect("mongodb://127.0.0.1:27017/CRUD");

app.use("/api", userRoute);

app.listen(5000, () => console.log("Server Running on port 5000"));
