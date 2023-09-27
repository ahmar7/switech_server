let homeAboutModel = require("../../models/homeModels/AboutModel");

const errorHandler = require("../../utils/errorHandler");

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const apiFeatures = require("../../utils/apiFeatures");

// exports.addAbout = catchAsyncErrors(async (req, res, next) => {
//   // req.body
//   const { heading, description } = req.body;
//   console.log(description);
//   console.log("req.body: ", req.body);

//   // console.log("_id: ", id);

//   //   let mo = await homeAboutModel.findById({ _id: id });
//   let update = await homeAboutModel.create({
//     heading: heading,
//     description: description,
//   });
//   console.log(update);

//   res.status(201).send({
//     success: true,
//     msg: "Updated successfully",
//   });
// });
exports.updateAbout = catchAsyncErrors(async (req, res, next) => {
  // req.body
  const { user } = req.body;
  //   console.log("req.body: ", req.body.description);

  // console.log("_id: ", id);

  //   let mo = await homeAboutModel.findById({ _id: id });

  let update = await homeAboutModel.findByIdAndUpdate(
    { _id: "650f5d0e1627c3f97571a129" },
    {
      heading: user.heading,
      paragraph: user.paragraph,
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    msg: "Updated successfully",
    update,
  });
});
exports.getHomeAbout = catchAsyncErrors(async (req, res, next) => {
  let About = await homeAboutModel.findById({
    _id: "650f5d0e1627c3f97571a129",
  });

  res.status(200).send({
    success: true,
    About,
  });
});
