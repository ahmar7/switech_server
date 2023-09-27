const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name can't exceed 30 characters"],
    minLength: [3, "Name will have more than 3 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should be more than 8 characters"],
    // It will not come in find() method
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
  next();
});
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_JWT, {
    expiresIn: process.env.SECRET_EXPIRE,
  });
};
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
 
let userModel = mongoose.model("user", userSchema);

module.exports = userModel;
