/**
 * API para gerenciamento de arquivos - Exclusiva Contabilidade
 * 
 * Este serviço substitui o fileService baseado em localStorage
 * para integração com um backend real.
 */

import axios from 'axios';
import { getToken } from '../authService';

// Configuração base do axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.exclusivacontabilidade.com.br';
const FILE_MANAGER_ENDPOINT = `${API_BASE_URL}/file-manager`;

// Instância do axios com configurações
const api = axios.create({
  baseURL: FILE_MANAGER_ENDPOINT,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para incluir o token de autenticação em todas as requisições
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Serviço de API para gerenciamento de arquivos
const fileManagerApi = {
  /**
   * Listar arquivos e pastas de uma pasta específica
   * @param {string} folderId - ID da pasta (null para raiz)
   * @returns {Promise<{files: Array, folders: Array}>}
   */
  listFolderContents: async (folderId = null) => {
    try {
      const response = await api.get('/contents', { 
        params: { folderId: folderId || 'root' } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao listar conteúdo da pasta:', error);
      throw new Error('Não foi possível carregar os arquivos e pastas.');
    }
  },

  /**
   * Fazer upload de arquivo
   * @param {File} file - Arquivo a ser enviado
   * @param {string} folderId - ID da pasta destino
   * @param {Function} onProgress - Callback para progresso do upload
   * @returns {Promise<Object>} - Objeto do arquivo criado
   */
  uploadFile: async (file, folderId = null, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderId', folderId || 'root');

      const config = {};
      if (onProgress) {
        config.onUploadProgress = progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        };
      }

      const response = await api.post('/upload', formData, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw new Error(`Falha no upload: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Excluir arquivo
   * @param {string} fileId - ID do arquivo
   * @returns {Promise<void>}
   */
  deleteFile: async (fileId) => {
    try {
      await api.delete(`/files/${fileId}`);
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      throw new Error('Não foi possível excluir o arquivo.');
    }
  },

  /**
   * Excluir múltiplos arquivos
   * @param {Array<string>} fileIds - Array de IDs dos arquivos
   * @returns {Promise<{success: number, failed: number}>}
   */
  deleteMultipleFiles: async (fileIds) => {
    try {
      const response = await api.delete('/files', { data: { fileIds } });
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir múltiplos arquivos:', error);
      throw new Error('Falha ao excluir os arquivos selecionados.');
    }
  },

  /**
   * Renomear arquivo
   * @param {string} fileId - ID do arquivo
   * @param {string} newName - Novo nome
   * @returns {Promise<Object>} - Arquivo atualizado
   */
  renameFile: async (fileId, newName) => {
    try {
      const response = await api.patch(`/files/${fileId}/rename`, { name: newName });
      return response.data;
    } catch (error) {
      console.error('Erro ao renomear arquivo:', error);
      throw new Error('Não foi possível renomear o arquivo.');
    }
  },

  /**
   * Criar pasta
   * @param {Object} folderData - Dados da pasta
   * @returns {Promise<Object>} - Pasta criada
   */
  createFolder: async (folderData) => {
    try {
      const response = await api.post('/folders', folderData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pasta:', error);
      throw new Error('Não foi possível criar a pasta.');
    }
  },

  /**
   * Excluir pasta
   * @param {string} folderId - ID da pasta
   * @returns {Promise<void>}
   */
  deleteFolder: async (folderId) => {
    try {
      await api.delete(`/folders/${folderId}`);
    } catch (error) {
      console.error('Erro ao excluir pasta:', error);
      throw new Error('Não foi possível excluir a pasta.');
    }
  },

  /**
   * Renomear pasta
   * @param {string} folderId - ID da pasta
   * @param {string} newName - Novo nome
   * @returns {Promise<Object>} - Pasta atualizada
   */
  renameFolder: async (folderId, newName) => {
    try {
      const response = await api.patch(`/folders/${folderId}/rename`, { name: newName });
      return response.data;
    } catch (error) {
      console.error('Erro ao renomear pasta:', error);
      throw new Error('Não foi possível renomear a pasta.');
    }
  },

  /**
   * Obter URL pública de um arquivo
   * @param {string} fileId - ID do arquivo
   * @returns {Promise<string>} - URL pública
   */
  getPublicUrl: async (fileId) => {
    try {
      const response = await api.get(`/files/${fileId}/public-url`);
      return response.data.url;
    } catch (error) {
      console.error('Erro ao obter URL pública:', error);
      throw new Error('Não foi possível obter a URL do arquivo.');
    }
  },

  /**
   * Buscar arquivos e pastas
   * @param {string} query - Termo de busca
   * @param {string} folderId - ID da pasta onde buscar (null para buscar em todo o sistema)
   * @returns {Promise<{files: Array, folders: Array}>}
   */
  search: async (query, folderId = null) => {
    try {
      const response = await api.get('/search', { 
        params: { query, folderId } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro na busca:', error);
      throw new Error('Falha ao realizar a busca.');
    }
  },

  /**
   * Obter estatísticas de uso
   * @returns {Promise<Object>} - Estatísticas de armazenamento e uso
   */
  getStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw new Error('Não foi possível carregar as estatísticas.');
    }
  }
};

export default fileManagerApi;
