import { useState, useEffect } from 'react';
import { getAllDogs, getDogById, createDog, updateDog, deleteDog } from '../services/dogService';

interface Dog {
  id?: string;
  name: string;
  breed: string;
  age: number;
}

const useDogsApi = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDogs();
  }, []);

  // Charger tous les chiens
  const loadDogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDogs();
      setDogs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Obtenir un chien par son ID
  const getDogByIdHandler = async (id: string) => {
    try {
      return await getDogById(id);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Créer un chien
  const createDogHandler = async (dog: Dog) => {
    try {
      await createDog(dog);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Mettre à jour un chien
  const updateDogHandler = async (id: string, dogData: Dog) => {
    try {
      await updateDog(id, dogData);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Supprimer un chien
  const deleteDogHandler = async (id: string) => {
    try {
      await deleteDog(id);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { dogs, loading, error, getDogByIdHandler, createDogHandler, updateDogHandler, deleteDogHandler };
};

export default useDogsApi;
