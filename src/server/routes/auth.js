const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ error: "Email already exists" });

  const user = await User.create({
    name,
    email,
    phone,
    password: await bcrypt.hash(password, 12)
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({ token, user });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({ token, user });
});

module.exports = router;





