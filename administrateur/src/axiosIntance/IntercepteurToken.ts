import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Token {
  exp: number;
}

const api = axios.create({
  baseURL: 'http://localhost:3333/api', 
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken'); 

  if (token) {
    try {
      // ✅ Vérification correcte du token

      const user = jwtDecode<Token>(token);
      const now = Date.now().valueOf() / 1000;

      if (user.exp < now) {
        console.log('Token expiré');
      //  localStorage.removeItem('authToken');
      //  localStorage.setItem('redirectUrl', window.location.href);
      //  window.location.href = '/login';
      } else {
        config.headers.Authorization = `Bearer ${token}`; //Ajout du token dans le header
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
     // localStorage.removeItem('token');
      //localStorage.setItem('redirectUrl', window.location.href);
      //window.location.href = '/login';
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
