const mongoose = require("mongoose");
const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },

  paragraph: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("homeAbout", aboutSchema);
