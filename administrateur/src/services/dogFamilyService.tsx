// services/dogFamilyService.ts

import api from "../axiosIntance/IntercepteurToken";

// Définition du type DogFamily
export interface DogFamily {
  id?: string;
  name: string;
  description: string;
}

// Fonction utilitaire pour gérer les erreurs
const handleApiError = (error: unknown, message: string) => {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`);
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(message);
};

// Récupérer toutes les familles de chiens
export const getAllDogFamilies = async (): Promise<DogFamily[]> => {
  try {
    const { data } = await api.get<DogFamily[]>(`/admin/dog-families`);
    return data;
  } catch (error) {
    handleApiError(error, 'Erreur lors de la récupération des familles de chiens');
    return []; // 🔥 Retour d'une valeur par défaut pour éviter undefined
  }
};

// Récupérer une famille de chiens par son ID
export const getDogFamilyById = async (id: string): Promise<DogFamily> => {
  try {
    const { data } = await api.get<DogFamily>(`/admin/dog-families/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, `Erreur lors de la récupération de la famille de chiens avec l'ID ${id}`);
    throw error; // 🚀 Propage l'erreur pour la gérer côté appelant
  }
};

// Créer une nouvelle famille de chiens
export const createDogFamily = async (dogFamilyData: DogFamily): Promise<DogFamily> => {
  try {
    const { data } = await api.post<DogFamily>(`/admin/dog-families`, dogFamilyData);
    return data;
  } catch (error) {
    handleApiError(error, 'Erreur lors de la création de la famille de chiens');
    throw error;
  }
};

// Mettre à jour une famille de chiens
export const updateDogFamily = async (id: string, dogFamilyData: DogFamily): Promise<DogFamily> => {
  try {
    const { data } = await api.put<DogFamily>(`/admin/dog-families/${id}`, dogFamilyData);
    return data;
  } catch (error) {
    handleApiError(error, `Erreur lors de la mise à jour de la famille de chiens avec l'ID ${id}`);
    throw error;
  }
};

// Supprimer une famille de chiens
export const deleteDogFamily = async (id: string): Promise<void> => {
  try {
    await api.delete(`/admin/dog-families/${id}`);
  } catch (error) {
    handleApiError(error, `Erreur lors de la suppression de la famille de chiens avec l'ID ${id}`);
    throw error;
  }
};
