import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './db.js';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'mindpilot', time: new Date().toISOString() });
});

// --- TASK ROUTES ---

// List tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create task
app.post('/api/tasks', (req, res) => {
  const { title, description, due_date, priority, status } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });

  const stmt = 'INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)';
  db.run(stmt, [title, description || '', due_date || null, priority || 'medium', status || 'todo'], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (e, row) => {
      if (e) return res.status(500).json({ error: e.message });
      res.status(201).json(row);
    });
  });
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, due_date, priority, status } = req.body || {};

  const stmt = `UPDATE tasks
                SET title = COALESCE(?, title),
                    description = COALESCE(?, description),
                    due_date = COALESCE(?, due_date),
                    priority = COALESCE(?, priority),
                    status = COALESCE(?, status)
                WHERE id = ?`;
  db.run(stmt, [title, description, due_date, priority, status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (e, row) => {
      if (e) return res.status(500).json({ error: e.message });
      res.json(row);
    });
  });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes > 0, id });
  });
});

// --- AI SUGGESTIONS ROUTE ---
const openaiKey = process.env.OPENAI_API_KEY || '';

app.post('/api/ai/suggest', async (req, res) => {
  const { title = '', description = '' } = req.body || {};

  // Offline-friendly: return mocked suggestions if no key is set
  if (!openaiKey) {
    return res.json({
      provider: 'mock',
      suggestions: [
        { subtask: 'Break the task into 3–5 smaller steps', eta_hours: 1 },
        { subtask: 'Schedule focused 25 min blocks (Pomodoro)', eta_hours: 0.5 },
        { subtask: 'Write a short checklist and tick items off', eta_hours: 0.25 }
      ],
      note: 'Set OPENAI_API_KEY in server/.env to enable real AI.'
    });
  }

  try {
    const openai = new OpenAI({ apiKey: openaiKey });
    const prompt = `You are an assistant helping a student plan a task. Given a task title and description, suggest 3-5 concrete subtasks and rough time estimates in hours. 
Return JSON like: { "suggestions": [{{"subtask": "...","eta_hours": 1.5}}, ...] }.
Task title: ${title}
Task description: ${description}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You produce short, actionable plans in JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    });

    let text = (completion?.choices?.[0]?.message?.content || '').trim();

    // Try to safely extract JSON
    
  } catch (err) {
    console.error('AI error:', err.message);
    return res.status(500).json({ error: 'AI suggestion failed', detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`MindPilot API running on http://localhost:${PORT}`);
});
