import { useState } from 'react';
import { useUserApi } from '../../api/userApi';

const UserList = () => {
  const { fetchUsers, loading, error } = useUserApi();
  const [users, setUsers] = useState<any[]>([]);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  };

  return (
    <div>
      <button
        onClick={loadUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
      >
        Charger les utilisateurs
      </button>
      {loading && <p>Chargement des utilisateurs...</p>}
      {error && <p>Erreur: {error}</p>}
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