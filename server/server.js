const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend app
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>🚀 Server is running on port 4000</h1>");
});
// Routes
app.use("/api/auth", authRoutes);

// DB & Server
connectDB();
app.listen(4200, () => console.log("🚀 Server running on port 4200"));
