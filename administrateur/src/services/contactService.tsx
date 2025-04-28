import api from "../axiosIntance/IntercepteurToken";

//Interface Contact
export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
}

//Fonction utilitaire pour gérer les erreurs
const handleApiError = (error: unknown, message: string) => {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`);
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(message);
};

// Créer un contact
export const createContact = async (data: Contact): Promise<Contact> => {
  try {
    const response = await api.post<Contact>('/contacts', data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erreur lors de la création du contact');
    throw error;
  }
};

// Récupérer tous les contacts
export const getAllContacts = async (): Promise<Contact[]> => {
  try {
    const response = await api.get<Contact[]>('/contacts');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erreur lors de la récupération des contacts');
    return []; // 🔥 Retourne un tableau vide par défaut pour éviter undefined
  }
};

// Récupérer un contact par ID
export const getContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erreur lors de la récupération du contact avec l'ID ${id}`);
    throw error;
  }
};

// Mettre à jour un contact
export const updateContact = async (id: string, data: Contact): Promise<Contact> => {
  try {
    const response = await api.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erreur lors de la mise à jour du contact avec l'ID ${id}`);
    throw error;
  }
};

// Supprimer un contact
export const deleteContact = async (id: string): Promise<void> => {
  try {
    await api.delete(`/contacts/${id}`);
  } catch (error) {
    handleApiError(error, `Erreur lors de la suppression du contact avec l'ID ${id}`);
    throw error;
  }
};
