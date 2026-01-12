const express = require("express");
const router = express.Router();
const User = require("./models/User");

// CREATE
router.post("/user", async (req, res) => {
  await User.create(req.body);
  res.json("User Added");
});

// READ
router.get("/user", async (req, res) => {
  res.json(await User.find());
});

// UPDATE
router.put("/user/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json("User Updated");
});

// DELETE
router.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User Deleted");
});

module.exports = router;
