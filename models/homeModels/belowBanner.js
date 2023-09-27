const mongoose = require("mongoose");
const belowBannerSchema = new mongoose.Schema({
  banner1: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  banner2: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("belowBannerSlider", belowBannerSchema);
