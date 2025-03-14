import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useUsersApi from '../../api/UserApi'
import { toast } from 'react-toastify'

interface User {
  full_name: string
  email: string
}

const UserForm = () => {
  const { id } = useParams<{ id: string }>()
  const { getUserById, updateUserHandler } = useUsersApi()

  const [user, setUser] = useState<User>({ full_name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Charge l'utilisateur via l'ID ou le champ de recherche
  useEffect(() => {
    if (id) {
      loadUserById()
    } else if (searchQuery) {
      loadUserById()
    }

    // Cleanup de la requête si le composant est démonté
    return () => {
      setUser({ full_name: '', email: '' })
      setError(null)
    }
  }, [id, searchQuery])

  // Charge un utilisateur par ID
  const loadUserById = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserById(id!)
      setUser(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  //  Charge un utilisateur par `full_name` ou `email`
  /**
   * 
   * 
   * 
   * 
   * 
   * 
   */ 
  // Soumission du formulaire pour mettre à jour 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user.full_name || !user.email) {
      toast.error('Tous les champs sont requis.')
      return
    }

    setLoading(true)

    try {
      if (id) {
        // Mise à jour de l'utilisateur
        await updateUserHandler(id!, user)
        toast.success('Utilisateur mis à jour avec succès !')
      } else {
        // Création d'un nouvel utilisateur (si aucun `id`)
        await updateUserHandler('', user) // Modifier selon l'API pour création
        toast.success('Utilisateur créé avec succès !')
      }
    } catch (err) {
      setError((err as Error).message)
      toast.error(`Erreur : ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {id ? 'Modifier l\'utilisateur' : 'Rechercher un utilisateur'}
      </h2>

      {loading && <p className="text-blue-500">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">full_name</label>
          <input
            type="text"
            value={user.full_name}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium">Rechercher un utilisateur</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nom complet ou email"
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md bg-blue-500 text-white font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Traitement...' : id ? 'Update User' : 'Seach User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
