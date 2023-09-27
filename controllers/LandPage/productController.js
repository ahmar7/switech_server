let LandProduct = require("../../models/Land/productModel");
const cloudinary = require("cloudinary");
const errorHandler = require("../../utils/errorHandler");

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const getDataUri = require("../../utils/dataUri");

exports.addLandProduct = catchAsyncErrors(async (req, res, next) => {
  let file = req.files;
  let { price, name, stock, youtubeLink, remarks, description } = req.body;
  console.log(" req.body: ", file);

  let fileUri = getDataUri(file[0]);
  let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  let public_id = myCloud.public_id;
  let url = myCloud.secure_url;
  if (!price || !name || !description || !stock || !youtubeLink || !remarks) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

  console.log(public_id, url);

  let product = await LandProduct.create({
    price: price,
    name: name,
    stock: stock,
    youtubeLink: youtubeLink,
    remarks: remarks,
    description: description,
    image: {
      public_id: public_id,
      url: url,
    },
  });

  res.status(200).send({
    success: true,
    msg: "Product added successfully",
    product,
  });
});
exports.getLandAllProducts = catchAsyncErrors(async (req, res) => {
  let productCount = await LandProduct.countDocuments();

  // All api features like search, filter and pagination
  let products = await LandProduct.find();

  res.status(200).send({
    success: true,
    products,
  });
});

exports.landProductDetails = catchAsyncErrors(async (req, res) => {
  let _id = req.params.id;

  let product = await LandProduct.findById(_id);

  res.status(200).send({
    success: true,
    product,
  });
});

exports.landUpdateProduct = catchAsyncErrors(async (req, res) => {
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
    let oldData = await LandProduct.findById({
      _id,
    });
    logo_publicId = oldData.image.public_id;
    logo_secureUrl = oldData.image.url;
  }

  let product = await LandProduct.findById(_id);
  if (!product) {
    res.status(404).send({
      success: false,
      msg: "Product not found",
    });
  } else {
    let product = await LandProduct.findByIdAndUpdate(
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
exports.landDeleteProduct = catchAsyncErrors(async (req, res) => {
  let _id = req.params.id;
  console.log("_id: ", _id);

  let product = await LandProduct.findById(_id);
  if (!product) {
    res.status(404).send({
      success: false,
      msg: "Product not found",
    });
  } else {
    let product = await LandProduct.deleteOne();
    res.status(200).send({
      success: true,
      msg: "Product deleted successfully",
    });
  }
});
