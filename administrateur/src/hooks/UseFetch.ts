import { useState } from 'react'

const BASE_URL = 'http://localhost:3333/api'

export const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async (url: string, options: RequestInit = {}) => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token') // Récupération du token JWT
      const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
          ...options.headers,
        },
      })

      if (!res.ok) {
        throw new Error(`Erreur : ${res.statusText}`)
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
