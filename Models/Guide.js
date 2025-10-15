const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    // avatarURL: { type: String },
    emailID: {
      type: String,
      required: true,
      unique: true
    },
    dept: {
      type: String,
      required: true,
    },
    freeSlots: {
      type: String,
      required: true,
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guide", userSchema);