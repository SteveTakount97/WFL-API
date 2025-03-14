import { useEffect, useState } from 'react';
import DogList from '../../../components/dog/Doglist';
import DogForm from '../../../components/dog/DogForm';
import { getAllDogs } from '../../../services/dogService';

const DogPage = () => {
  const [dogs, setDogs] = useState<any[]>([]);
  const [selectedDog, setSelectedDog] = useState<any | null>(null);

  useEffect(() => {
    const loadDogs = async () => {
      const data = await getAllDogs();
      setDogs(data);
    };
    loadDogs();
  }, []);

  const handleSelectDog = (dog: any) => {
    setSelectedDog(dog);
  };

  const handleResetDog = () => {
    setSelectedDog(null);
  };

  return (
    <div className="dog-page">
      <h1 className="text-xl font-bold mb-4">Gestion des Chiens</h1>
      <div className="flex gap-8">
        <DogList dogs={dogs} onSelectDog={handleSelectDog} />
        <DogForm selectedDog={selectedDog} onReset={handleResetDog} />
      </div>
    </div>
  );
};

export default DogPage;
