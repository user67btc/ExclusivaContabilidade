/**
 * Configurações da API para diferentes ambientes
 */

const environments = {
  development: {
    apiUrl: 'http://localhost:3001', // API local para desenvolvimento
    useLocalStorage: true, // Usar localStorage como fallback durante desenvolvimento
    uploadMaxSize: 10, // Tamanho máximo de upload em MB
    timeout: 30000, // Timeout para requisições em milissegundos
    imageOptimization: {
      enabled: true,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.9
    }
  },
  test: {
    apiUrl: 'https://test-api.exclusivacontabilidade.com.br',
    useLocalStorage: false,
    uploadMaxSize: 10,
    timeout: 15000,
    imageOptimization: {
      enabled: true,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.9
    }
  },
  production: {
    apiUrl: 'https://api.exclusivacontabilidade.com.br',
    useLocalStorage: false, // Em produção, não usar localStorage como armazenamento
    uploadMaxSize: 15, // Permitir uploads maiores em produção
    timeout: 60000,
    imageOptimization: {
      enabled: true,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.9
    }
  }
};

// Determinar ambiente atual
const getEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  return environments[nodeEnv] || environments.development;
};

// Obter uma configuração específica
const getConfig = (key) => {
  const env = getEnvironment();
  return key ? env[key] : env;
};

// Configurações para o gerenciador de arquivos
const fileManagerConfig = {
  endpoints: {
    base: '/file-manager',
    upload: '/file-manager/upload',
    files: '/file-manager/files',
    folders: '/file-manager/folders',
    search: '/file-manager/search',
    stats: '/file-manager/stats',
  },
  pagination: {
    defaultItemsPerPage: 16,
    pageSizeOptions: [8, 16, 32, 64]
  },
  supportedFileTypes: {
    image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
    document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
    video: ['mp4', 'webm', 'mov', 'avi'],
    audio: ['mp3', 'wav', 'ogg'],
    archive: ['zip', 'rar', '7z']
  },
  icons: {
    folder: 'fas fa-folder',
    image: 'fas fa-image',
    document: 'fas fa-file-alt',
    pdf: 'fas fa-file-pdf',
    excel: 'fas fa-file-excel',
    word: 'fas fa-file-word',
    powerpoint: 'fas fa-file-powerpoint',
    video: 'fas fa-file-video',
    audio: 'fas fa-file-audio',
    archive: 'fas fa-file-archive',
    unknown: 'fas fa-file'
  }
};

// Configurações para análise e métricas
const analyticsConfig = {
  googleAnalytics: {
    enabled: true,
    trackErrors: true,
    eventCategory: 'FileManager'
  }
};

export { 
  getEnvironment, 
  getConfig, 
  fileManagerConfig,
  analyticsConfig
};
