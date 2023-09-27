const mongoose = require("mongoose");
const landModel = new mongoose.Schema({
  banner: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("landBanner", landModel);
