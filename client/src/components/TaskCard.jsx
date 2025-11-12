export default function TaskCard({ task, onUpdate, onDelete }) {
  function setStatus(status) {
    onUpdate(task.id, { status })
  }
  return (
    <div className="card" style={{display:'grid', gap:6}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{task.title}</strong>
        <div>
          <span className={"badge " + (task.status==='done'?'done':task.status==='in-progress'?'prog':'todo')}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="small">{task.description || '—'}</div>
      <div className="small">
        {task.due_date ? `Due: ${task.due_date}` : 'No due date'} • Priority: {task.priority}
      </div>
      <div style={{display:'flex', gap:8, marginTop:6}}>
        <button className="btn secondary" onClick={()=>setStatus('todo')}>To‑Do</button>
        <button className="btn secondary" onClick={()=>setStatus('in-progress')}>In‑Progress</button>
        <button className="btn" onClick={()=>setStatus('done')}>Done</button>
        <button className="btn danger" onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}
