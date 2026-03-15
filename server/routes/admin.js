const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const ChatLog = require("../models/ChatLog");
const User = require("../models/User");
const { protect, superAdminOnly } = require("../middleware/auth");

router.use(protect);

// GET /api/admin/leads
router.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/admin/leads/:id/status — super_admin only
router.patch("/leads/:id/status", superAdminOnly, async (req, res) => {
  const validStatuses = [
    "New",
    "Contacted",
    "Qualified",
    "Demo Scheduled",
    "Closed Won",
    "Closed Lost",
  ];
  if (!validStatuses.includes(req.body.status))
    return res.status(400).json({ message: "Invalid status value" });
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/chatlogs
router.get("/chatlogs", async (req, res) => {
  try {
    const logs = await ChatLog.find()
      .populate("linkedLead", "fullName email status")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/chatlogs/:id
router.get("/chatlogs/:id", async (req, res) => {
  try {
    const log = await ChatLog.findById(req.params.id).populate(
      "linkedLead",
      "fullName email status",
    );
    if (!log) return res.status(404).json({ message: "Chat log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/team — super_admin only
router.get("/team", superAdminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/team — super_admin only
router.post("/team", superAdminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email, and password required" });
  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });
    const user = await User.create({
      name,
      email,
      password,
      role: role || "member",
    });
    res
      .status(201)
      .json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/team/:id — super_admin only
router.delete("/team/:id", superAdminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ message: "You can't delete yourself" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
