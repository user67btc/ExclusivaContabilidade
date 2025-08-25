/**
 * Este módulo carrega o Bootstrap apenas no cliente
 * Ele deve ser importado dinamicamente com next/dynamic e a opção ssr: false
 */

if (typeof window !== 'undefined') {
  // Carrega bootstrap apenas no navegador, não durante SSR
  try {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    console.log('Bootstrap carregado com sucesso no cliente');
  } catch (err) {
    console.error('Erro ao carregar Bootstrap:', err);
  }
}

export default function initBootstrap() {
  // Este é apenas um função vazia para permitir a importação dinâmica
  return null;
}
