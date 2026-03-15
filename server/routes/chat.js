const express = require("express");
const router = express.Router();
const ChatLog = require("../models/ChatLog");
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are ClassLink Assistant, the AI support agent for ClassLink — a video conferencing and classroom management platform built for schools and universities.

You help visitors understand:
- Features: Live HD video classes, virtual whiteboards, screen sharing, breakout rooms, attendance tracking, session recording, class scheduling, student/teacher portals, assignments and quizzes
- Pricing: Free plan (up to 40 students, 40-min sessions), Pro plan ($29/month, unlimited students and time, recordings, analytics), Enterprise (custom pricing for districts)
- How it works: Teachers create a class, share a link, students join via browser or app — no downloads required
- Use cases: K-12 schools, universities, tutoring centers, coaching institutes, hybrid learning
- Supported devices: Windows, Mac, Android, iOS, Chromebook

Rules:
- Only answer questions about ClassLink, online education, and classroom technology
- If asked something unrelated say: "I am here to help with ClassLink specifically! Is there anything about our platform I can help you with?"
- Keep responses concise, friendly, and helpful
- Never make up features or pricing not listed above`;

router.post("/message", async (req, res) => {
  const { sessionId, message, visitorEmail, history } = req.body;

  if (!sessionId || !message)
    return res
      .status(400)
      .json({ message: "sessionId and message are required" });

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });

    const botReply = completion.choices[0].message.content;

    // Save to MongoDB
    let chatLog = await ChatLog.findOne({ sessionId });
    if (!chatLog) {
      chatLog = new ChatLog({
        sessionId,
        visitorEmail: visitorEmail || null,
        messages: [],
      });
    }
    chatLog.messages.push({ role: "user", content: message });
    chatLog.messages.push({ role: "assistant", content: botReply });
    if (visitorEmail && !chatLog.visitorEmail) {
      chatLog.visitorEmail = visitorEmail;
    }
    await chatLog.save();

    res.json({ reply: botReply, sessionId });
  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({ message: "AI service error" });
  }
});

module.exports = router;
