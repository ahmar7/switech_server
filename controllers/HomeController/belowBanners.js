let belowBannerSchema = require("../../models/homeModels/belowBanner");
const cloudinary = require("cloudinary");

// Usedto handle error
const errorHandler = require("../../utils/errorHandler");
// It is an alternate of try catch we can use it instead of try cacth to handle catch block error
// let apiFeature = new apiFeatures(productModel.find(), req.query)
//   .search()
//   .filter();

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const apiFeatures = require("../../utils/apiFeatures");
const getDataUri = require("../../utils/dataUri");

// Testing Api
exports.belowBanner = catchAsyncErrors(async (req, res, next) => {
  const file = req.files;
  console.log("file: ", file);
  let oldData = await belowBannerSchema.findById({
    _id: "650f3933b8e90c701efaefa9",
  });

  let imag1_publicId;
  let image1_secureUrl;

  let image2_publicId;
  let image2_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    imag1_publicId = myCloud.public_id;
    image1_secureUrl = myCloud.secure_url;
  } else {
    imag1_publicId = oldData.banner1.public_id;
    image1_secureUrl = oldData.banner1.url;
  }
  if (file[1]) {
    let fileUri = getDataUri(file[1]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image2_publicId = myCloud.public_id;
    image2_secureUrl = myCloud.secure_url;
  } else {
    image2_publicId = oldData.banner2.public_id;
    image2_secureUrl = oldData.banner2.url;
  }

  let findHeader = await belowBannerSchema.findByIdAndUpdate(
    { _id: "650f3933b8e90c701efaefa9" },
    {
      banner1: {
        public_id: imag1_publicId,
        url: image1_secureUrl,
      },
      banner2: {
        public_id: image2_publicId,
        url: image2_secureUrl,
      },
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    findHeader,
    msg: "Updated successfully",
  });
});
exports.getBelowBanner = catchAsyncErrors(async (req, res, next) => {
  let findBelow = await belowBannerSchema.findById({
    _id: "650f3933b8e90c701efaefa9",
  });

  res.status(200).send({
    success: true,
    findBelow,
  });
});
