import api from "../axiosIntance/IntercepteurToken";

export interface Message {
  id?: string;
  userId: string;
  content: string;
}

export const getMessagesByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/messages/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des messages pour l'utilisateur ${userId}:`, error);
    throw new Error(`Impossible de récupérer les messages pour l'utilisateur ${userId}`);
  }
};

export const getMessageById = async (id: string) => {
  try {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du message avec l'ID ${id}:`, error);
    throw new Error(`Impossible de récupérer le message avec l'ID ${id}`);
  }
};

export const createMessage = async (messageData: Message) => {
  try {
    const response = await api.post('/messages', messageData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    throw new Error('Impossible de créer le message');
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await api.delete(`/messages/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression du message avec l'ID ${id}:`, error);
    throw new Error(`Impossible de supprimer le message avec l'ID ${id}`);
  }
};
