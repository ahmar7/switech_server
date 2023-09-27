const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  image1: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  image2: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  image3: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  bannerText: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("BannerSlider", bannerSchema);
