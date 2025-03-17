import { useState } from 'react'

const BASE_URL = 'http://localhost:3333/api'

export const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async (url: string, options: RequestInit = {}) => {
    console.log("Request function called with url:", url);
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken') // Récupération du token JWT
      if (!token) {
        console.error("Aucun token disponible")
      }
      const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 
          },
      })
       
      console.log('Fetch response:', res);
      if (!res.ok) {
        if (res.status >= 500) {
          throw new Error('Erreur interne du serveur');
        } else if (res.status >= 400) {
          throw new Error('Erreur client');
        }
        throw new Error(`Erreur inconnue: ${res.statusText}`);
      }

      const data = await res.json()
      return data
    } catch (err: any) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  return { request, loading, error }
}

export default useFetch
