import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Carregar Bootstrap apenas no lado do cliente
    try {
      // Usando require em vez de import para ter maior controle
      // Isso será executado apenas no navegador, nunca no servidor
      if (typeof window !== 'undefined') {
        const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min');
        console.log('Bootstrap inicializado com sucesso no cliente');
      }
    } catch (err) {
      console.error('Erro ao inicializar Bootstrap:', err);
    }
  }, []);

  return null;
}
