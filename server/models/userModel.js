const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login function
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw Error("Incorrect password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
