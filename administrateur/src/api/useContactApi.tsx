import { useState, useEffect } from 'react';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  Contact
} from '../services/contactService';
import { toast } from 'react-toastify';

const useContactsApi = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllContacts();
      setContacts(data);
    } catch (err) {
      setError('Erreur lors du chargement des contacts');
      toast.error('Erreur lors du chargement des contacts.');
    } finally {
      setLoading(false);
    }
  };

  const getContactByIdHandler = async (id: string) => {
    try {
      return await getContactById(id);
    } catch (err) {
      toast.error(`Erreur lors de la récupération du contact avec l'ID ${id}`);
    }
  };

  const createContactHandler = async (contact: Contact) => {
    setLoading(true);
    try {
      await createContact(contact);
      toast.success('Contact ajouté avec succès !');
      loadContacts();
    } catch (err) {
      toast.error('Erreur lors de la création du contact.');
    } finally {
      setLoading(false);
    }
  };

  const updateContactHandler = async (id: string, contactData: Contact) => {
    setLoading(true);
    try {
      await updateContact(id, contactData);
      toast.success('Contact mis à jour avec succès !');
      loadContacts();
    } catch (err) {
      toast.error(`Erreur lors de la mise à jour du contact avec l'ID ${id}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteContactHandler = async (id: string) => {
    setLoading(true);
    try {
      await deleteContact(id);
      toast.success('Contact supprimé avec succès !');
      loadContacts();
    } catch (err) {
      toast.error(`Erreur lors de la suppression du contact avec l'ID ${id}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    contacts,
    loading,
    error,
    getContactByIdHandler,
    createContactHandler,
    updateContactHandler,
    deleteContactHandler
  };
};

export default useContactsApi;
