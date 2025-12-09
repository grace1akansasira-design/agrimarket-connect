import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'farmer' | 'buyer') => boolean;
  register: (name: string, email: string, password: string, role: 'farmer' | 'buyer') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agrimarket_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string, role: 'farmer' | 'buyer') => {
    // Simulate login - in production, this would verify against a backend
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem('agrimarket_user', JSON.stringify(mockUser));
    return true;
  };

  const register = (name: string, email: string, password: string, role: 'farmer' | 'buyer') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('agrimarket_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrimarket_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
