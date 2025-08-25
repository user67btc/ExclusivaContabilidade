import { useEffect } from 'react';

// Este componente carrega Bootstrap apenas no lado do cliente
export default function ClientBootstrap() {
  useEffect(() => {
    // Importa o módulo bootstrapClient que tem proteção contra execução no SSR
    import('../utils/bootstrapClient');
  }, []);

  return null;
}
