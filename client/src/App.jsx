import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import FilterBar from './components/FilterBar.jsx'
import AiInsights from './components/AiInsights.jsx'
import { apiGet, apiPost, apiPut, apiDelete } from './api.js'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [ai, setAi] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('latest')

  // 🧠 Load tasks (from DB + localStorage)
  useEffect(() => {
    const local = localStorage.getItem('tasks')
    if (local) setTasks(JSON.parse(local))
    load()
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  async function load() {
    try {
      const data = await apiGet('/api/tasks')
      setTasks(data)
    } catch (err) {
      console.error('Error loading tasks:', err)
    }
  }

  async function createTask(payload) {
    const created = await apiPost('/api/tasks', payload)
    setTasks([created, ...tasks])
  }

  async function updateTask(id, patch) {
    const updated = await apiPut('/api/tasks/' + id, patch)
    setTasks(tasks.map(t => (t.id === id ? updated : t)))
  }

  async function deleteTask(id) {
    await apiDelete('/api/tasks/' + id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  // 🤖 AI Suggestion
  async function suggest(payload) {
    try {
      setLoading(true)
      const data = await apiPost('/api/ai/suggest', payload)
      setAi(data)
    } catch (e) {
      alert('AI error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔍 Filtering + Sorting
  const visible = tasks
    .filter(t => filter === 'all' || t.status === filter)
    .sort((a, b) => {
      if (sort === 'priority') {
        const order = { high: 3, medium: 2, low: 1 }
        return order[b.priority] - order[a.priority]
      }
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <div className="container">
      <Header />
      <AiInsights tasks={tasks} />

      <div style={{ marginBottom: 16 }}>
        <FilterBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </div>

      <div className="grid">
        {/* Left: Task form */}
        <TaskForm onCreate={createTask} onSuggest={suggest} />

        {/* Right: AI suggestions */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>AI Suggestions</h3>
          {!ai && <div className="small">No suggestions yet. Use the "AI Suggest" button.</div>}

          {loading && (
            <div className="ai-loader">
              <div className="spinner" /> 🤖 Thinking...
            </div>
          )}

          {ai && (
            <div>
              <div className="small" style={{ marginBottom: 6 }}>
                provider: {ai.provider || 'unknown'}
              </div>
              <ul>
                {(ai.suggestions || []).map((s, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <span className="badge ok" style={{ marginRight: 8 }}>
                      {s.eta_hours}h
                    </span>
                    {s.subtask}
                  </li>
                ))}
              </ul>
              {ai.note && <div className="footer-note">{ai.note}</div>}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <TaskList tasks={visible} onUpdate={updateTask} onDelete={deleteTask} />
      </div>

      <div className="footer-note" style={{ textAlign: 'center', marginTop: 24 }}>
        Made with  by Kirtan Patel · MindPilot v2 (2025)
      </div>
    </div>
  )
}
