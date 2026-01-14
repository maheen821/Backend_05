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
//login routes
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await mongoose.model("User").findOne({ email, password });
    if(!user) return res.status(400).json({ message: "Invalid email or password" });
    res.json({ message: "Login successful", user });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => console.log("Server Running on port 5000"));
