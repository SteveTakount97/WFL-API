import { useEffect, useState } from 'react'
import { fetchUsers, deleteUser } from '../../services/userServices'


interface User {
  id: string
  full_name: string
  email: string
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    loadUsers()
  }, [])

  // Gestion des erreurs 
  const loadUsers = async () => {
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
    }
  }

  // Suppression directe dans l'état local après suppression API
  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous supprimer cet utilisateur ?')) {
      try {
        await deleteUser(id)
        // Supprime l'utilisateur directement dans l'état local
        setUsers((prev) => prev.filter((user) => user.id !== id))
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error)
      }
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
          <th className="border p-2">ID User</th>
            <th className="border p-2">Nom complet</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.full_name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition duration-200"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="border p-2 text-center text-gray-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
