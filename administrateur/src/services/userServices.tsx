//recupération des données des utilisateurs
import useFetch from "../hooks/UseFetch"
const API_URL = '/api/admin/users'

export const fetchUsers = async () => {
  const { request } = useFetch()
  const response = await request(API_URL)
  if (!response.ok) {
    throw new Error('Erreur de récupération des utilisateurs')
  }
  return response.json()
}

export const fetchUserById = async (id: string) => {
  const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error(`Erreur de récupération de l'utilisateur avec l'id ${id}`)
  }
  return response.json()
}

export const updateUser = async (id: string, data: any) => {
  const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erreur de mise à jour de l\'utilisateur')
  }
  return response.json()
}
export const createUser = async (data: any) => {
  const { request } = useFetch()
  return await request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
export const deleteUser = async (id: string) => {
  const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erreur de suppression de l\'utilisateur')
  }
  return response.json()
}