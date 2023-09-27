let headerModel = require("../models/headerModel");
const cloudinary = require("cloudinary");

// Usedto handle error
const errorHandler = require("../utils/errorHandler");
// It is an alternate of try catch we can use it instead of try cacth to handle catch block error
// let apiFeature = new apiFeatures(productModel.find(), req.query)
//   .search()
//   .filter();

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");
const getDataUri = require("../utils/dataUri");

// Testing Api
exports.addHeader = catchAsyncErrors(async (req, res, next) => {
  const file = req.files;
  console.log("file: ", file[1]);
  let { email, phone, address, availabilityFrom, availabilityTo } = req.body;
  if (!email || !phone || !address || !availabilityFrom) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  let logo_publicId;
  let logo_secureUrl;
  let consult_publicId;
  let consult_secureUrl;
  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    logo_publicId = myCloud.public_id;
    logo_secureUrl = myCloud.secure_url;
  } else {
    let oldData = await headerModel.findById({
      _id: "650dfb9d939e077c530453f0",
    });
    logo_publicId = oldData.logo.public_id;
    logo_secureUrl = oldData.logo.url;
  }
  if (file[1]) {
    let fileUri = getDataUri(file[1]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    consult_publicId = myCloud.public_id;
    consult_secureUrl = myCloud.secure_url;
  } else {
    let oldData = await headerModel.findById({
      _id: "650dfb9d939e077c530453f0",
    });

    consult_publicId = oldData.consultImg.public_id;
    consult_secureUrl = oldData.consultImg.url;
  }

  let findHeader = await headerModel.findOneAndUpdate(
    { _id: "650dfb9d939e077c530453f0" },
    {
      email: email,
      phone: phone,
      address: address,
      availabilityFrom: availabilityFrom,
      availabilityTo: availabilityTo,
      logo: {
        public_id: logo_publicId,
        url: logo_secureUrl,
      },
      consultImg: {
        public_id: consult_publicId,
        url: consult_secureUrl,
      },
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    msg: "Updated successfully",
  });
});
exports.getHeader = catchAsyncErrors(async (req, res, next) => {
  let findHeader = await headerModel.findById({
    _id: "650dfb9d939e077c530453f0",
  });

  res.status(200).send({
    success: true,
    findHeader,
  });
});
