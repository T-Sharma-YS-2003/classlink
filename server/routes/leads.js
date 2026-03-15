const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const ChatLog = require("../models/ChatLog");

// POST /api/leads — public form submission
router.post("/", async (req, res) => {
  const { fullName, email, companyName, phone, message, companySize } =
    req.body;

  if (!fullName || !email || !companyName || !phone || !message || !companySize)
    return res.status(400).json({ message: "All fields are required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email format" });

  try {
    const lead = await Lead.create({
      fullName,
      email,
      companyName,
      phone,
      message,
      companySize,
    });

    // Auto-link any chat logs with the same email
    await ChatLog.updateMany({ visitorEmail: email }, { linkedLead: lead._id });

    res
      .status(201)
      .json({ message: "Thank you! We will be in touch shortly.", lead });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
