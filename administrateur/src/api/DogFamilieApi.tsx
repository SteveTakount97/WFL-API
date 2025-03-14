import useFetch from "../hooks/UseFetch";

// API URL pour les familles de chiens
const API_URL = '/api/admin/dog-families';

export const dogFamilyApi = {
  getAllDogFamilies: async () => {
    const { request } = useFetch();
    return await request(API_URL);
  },

  getDogFamilyById: async (id: string) => {
    const { request } = useFetch();
    return await request(`${API_URL}/${id}`);
  },

  createDogFamily: async (data: { name: string; description: string }) => {
    const { request } = useFetch();
    return await request(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateDogFamily: async (id: string, data: { name: string; description: string }) => {
    const { request } = useFetch();
    return await request(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteDogFamily: async (id: string) => {
    const { request } = useFetch();
    return await request(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};
