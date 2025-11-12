MindPilot

AI Productivity Assistant 

MindPilot helps students organize tasks and study plans using React, Node.js, and SQLite.
It also includes an optional AI Suggest feature that breaks big tasks into smaller steps using OpenAI.

⚙️ How to Run
1️⃣ Run the Backend
cd server
npm install
cp .env.example .env   # (optional) add your OpenAI key here
npm run dev
open the other terminal and 
2️⃣ Run the Frontend
cd client
npm install
npm run dev


Then open the link shown in your terminal (usually http://localhost:5173).

Features

Add, edit, and delete tasks

Filter by task status and priority

AI suggestions for study planning

Clean and responsive design

Works even without an API key (mock mode)

 Tech Stack

Frontend: React (Vite)

Backend: Node.js + Express

Database: SQLite

Optional AI: OpenAI API
