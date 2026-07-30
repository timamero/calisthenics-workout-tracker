type Method = 'GET' | 'POST' | 'DELETE';

// Need to update later to add options for POST and DELETE requests
export async function apiFetch<T>(
  baseUrl: string,
  endpoint: string,
  method?: Method,
  token?: string,
  body?: BodyInit,
): Promise<T> {
  if (!method) {
    method = 'GET';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${endpoint}`, { method, headers, body });
  if (!res.ok) {
    throw new Error(
      `API Error at endpoint ${endpoint}: ${res.status} ${res.statusText}`,
    );
  }
  return res.json() as Promise<T>;
}
