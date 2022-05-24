import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/auth';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(
    currentUser ? { id: currentUser.id, email: currentUser.email } : {}
  );

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('To use useUser you must wrap component in UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
