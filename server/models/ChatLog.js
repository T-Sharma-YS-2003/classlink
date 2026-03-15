const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatLogSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    visitorEmail: { type: String, default: null },
    messages: [messageSchema],
    linkedLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ChatLog", chatLogSchema);
