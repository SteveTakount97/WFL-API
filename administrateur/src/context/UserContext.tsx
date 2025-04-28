import { createContext, useState, useContext, useEffect } from 'react'
import { getMeFromApi } from '../services/userServices'

// Type utilisateur correctement défini
interface User {
  firstName: string
  lastName: string
  email: string
  username: string
  role: string
}

// Type du contexte utilisateur
interface UserContextValue {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
  } | null;
  setUser: (user: any) => void;
}
// Crée un contexte avec le type UserContextType
const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getMeFromApi()
      // Vérifie et divise le nom
      const fullName = userData.full_name || "";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts[1] || "";

      const normalizedUser = {
        firstName,
        lastName,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      };

      setUser(normalizedUser);
      console.log('données du context', user)
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };

  loadUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = (): UserContextValue => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
