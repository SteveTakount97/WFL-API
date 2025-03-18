import useFetch from "../hooks/UseFetch"

export const useUsersApi = () => {
  const { request, loading, error } = useFetch()

  const getUserById = async (id: string) => {
    try {
      const data = await request(`/users/${id}`, { method: 'GET' })
      return data
    } catch (err) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur')
    }
  }

  const updateUserHandler = async (id: string, user: { full_name: string, email: string }) => {
    try {
      const method = id ? 'PUT' : 'POST'
      const url = id ? `/users/${id}` : '/users'
      const data = await request(url, {
        method,
        body: JSON.stringify(user),
      })
      return data
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour ou création de l\'utilisateur')
    }
  }

  const searchUserHandler = async (query: string) => {
    try {
      const data = await request(`/users/search?query=${query}`, { method: 'GET' })
      return data
    } catch (err) {
      throw new Error('Erreur lors de la recherche de l\'utilisateur')
    }
  }

  return { getUserById, updateUserHandler, searchUserHandler, loading, error }
}
