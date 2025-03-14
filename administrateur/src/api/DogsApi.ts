import { getAllDogs, getDogById, createDog, updateDog, deleteDog } from "../services/dogService";

export const dogServiceLayer = {
  // Appelle la fonction pour obtenir tous les chiens
  getAllDogs: async () => {
    try {
      return await getAllDogs();
    } catch (error) {
      console.error("Erreur dans dogServiceLayer - getAllDogs:", error);
      throw error; // Propager l'erreur
    }
  },

  // Appelle la fonction pour obtenir un chien par son ID
  getDogById: async (id: string) => {
    try {
      return await getDogById(id);
    } catch (error) {
      console.error(`Erreur dans dogServiceLayer - getDogById(${id}):`, error);
      throw error; // Propager l'erreur
    }
  },

  // Appelle la fonction pour créer un chien
  createDog: async (dogData: { name: string; breed: string; age: number }) => {
    try {
      return await createDog(dogData);
    } catch (error) {
      console.error("Erreur dans dogServiceLayer - createDog:", error);
      throw error; // Propager l'erreur
    }
  },

  // Appelle la fonction pour mettre à jour un chien
  updateDog: async (id: string, dogData: { name: string; breed: string; age: number }) => {
    try {
      return await updateDog(id, dogData);
    } catch (error) {
      console.error(`Erreur dans dogServiceLayer - updateDog(${id}):`, error);
      throw error; // Propager l'erreur
    }
  },

  // Appelle la fonction pour supprimer un chien
  deleteDog: async (id: string) => {
    try {
      return await deleteDog(id);
    } catch (error) {
      console.error(`Erreur dans dogServiceLayer - deleteDog(${id}):`, error);
      throw error; // Propager l'erreur
    }
  }
};
