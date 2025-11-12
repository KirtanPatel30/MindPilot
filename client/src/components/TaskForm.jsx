import { useState } from 'react'

export default function TaskForm({ onCreate, onSuggest }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate || null,
      priority
    })
    setTitle(''); setDescription(''); setDueDate(''); setPriority('medium')
  }

  function suggest(e) {
    e.preventDefault()
    onSuggest({ title, description })
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>Add Task</h3>
      <div className="grid">
        <div>
          <label className="small">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Finish 411 HW9"/>
        </div>
        <div>
          <label className="small">Due Date</label>
          <input className="input" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </div>
      </div>
      <div style={{marginTop:10}}>
        <label className="small">Description</label>
        <textarea className="textarea" rows="3" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Add notes or requirements..."/>
      </div>
      <div className="row" style={{marginTop:10}}>
        <div>
          <label className="small">Priority</label>
          <select className="select" value={priority} onChange={e=>setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div style={{display:'flex', gap:10, alignItems:'flex-end', justifyContent:'flex-end'}}>
          <button className="btn secondary" onClick={suggest}>AI Suggest</button>
          <button className="btn" type="submit">Add Task</button>
        </div>
      </div>
      <div className="footer-note">Tip: Click “AI Suggest” to generate subtasks/time estimates for this task.</div>
    </form>
  )
}
