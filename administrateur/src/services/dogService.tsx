const API_URL = '/admin/dogs'

export const getAllDogs = async (request: (url: string, options?: RequestInit) => Promise<Response>) => {
  const response = await request(API_URL);
  if (!response.ok) throw new Error('Erreur lors de la récupération des chiens');
  return await response.json();
};

export const getDogById = async (request: (url: string, options?: RequestInit) => Promise<Response>, id: string) => {
  const response = await request(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`Erreur lors de la récupération du chien avec l'ID ${id}`);
  return await response.json();
};

export const createDog = async (
  request: (url: string, options?: RequestInit) => Promise<Response>,
  dogData: { name: string; breed: string; age: number }
) => {
  const response = await request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'token': 'bear' },
    body: JSON.stringify(dogData),
  });
  if (!response.ok) throw new Error('Erreur lors de la création du chien');
  return await response.json();
};

export const updateDog = async (
  request: (url: string, options?: RequestInit) => Promise<Response>,
  id: string,
  dogData: { name: string; breed: string; age: number }
) => {
  const response = await request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dogData),
  });
  if (!response.ok) throw new Error(`Erreur lors de la mise à jour du chien avec l'ID ${id}`);
  return await response.json();
};

export const deleteDog = async (request: (url: string, options?: RequestInit) => Promise<Response>, id: string) => {
  const response = await request(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Erreur lors de la suppression du chien avec l'ID ${id}`);
};
