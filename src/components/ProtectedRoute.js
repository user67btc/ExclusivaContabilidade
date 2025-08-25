import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente para proteger rotas administrativas
 * Redireciona para a página de login se o usuário não estiver autenticado
 */
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Ignorar durante o carregamento inicial
    if (loading) return;

    // Verificar se o usuário está autenticado
    if (!isAuthenticated() && router.pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  // Durante o carregamento inicial ou redirecionamento, mostrar um estado de carregamento
  if (loading || (!isAuthenticated() && router.pathname !== '/admin/login')) {
    return (
      <div className="auth-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Verificando autenticação...</p>
        
        <style jsx>{`
          .auth-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
          }
        `}</style>
      </div>
    );
  }

  // Se estiver autenticado ou na página de login, renderizar o conteúdo
  return <>{children}</>;
};

export default ProtectedRoute;
