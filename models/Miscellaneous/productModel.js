const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  image: {
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

module.exports = mongoose.model("miscProducts", productModel);
