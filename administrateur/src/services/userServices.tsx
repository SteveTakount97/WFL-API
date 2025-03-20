import api from "../axiosIntance/IntercepteurToken"

const API_URL = '/admin/users'

// Fonction pour récupérer tous les utilisateurs
export const fetchUsersApi = async () => {
  try {
    const { data } = await api(API_URL)
    return data
  } catch (err: any) {
    throw new Error('Erreur lors de la récupération des utilisateurs')
  }
}

//Fonction me
export const getMeFromApi = async () => {
  try {
    const response = await api.get('auth/me');
    console.log('Données utilisateur récupérées depuis l’API :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis l’API :', error);
    throw error;
  }
};

// Fonction pour récupérer un utilisateur par ID
export const fetchUserByIdApi = async (id: string) => {
  try {
    const { data } = await api(`${API_URL}/${id}`)
    return data
  } catch (err: any) {
    throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'id ${id}`)
  }
}

// Fonction pour créer un utilisateur
export const createUserApi = async () => {
  try {
    const res = await api(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      
    })
    return res.data
  } catch (err: any) {
    throw new Error('Erreur lors de la création de l\'utilisateur')
  }
}

// Fonction pour mettre à jour un utilisateur
export const updateUserApi = async (id: string) => {
  try {
    const res = await api(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    return res.data
  } catch (err: any) {
    throw new Error('Erreur lors de la mise à jour de l\'utilisateur')
  }
}

// Fonction pour supprimer un utilisateur
export const deleteUserApi = async (id: string) => {
  try {
    const res = await api(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    return res.data
  } catch (err: any) {
    throw new Error('Erreur lors de la suppression de l\'utilisateur')
  }
}

