import useFetch from "../hooks/UseFetch"

const API_URL = '/admin/users'

export const useUserService = () => {
  const { request, loading, error } = useFetch()

  // Récupérer la liste des utilisateurs
  const fetchUsers = async () => {
    try {
      const data = await request(API_URL)
      return data
    } catch (err) {
      throw new Error('Erreur lors de la récupération des utilisateurs')
    }
  }

  // Récupérer un utilisateur par ID
  const fetchUserById = async (id: string) => {
    try {
      const data = await request(`${API_URL}/${id}`)
      return data
    } catch (err) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'id ${id}`)
    }
  }

  // Créer un utilisateur
  const createUser = async (data: any) => {
    try {
      const res = await request(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res
    } catch (err) {
      throw new Error('Erreur lors de la création de l\'utilisateur')
    }
  }

  // Mettre à jour un utilisateur
  const updateUser = async (id: string, data: any) => {
    try {
      const res = await request(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour de l\'utilisateur')
    }
  }

  // Supprimer un utilisateur
  const deleteUser = async (id: string) => {
    try {
      const res = await request(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      return res
    } catch (err) {
      throw new Error('Erreur lors de la suppression de l\'utilisateur')
    }
  }

  return { fetchUsers, fetchUserById, createUser, updateUser, deleteUser, loading, error }
}
