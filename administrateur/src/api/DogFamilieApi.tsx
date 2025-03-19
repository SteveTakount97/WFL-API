import api from "../axiosIntance/IntercepteurToken";

//Interface DogFamily
export interface DogFamily {
  id?: string;
  name: string;
  description: string;
}

// URL de base pour l'API
const API_URL = '/api/admin/dog-families';

// Fonction utilitaire pour gérer les erreurs
const handleApiError = (error: unknown, message: string) => {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`);
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(message);
};


export const dogFamilyApi = {
  // 🐶 Récupérer toutes les familles de chiens
  getAllDogFamilies: async (): Promise<DogFamily[]> => {
    try {
      const response = await api.get<DogFamily[]>(API_URL);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la récupération des familles de chiens');
      return []; // 🔥 Retourne un tableau vide par défaut pour éviter undefined
    }
  },

  // Récupérer une famille de chiens par ID
  getDogFamilyById: async (id: string): Promise<DogFamily> => {
    try {
      const response = await api.get<DogFamily>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors de la récupération de la famille de chiens avec l'ID ${id}`);
      throw error;
    }
  },

  //Créer une nouvelle famille de chiens
  createDogFamily: async (data: DogFamily): Promise<DogFamily> => {
    try {
      const response = await api.post<DogFamily>(API_URL, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la création de la famille de chiens');
      throw error;
    }
  },

  //Mettre à jour une famille de chiens
  updateDogFamily: async (id: string, data: DogFamily): Promise<DogFamily> => {
    try {
      const response = await api.put<DogFamily>(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors de la mise à jour de la famille de chiens avec l'ID ${id}`);
      throw error;
    }
  },

  // Supprimer une famille de chiens
  deleteDogFamily: async (id: string): Promise<void> => {
    try {
      await api.delete(`${API_URL}/${id}`);
    } catch (error) {
      handleApiError(error, `Erreur lors de la suppression de la famille de chiens avec l'ID ${id}`);
      throw error;
    }
  },
};

export default dogFamilyApi;