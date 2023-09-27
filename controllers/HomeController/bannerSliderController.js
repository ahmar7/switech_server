let bannerModel = require("../../models/homeModels/BannerSlider");
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
exports.addBannerSlider = catchAsyncErrors(async (req, res, next) => {
  const file = req.files;
  console.log("req.files: ", req.files);
  const { bannerTextArray1, bannerTextArray2, bannerTextArray3 } = req.body;
  console.log("bannerTextArray1: ", bannerTextArray1);

  let oldData = await bannerModel.findById({
    _id: "650f2a7036126607fcaf56df",
  });

  console.log(oldData.image1.url);
  let imag1_publicId;
  let image1_secureUrl;

  let image2_publicId;
  let image2_secureUrl;
  let image3_publicId;
  let image3_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    imag1_publicId = myCloud.public_id;
    image1_secureUrl = myCloud.secure_url;
  } else {
    imag1_publicId = oldData.image1.public_id;
    image1_secureUrl = oldData.image1.url;
  }
  if (file[1]) {
    let fileUri = getDataUri(file[1]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image2_publicId = myCloud.public_id;
    image2_secureUrl = myCloud.secure_url;
  } else {
    image2_publicId = oldData.image2.public_id;
    image2_secureUrl = oldData.image2.url;
  }
  if (file[2]) {
    let fileUri = getDataUri(file[2]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image3_publicId = myCloud.public_id;
    image3_secureUrl = myCloud.secure_url;
  } else {
    image3_publicId = oldData.image3.public_id;
    image3_secureUrl = oldData.image3.url;
  }

  let findHeader = await bannerModel.findOneAndUpdate(
    { _id: "650f2a7036126607fcaf56df" },
    {
      image1: {
        public_id: imag1_publicId,
        url: image1_secureUrl,
      },
      image2: {
        public_id: image2_publicId,
        url: image2_secureUrl,
      },
      image3: {
        public_id: image3_publicId,
        url: image3_secureUrl,
      },
      bannerText: [bannerTextArray1, bannerTextArray2, bannerTextArray3],
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    findHeader,
    msg: "Updated successfully",
  });
});
exports.getSlider = catchAsyncErrors(async (req, res, next) => {
  let findHeader = await bannerModel.findById({
    _id: "650f2a7036126607fcaf56df",
  });
  console.log("findHeader: ", findHeader);

  res.status(200).send({
    success: true,
    findHeader,
  });
});
