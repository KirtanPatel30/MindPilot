// Simple client-side API helper
export async function apiGet(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, data) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPut(path, data) {
  const res = await fetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiDelete(path) {
  const res = await fetch(path, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
