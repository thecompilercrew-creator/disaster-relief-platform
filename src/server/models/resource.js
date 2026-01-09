const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    type: String,
    quantity: Number,
    location: String,
    description: String,
    expirationDate: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
