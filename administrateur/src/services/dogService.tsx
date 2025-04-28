const API_URL = '/admin/dogs';
import api from "../axiosIntance/IntercepteurToken";

// Fonction pour gérer les appels GET
const fetchData = async (url: string) => {
  try {
    const response = await api.get(url);
    if (response.status !== 200) throw new Error(`Erreur: ${response.status}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error}`);
  }
};

// Fonctio pour gérer les appels POST/PUT
const postData = async (url: string, data: any, method: 'POST' | 'PUT') => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) throw new Error(`Erreur: ${response.status}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la ${method === 'POST' ? 'création' : 'mise à jour'} du chien: ${error}`);
  }
};

// Fonction pour récupérer tous les chiens
export const getAllDogs = async () => {
  return await fetchData(API_URL);
};

// Fonction pour récupérer un chien par son ID
export const getDogById = async (id: string) => {
  return await fetchData(`${API_URL}/${id}`);
};

// Fonction pour créer un chien
export const createDog = async (dogData: { name: string; breed: string; age: number }) => {
  return await postData(API_URL, dogData, 'POST');
};

// Fonction pour mettre à jour un chien
export const updateDog = async (
  id: string,
  dogData: { name: string; breed: string; age: number }
) => {
  return await postData(`${API_URL}/${id}`, dogData, 'PUT');
};

// Fonction pour supprimer un chien
export const deleteDog = async (id: string) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    if (response.status !== 200)throw new Error(`Erreur: ${response.status}`);
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du chien avec l'ID ${id}: ${error}`);
  }
};
