
const DogList = ({ dogs, onSelectDog }: { dogs: any[]; onSelectDog: (dog: any) => void }) => {
  return (
    <div className="dog-list w-1/2">
      <h2 className="text-lg font-semibold mb-4">Liste des Chiens</h2>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Race</th>
            <th className="border p-2">Âge</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id}>
              <td className="border p-2">{dog.name}</td>
              <td className="border p-2">{dog.breed}</td>
              <td className="border p-2">{dog.age}</td>
              <td className="border p-2">
                <button
                  onClick={() => onSelectDog(dog)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DogList;
