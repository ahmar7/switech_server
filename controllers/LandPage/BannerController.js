let LandBanner = require("../../models/Land/LandModel");
const cloudinary = require("cloudinary");
const errorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const apiFeatures = require("../../utils/apiFeatures");
const getDataUri = require("../../utils/dataUri");

// Testing Api
exports.addLandBanner = catchAsyncErrors(async (req, res, next) => {
  const file = req.files;

  let logo_publicId;
  let logo_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    logo_publicId = myCloud.public_id;
    logo_secureUrl = myCloud.secure_url;
  } else {
    let oldData = await LandBanner.findById({
      _id: "6512cb9ef568339a8909f4c6",
    });
    logo_publicId = oldData.banner.public_id;
    logo_secureUrl = oldData.banner.url;
  }

  let data = await LandBanner.create(
    // { _id: "65122f2540b8c62c8aa58444" },
    {
      banner: {
        public_id: logo_publicId,
        url: logo_secureUrl,
      },
    }
    // { new: true }
  );

  res.status(201).send({
    success: true,
    msg: "Updated successfully",
    data,
  });
});
exports.getLandBanner = catchAsyncErrors(async (req, res, next) => {
  let findHeader = await LandBanner.findById({
    _id: "6512cb9ef568339a8909f4c6",
  });

  res.status(200).send({
    success: true,
    findHeader,
  });
});
