import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthContextType, User } from '@/types';
import { appConfig, useMockData } from '@/config';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER = {
  email: appConfig.portalUser,
  password: appConfig.portalPassword,
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
    if (!useMockData) {
      try {
        const response = await fetch(`${appConfig.apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const payload = await response.json();
          const userData: User = {
            email: payload.email ?? email,
            name: payload.name ?? 'Administrador',
            token: payload.token
          };
          setUser(userData);
          localStorage.setItem('iniciamazon_user', JSON.stringify(userData));
          return true;
        }
      } catch (error) {
        console.error('Erro ao autenticar na API', error);
      }
    }

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
