const mongoose = require("mongoose");
const validator = require("validator");
const headerSchema = new mongoose.Schema({
  logo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  consultImg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your phone number"],

    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  availabilityFrom: {
    type: String,
    required: true,
  },
  availabilityTo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Header", headerSchema);
