const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const requireAuth = require("../middleware/authMiddleware");

// Public route
router.get("/", (req, res) => {
  res.json({ message: "Hello there 👋" });
});

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout); // ✅ added logout

// Protected Home
router.get("/home", requireAuth, authController.home);

module.exports = router;
