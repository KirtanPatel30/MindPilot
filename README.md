# MindPilot — AI Productivity Assistant (Student Edition)

A polished **student-friendly** full-stack project using **React + Node.js (Express) + SQLite** with optional **AI suggestions** (OpenAI).
Perfect for resumes and FAANG-style interviews: clean architecture, deployable, and easy to demo.

## ✨ Features
- Create, read, update, delete tasks (title, description, due date, priority, status).
- AI endpoint to **suggest subtasks & estimated time** (uses OpenAI if key is provided, else **mock data**).
- SQLite database with auto-initialization.
- Polished but simple UI with cards and a responsive layout.
- Clear project structure and comments to look like well-written student code.

## 🗂 Project Structure
```
mindpilot/
  server/                # Express API + SQLite
    index.js             # main server, routes
    db.js                # SQLite connection + init
    schema.sql           # database schema
    package.json
    .env.example
  client/                # React (Vite)
    index.html
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      api.js
      styles.css
      components/
        Header.jsx
        TaskForm.jsx
        TaskList.jsx
        TaskCard.jsx
  README.md
```

## 🚀 Quick Start

### 1) Backend (Node + Express + SQLite)
```bash
cd server
npm install
# copy env template and (optionally) add your OpenAI API key
cp .env.example .env
# (optional) edit .env to set OPENAI_API_KEY=sk-...

npm run dev   # starts server at http://localhost:5000
```

### 2) Frontend (React + Vite)
```bash
cd ../client
npm install
npm run dev   # starts Vite dev server; open the printed URL
```

> The front-end is configured with a **proxy to http://localhost:5000** for API calls during development.

## 🔐 Environment Variables
`server/.env`:
```
PORT=5000
DATABASE_URL=./mindpilot.db
OPENAI_API_KEY=
```

- If `OPENAI_API_KEY` is empty, AI suggestions will return **mocked** suggestions so the app still runs perfectly offline.

## 🧪 API Overview (selected)
- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task
- `POST /api/ai/suggest` — AI suggestions for a given task payload

## 📝 Notes for Your Resume
- Built a full-stack productivity app with React & Express, persisting data to SQLite.
- Implemented AI-assisted task planning via OpenAI with secure env-based keys; added mock fallback to support offline dev.
- Wrote RESTful APIs, client hooks, and a polished student UI; container-ready and simple to deploy.

Good luck and have fun with MindPilot! 🎯
