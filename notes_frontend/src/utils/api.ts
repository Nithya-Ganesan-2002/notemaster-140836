import axios from 'axios';

// PUBLIC_INTERFACE
export const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Token management
const TOKEN_KEY = 'authToken';

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// Axios instance with JWT
export const api = axios.create({
  baseURL: API_URL,
});

// Attach token if exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ---- Auth endpoints ----
export async function register(email: string, password: string) {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
}

export async function login(email: string, password: string) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  const res = await api.post('/auth/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (res.data && res.data.access_token) {
    setToken(res.data.access_token);
  }
  return res.data;
}

export async function logout() {
  removeToken();
}

// Get details about current user
export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data;
}

// ---- Notes endpoints ----
export async function fetchNotes() {
  const res = await api.get('/notes/');
  return res.data;
}

export async function fetchNote(id: number) {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(title: string, content: string) {
  const res = await api.post('/notes/', { title, content });
  return res.data;
}

export async function updateNote(id: number, title: string, content: string) {
  const res = await api.put(`/notes/${id}`, { title, content });
  return res.data;
}

export async function deleteNote(id: number) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
