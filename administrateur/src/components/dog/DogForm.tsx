import useFetch from '../../hooks/UseFetch';
import { useEffect, useState } from 'react';
import useDogsApi from '../../api/DogsApi';
import { toast } from 'react-toastify';

interface Dog {
  id?: string;
  name: string;
  breed: string;
  age: number;
}

interface DogFormProps {
  selectedDog?: Dog | null;
  onReset: () => void;
}

const DogForm: React.FC<DogFormProps> = ({ selectedDog, onReset }) => {
  const [dog, setDog] = useState<Dog>({ name: '', breed: '', age: 0 });
  const [loading, setLoading] = useState(false);
  const { request } = useFetch();
  const { updateDogHandler, createDogHandler } = useDogsApi();

  useEffect(() => {
    if (selectedDog) {
      setDog({ name: selectedDog.name, breed: selectedDog.breed, age: selectedDog.age });
    }
  }, [selectedDog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: name === 'age' ? Number(value) : value, // ✅ Convertit 'age' en nombre
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Request:', request);
      console.log('Dog Data:', dog);
      if (selectedDog) {
        console.log('Updating Dog ID:', selectedDog.id);
        if (!selectedDog.id) throw new Error('ID du chien manquant');
        await updateDogHandler(request, selectedDog.id, dog);
        toast.success('Chien mis à jour avec succès !');
      } else {
        console.log('Creating New Dog');
        await createDogHandler(request, dog);
        toast.success('Chien ajouté avec succès !');
      }
      onReset();
    } catch (err) {
      console.error('Erreur dans handleSubmit:', err);
      toast.error('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dog-form w-1/2">
      <h2 className="text-lg font-semibold mb-4">{selectedDog ? 'Modifier un Chien' : 'Ajouter un Chien'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nom</label>
          <input
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block">Race</label>
          <input
            type="text"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block">Âge</label>
          <input
            type="number"
            name="age"
            value={dog.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Chargement...' : selectedDog ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default DogForm;
