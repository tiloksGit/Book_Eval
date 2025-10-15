const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    emailID: {
      type: String,
      required: true,
      unique: true
    },
    dept: {
      type: String,
      required: true,
    },
    panel_number: {
      type: Number,
      required: true
    },
    freeSlots: {
      type: String,
      required: false,
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guide", guideSchema);