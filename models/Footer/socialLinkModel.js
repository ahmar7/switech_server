const mongoose = require("mongoose");
const socialLink = new mongoose.Schema({
  col1: {
    socialLogo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    socialData: {
      socialName: {
        type: String,
        required: true,
      },
      socialLink: {
        type: String,
        required: true,
      },
    },
  },
  col2: {
    socialLogo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    socialData: {
      socialName: {
        type: String,
        required: true,
      },
      socialLink: {
        type: String,
        required: true,
      },
    },
  },
  col3: {
    socialLogo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    socialData: {
      socialName: {
        type: String,
        required: true,
      },
      socialLink: {
        type: String,
        required: true,
      },
    },
  },
  col4: {
    socialLogo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    socialData: {
      socialName: {
        type: String,
        required: true,
      },
      socialLink: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("socialDta", socialLink);
