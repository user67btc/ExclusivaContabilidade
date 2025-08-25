/**
 * Serviço de upload otimizado para o gerenciador de arquivos
 * Inclui otimização de imagens e relatórios de progresso
 */

import { getConfig } from '../config/api.config';
import fileServiceAdapter from './fileServiceAdapter';
import { trackEvent, FileManagerEvents, trackFileManagerError } from '../utils/analytics';

/**
 * Otimizar imagem antes do upload
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<File>} - Imagem otimizada
 */
export const optimizeImage = async (file) => {
  // Verificar se é uma imagem
  if (!file.type.startsWith('image/')) {
    return file;
  }
  
  // Carregar configuração
  const config = getConfig('imageOptimization');
  if (!config || !config.enabled) {
    return file;
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        // Obter parâmetros de otimização da configuração
        const MAX_WIDTH = config.maxWidth || 1920;
        const MAX_HEIGHT = config.maxHeight || 1080;
        const MAX_SIZE_MB = config.maxSizeMB || 1;
        const QUALITY = config.quality || 0.9;
        
        let width = img.width;
        let height = img.height;
        
        // Verificar se a imagem precisa ser redimensionada
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        // Se a imagem já está dentro dos parâmetros, retornar original
        if (width === img.width && height === img.height && file.size <= MAX_SIZE_MB * 1024 * 1024) {
          resolve(file);
          return;
        }
        
        // Criar canvas para redimensionar
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem redimensionada
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determinar formato de saída
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        let quality = QUALITY;
        
        canvas.toBlob(
          (blob) => {
            // Se o tamanho ainda for grande demais, reduzir mais a qualidade para JPEGs
            if (blob.size > MAX_SIZE_MB * 1024 * 1024 && format === 'image/jpeg') {
              quality = 0.7;
              canvas.toBlob(
                (reducedBlob) => {
                  const optimizedFile = new File(
                    [reducedBlob],
                    file.name,
                    { type: format }
                  );
                  
                  // Rastrear evento de otimização
                  trackEvent(FileManagerEvents.IMAGE_OPTIMIZED, {
                    original_size: file.size,
                    optimized_size: optimizedFile.size,
                    original_dimensions: `${img.width}x${img.height}`,
                    optimized_dimensions: `${width}x${height}`,
                    reduction_percentage: Math.round((1 - (optimizedFile.size / file.size)) * 100)
                  });
                  
                  resolve(optimizedFile);
                },
                format,
                quality
              );
            } else {
              const optimizedFile = new File(
                [blob],
                file.name,
                { type: format }
              );
              
              // Rastrear evento de otimização
              if (optimizedFile.size < file.size) {
                trackEvent(FileManagerEvents.IMAGE_OPTIMIZED, {
                  original_size: file.size,
                  optimized_size: optimizedFile.size,
                  original_dimensions: `${img.width}x${img.height}`,
                  optimized_dimensions: `${width}x${height}`,
                  reduction_percentage: Math.round((1 - (optimizedFile.size / file.size)) * 100)
                });
              }
              
              resolve(optimizedFile);
            }
          },
          format,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Falha ao carregar imagem'));
    };
    
    reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
  });
};

/**
 * Fazer upload de múltiplos arquivos com otimização
 * @param {Array<File>} files - Arquivos para upload
 * @param {string} folderId - ID da pasta de destino
 * @param {Function} onProgress - Callback para progresso (recebe objeto com dados de progresso)
 * @param {Function} onComplete - Callback para conclusão (recebe estatísticas finais)
 * @returns {Promise<{success: number, failed: number, uploads: Array}>}
 */
export const uploadFiles = async (files, folderId, onProgress, onComplete) => {
  if (!files || files.length === 0) {
    return { success: 0, failed: 0, uploads: [] };
  }
  
  // Estatísticas iniciais
  const stats = {
    total: files.length,
    processed: 0,
    optimizing: 0,
    uploading: 0,
    success: 0,
    failed: 0,
    uploads: []
  };
  
  // Enviar estatísticas iniciais
  if (onProgress) {
    onProgress(stats);
  }
  
  // Contador de arquivos otimizados
  let optimizedCount = 0;
  
  // Otimizar todas as imagens primeiro
  const optimizedFiles = [];
  for (let i = 0; i < files.length; i++) {
    try {
      stats.optimizing++;
      if (onProgress) onProgress({...stats});
      
      const file = files[i];
      const optimizedFile = await optimizeImage(file);
      optimizedFiles.push(optimizedFile);
      
      if (file.size !== optimizedFile.size) {
        optimizedCount++;
      }
      
      stats.optimizing--;
      if (onProgress) onProgress({...stats});
    } catch (error) {
      console.error('Falha ao otimizar arquivo:', error);
      optimizedFiles.push(files[i]); // Usar arquivo original em caso de falha
      
      stats.optimizing--;
      if (onProgress) onProgress({...stats});
    }
  }
  
  // Fazer upload dos arquivos otimizados
  const results = [];
  
  for (let i = 0; i < optimizedFiles.length; i++) {
    const file = optimizedFiles[i];
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    stats.uploading++;
    
    try {
      // Atualizar progresso individual do arquivo
      const handleProgress = (progress) => {
        if (onProgress) {
          onProgress({
            ...stats,
            currentFile: {
              id: fileId,
              name: file.name,
              progress,
              size: file.size
            }
          });
        }
      };
      
      // Fazer upload do arquivo
      const uploadedFile = await fileServiceAdapter.uploadFile(
        file, 
        folderId, 
        handleProgress
      );
      
      // Registrar sucesso
      results.push({
        id: fileId,
        status: 'success',
        originalFile: file,
        result: uploadedFile
      });
      
      stats.success++;
    } catch (error) {
      // Registrar falha
      results.push({
        id: fileId,
        status: 'error',
        originalFile: file,
        error: error.message || 'Falha no upload'
      });
      
      stats.failed++;
      trackFileManagerError('upload_error', `Falha ao enviar ${file.name}: ${error.message}`);
    } finally {
      stats.processed++;
      stats.uploading--;
      
      if (onProgress) {
        onProgress({...stats});
      }
    }
  }
  
  // Estatísticas finais
  const finalStats = {
    total: files.length,
    processed: stats.processed,
    success: stats.success,
    failed: stats.failed,
    optimized: optimizedCount,
    uploads: results
  };
  
  // Enviar estatísticas finais
  if (onComplete) {
    onComplete(finalStats);
  }
  
  // Rastrear estatísticas gerais
  trackEvent(FileManagerEvents.BULK_UPLOAD_COMPLETED, {
    total_files: files.length,
    successful: stats.success,
    failed: stats.failed,
    optimized_count: optimizedCount
  });
  
  return finalStats;
};

// Exportar serviço completo
const uploadService = {
  optimizeImage,
  uploadFiles
};

export default uploadService;
