import axios from 'axios'

export function getMahasiswa() {
  const baseUrl = import.meta.env.VITE_API_URL
  if (!baseUrl) throw new Error('VITE_API_URL belum diatur')

  return axios.get(`${baseUrl}/api/tugas`).then((response) => response.data)
}
