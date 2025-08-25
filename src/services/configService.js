// Serviço para gerenciar configurações do site
// Na implementação final, isto se conectaria a uma API real ou banco de dados
// Por enquanto, usa localStorage como simulação temporária

// Configurações padrão
const defaultConfig = {
  site: {
    title: 'Exclusiva Contabilidade',
    description: 'Soluções contábeis personalizadas para empresas, profissionais e produtores rurais em Campo Grande - MS',
    email: 'contato@exclusivacontabilidade.com.br',
    phone: '(67) 9999-9999',
    whatsapp: '5567999846350',
    address: 'Av. Exemplo, 1234 - Centro, Campo Grande - MS'
  },
  seo: {
    titleTemplate: '%s | Exclusiva Contabilidade',
    defaultTitle: 'Exclusiva Contabilidade - Contabilidade em Campo Grande/MS',
    metaDescription: 'Escritório de contabilidade especializado em serviços para empresas, profissionais liberais e produtores rurais. Atendimento personalizado em Campo Grande/MS.',
    keywords: 'contabilidade, contador, escritório contábil, campo grande, ms, imposto de renda, abrir empresa',
    canonicalUrl: 'https://exclusivacontabilidade.com.br',
    ogImage: '/images/og-image.jpg'
  },
  social: {
    facebook: 'https://facebook.com/exclusivacontabilidade',
    instagram: 'https://instagram.com/exclusivacontabilidade',
    linkedin: 'https://linkedin.com/company/exclusivacontabilidade',
    youtube: ''
  },
  integrations: {
    googleAnalytics: 'G-EXCLCNTB123', // ID do Google Analytics (fictício, substituir pelo real em produção)
    facebookPixel: '',
    googleTagManager: '',
    recaptchaSiteKey: '',
    recaptchaSecretKey: ''
  },
  smtp: {
    host: '',
    port: 587,
    secure: false,
    user: '',
    password: ''
  }
};

// Chave usada para armazenar no localStorage
const CONFIG_STORAGE_KEY = 'exclusiva_site_config';

// Inicializar o serviço
const initialize = () => {
  if (typeof window === 'undefined') {
    return defaultConfig;
  }

  // Verificar se já existe configuração salva
  const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
  
  if (!savedConfig) {
    // Se não existir configuração, salvar a configuração padrão
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
  
  try {
    // Tentar carregar a configuração salva
    return JSON.parse(savedConfig);
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    return defaultConfig;
  }
};

// Obter todas as configurações
const getConfig = () => {
  if (typeof window === 'undefined') {
    return defaultConfig;
  }
  
  const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
  
  if (!savedConfig) {
    return defaultConfig;
  }
  
  try {
    return JSON.parse(savedConfig);
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    return defaultConfig;
  }
};

// Obter uma seção específica das configurações
const getConfigSection = (section) => {
  const config = getConfig();
  return config[section] || {};
};

// Salvar configurações
const saveConfig = (newConfig) => {
  if (typeof window === 'undefined') {
    console.error('Não é possível salvar configurações no servidor');
    return false;
  }
  
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return false;
  }
};

// Atualizar uma seção específica das configurações
const updateConfigSection = (section, sectionData) => {
  const currentConfig = getConfig();
  
  const updatedConfig = {
    ...currentConfig,
    [section]: {
      ...currentConfig[section],
      ...sectionData
    }
  };
  
  return saveConfig(updatedConfig);
};

// Reset para configurações padrão
const resetConfig = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(defaultConfig));
    return true;
  } catch (error) {
    console.error('Erro ao resetar configurações:', error);
    return false;
  }
};

// Funções adicionais para compatibilidade com imports existentes
const getConfigData = getConfig;
const saveConfigData = saveConfig;

const configService = {
  initialize,
  getConfig,
  getConfigSection,
  saveConfig,
  updateConfigSection,
  resetConfig,
  // Alias para compatibilidade com imports existentes
  getConfigData,
  saveConfigData
};

export { getConfigData, saveConfigData };
export default configService;
