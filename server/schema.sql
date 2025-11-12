
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  priority TEXT DEFAULT 'medium', -- low | medium | high
  status TEXT DEFAULT 'todo',     -- todo | in-progress | done
  created_at TEXT DEFAULT (datetime('now'))
);
