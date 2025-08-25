/**
 * Utilitários para rastreamento de eventos no Google Analytics
 */

/**
 * Envia um evento para o Google Analytics
 * @param {string} eventName - Nome do evento 
 * @param {object} eventParams - Parâmetros adicionais do evento
 */
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (typeof window === 'undefined' || !window.gtag) {
      return; // Retorna silenciosamente se não estiver no navegador ou GA não estiver carregado
    }
    
    window.gtag('event', eventName, eventParams);
  } catch (error) {
    console.error('Erro ao enviar evento para o Google Analytics:', error);
  }
};

/**
 * Eventos específicos das ferramentas financeiras
 */
export const ToolsEvents = {
  // Calculadora de Impostos
  IMPOSTOS_CALCULO_INICIADO: 'impostos_calculo_iniciado',
  IMPOSTOS_CALCULO_CONCLUIDO: 'impostos_calculo_concluido',
  IMPOSTOS_REGIME_SELECIONADO: 'impostos_regime_selecionado',
  
  // Simulador de Parcelamento
  PARCELAMENTO_SIMULACAO_INICIADA: 'parcelamento_simulacao_iniciada',
  PARCELAMENTO_SIMULACAO_CONCLUIDA: 'parcelamento_simulacao_concluida',
  PARCELAMENTO_MODALIDADE_SELECIONADA: 'parcelamento_modalidade_selecionada',
  
  // Simulador de Regimes Tributários
  REGIMES_COMPARACAO_INICIADA: 'regimes_comparacao_iniciada',
  REGIMES_COMPARACAO_CONCLUIDA: 'regimes_comparacao_concluida',
  REGIMES_MELHOR_OPCAO_IDENTIFICADA: 'regimes_melhor_opcao_identificada',
  
  // Cálculo de Encargos Trabalhistas
  ENCARGOS_CALCULO_INICIADO: 'encargos_calculo_iniciado',
  ENCARGOS_CALCULO_CONCLUIDO: 'encargos_calculo_concluido',
  ENCARGOS_TIPO_SELECIONADO: 'encargos_tipo_selecionado',
  
  // Consulta CNPJ
  CNPJ_CONSULTA_REDIRECIONAMENTO: 'cnpj_consulta_redirecionamento',
  
  // Calendário Fiscal
  CALENDARIO_NAVEGACAO_MES: 'calendario_navegacao_mes',
  CALENDARIO_FILTRO_APLICADO: 'calendario_filtro_aplicado',
  CALENDARIO_EVENTO_VISUALIZADO: 'calendario_evento_visualizado',
  
  // Compartilhamento
  FERRAMENTA_COMPARTILHADA: 'ferramenta_compartilhada',
  
  // Engajamento
  FERRAMENTA_ACESSADA: 'ferramenta_acessada',
  TEMPO_USO_FERRAMENTA: 'tempo_uso_ferramenta',
  FORMULARIO_PREENCHIDO: 'formulario_preenchido'
};

/**
 * Eventos específicos do gerenciador de arquivos
 */
export const FileManagerEvents = {
  // Navegação
  FOLDER_NAVIGATION: 'folder_navigation',
  VIEW_MODE_CHANGE: 'view_mode_change',
  
  // Arquivos
  FILE_UPLOAD: 'file_upload',
  FILE_DOWNLOAD: 'file_download',
  FILE_DELETE: 'file_delete',
  FILE_RENAME: 'file_rename',
  FILE_SELECT: 'file_select',
  
  // Pastas
  FOLDER_CREATE: 'folder_create',
  FOLDER_DELETE: 'folder_delete',
  FOLDER_RENAME: 'folder_rename',
  
  // Filtros e busca
  SEARCH_EXECUTE: 'search_execute',
  FILTER_APPLY: 'filter_apply',
  
  // Paginação
  PAGINATION_CHANGE: 'pagination_change',
  ITEMS_PER_PAGE_CHANGE: 'items_per_page_change',
  
  // Outros
  BULK_OPERATION: 'bulk_operation'
};

/**
 * Rastreamento específico para ferramentas financeiras
 * @param {string} toolName - Nome da ferramenta
 * @param {string} action - Ação realizada
 * @param {object} additionalParams - Parâmetros adicionais
 */
export const trackToolUsage = (toolName, action, additionalParams = {}) => {
  trackEvent('tool_usage', {
    tool_name: toolName,
    action: action,
    ...additionalParams
  });
};

/**
 * Rastreamento de performance das ferramentas
 * @param {string} toolName - Nome da ferramenta
 * @param {number} loadTime - Tempo de carregamento em ms
 * @param {number} calculationTime - Tempo de cálculo em ms
 */
export const trackToolPerformance = (toolName, loadTime, calculationTime) => {
  trackEvent('tool_performance', {
    tool_name: toolName,
    load_time: loadTime,
    calculation_time: calculationTime
  });
};

/**
 * Rastreamento de conversões (leads)
 * @param {string} source - Origem do lead (qual ferramenta)
 * @param {string} action - Ação de conversão
 */
export const trackConversion = (source, action) => {
  trackEvent('conversion', {
    source: source,
    action: action,
    timestamp: new Date().toISOString()
  });
};

/**
 * Rastreamento de erros nas ferramentas
 * @param {string} toolName - Nome da ferramenta
 * @param {string} errorType - Tipo do erro
 * @param {string} errorMessage - Mensagem de erro
 */
export const trackToolError = (toolName, errorType, errorMessage) => {
  trackEvent('tool_error', {
    tool_name: toolName,
    error_type: errorType,
    error_message: errorMessage
  });
};

/**
 * Rastreamento de erros no gerenciador de arquivos
 * @param {string} errorType - Tipo do erro
 * @param {string} errorMessage - Mensagem de erro
 */
export const trackFileManagerError = (errorType, errorMessage) => {
  trackEvent('file_manager_error', {
    error_type: errorType,
    error_message: errorMessage
  });
};

/**
 * Hook personalizado para rastrear tempo de permanência na página
 * @param {string} pageName - Nome da página
 */
export const usePageTimeTracking = (pageName) => {
  if (typeof window === 'undefined') return;
  
  const startTime = Date.now();
  
  const trackPageTime = () => {
    const timeSpent = Date.now() - startTime;
    trackEvent('page_time', {
      page_name: pageName,
      time_spent: Math.round(timeSpent / 1000) // em segundos
    });
  };
  
  // Rastrear quando o usuário sair da página
  window.addEventListener('beforeunload', trackPageTime);
  
  // Cleanup
  return () => {
    window.removeEventListener('beforeunload', trackPageTime);
  };
};

/**
 * Rastreamento de scroll depth
 * @param {string} pageName - Nome da página
 */
export const trackScrollDepth = (pageName) => {
  if (typeof window === 'undefined') return;
  
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const reached = new Set();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent('scroll_depth', {
            page_name: pageName,
            depth_percent: milestone
          });
        }
      });
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
