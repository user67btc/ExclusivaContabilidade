/**
 * Utilitários para otimização de performance
 * Inclui lazy loading, cache, e otimizações de renderização
 */

/**
 * Hook para lazy loading de componentes pesados
 * @param {Function} importFunc - Função de import dinâmico
 * @param {Object} options - Opções de configuração
 */
export const useLazyComponent = (importFunc, options = {}) => {
  const { fallback = null, delay = 0 } = options;
  
  if (typeof window === 'undefined') {
    return { Component: null, loading: true };
  }
  
  const [Component, setComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    let mounted = true;
    
    const loadComponent = async () => {
      try {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        const module = await importFunc();
        
        if (mounted) {
          setComponent(() => module.default || module);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    };
    
    loadComponent();
    
    return () => {
      mounted = false;
    };
  }, []);
  
  return { Component, loading, error };
};

/**
 * Cache simples para resultados de cálculos
 */
class CalculationCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  /**
   * Gera uma chave única baseada nos parâmetros
   * @param {Object} params - Parâmetros do cálculo
   * @returns {string} Chave única
   */
  generateKey(params) {
    return JSON.stringify(params, Object.keys(params).sort());
  }
  
  /**
   * Obtém resultado do cache
   * @param {Object} params - Parâmetros do cálculo
   * @returns {Object|null} Resultado cacheado ou null
   */
  get(params) {
    const key = this.generateKey(params);
    const cached = this.cache.get(key);
    
    if (cached) {
      // Mover para o final (LRU)
      this.cache.delete(key);
      this.cache.set(key, cached);
      return cached.result;
    }
    
    return null;
  }
  
  /**
   * Armazena resultado no cache
   * @param {Object} params - Parâmetros do cálculo
   * @param {Object} result - Resultado do cálculo
   */
  set(params, result) {
    const key = this.generateKey(params);
    
    // Remover item mais antigo se necessário
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      result,
      timestamp: Date.now()
    });
  }
  
  /**
   * Limpa cache expirado
   * @param {number} maxAge - Idade máxima em ms (padrão: 1 hora)
   */
  cleanup(maxAge = 3600000) {
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.cache.delete(key);
      }
    }
  }
  
  /**
   * Limpa todo o cache
   */
  clear() {
    this.cache.clear();
  }
}

// Instância global do cache
export const calculationCache = new CalculationCache();

/**
 * Debounce para otimizar inputs
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em ms
 * @returns {Function} Função com debounce
 */
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Throttle para otimizar eventos frequentes
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite em ms
 * @returns {Function} Função com throttle
 */
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Hook para intersection observer (lazy loading de elementos)
 * @param {Object} options - Opções do intersection observer
 * @returns {Array} [ref, isIntersecting]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [ref, setRef] = React.useState(null);
  
  React.useEffect(() => {
    if (!ref || typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  
  return [setRef, isIntersecting];
};

/**
 * Preload de recursos críticos
 * @param {Array} resources - Lista de recursos para preload
 */
export const preloadResources = (resources) => {
  if (typeof window === 'undefined') return;
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as || 'script';
    
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Otimização de imagens com lazy loading
 * @param {string} src - URL da imagem
 * @param {Object} options - Opções de configuração
 * @returns {Object} Props para a imagem
 */
export const useOptimizedImage = (src, options = {}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });
  
  const {
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
    alt = '',
    className = ''
  } = options;
  
  const shouldLoad = isIntersecting || loaded;
  
  const imageProps = {
    ref,
    src: shouldLoad ? src : placeholder,
    alt,
    className: `${className} ${loaded ? 'loaded' : 'loading'}`,
    onLoad: () => setLoaded(true),
    onError: () => setError(true),
    loading: 'lazy'
  };
  
  return { imageProps, loaded, error };
};

/**
 * Service Worker para cache offline
 */
export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar SW:', error);
      });
  });
};

/**
 * Medição de performance
 */
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    console.log(`${name} executado em ${end - start} ms`);
    
    // Enviar para analytics se disponível
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_measure', {
        event_category: 'performance',
        event_label: name,
        value: Math.round(end - start)
      });
    }
    
    return result;
  };
};

/**
 * Otimização de bundle splitting
 */
export const dynamicImport = (modulePath) => {
  return import(modulePath);
};

// Configurações de performance para produção
export const performanceConfig = {
  // Cache TTL em ms
  cacheTTL: 3600000, // 1 hora
  
  // Debounce delay para inputs
  inputDebounceDelay: 300,
  
  // Throttle limit para scroll events
  scrollThrottleLimit: 100,
  
  // Tamanho máximo do cache
  maxCacheSize: 100,
  
  // Preload de recursos críticos
  criticalResources: [
    { href: '/css/bootstrap.min.css', as: 'style' },
    { href: '/js/analytics.js', as: 'script' }
  ]
};
