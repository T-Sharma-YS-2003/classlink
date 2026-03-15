const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        process.env.CLIENT_URL,
        "https://classlink-omega.vercel.app",
        "https://classlink-cd5c5n9wi-t-sharma-ys-2003s-projects.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api/auth',  require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/chat',  require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });