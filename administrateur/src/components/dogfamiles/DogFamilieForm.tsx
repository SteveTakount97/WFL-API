import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dogFamilyApi } from '../../api/DogFamilieApi';

const DogFamilyForm = () => {
  const { id } = useParams<{ id: string }>(); // Récupération de l'ID de la famille de chiens via les params de l'URL
  const navigate = useNavigate();
  const [dogFamily, setDogFamily] = useState<{ name: string; description: string }>({ name: '', description: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Charger les informations de la famille de chiens si on est en mode modification
  useEffect(() => {
    if (id) {
      const fetchDogFamily = async () => {
        setLoading(true);
        try {
          const dogFamilyData = await dogFamilyApi.getDogFamilyById(id); // Récupère la famille de chiens par ID
          setDogFamily(dogFamilyData);
        } catch (err) {
          setError('Erreur lors de la récupération de la famille de chiens');
        } finally {
          setLoading(false);
        }
      };

      fetchDogFamily();
    }
  }, [id]);

  // Gérer l'ajout ou la mise à jour de la famille de chiens
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await dogFamilyApi.updateDogFamily(id, dogFamily); // Mise à jour si ID existe
        alert('Famille de chiens mise à jour avec succès');
      } else {
        await dogFamilyApi.createDogFamily(dogFamily); // Ajout si pas d'ID
        alert('Famille de chiens ajoutée avec succès');
      }
      navigate('/dog-families'); // Redirection après ajout ou mise à jour
    } catch (err) {
      setError('Erreur lors de la soumission du formulaire');
    } finally {
      setLoading(false);
    }
  };

  // Gérer la suppression de la famille de chiens
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette famille de chiens ?')) {
      setLoading(true);
      try {
        await dogFamilyApi.deleteDogFamily(id!);
        alert('Famille de chiens supprimée avec succès');
        navigate('/dog-families');
      } catch (err) {
        setError('Erreur lors de la suppression de la famille de chiens');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dog-form w-1/2">
      <h1 className="text-lg font-semibold mb-4">{id ? 'Modifier' : 'Ajouter'} une famille de chiens</h1>
      <form onSubmit={handleSubmit}>
        {id && (
          <div>
            <label className="block">ID de la famille</label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full p-2 border rounded-md mb-4 bg-gray-100"
            />
          </div>
        )}
        <div>
          <label className="block">Nom de la famille</label>
          <input
            type="text"
            value={dogFamily.name}
            onChange={(e) => setDogFamily({ ...dogFamily, name: e.target.value })}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={dogFamily.description}
            onChange={(e) => setDogFamily({ ...dogFamily, description: e.target.value })}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4">
          {id ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
      {id && (
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded-md mt-4"
        >
          Supprimer cette famille de chiens
        </button>
      )}
    </div>
  );
};

export default DogFamilyForm;
