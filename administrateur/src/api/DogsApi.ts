import { useState, useEffect } from 'react';
import useFetch from '../hooks/UseFetch';
import { getAllDogs, getDogById, createDog, updateDog, deleteDog } from '../services/dogService';

const useDogsApi = () => {
  const { request } = useFetch();
  const [dogs, setDogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDogs(request);
      setDogs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getDogByIdHandler = async (id: string) => {
    try {
      return await getDogById(request, id);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const createDogHandler = async (data: any) => {
    try {
      await createDog(request, data);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateDogHandler = async (request: (url: string, options?: RequestInit) => Promise<any>, id: string, data: any) => {
    try {
      await updateDog(request, id, data);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteDogHandler = async (id: string) => {
    try {
      await deleteDog(request, id);
      loadDogs();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { dogs, loading, error, getDogByIdHandler, createDogHandler, updateDogHandler, deleteDogHandler };
};

export default useDogsApi;
