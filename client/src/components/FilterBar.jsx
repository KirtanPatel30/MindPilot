export default function FilterBar({ filter, setFilter, sort, setSort }) {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <select className="select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="todo">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select className="select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  )
}
