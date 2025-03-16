import { useState, useEffect } from 'react'
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser } from '../services/userServices'
import useFetch from '../hooks/UseFetch'

const useUsersApi = () => {
  const { request } = useFetch()  
  console.log('Request function:', request);

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
      const data = await fetchUsers(request)  
      setUsers(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getUserById = async (id: string) => {
    try {
      return await fetchUserById(request, id)  // 👈 On passe request ici
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const createUserHandler = async (data: any) => {
    try {
      await createUser(request, data)  // 👈 On passe request ici
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const updateUserHandler = async (id: string, data: any) => {
    try {
      await updateUser(request, id, data)  // 👈 On passe request ici
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const deleteUserHandler = async (id: string) => {
    try {
      await deleteUser(request, id)  // 👈 On passe request ici
      loadUsers()
    } catch (err) {
      setError((err as Error).message)
    }
  }
 
  return { users, loading, error, getUserById, createUserHandler, updateUserHandler, deleteUserHandler }
}

export default useUsersApi
