// Need to update later to add options for POST and DELETE requests
export async function apiFetch<T>(baseUrl: string, endpoint: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${endpoint}`, { headers })
  if (!res.ok) {
    throw new Error(`API Error at endpoint ${endpoint}: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
