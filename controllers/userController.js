let UserModel = require("../models/userModel");

const errorHandler = require("../utils/errorHandler");
const bcryptjs = require("bcryptjs");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwtToken = require("../utils/jwtToken");

exports.RegisterUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  let createUser = await UserModel.create({
    name,
    email,
    password,
  });
  jwtToken(createUser, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body: ", req.body);
  if (!email || !password) {
    return next(new errorHandler("Please enter email and password", 400));
  }
  let UserAuth = await UserModel.findOne({ email }).select("+password");
  if (!UserAuth) {
    return next(new errorHandler("Invalid Email or password", 401));
  }
  const isPassword = await UserAuth.comparePassword(password);

  if (!isPassword) {
    return next(new errorHandler("Invalid Email or Password", 401));
  }

  jwtToken(UserAuth, 200, res);
});

// Logout User

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("jwttoken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({
    success: true,
    msg: "User Logged out successfully",
  });
});

// Password reset

exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  let email = req.user.email;
  let user = await UserModel.findOne({ email });
  console.log("user: ", user);

  console.log(user);
  return res.status(200).send({
    success: true,
    msg: "Done",

    user,
  });
});
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  let email = req.user.email;
  let { newName, newEmail, password } = req.body;
  if ((!newName, !newEmail, !password)) {
    return next(new errorHandler("Please fill all the fields", 404));
  }
  let user = await UserModel.findOne({ email }).select("+password");

  const isPassword = await bcryptjs.compare(password, user.password);
  if (!isPassword) {
    return next(new errorHandler("Incorrect Password, please try again", 401));
  }
  await UserModel.findByIdAndUpdate(
    { _id: user._id },
    { name: newName, email: newEmail },
    { new: true }
  );
  return res.status(200).send({
    success: true,
    msg: "Profile Updated successfully",
  });
});
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  let email = req.user.email;
  let { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 404));
  }
  let user = await UserModel.findOne({ email }).select("+password");

  const isPassword = await bcryptjs.compare(oldPassword, user.password);

  if (!isPassword) {
    return next(new errorHandler("Incorrect Password, please try again", 401));
  }

  let updatedHash = await bcryptjs.hash(newPassword, 12);
  let savePassword = await UserModel.findByIdAndUpdate(
    { _id: user._id },
    { password: updatedHash },
    { new: true }
  );
  res.cookie("jwttoken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(201).send({
    success: true,
    msg: "Profile Updated successfully, please login to continue",
  });
});
