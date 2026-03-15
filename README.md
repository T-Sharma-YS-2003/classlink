# ClassLink — Virtual Classrooms for Schools

A full-stack SaaS web app with a public landing page, AI chatbot,
and admin portal. Built with MERN + Vite + React + Bootstrap.

---

## Test Credentials

| Role        | Email                      | Password   |
|-------------|----------------------------|------------|
| Super Admin | superadmin@classlink.io    | Admin@123  |
| Member      | member@classlink.io        | Member@123 |

Run POST /api/auth/seed once to create these accounts.

---

## Tech Stack

| Layer      | Tech                        | Why                                      |
|------------|-----------------------------|------------------------------------------|
| Frontend   | React 18 + Vite             | Fast dev server, modern bundling         |
| UI         | Bootstrap 5 + Bootstrap Icons | Rapid professional styling             |
| Routing    | React Router v6             | Client-side SPA routing                  |
| Backend    | Node.js + Express           | Lightweight REST APIs                    |
| Database   | MongoDB + Mongoose          | Flexible schema for leads and chat logs  |
| Auth       | JWT + bcryptjs              | Stateless auth with role-based access    |
| AI Chatbot | Groq API (Llama 3.1)        | Free tier, fast, stays on topic          |
| Deploy     | Vercel + Render             | Both free tiers, auto-deploy from GitHub |

---

## Local Setup

### 1. Clone the repo
git clone https://github.com/yourusername/classlink.git
cd classlink

### 2. Setup backend
cd server
npm install
cp .env.example .env
Fill in MONGO_URI and GEMINI_API_KEY in .env
npm run dev

### 3. Seed test users (run once)
In PowerShell:
Invoke-WebRequest -Uri http://localhost:5000/api/auth/seed -Method POST -UseBasicParsing

### 4. Setup frontend
cd ../client
npm install
npm run dev

App runs on http://localhost:5174

---

## Environment Variables

server/.env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/classlink
JWT_SECRET=classlink_super_secret_key_2026
GEMINI_API_KEY=your-gemini-api-key-here
CLIENT_URL=http://localhost:5174

---

## Project Structure

classlink/
├── server/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── ChatLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leads.js
│   │   ├── chat.js
│   │   └── admin.js
│   └── middleware/
│       └── auth.js
└── client/
    └── src/
        ├── context/AuthContext.jsx
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── AdminLogin.jsx
        │   └── admin/
        │       ├── LeadsPage.jsx
        │       ├── ChatLogsPage.jsx
        │       └── TeamPage.jsx
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── Features.jsx
            ├── Pricing.jsx
            ├── Testimonials.jsx
            ├── LeadForm.jsx
            ├── ChatWidget.jsx
            └── AdminSidebar.jsx

---

## Key Technical Decisions

1. Vite over CRA
   Vite starts in under 300ms. The proxy config forwards /api
   requests to Express so there are zero CORS issues in development.

2. JWT stateless auth with role-based middleware
   Tokens stored in localStorage, sent as Authorization Bearer headers.
   protect middleware verifies on every request. superAdminOnly runs
   after to enforce role restrictions.

3. Gemini API for the chatbot
   Free tier with no credit card required. The system prompt tightly
   scopes the bot to ClassLink topics only and gracefully redirects
   off-topic questions.

---
