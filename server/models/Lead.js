const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "200+"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Demo Scheduled",
        "Closed Won",
        "Closed Lost",
      ],
      default: "New",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
