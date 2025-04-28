import React from 'react';

// Définition des types des props
interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
}

interface DogListProps {
  dogs: Dog[]; // Tableau de chiens à afficher
  onSelectDog: (dog: Dog) => void; // Fonction pour sélectionner un chien
}

const DogList: React.FC<DogListProps> = ({ dogs, onSelectDog }) => {
  return (
    <div className="dog-list w-full bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 p-4 bg-gray-100">Liste des Chiens</h2>
      {dogs.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left font-medium text-gray-700">Nom</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700">Race</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700">Âge</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr
                key={dog.id}
                onClick={() => onSelectDog(dog)}
                className="hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <td className="py-2 px-4">{dog.name}</td>
                <td className="py-2 px-4">{dog.breed}</td>
                <td className="py-2 px-4">{dog.age} ans</td>
                <td className="py-2 px-4 text-blue-500">Sélectionner</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-4">Aucun chien trouvé.</p>
      )}
    </div>
  );
};

export default DogList;
