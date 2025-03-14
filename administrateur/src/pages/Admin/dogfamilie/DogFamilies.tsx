
import DogFamilyForm from '../../../components/dogfamiles/DogFamilieForm';// Assurez-vous que le chemin est correct
import DogFamilyList from '../../../components/dogfamiles/DogFamiliesList';// Assurez-vous que le chemin est correct

const DogFamilyPage = () => {
  return (
    <div className="dog-page">
      <h1 className="text-xl font-bold mb-4">Gestion des Familles de Chiens</h1>
      <div className="flex gap-8">
      {/* Le composant formulaire pour créer ou modifier une famille de chiens */}
      <DogFamilyForm />

      {/* Le composant liste pour afficher toutes les familles de chiens */}
      <DogFamilyList />
      </div>
    </div>
  );
};

export default DogFamilyPage;
