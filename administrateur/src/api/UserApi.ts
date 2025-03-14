import { useState, useEffect } from 'react'
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser } from '../services/userServices'

const useUsersApi = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getUserById = async (id: string) => {
    try {
      return await fetchUserById(id)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const createUserHandler = async (data: any) => {
    try {
      await createUser(data)
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const updateUserHandler = async (id: string, data: any) => {
    try {
      await updateUser(id, data)
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const deleteUserHandler = async (id: string) => {
    try {
      await deleteUser(id)
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }
 
  return { users, loading, error, getUserById, createUserHandler, updateUserHandler, deleteUserHandler }
}

export default useUsersApi
