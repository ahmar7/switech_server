const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema({
  information: [
    {
      heading: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  why: {
    heading: {
      type: String,
      required: true,
    },
    lists: [
      {
        list: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

let ProductModel = mongoose.model("information", informationSchema);

module.exports = ProductModel;
