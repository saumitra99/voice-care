const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    isSeen: { type: Number, required: true },
    //   timeStamp: { type: Date, required: true },
    json: { type: Object, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("messages", MessageSchema);
