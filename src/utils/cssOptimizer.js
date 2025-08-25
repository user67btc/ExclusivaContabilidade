/**
 * Utilitários para otimização de CSS e gestão de recursos
 * Melhora o Core Web Vitals ao otimizar o CSS crítico vs não-crítico
 */

/**
 * Carrega um recurso CSS de forma assíncrona
 * @param {string} href - URL do arquivo CSS
 * @param {Function} [callback] - Função de callback opcional após carregamento
 */
export const loadStyleAsync = (href, callback = null) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    if (callback) {
      link.onload = callback;
    }
    
    document.head.appendChild(link);
    return true;
  }
  return false;
};

/**
 * Pré-carrega uma imagem para uso futuro
 * @param {string} src - URL da imagem
 */
export const preloadImage = (src) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
};

/**
 * Detecta se o navegador está em modo de economia de dados
 * @returns {boolean} True se estiver em modo de economia de dados
 */
export const isDataSaverEnabled = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    return navigator.connection.saveData === true;
  }
  return false;
};

/**
 * Detecta se o navegador está em conexão lenta
 * @returns {boolean} True se a conexão for lenta
 */
export const isSlowConnection = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    return (
      navigator.connection.effectiveType === 'slow-2g' ||
      navigator.connection.effectiveType === '2g'
    );
  }
  return false;
};

/**
 * Carrega recursos com base nas condições de rede
 * @param {Object} options - Opções de carregamento
 * @param {string} options.normalSrc - Recurso para conexões normais
 * @param {string} options.lightSrc - Recurso leve para conexões lentas
 */
export const loadBasedOnConnection = (options) => {
  const isLowBandwidth = isDataSaverEnabled() || isSlowConnection();
  const resourceToLoad = isLowBandwidth ? options.lightSrc : options.normalSrc;
  
  return loadStyleAsync(resourceToLoad);
};

/**
 * Inicializa a otimização CSS carregando estilos não críticos
 * com base nas condições de rede e preferências do usuário
 */
export const initCssOptimization = () => {
  if (typeof window !== 'undefined') {
    // Espera o evento load para carregar recursos não críticos
    window.addEventListener('load', () => {
      // Pequeno delay para garantir que os recursos críticos sejam processados primeiro
      setTimeout(() => {
        // Carregar estilos não críticos após o carregamento da página
        loadBasedOnConnection({
          normalSrc: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
          lightSrc: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
        });
      }, 100);
    });
  }
};
