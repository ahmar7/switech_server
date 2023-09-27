let MiscBanner = require("../../models/Miscellaneous/MiscellaneousModel");
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
exports.addMiscBanner = catchAsyncErrors(async (req, res, next) => {
  const file = req.files;

  let logo_publicId;
  let logo_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    logo_publicId = myCloud.public_id;
    logo_secureUrl = myCloud.secure_url;
  } else {
    let oldData = await MiscBanner.findById({
      _id: "65122f2540b8c62c8aa58444",
    });
    logo_publicId = oldData.banner.public_id;
    logo_secureUrl = oldData.banner.url;
  }

  let data = await MiscBanner.findOneAndUpdate(
    { _id: "65122f2540b8c62c8aa58444" },
    {
      banner: {
        public_id: logo_publicId,
        url: logo_secureUrl,
      },
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    msg: "Updated successfully",
    data,
  });
});
exports.getMiscBanner = catchAsyncErrors(async (req, res, next) => {
  let findHeader = await MiscBanner.findById({
    _id: "65122f2540b8c62c8aa58444",
  });

  res.status(200).send({
    success: true,
    findHeader,
  });
});
