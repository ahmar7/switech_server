let ImprintModel = require("../models/imprintModel");

const errorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");

exports.addInformation = catchAsyncErrors(async (req, res, next) => {
  // req.body
  const { information } = req.body;

  let data = await ImprintModel.create({
    information,
  });
  console.log(data);

  res.status(201).send({
    success: true,
    data,
    msg: "Updated successfully",
  });
});
exports.updateInformation = catchAsyncErrors(async (req, res, next) => {
  // req.body
  const { val, why, newHeading } = req.body;
  console.log(" req.body: ", req.body);
  let update = await ImprintModel.findByIdAndUpdate(
    { _id: "6510c8f14e6a7b248d00f5a5" },
    {
      information: val,
      why: {
        heading: newHeading,
        lists: why,
      },
    },
    { new: true }
  );

  res.status(201).send({
    success: true,
    msg: "Updated successfully",
    update,
  });
});
exports.getInformation = catchAsyncErrors(async (req, res, next) => {
  let data = await ImprintModel.findById({
    _id: "6510c8f14e6a7b248d00f5a5",
  });

  res.status(200).send({
    success: true,
    data,
  });
});
