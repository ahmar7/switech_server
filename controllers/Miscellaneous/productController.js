let MiscProduct = require("../../models/Miscellaneous/productModel");
const cloudinary = require("cloudinary");
const errorHandler = require("../../utils/errorHandler");

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const getDataUri = require("../../utils/dataUri");

exports.addMiscProduct = catchAsyncErrors(async (req, res, next) => {
  let file = req.files;
  let { price, name, stock, youtubeLink, remarks, description } = req.body;
  console.log(" req.body: ", file);

  let fileUri = getDataUri(file[0]);
  let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  if (!price || !name || !description || !stock || !youtubeLink || !remarks) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

  let product = await MiscProduct.create({
    price: price,
    name: name,
    stock: stock,
    youtubeLink: youtubeLink,
    remarks: remarks,
    description: description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).send({
    success: true,
    msg: "Product added successfully",
    product,
  });
});
exports.getMiscAllProducts = catchAsyncErrors(async (req, res) => {
  let productCount = await MiscProduct.countDocuments();

  // All api features like search, filter and pagination
  let products = await MiscProduct.find();

  res.status(200).send({
    success: true,
    products,
    productCount,
  });
});

exports.miscProductDetails = catchAsyncErrors(async (req, res) => {
  let _id = req.params.id;

  let product = await MiscProduct.findById(_id);

  res.status(200).send({
    success: true,
    product,
  });
});

exports.miscUpdateProduct = catchAsyncErrors(async (req, res) => {
  let file = req.files;
  let _id = req.params.id;
  let { price, name, stock, youtubeLink, remarks, description } = req.body;
  let logo_publicId;
  let logo_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    logo_publicId = myCloud.public_id;
    logo_secureUrl = myCloud.secure_url;
  } else {
    let oldData = await MiscProduct.findById({
      _id,
    });
    logo_publicId = oldData.image.public_id;
    logo_secureUrl = oldData.image.url;
  }

  let product = await MiscProduct.findById(_id);
  if (!product) {
    res.status(404).send({
      success: false,
      msg: "Product not found",
    });
  } else {
    let product = await MiscProduct.findByIdAndUpdate(
      _id,
      {
        image: {
          public_id: logo_publicId,
          url: logo_secureUrl,
        },
        price,
        name,
        stock,
        youtubeLink,
        remarks,
        description,
      },
      {
        // It will show updated value in response
        new: true,
        // If the product isn't there, it will create new one
        upsert: true,
      }
    );
    res.status(200).send({
      success: true,
      msg: "Product Update successfully",
    });
  }
});
exports.miscDeleteProduct = catchAsyncErrors(async (req, res) => {
  let _id = req.params.id;
  console.log("_id: ", _id);

  let product = await MiscProduct.findById(_id);
  if (!product) {
    res.status(404).send({
      success: false,
      msg: "Product not found",
    });
  } else {
    let product = await MiscProduct.deleteOne();
    res.status(200).send({
      success: true,
      msg: "Product deleted successfully",
    });
  }
});
