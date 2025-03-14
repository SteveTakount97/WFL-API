import React, { useState, useEffect } from 'react';
import { createDog, updateDog } from '../../services/dogService';
import { toast } from 'react-toastify';

const DogForm = ({ selectedDog, onReset }: { selectedDog: any; onReset: () => void }) => {
  const [dog, setDog] = useState({ name: '', breed: '', age: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDog) {
      setDog({ name: selectedDog.name, breed: selectedDog.breed, age: selectedDog.age });
    }
  }, [selectedDog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedDog) {
        await updateDog(selectedDog.id, dog);
        toast.success('Chien mis à jour avec succès !');
      } else {
        await createDog(dog);
        toast.success('Chien ajouté avec succès !');
      }
      onReset();
    } catch (err) {
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
