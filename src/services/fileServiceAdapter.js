/**
 * Adaptador para o gerenciador de arquivos que permite transição
 * gradual entre localStorage e API real.
 */

import fileService from './fileService';
import fileManagerApi from './api/fileManagerApi';
import { getConfig } from '../config/api.config';

// Verificar se deve usar localStorage como fallback
const useLocalStorageFallback = getConfig('useLocalStorage');

/**
 * Adaptador para o serviço de arquivos
 * Redireciona chamadas para localStorage ou API real conforme configuração
 */
const fileServiceAdapter = {
  /**
   * Lista arquivos e pastas
   * @param {string} folderId - ID da pasta
   * @returns {Promise<{files: Array, folders: Array}>}
   */
  getFilesAndFolders: async (folderId) => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.listFolderContents(folderId);
      } else {
        // Usando o serviço local
        return {
          files: fileService.getFilesByFolder(folderId),
          folders: fileService.getFoldersByParent(folderId)
        };
      }
    } catch (error) {
      // Fallback para localStorage em caso de falha na API
      if (!useLocalStorageFallback) {
        return {
          files: fileService.getFilesByFolder(folderId),
          folders: fileService.getFoldersByParent(folderId)
        };
      }
      throw error;
    }
  },

  /**
   * Upload de arquivo
   * @param {File|Object} fileData - Arquivo ou dados do arquivo
   * @param {string} folderId - ID da pasta de destino
   * @param {Function} onProgress - Callback de progresso
   * @returns {Promise<Object>} - Arquivo criado
   */
  uploadFile: async (fileData, folderId, onProgress = null) => {
    try {
      if (!useLocalStorageFallback) {
        // Se fileData já é um objeto com metadados (usado no localStorage),
        // precisamos adaptar para o formato esperado pela API real
        if (fileData.name && !fileData.size) {
          throw new Error('Formato de dados incompatível com API real');
        }
        
        return await fileManagerApi.uploadFile(fileData, folderId, onProgress);
      } else {
        // Simular progresso para manter consistência na interface
        if (onProgress) {
          const simulateProgress = () => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              onProgress(progress);
              if (progress >= 100) clearInterval(interval);
            }, 300);
          };
          simulateProgress();
        }
        
        return await fileService.uploadFile({
          ...fileData,
          folderId: folderId || 'root'
        });
      }
    } catch (error) {
      
      // Se falhar na API e for um File real, não podemos usar o localStorage como fallback
      if (!useLocalStorageFallback && fileData instanceof File) {
        throw error;
      }
      
      // Tentar localStorage como fallback apenas se for um objeto de dados compatível
      if (!useLocalStorageFallback && typeof fileData === 'object' && !(fileData instanceof File)) {
        return await fileService.uploadFile({
          ...fileData,
          folderId: folderId || 'root'
        });
      }
      
      throw error;
    }
  },

  /**
   * Excluir arquivo
   * @param {string} fileId - ID do arquivo
   * @returns {Promise<void>}
   */
  deleteFile: async (fileId) => {
    try {
      if (!useLocalStorageFallback) {
        await fileManagerApi.deleteFile(fileId);
      } else {
        fileService.deleteFile(fileId);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        // Tentar fallback se API falhar
        try {
          fileService.deleteFile(fileId);
          return;
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Excluir múltiplos arquivos
   * @param {Array<string>} fileIds - IDs dos arquivos
   * @returns {Promise<{success: number, failed: number}>}
   */
  deleteMultipleFiles: async (fileIds) => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.deleteMultipleFiles(fileIds);
      } else {
        // Implementação local
        let success = 0;
        let failed = 0;
        
        for (const id of fileIds) {
          try {
            fileService.deleteFile(id);
            success++;
          } catch (e) {
            failed++;
          }
        }
        
        return { success, failed };
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        // Tentar fallback
        try {
          let success = 0;
          let failed = 0;
          
          for (const id of fileIds) {
            try {
              fileService.deleteFile(id);
              success++;
            } catch (e) {
              failed++;
            }
          }
          
          return { success, failed };
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
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
      if (!useLocalStorageFallback) {
        return await fileManagerApi.renameFile(fileId, newName);
      } else {
        return fileService.renameFile(fileId, newName);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          return fileService.renameFile(fileId, newName);
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Criar pasta
   * @param {Object} folderData - Dados da pasta
   * @returns {Promise<Object>} - Pasta criada
   */
  createFolder: async (folderData) => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.createFolder(folderData);
      } else {
        return fileService.createFolder(folderData);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          return fileService.createFolder(folderData);
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Excluir pasta
   * @param {string} folderId - ID da pasta
   * @returns {Promise<void>}
   */
  deleteFolder: async (folderId) => {
    try {
      if (!useLocalStorageFallback) {
        await fileManagerApi.deleteFolder(folderId);
      } else {
        fileService.deleteFolder(folderId);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          fileService.deleteFolder(folderId);
          return;
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
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
      if (!useLocalStorageFallback) {
        return await fileManagerApi.renameFolder(folderId, newName);
      } else {
        return fileService.renameFolder(folderId, newName);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          return fileService.renameFolder(folderId, newName);
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Obter URL pública de um arquivo
   * @param {string} fileId - ID do arquivo
   * @returns {Promise<string>} - URL pública
   */
  getPublicUrl: async (fileId) => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.getPublicUrl(fileId);
      } else {
        return fileService.getPublicUrl(fileId);
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          return fileService.getPublicUrl(fileId);
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Buscar arquivos e pastas
   * @param {string} query - Termo de busca
   * @param {string} folderId - ID da pasta onde buscar
   * @returns {Promise<{files: Array, folders: Array}>}
   */
  search: async (query, folderId = null) => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.search(query, folderId);
      } else {
        // Busca no localStorage
        const allFiles = fileService.searchFiles(query, folderId);
        const allFolders = fileService.searchFolders(query, folderId);
        return { files: allFiles, folders: allFolders };
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          const allFiles = fileService.searchFiles(query, folderId);
          const allFolders = fileService.searchFolders(query, folderId);
          return { files: allFiles, folders: allFolders };
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },

  /**
   * Obter estatísticas de uso
   * @returns {Promise<Object>} - Estatísticas
   */
  getStats: async () => {
    try {
      if (!useLocalStorageFallback) {
        return await fileManagerApi.getStats();
      } else {
        // Estatísticas simuladas do localStorage
        const allFiles = fileService.getAllFiles();
        const totalSize = allFiles.reduce((sum, file) => sum + (file.size || 0), 0);
        
        return {
          totalFiles: allFiles.length,
          totalFolders: fileService.getAllFolders().length,
          totalSize,
          usage: {
            used: totalSize,
            total: 1024 * 1024 * 1024, // 1GB simulado
            percentage: Math.min(100, (totalSize / (1024 * 1024 * 1024)) * 100)
          }
        };
      }
    } catch (error) {
      if (!useLocalStorageFallback) {
        try {
          // Fallback para estatísticas locais
          const allFiles = fileService.getAllFiles();
          const totalSize = allFiles.reduce((sum, file) => sum + (file.size || 0), 0);
          
          return {
            totalFiles: allFiles.length,
            totalFolders: fileService.getAllFolders().length,
            totalSize,
            usage: {
              used: totalSize,
              total: 1024 * 1024 * 1024, // 1GB simulado
              percentage: Math.min(100, (totalSize / (1024 * 1024 * 1024)) * 100)
            }
          };
        } catch (localError) {
          console.error('Falha no fallback local:', localError);
        }
      }
      throw error;
    }
  },
  
  // Métodos auxiliares
  
  /**
   * Obter o nome de uma pasta pelo ID
   * @param {string} folderId - ID da pasta
   * @returns {string} - Nome da pasta
   */
  getFolderName: (folderId) => {
    if (folderId === 'root' || !folderId) {
      return 'Raiz';
    }
    
    try {
      const folder = fileService.getFolder(folderId);
      return folder ? folder.name : 'Pasta Desconhecida';
    } catch (error) {
      return 'Pasta Desconhecida';
    }
  },
  
  /**
   * Construir o caminho de breadcrumbs para uma pasta
   * @param {string} folderId - ID da pasta
   * @returns {Array<{id: string, name: string}>} - Caminho de breadcrumbs
   */
  getBreadcrumbs: (folderId) => {
    if (folderId === 'root' || !folderId) {
      return [{ id: 'root', name: 'Raiz' }];
    }
    
    try {
      // Por enquanto usamos apenas o fileService local
      // Em uma implementação completa, isso seria adaptado para API também
      const path = fileService.getFolderPath(folderId);
      return path;
    } catch (error) {
      return [{ id: 'root', name: 'Raiz' }];
    }
  }
};

export default fileServiceAdapter;
