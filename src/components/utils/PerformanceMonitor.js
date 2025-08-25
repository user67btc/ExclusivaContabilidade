import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Componente de monitoramento de desempenho web
 * Este componente não renderiza nada visualmente, apenas monitora o desempenho da página
 * e envia os dados para o Google Analytics ou para o console em ambiente de desenvolvimento
 */
const PerformanceMonitor = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Só executa no client-side e depois que a página carrega completamente
    if (typeof window === 'undefined') return;
    
    // Registrar quando a página terminar de carregar
    window.addEventListener('load', collectPerformanceMetrics);
    
    // Limpar listener quando o componente for desmontado
    return () => {
      window.removeEventListener('load', collectPerformanceMetrics);
    };
  }, [router.asPath]);
  
  const collectPerformanceMetrics = () => {
    // Garantir que a API de Performance está disponível
    if (!window.performance || !window.performance.timing) {
      return; // Silencioso em produção
    }
    
    // Esperar mais tempo para garantir que todas as métricas estão disponíveis
    setTimeout(() => {
      const timing = window.performance.timing;
      const currentRoute = router.asPath;
      
      // Calcular métricas principais
      const metrics = {
        // Tempo de DNS
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        
        // Tempo de conexão TCP
        tcp: timing.connectEnd - timing.connectStart,
        
        // Tempo de resposta do servidor
        serverResponse: timing.responseStart - timing.requestStart,
        
        // Tempo de download do conteúdo
        contentDownload: timing.responseEnd - timing.responseStart,
        
        // Tempo de DOM Processing (parsing e renderização)
        domProcessing: timing.domComplete - timing.domLoading,
        
        // First Paint/First Contentful Paint (aproximado)
        firstPaint: timing.domInteractive - timing.navigationStart,
        
        // Tempo total de carregamento
        totalLoadTime: timing.loadEventComplete - timing.navigationStart,
        
        // First Input Delay (aproximado)
        interactiveDelay: timing.domInteractive - timing.domLoading,
        
        // Informações da página
        page: currentRoute,
        timestamp: new Date().toISOString()
      };
      
      // Classificar desempenho
      let performanceRating = 'excelente';
      if (metrics.totalLoadTime > 3000) {
        performanceRating = 'bom';
      } 
      if (metrics.totalLoadTime > 5000) {
        performanceRating = 'razoável';
      }
      if (metrics.totalLoadTime > 8000) {
        performanceRating = 'lento';
      }
      
      metrics.rating = performanceRating;
      
      // Em produção, enviar para o Google Analytics ou outra ferramenta
      if (process.env.NODE_ENV === 'production' && window.gtag) {
        window.gtag('event', 'performance_metrics', {
          ...metrics,
          event_category: 'Performance',
          event_label: currentRoute,
          non_interaction: true
        });
      } else {
        // Em desenvolvimento, logar no console
        console.group('📊 Métricas de Performance');
        console.log(`📄 Página: ${metrics.page}`);
        console.log(`⏱️ Tempo Total: ${metrics.totalLoadTime}ms (${metrics.rating})`);
        console.log(`🔄 Resposta do Servidor: ${metrics.serverResponse}ms`);
        console.log(`📥 Download do Conteúdo: ${metrics.contentDownload}ms`);
        console.log(`🏗️ DOM Processing: ${metrics.domProcessing}ms`);
        console.log(`👆 First Paint (aprox.): ${metrics.firstPaint}ms`);
        console.groupEnd();
        
        // Emitir avisos para métricas problemáticas
        if (metrics.serverResponse > 500) {
          console.warn('⚠️ Tempo de resposta do servidor alto. Verificar otimização do servidor.');
        }
        
        if (metrics.contentDownload > 1000) {
          console.warn('⚠️ Download de conteúdo lento. Verificar tamanho dos recursos (imagens, CSS, JS).');
        }
        
        if (metrics.domProcessing > 2000) {
          console.warn('⚠️ DOM Processing lento. Verificar complexidade do HTML e scripts.');
        }
        
        // Salvar no localStorage para análise histórica em desenvolvimento
        try {
          const storedMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
          storedMetrics.push(metrics);
          // Manter apenas os últimos 20 registros para não sobrecarregar
          if (storedMetrics.length > 20) {
            storedMetrics.shift();
          }
          localStorage.setItem('performanceMetrics', JSON.stringify(storedMetrics));
        } catch (error) {
          console.error('Erro ao salvar métricas no localStorage:', error);
        }
      }
      
      // Eventos específicos para Core Web Vitals
      if ('PerformanceObserver' in window) {
        try {
          // LCP (Largest Contentful Paint)
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const lcpMetric = {
                value: entry.startTime,
                page: currentRoute,
                metric: 'LCP'
              };
              
              // Log em desenvolvimento
              if (process.env.NODE_ENV !== 'production') {
                console.log(`🖼️ LCP: ${Math.round(lcpMetric.value)}ms`);
                
                if (lcpMetric.value > 2500) {
                  console.warn('⚠️ LCP acima de 2.5s. Otimização recomendada.');
                }
              }
              
              // Enviar para analytics em produção
              if (process.env.NODE_ENV === 'production' && window.gtag) {
                window.gtag('event', 'core_web_vitals', {
                  ...lcpMetric,
                  event_category: 'Web Vitals',
                  non_interaction: true
                });
              }
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          
          // CLS (Cumulative Layout Shift)
          new PerformanceObserver((entryList) => {
            let clsValue = 0;
            
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            
            const clsMetric = {
              value: clsValue,
              page: currentRoute,
              metric: 'CLS'
            };
            
            // Log em desenvolvimento (apenas valores significativos)
            if (process.env.NODE_ENV !== 'production' && clsMetric.value > 0.01) {
              console.log(`📏 CLS: ${clsMetric.value.toFixed(3)}`);
              
              if (clsMetric.value > 0.1) {
                console.warn('⚠️ CLS acima de 0.1. Verificar mudanças de layout durante carregamento.');
              }
            }
            
            // Enviar para analytics em produção
            if (process.env.NODE_ENV === 'production' && window.gtag) {
              window.gtag('event', 'core_web_vitals', {
                ...clsMetric,
                event_category: 'Web Vitals',
                non_interaction: true
              });
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch (error) {
          console.error('Erro ao medir Core Web Vitals:', error);
        }
      }
    }, 0);
  };
  
  // Este componente não renderiza nada visualmente
  return null;
};

export default PerformanceMonitor;
