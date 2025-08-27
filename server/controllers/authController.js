const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 15 * 60; // 15 minutes

// Create JWT
const createToken = (id) => {
  return jwt.sign({ id }, "Tauseef_super_secret_key", { expiresIn: maxAge });
};

// Register (❌ no token here)
exports.register = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    const newUser = await userModel.create({ user, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser._id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login (✅ token generated here)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: user._id,
      token: `Bearer ${token}`, // only at login
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Logout (client should remove token)
exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful, remove token on client" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Home (Protected route)
exports.home = async (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.user}!` });
};
