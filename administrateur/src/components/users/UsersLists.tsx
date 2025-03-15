import { useEffect } from 'react'
import useUsersApi from '../../api/UserApi'




const UserList = () => {
  const { users, loading, error, deleteUserHandler } = useUsersApi()  // ✅ On utilise useUsersApi()

  useEffect(() => {
    // ✅ Plus besoin d'appeler fetchUsers ici, il est déjà géré dans useUsersApi
  }, [])

  // Suppression directe dans l'état local après suppression API
  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous supprimer cet utilisateur ?')) {
      try {
        await deleteUserHandler(id)  // ✅ On passe par useUsersApi
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error)
      }
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur : {error}</p>}
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
          {users.length === 0 && !loading && (
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