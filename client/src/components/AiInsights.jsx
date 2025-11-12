export default function AiInsights({ tasks }) {
  const total = tasks.length
  if (!total) return null

  const done = tasks.filter(t => t.status === 'done').length
  const inprog = tasks.filter(t => t.status === 'in-progress').length
  const high = tasks.filter(t => t.priority === 'high').length

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>Task Summary</h3>
      <div className="small">Total: {total}</div>
      <div className="small">Done: {done} • In Progress: {inprog}</div>
      <div className="small">High Priority: {high}</div>
    </div>
  )
}
