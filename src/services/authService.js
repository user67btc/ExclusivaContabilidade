/**
 * Serviço de autenticação para o painel administrativo
 * Em produção, este serviço se conectaria a uma API real
 */

// Chaves para armazenamento no localStorage
const TOKEN_KEY = 'exclusiva_auth_token';
const USER_KEY = 'exclusiva_user';

// Funções de autenticação
const authService = {
  // Login do usuário
  login: async (email, password) => {
    // Em produção, esta função faria uma chamada à API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular verificação de credenciais
        if (email === 'admin@exclusivacontabilidade.com.br' && password === 'senha123') {
          // Criar token JWT simulado
          const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
            JSON.stringify({
              id: 1,
              email: email,
              name: 'Administrador',
              role: 'admin',
              exp: new Date().getTime() + 24 * 60 * 60 * 1000, // Expira em 24h
            })
          )}.SIMULATED_SIGNATURE`;

          // Salvar token no localStorage
          localStorage.setItem(TOKEN_KEY, token);
          
          // Salvar dados do usuário
          const user = {
            id: 1,
            email: email,
            name: 'Administrador',
            role: 'admin',
          };
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          
          resolve({ token, user });
        } else {
          reject({ message: 'Credenciais inválidas. Verifique seu email e senha.' });
        }
      }, 800); // Simular tempo de resposta do servidor
    });
  },

  // Verificar se usuário está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    
    try {
      // Decodificar token JWT simulado
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Verificar expiração
      if (payload.exp < new Date().getTime()) {
        authService.logout();
        return false;
      }
      
      return true;
    } catch (e) {
      authService.logout();
      return false;
    }
  },

  // Obter usuário logado
  getUser: () => {
    try {
      const userJson = localStorage.getItem(USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      return null;
    }
  },

  // Obter token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Logout do usuário
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

export default authService;
