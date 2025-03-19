import axios, { InternalAxiosRequestConfig } from 'axios';
import { Base64 } from 'js-base64';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

// Fonction pour gérer les erreurs liées au token
const handleTokenError = (error: Error) => {
  console.error('Erreur lors de la gestion du token:', error.message);
  // Supprimer le token et rediriger l'utilisateur vers la page de connexion
 // localStorage.removeItem('authToken');
 // localStorage.setItem('redirectUrl', window.location.href);
 // window.location.href = '/signin';
};

// Fonction pour vérifier et décoder le token
const decodeToken = (token: string) => {
  if (token.startsWith('oat_')) {
    const cleanedToken = token.slice(4);  // Retirer le préfixe "oat_"
    try {
      // Décoder le token nettoyé
      const decodedToken = Base64.decode(cleanedToken);
      return JSON.parse(decodedToken);  // On suppose ici que le payload est un JSON
    } catch (error) {
      throw new Error('Erreur lors du décodage du token.');
    }
  } else {
    throw new Error('Le token ne commence pas par "oat_"');
  }
};

// Vérification de l'expiration du token
const isTokenExpired = (decodedToken: any) => {
  const now = Date.now().valueOf() / 1000;
  return decodedToken.exp < now;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Token manquant dans le stockage local');
      }

      console.log('Token récupéré:', token);

      // Décoder le token et vérifier son expiration
      const decodedToken = decodeToken(token);

      if (isTokenExpired(decodedToken)) {
        console.log('Token expiré');
        handleTokenError(new Error('Le token a expiré.'));
      } else {
        // Ajouter le token dans le header Authorization
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error: unknown) {
      // Vérification de l'instance de l'erreur
      if (error instanceof Error) {
        handleTokenError(error);  // Gérer les erreurs liées au token
      } else {
        console.error('Erreur inconnue:', error);
      }
      return Promise.reject(error);  // Relancer l'erreur pour qu'Axios puisse la gérer
    }
  },
  (error) => {
    console.error('Erreur dans l’intercepteur Axios:', error);
    return Promise.reject(error);
  }
);

export default api;
