import useFetch from "../hooks/UseFetch";
const API_URL = '/api/admin/dogs'

export const getAllDogs = async () => {
    
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des chiens');
  }
  return await response.json();
};

export const getDogById = async (id: string) => {
    const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du chien avec l'ID ${id}`);
  }
  return await response.json();
};

export const createDog = async (dogData: { name: string; breed: string; age: number }) => {
    const { request } = useFetch()
  const response = await request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token' : 'bear',
    },
    body: JSON.stringify(dogData),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création du chien');
  }
  return await response.json();
};

export const updateDog = async (id: string, dogData: { name: string; breed: string; age: number }) => {
    const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogData),
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour du chien avec l'ID ${id}`);
  }
  return await response.json();
};

export const deleteDog = async (id: string) => {
  const { request } = useFetch()
  const response = await request(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression du chien avec l'ID ${id}`);
  }
};
