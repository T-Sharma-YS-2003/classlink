const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/seed — run once to create test accounts
router.post("/seed", async (req, res) => {
  try {
    await User.deleteMany({
      email: { $in: ["superadmin@classlink.io", "member@classlink.io"] },
    });
    await User.create([
      {
        name: "Super Admin",
        email: "superadmin@classlink.io",
        password: "Admin@123",
        role: "super_admin",
      },
      {
        name: "Team Member",
        email: "member@classlink.io",
        password: "Member@123",
        role: "member",
      },
    ]);
    res.json({ message: "Test users seeded successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
