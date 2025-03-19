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
  const { updateDogHandler, createDogHandler } = useDogsApi();

  // Remplit le formulaire si un chien est sélectionné
  useEffect(() => {
    if (selectedDog) {
      setDog(selectedDog);
    } else {
      resetForm(); // Réinitialisation si aucun chien sélectionné
    }
  }, [selectedDog]);

  // Met à jour l'état lors de la saisie dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: name === 'age' ? Number(value) : value.trim(),
    }));
  };

  // Vérifie des champs valides
  const isValid = () => {
    if (!dog.name.trim()) {
      toast.error('Le nom est obligatoire');
      return false;
    }
    if (!dog.breed.trim()) {
      toast.error('La race est obligatoire');
      return false;
    }
    if (dog.age <= 0) {
      toast.error('L\'âge doit être supérieur à zéro');
      return false;
    }
    return true;
  };

  //Réinitialisation du formulaire
  const resetForm = () => {
    setDog({ name: '', breed: '', age: 0 });
  };

  //Soumission du formulaire (Création ou mise à jour)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      if (selectedDog && selectedDog.id) {
        console.log(`Updating Dog ID: ${selectedDog.id}`);
        await updateDogHandler(selectedDog.id, dog); // ✅ Passage des données
        toast.success('Chien mis à jour avec succès !');
      } else {
        console.log('Creating New Dog');
        await createDogHandler(dog);
        toast.success('Chien ajouté avec succès !');
      }

      onReset(); // Réinitialisation après soumission
      resetForm(); // Nettoyage du formulaire
    } catch (err) {
      console.error('Erreur dans handleSubmit:', err);
      toast.error((err as Error).message || 'Une erreur est survenue.');
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
