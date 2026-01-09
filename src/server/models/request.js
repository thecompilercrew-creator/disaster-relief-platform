const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    helpType: String,
    urgency: String,
    description: String,
    status: { type: String, default: "open" },

    displayData: {
      name: String,
      address: String,
      phone: String,
      email: String
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
