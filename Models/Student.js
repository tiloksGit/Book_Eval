
const mongoose = require("mongoose");
// const  Guide = require("./Guide");

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
    emailID: {
      type: String,
      required: true,
      unique: true
    },
    dept: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    Guide : {
        emailId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Guide",
        },
        required: true
      },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", userSchema);
