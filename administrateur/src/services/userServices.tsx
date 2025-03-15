const API_URL = '/admin/users'

// Récupérer la liste des utilisateurs
export const fetchUsers = async (request: (url: string, options?: any) => Promise<Response>) => {
  const response = await request(API_URL)
  if (!response.ok) {
    throw new Error('Erreur de récupération des utilisateurs')
  }
  return response.json()
}

// Récupérer un utilisateur par ID
export const fetchUserById = async (request: (url: string, options?: any) => Promise<Response>, id: string) => {
  const response = await request(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error(`Erreur de récupération de l'utilisateur avec l'id ${id}`)
  }
  return response.json()
}

// Créer un utilisateur
export const createUser = async (request: (url: string, options?: any) => Promise<Response>, data: any) => {
  return await request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// Mettre à jour un utilisateur
export const updateUser = async (request: (url: string, options?: any) => Promise<Response>, id: string, data: any) => {
  const response = await request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Erreur de mise à jour de l'utilisateur")
  }
  return response.json()
}

// Supprimer un utilisateur
export const deleteUser = async (request: (url: string, options?: any) => Promise<Response>, id: string) => {
  const response = await request(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error("Erreur de suppression de l'utilisateur")
  }
  return response.json()
}
