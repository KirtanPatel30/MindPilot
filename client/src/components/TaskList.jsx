import TaskCard from './TaskCard.jsx'

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <div className="card">No tasks yet. Add one above!</div>
  return (
    <div className="list">
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
