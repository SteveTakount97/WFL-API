import { useState } from 'react';
import {
  getMessagesByUserId,
  getMessageById,
  createMessage,
  deleteMessage,
  Message
} from '../services/messageService';
import { toast } from 'react-toastify';

const useMessagesApi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessagesByUserId = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMessagesByUserId(userId);
      setMessages(data);
    } catch (err) {
      setError('Erreur lors du chargement des messages.');
      toast.error(`Erreur lors du chargement des messages pour l'utilisateur ${userId}.`);
    } finally {
      setLoading(false);
    }
  };

  const getMessageByIdHandler = async (id: string) => {
    try {
      return await getMessageById(id);
    } catch (err) {
      toast.error(`Erreur lors de la récupération du message avec l'ID ${id}.`);
    }
  };

  const createMessageHandler = async (messageData: Message) => {
    setLoading(true);
    try {
      await createMessage(messageData);
      toast.success('Message créé avec succès !');
      loadMessagesByUserId(messageData.userId); // Rafraîchir la liste après ajout
    } catch (err) {
      toast.error('Erreur lors de la création du message.');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessageHandler = async (id: string) => {
    setLoading(true);
    try {
      await deleteMessage(id);
      toast.success('Message supprimé avec succès !');
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    } catch (err) {
      toast.error(`Erreur lors de la suppression du message avec l'ID ${id}.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    loadMessagesByUserId,
    getMessageByIdHandler,
    createMessageHandler,
    deleteMessageHandler
  };
};

export default useMessagesApi;
