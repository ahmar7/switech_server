const cloudinary = require("cloudinary");

const errorHandler = require("../../utils/errorHandler");

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

const getDataUri = require("../../utils/dataUri");
const socialLinkModel = require("../../models/Footer/socialLinkModel");
const FooterFeature = require("../../models/Footer/FooterFeature");

exports.addSocialLink = catchAsyncErrors(async (req, res, next) => {
  const {
    socialLink1,
    socialName1,
    socialLink2,
    socialName2,
    socialName3,
    socialLink3,
    socialLink4,
    socialName4,
  } = req.body;

  if (
    !socialLink1 ||
    !socialName1 ||
    !socialLink2 ||
    !socialName2 ||
    !socialName3 ||
    !socialLink3 ||
    !socialLink4 ||
    !socialName4
  ) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  const file = req.files;

  let oldData = await socialLinkModel.findById({
    _id: "650f6dca885fb31803972f77",
  });

  let imag1_publicId;
  let image1_secureUrl;

  let image2_publicId;
  let image2_secureUrl;
  let image3_publicId;
  let image3_secureUrl;
  let image4_publicId;
  let image4_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    imag1_publicId = myCloud.public_id;
    image1_secureUrl = myCloud.secure_url;
  } else {
    imag1_publicId = oldData.col1.socialLogo.public_id;
    image1_secureUrl = oldData.col1.socialLogo.url;
  }
  if (file[1]) {
    let fileUri = getDataUri(file[1]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image2_publicId = myCloud.public_id;
    image2_secureUrl = myCloud.secure_url;
  } else {
    image2_publicId = oldData.col2.socialLogo.public_id;
    image2_secureUrl = oldData.col2.socialLogo.url;
  }
  if (file[2]) {
    let fileUri = getDataUri(file[2]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image3_publicId = myCloud.public_id;
    image3_secureUrl = myCloud.secure_url;
  } else {
    image3_publicId = oldData.col3.socialLogo.public_id;
    image3_secureUrl = oldData.col3.socialLogo.url;
  }
  if (file[3]) {
    let fileUri = getDataUri(file[2]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    image4_publicId = myCloud.public_id;
    image4_secureUrl = myCloud.secure_url;
  } else {
    image4_publicId = oldData.col4.socialLogo.public_id;
    image4_secureUrl = oldData.col4.socialLogo.url;
  }
  let socialData = await socialLinkModel.findByIdAndUpdate(
    { _id: "650f6dca885fb31803972f77" },
    {
      col1: {
        socialLogo: {
          public_id: imag1_publicId,
          url: image1_secureUrl,
        },
        socialData: {
          socialName: socialName1,
          socialLink: socialLink1,
        },
      },
      col2: {
        socialLogo: {
          public_id: image2_publicId,
          url: image2_secureUrl,
        },
        socialData: {
          socialName: socialName2,
          socialLink: socialLink2,
        },
      },
      col3: {
        socialLogo: {
          public_id: image3_publicId,
          url: image3_secureUrl,
        },
        socialData: {
          socialName: socialName3,
          socialLink: socialLink3,
        },
      },
      col4: {
        socialLogo: {
          public_id: image4_publicId,
          url: image4_secureUrl,
        },
        socialData: {
          socialName: socialName4,
          socialLink: socialLink4,
        },
      },
    },
    {
      new: true,
    }
  );

  res.status(201).send({
    success: true,
    socialData,
    msg: "Updated successfully",
  });
});
exports.addSocialFeature = catchAsyncErrors(async (req, res, next) => {
  const { featureName } = req.body;
  if (!featureName) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  const file = req.files;
  let oldData = await FooterFeature.findById({
    _id: "650f7349751d734f7bbcce47",
  });
  console.log("file: ", oldData);

  let imag1_publicId;
  let image1_secureUrl;

  if (file[0]) {
    let fileUri = getDataUri(file[0]);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    imag1_publicId = myCloud.public_id;
    image1_secureUrl = myCloud.secure_url;
  } else {
    imag1_publicId = oldData.feature.featureImg.public_id;
    image1_secureUrl = oldData.feature.featureImg.url;
  }

  let socialData = await FooterFeature.findOneAndUpdate(
    {
      _id: "650f7349751d734f7bbcce47",
    },

    {
      feature: {
        featureImg: {
          public_id: imag1_publicId,
          url: image1_secureUrl,
        },
        featureTitle: featureName,
      },
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    socialData,
    msg: "Updated successfully",
  });
});
exports.getSocialLink = catchAsyncErrors(async (req, res, next) => {
  let data = await socialLinkModel.findById({
    _id: "650f6dca885fb31803972f77",
  });
  res.status(200).send({
    success: true,
    data,
  });
});

exports.getSocialFeature = catchAsyncErrors(async (req, res, next) => {
  let data = await FooterFeature.findById({
    _id: "650f7349751d734f7bbcce47",
  });

  res.status(200).send({
    success: true,
    data,
  });
});
