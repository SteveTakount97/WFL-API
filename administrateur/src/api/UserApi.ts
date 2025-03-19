import { useState } from "react"
import { fetchUsersApi, fetchUserByIdApi, createUserApi, updateUserApi, deleteUserApi } from '../services/userServices'

export const useUserApi = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer la liste des utilisateurs
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsersApi()
      return data
    } catch (err: any) {
      setError('Erreur lors de la récupération des utilisateurs')
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Récupérer un utilisateur par ID
  const fetchUserById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUserByIdApi(id)
      return data
    } catch (err: any) {
      setError(`Erreur lors de la récupération de l'utilisateur avec l'id ${id}`)
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Créer un utilisateur
  const createUser = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await createUserApi()
      return res
    } catch (err: any) {
      setError('Erreur lors de la création de l\'utilisateur')
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Mettre à jour un utilisateur
  const updateUser = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await updateUserApi(id)
      return res
    } catch (err: any) {
      setError('Erreur lors de la mise à jour de l\'utilisateur')
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Supprimer un utilisateur
  const deleteUser = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await deleteUserApi(id)
      return res
    } catch (err: any) {
      setError('Erreur lors de la suppression de l\'utilisateur')
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { fetchUsers, fetchUserById, createUser, updateUser, deleteUser, loading, error }
}
