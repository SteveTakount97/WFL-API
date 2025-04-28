import { useState } from 'react';
import DogList from '../../../components/dog/Doglist';  // Correctement importé
import DogForm from '../../../components/dog/DogForm';
import useDogsApi from '../../../api/DogsApi';  // Importation du hook useDogsApi

interface Dog {
  id?: string;
  name: string;
  breed: string;
  age: number;
}

const DogPage = () => {
  const { dogs, loading, error, } = useDogsApi();
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const handleSelectDog = (dog: Dog) => {
    setSelectedDog(dog);
  };

  const handleResetDog = () => {
    setSelectedDog(null);
  };

  return (
    <div className="dog-page">
      <h1 className="text-xl font-bold mb-4">Gestion des Chiens</h1>

      {loading && <p>Chargement des chiens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-8">
        <DogList dogs={dogs} onSelectDog={handleSelectDog} />
        <DogForm selectedDog={selectedDog} onReset={handleResetDog} />
      </div>
    </div>
  );
};

export default DogPage;
