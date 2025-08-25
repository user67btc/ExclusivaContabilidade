import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';

// Criar o contexto de autenticação
const AuthContext = createContext({});

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    // Verificar autenticação
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        setUser(authService.getUser());
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/admin/login');
  };

  // Verificar se usuário está autenticado
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  // Valores exportados pelo contexto
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
