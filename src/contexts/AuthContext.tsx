import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER = {
  email: 'admin@iniciamazon.com',
  password: 'admin123',
  name: 'Administrador'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('iniciamazon_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData: User = {
        email: MOCK_USER.email,
        name: MOCK_USER.name
      };
      setUser(userData);
      localStorage.setItem('iniciamazon_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iniciamazon_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
