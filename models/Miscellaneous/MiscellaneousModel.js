const mongoose = require("mongoose");
const miscModel = new mongoose.Schema({
  banner: {
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

module.exports = mongoose.model("miscBanner", miscModel);
