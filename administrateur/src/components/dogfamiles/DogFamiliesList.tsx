import { useEffect, useState } from "react";
import { dogFamilyApi } from "../../api/DogFamilieApi";

const DogFamilyList = () => {
  const [dogFamilies, setDogFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDogFamilies = async () => {
      setLoading(true);
      try {
        const data = await dogFamilyApi.getAllDogFamilies();
        setDogFamilies(data);
      } catch (err) {
        setError("Erreur lors de la récupération des familles de chiens.");
      } finally {
        setLoading(false);
      }
    };

    fetchDogFamilies();
  }, []);

  if (loading) return <p className="text-center text-blue-600">Chargement...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="dog-families-list container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Liste des familles de chiens</h1>
      
      {/* Affichage de la liste des familles de chiens */}
      {dogFamilies.length > 0 ? (
        <ul className="space-y-4">
          {dogFamilies.map((dogFamily: any) => (
            <li
              key={dogFamily.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
            >
              <span className="text-lg font-medium">{dogFamily.name}</span>
              <button
                className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                onClick={() => alert(`Voir la famille de chiens : ${dogFamily.name}`)}
              >
                Voir
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Aucune famille de chiens disponible.</p>
      )}
    </div>
  );
};

export default DogFamilyList;
