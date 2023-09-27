const mongoose = require("mongoose");
const socialFeature = new mongoose.Schema({
  feature: {
    featureImg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    featureTitle: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("socialFeature", socialFeature);
