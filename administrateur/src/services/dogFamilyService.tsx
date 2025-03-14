// services/dogFamilyService.ts
import useFetch from "../hooks/UseFetch";

const API_URL = '/api/admin/dog-families';

// Récupérer toutes les familles de chiens
export const getAllDogFamilies = async () => {
  const { request } = useFetch();
  const response = await request(API_URL);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des familles de chiens');
  }
  return await response.json();
};

// Récupérer une famille de chiens par son ID
export const getDogFamilyById = async (id: string) => {
  const { request } = useFetch();
  const response = await request(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la famille de chiens avec l'ID ${id}`);
  }
  return await response.json();
};

// Créer une nouvelle famille de chiens
export const createDogFamily = async (dogFamilyData: { name: string; description: string }) => {
  const { request } = useFetch();
  const response = await request(API_URL, {
    method: 'POST',
    body: JSON.stringify(dogFamilyData),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création de la famille de chiens');
  }
  return await response.json();
};

// Mettre à jour une famille de chiens
export const updateDogFamily = async (id: string, dogFamilyData: { name: string; description: string }) => {
  const { request } = useFetch();
  const response = await request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dogFamilyData),
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour de la famille de chiens avec l'ID ${id}`);
  }
  return await response.json();
};

// Supprimer une famille de chiens
export const deleteDogFamily = async (id: string) => {
  const { request } = useFetch();
  const response = await request(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression de la famille de chiens avec l'ID ${id}`);
  }
};
