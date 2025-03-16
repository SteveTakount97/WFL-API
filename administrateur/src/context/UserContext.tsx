import { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  setUserInfo: (userInfo: Partial<UserContextType>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserContextType>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    setUserInfo: () => {},
  });

  const updateUserInfo = (newUserInfo: Partial<UserContextType>) => {
    setUserInfo((prev) => ({ ...prev, ...newUserInfo }));
  };

  return (
    <UserContext.Provider value={{ ...userInfo, setUserInfo: updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
