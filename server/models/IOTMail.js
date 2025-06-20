const mongoose = require("mongoose");
const IOTMailSchema = new mongoose.Schema({
  iotid: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});
module.exports = mongoose.model("IOTMail", IOTMailSchema);
