import api from './api';

export async function searchMusics(query) {
  const data = await api.get(`/musics/?q=${encodeURIComponent(query)}`);
  return Array.isArray(data) ? data : [];
}

export async function getMusicRatings(musicId) {
  const data = await api.get(`/musics/${encodeURIComponent(musicId)}/ratings`);
  return Array.isArray(data) ? data : [];
}
