let productModel = require("../models/productModel");
// Usedto handle error
const errorHandler = require("../utils/errorHandler");
// It is an alternate of try catch we can use it instead of try cacth to handle catch block error
// let apiFeature = new apiFeatures(productModel.find(), req.query)
//   .search()
//   .filter();

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");
// Testing Api
exports.test = async (req, res, next) => {
  let userExist = true;
  if (userExist) {
    // How to use errorHandler? here we go
    return next(new errorHandler("already", 400));
  } else {
    res.status(201).json({
      message: "created success",
    });
  }
};
// Create new product -- Admin route
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  let { price, name, description, images, category, user } = req.body;

  if (!price || !name || !description || !images || !category) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

  console.log(" req.user.id: ", req.user);
  let product = await productModel.create({
    user: req.user.id,
    price: price,
    name: name,
    description: description,
    images: images,
    category: category,
  });

  res.status(200).send({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  let productCount = await productModel.countDocuments();
  let itemsPerPage = 10;
  // All api features like search, filter and pagination
  let apiFeature = new apiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(itemsPerPage);

  let product = await apiFeature.query;

  res.status(200).send({
    success: true,
    product,
    productCount,
  });
});

// Get single product

exports.productDetails = catchAsyncErrors(async (req, res) => {
  apiFeatures(productModel.find());
  let _id = req.params.id;
  console.log(_id);
  let product = await productModel.findById(_id);

  res.status(200).send({
    success: true,
    product,
  });
});

// Update Product -- Admin route

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let _id = req.params.id;
  console.log("_id: ", _id);

  let product = await productModel.findById(_id);
  if (!product) {
    res.status(404).send({
      success: false,
      msg: "Product not found",
    });
  } else {
    let product = await productModel.findByIdAndUpdate(_id, req.body, {
      // It will show updated value in response
      new: true,
      // If the product isn't there, it will create new one
      upsert: true,
    });
    res.status(200).send({
      product,
    });
  }
});

// Delete Product -- Admin route

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const _id = req.params.id;
  let product = await productModel.findById(_id);

  if (!product) {
    res.status(404).send({ msg: "Product not found" });
  } else {
    product.deleteOne();
    res.status(200).send({
      success: true,
      msg: "Product deleted successfully",
    });
  }
});
