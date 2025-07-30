
import { API_ENDPOINTS, AUTH_STORAGE_KEYS } from '../constants';


const BASE_URL = API_ENDPOINTS.BASE_URL;

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  if (!res.ok) {
    let error;
    try {
      const data = await res.json();
      error = data.error || res.statusText;
    } catch {
      error = res.statusText;
    }
    throw new Error(error);
  }
  if (res.status === 204) return null;
  return res.json();
}

export default {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
