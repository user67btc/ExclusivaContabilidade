import React, { useState, useEffect, useRef, useCallback } from 'react';
import fileService from '../../services/fileService';
import { Modal } from 'bootstrap';
import Image from 'next/image';
import AlertNotification from './AlertNotification';
import CustomModal from './CustomModal';

// Função para rastreamento de eventos (substitua pelo seu código real de Google Analytics)
const trackEvent = (category, action, label = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

// Componente para o gerenciador de arquivos carregado dinamicamente no lado cliente
// para evitar problemas com o Bootstrap durante o SSR
export default function FileManagerContent() {
  // Referências para arrastar e soltar arquivos
  const dropAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  // Estado para manipulação de arquivos
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null); // null representa a pasta raiz
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // 12 itens por página (3x4 grid)
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // Estados para estatísticas e cache
  const [storageStats, setStorageStats] = useState({
    totalBytes: 0,
    totalMB: 0,
    maxStorage: 200, // MB
    usagePercent: 0,
    lastUpdated: null
  });
  const CACHE_TIMEOUT = 60000; // 1 minuto em milissegundos
  
  // Estado para feedback e notificações
  const [notification, setNotification] = useState({ message: '', type: 'info', show: false });
  const [errorMessage, setErrorMessage] = useState('');
  
  // Estados para os modais personalizados
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'confirm', // 'confirm', 'prompt', 'alert'
    defaultValue: '',
    confirmCallback: () => {},
    cancelCallback: () => {},
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar'
  });
  const notificationTimeoutRef = useRef(null);
  
  // Estado para controlar o drag and drop
  const [isDragging, setIsDragging] = useState(false);

  // Note: Funções auxiliares (showModal, hideModal, showNotification) estão implementadas usando useCallback mais abaixo no código
  
  // Note: handleFileInputChange e handleFileUpload estão implementadas mais abaixo com useCallback
  
  // Implementando os event handlers para drag and drop
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    };
    
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    };
    
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      // Obter arquivos do evento de drop
      const droppedFiles = Array.from(e.dataTransfer.files);
      
      if (droppedFiles.length === 0) return;
      
      if (droppedFiles.length > 5) {
        showNotification('Limite máximo de 5 arquivos por vez', 'warning');
        trackEvent('FileManager', 'drop_files_limit_exceeded', `Files: ${droppedFiles.length}`);
        return;
      }
      
      // Validar tamanho dos arquivos
      for (const file of droppedFiles) {
        if (file.size > 5 * 1024 * 1024) { // 5MB
          showNotification(`Arquivo ${file.name} excede o limite de 5MB`, 'warning');
          trackEvent('FileManager', 'drop_file_size_exceeded', `File: ${file.name}, Size: ${Math.round(file.size / (1024 * 1024))}MB`);
          return;
        }
      }
      
      // Processar upload diretamente aqui
      setLoading(true);
      let successCount = 0;
      let errorCount = 0;
      
      // Processar arquivos
      Promise.all(
        droppedFiles.map(async (file) => {
          try {
            await fileService.uploadFile({
              name: file.name,
              type: file.type || 'application/octet-stream',
              size: file.size,
              folderId: currentFolder
            });
            successCount++;
            return { success: true, file };
          } catch (error) {
            errorCount++;
            console.error(`Erro ao processar arquivo ${file.name}:`, error);
            return { success: false, file, error };
          }
        })
      ).then(() => {
        loadFilesAndFolders();
        updateStorageStats();
        
        // Feedback para o usuário
        if (successCount > 0) {
          const message = successCount === 1 
            ? 'Arquivo enviado com sucesso' 
            : `${successCount} arquivos enviados com sucesso`;
          showNotification(message, 'success');
          trackEvent('FileManager', 'drop_files_success', `Success: ${successCount}, Errors: ${errorCount}`);
        }
        
        if (errorCount > 0) {
          const message = errorCount === 1 
            ? 'Ocorreu um erro ao processar um arquivo' 
            : `Ocorreram erros ao processar ${errorCount} arquivos`;
          showNotification(message, 'danger');
        }
        
        setLoading(false);
      }).catch(error => {
        console.error('Erro ao processar arquivos:', error);
        showNotification('Erro ao processar arquivos', 'danger');
        trackEvent('FileManager', 'drop_files_error', error.message || 'Unknown error');
        setLoading(false);
      });
    };
    
    // Adicionar event listeners
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragenter', handleDragEnter);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);
    
    // Limpar event listeners
    return () => {
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('dragenter', handleDragEnter);
      dropArea.removeEventListener('dragleave', handleDragLeave);
      dropArea.removeEventListener('drop', handleDrop);
    };
  }, [isDragging, currentFolder, loadFilesAndFolders, updateStorageStats, showNotification]);

  // Função para exibir notificações
  const showNotification = useCallback((message, type = 'info') => {
    // Limpar qualquer timeout anterior
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    // Definir a nova notificação
    setNotification({
      message,
      type,
      show: true
    });
    
    // Configurar timeout para ocultar a notificação após 5 segundos
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  }, []);

  // Função para mostrar o modal personalizado
  const showModal = useCallback((options) => {
    setModalState({
      show: true,
      title: options.title || 'Confirmação',
      message: options.message || '',
      type: options.type || 'confirm',
      defaultValue: options.defaultValue || '',
      confirmCallback: options.confirmCallback || (() => {}),
      cancelCallback: options.cancelCallback || (() => {}),
      confirmLabel: options.confirmLabel || 'Confirmar',
      cancelLabel: options.cancelLabel || 'Cancelar'
    });
  }, []);

  // Função para ocultar o modal
  const hideModal = useCallback(() => {
    setModalState(prev => ({ ...prev, show: false }));
  }, []);

  // Função para atualizar estatísticas de armazenamento
  const updateStorageStats = useCallback(() => {
    const now = Date.now();
    
    // Verificar se as estatísticas em cache ainda são válidas
    if (
      storageStats.lastUpdated && 
      (now - storageStats.lastUpdated < CACHE_TIMEOUT)
    ) {
      return storageStats;
    }
    
    // Cache expirado ou inexistente, calcular novas estatísticas
    try {
      const totalBytes = fileService.getAllFiles().files.reduce((acc, file) => acc + file.size, 0);
      const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
      const maxStorage = 200; // MB
      const usagePercent = Math.min(100, Math.round((totalMB / maxStorage) * 100));
      
      const newStats = {
        totalBytes,
        totalMB,
        maxStorage,
        usagePercent,
        lastUpdated: now
      };
      
      setStorageStats(newStats);
      return newStats;
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      return storageStats; // Mantém as estatísticas anteriores em caso de erro
    }
  }, [storageStats]);

  // Função para realizar busca de arquivos
  const handleSearch = useCallback(async (term) => {
    if (!term || term.trim() === '') {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    setLoading(true);
    
    try {
      // Buscar arquivos que correspondem ao termo de pesquisa
      const foundFiles = fileService.searchFiles(term);
      
      // Buscar pastas que correspondem ao termo por nome
      const { folders: allFolders } = fileService.getAllFiles();
      const foundFolders = allFolders.filter(
        folder => folder.name.toLowerCase().includes(term.toLowerCase())
      );
      
      // Atualizar resultados de busca
      setSearchResults({
        files: foundFiles,
        folders: foundFolders,
        term
      });
      
      // Calcular paginação para resultados de busca
      const total = foundFiles.length + foundFolders.length;
      setTotalItems(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
      setCurrentPage(1); // Voltar para a primeira página nos resultados de busca
      
      setLoading(false);
      
      // Mostrar feedback para o usuário
      if (total === 0) {
        showNotification(`Nenhum resultado encontrado para "${term}"`, 'info');
      } else {
        showNotification(`${total} ${total === 1 ? 'resultado encontrado' : 'resultados encontrados'} para "${term}"`, 'success');
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      setErrorMessage(`Erro ao realizar busca: ${error.message || 'Falha na busca'}`);
      setLoading(false);
      setIsSearching(false);
    }
  }, [itemsPerPage, showNotification]);
  
  // Função para limpar a busca e retornar à navegação normal
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults(null);
    setIsSearching(false);
    loadFilesAndFolders(); // Recarregar a visualização normal
  }, [loadFilesAndFolders]);
  
  // Função para carregar arquivos e pastas com tratamento de erros aprimorado
  const loadFilesAndFolders = useCallback(async () => {
    // Se estiver em modo de busca, não recarregar os arquivos/pastas normais
    if (isSearching) return;
    
    setLoading(true);
    setErrorMessage('');
    setSelectedFile(null);
    setSelectedFolder(null);
    
    try {
      // Inicializar o serviço se necessário
      fileService.initialize();
      
      // Verificar conexão (simulação de verificação de API)
      const isConnected = Math.random() > 0.05; // 5% de chance de falha para simulação
      if (!isConnected) {
        throw new Error('Falha na conexão com o servidor');
      }
      
      // Obter dados do serviço
      const { files: allFiles, folders: allFolders } = fileService.getAllFiles();
      
      // Filtrar arquivos para a pasta atual
      const filteredFiles = currentFolder === null
        ? allFiles.filter(file => file.folderId === null)
        : fileService.getFilesByFolder(currentFolder);
      
      // Obter subpastas da pasta atual
      const filteredFolders = fileService.getSubfolders(currentFolder);
      
      // Atualizar estado
      setFiles(filteredFiles);
      setFolders(filteredFolders);
      
      // Calcular paginação
      const total = filteredFiles.length + filteredFolders.length;
      setTotalItems(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
      if (currentPage > Math.ceil(total / itemsPerPage)) {
        setCurrentPage(1);
      }
      
      // Atualizar estatísticas se necessário
      if (!storageStats.lastUpdated || Date.now() - storageStats.lastUpdated > CACHE_TIMEOUT) {
        updateStorageStats();
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
      setErrorMessage(`Não foi possível carregar os arquivos. ${error.message || 'Por favor, tente novamente.'}`);
      setLoading(false);
      trackEvent('FileManager', 'error_loading', error.message || 'Unknown error');
    }
  }, [currentFolder, itemsPerPage, currentPage, isSearching, storageStats, updateStorageStats]);

  // Função para carregar arquivos e pastas no início
  useEffect(() => {
    loadFilesAndFolders();
    
    // Carregar estatísticas de armazenamento
    updateStorageStats();
    
    // Configurar intervalo para atualizar estatísticas
    const statsInterval = setInterval(() => {
      updateStorageStats();
    }, CACHE_TIMEOUT);
    
    // Limpar intervalo no unmount
    return () => {
      clearInterval(statsInterval);
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [loadFilesAndFolders, updateStorageStats]);

  // Função para processar arquivos selecionados manualmente
  const handleFileInputChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    if (selectedFiles.length > 5) {
      showNotification('Limite máximo de 5 arquivos por vez', 'warning');
      trackEvent('FileManager', 'upload_files_limit_exceeded', `Files: ${selectedFiles.length}`);
      return;
    }
    
    // Validar tamanho dos arquivos
    for (const file of selectedFiles) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        showNotification(`Arquivo ${file.name} excede o limite de 5MB`, 'warning');
        trackEvent('FileManager', 'file_size_exceeded', `File: ${file.name}, Size: ${Math.round(file.size / (1024 * 1024))}MB`);
        return;
      }
    }
    
    // Processamento similar ao handleDrop
    setLoading(true);
    let successCount = 0;
    let errorCount = 0;
    
    // Processar arquivos
    Promise.all(
      selectedFiles.map(async (file) => {
        try {
          await fileService.uploadFile({
            name: file.name,
            type: file.type || 'application/octet-stream',
            size: file.size,
            folderId: currentFolder
          });
          successCount++;
          return { success: true, file };
        } catch (error) {
          errorCount++;
          console.error(`Erro ao processar arquivo ${file.name}:`, error);
          return { success: false, file, error };
        }
      })
    ).then(() => {
      loadFilesAndFolders();
      updateStorageStats();
      
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Feedback para o usuário
      if (successCount > 0) {
        const message = successCount === 1 
          ? 'Arquivo enviado com sucesso' 
          : `${successCount} arquivos enviados com sucesso`;
        showNotification(message, 'success');
        trackEvent('FileManager', 'upload_files_success', `Success: ${successCount}, Errors: ${errorCount}`);
      }
      
      if (errorCount > 0) {
        const message = errorCount === 1 
          ? 'Ocorreu um erro ao processar um arquivo' 
          : `Ocorreram erros ao processar ${errorCount} arquivos`;
        showNotification(message, 'danger');
      }
      
      setLoading(false);
    }).catch(error => {
      console.error('Erro ao processar arquivos:', error);
      showNotification('Erro ao processar arquivos', 'danger');
      trackEvent('FileManager', 'files_upload_error', error.message || 'Unknown error');
      setLoading(false);
    });
  }, [currentFolder, loadFilesAndFolders, updateStorageStats, showNotification, fileInputRef]);
  
  // Função para navegar para pasta
  const handleFolderClick = (folder) => {
    setCurrentFolder(folder.id);
  };

  // Função para voltar à pasta anterior
  const handleBackClick = () => {
    if (!currentFolder) return;
    
    // Obter pasta atual
    const folder = fileService.getFolderById(currentFolder);
    if (!folder) {
      setCurrentFolder(null);
      return;
    }
    
    // Navegar para a pasta pai
    setCurrentFolder(folder.parentId);
  };

  // Função para criar nova pasta usando modal personalizado
  const handleCreateFolder = () => {
    showModal({
      title: 'Nova Pasta',
      message: 'Digite o nome da nova pasta:',
      type: 'prompt',
      defaultValue: 'Nova Pasta',
      confirmLabel: 'Criar',
      confirmCallback: (value) => {
        if (value && value.trim() !== '') {
          setLoading(true);
          try {
            const newFolderId = fileService.createFolder({
              name: value.trim(),
              parentId: currentFolder
            });
            loadFilesAndFolders();
            showNotification(`Pasta "${value.trim()}" criada com sucesso`, 'success');
          } catch (error) {
            showNotification(`Erro ao criar pasta: ${error.message}`, 'danger');
            setLoading(false);
          }
        }
        hideModal();
      },
      cancelCallback: () => hideModal()
    });
  };

  // Função para renomear arquivo ou pasta
  const handleRename = (item, isFolder) => {
    showModal({
      title: `Renomear ${isFolder ? 'Pasta' : 'Arquivo'}`,
      message: `Digite o novo nome para ${isFolder ? 'a pasta' : 'o arquivo'}:`,
      type: 'prompt',
      defaultValue: item.name,
      confirmLabel: 'Renomear',
      confirmCallback: (value) => {
        if (value && value.trim() !== '' && value !== item.name) {
          setLoading(true);
          try {
            if (isFolder) {
              fileService.renameFolder(item.id, value.trim());
            } else {
              fileService.renameFile(item.id, value.trim());
            }
            loadFilesAndFolders();
            showNotification(`${isFolder ? 'Pasta' : 'Arquivo'} renomeado com sucesso`, 'success');
          } catch (error) {
            showNotification(`Erro ao renomear: ${error.message}`, 'danger');
            setLoading(false);
          }
        }
        hideModal();
      },
      cancelCallback: () => hideModal()
    });
  };

  // Função para excluir arquivo ou pasta
  const handleDelete = (item, isFolder) => {
    showModal({
      title: `Excluir ${isFolder ? 'Pasta' : 'Arquivo'}`,
      message: `Tem certeza que deseja excluir ${isFolder ? 'a pasta' : 'o arquivo'} "${item.name}"? Esta ação não pode ser desfeita.`,
      type: 'confirm',
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
      confirmCallback: () => {
        setLoading(true);
        try {
          if (isFolder) {
            fileService.deleteFolder(item.id);
          } else {
            fileService.deleteFile(item.id);
          }
          loadFilesAndFolders();
          showNotification(`${isFolder ? 'Pasta' : 'Arquivo'} excluído com sucesso`, 'success');
        } catch (error) {
          showNotification(`Erro ao excluir: ${error.message}`, 'danger');
          setLoading(false);
        }
        hideModal();
      },
      cancelCallback: () => hideModal()
    });
  };

  // Renderizar itens paginados
  const paginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    let itemsToRender;
    
    // Se estiver em modo de busca, usar resultados da busca
    if (isSearching && searchResults) {
      itemsToRender = [
        ...searchResults.folders.map(folder => ({ ...folder, isFolder: true })),
        ...searchResults.files.map(file => ({ ...file, isFolder: false }))
      ];
    } else {
      // Modo de navegação normal: pastas primeiro, depois arquivos
      itemsToRender = [
        ...folders.map(folder => ({ ...folder, isFolder: true })),
        ...files.map(file => ({ ...file, isFolder: false }))
      ];
    }
    
    return itemsToRender.slice(startIndex, endIndex);
  };

  // Função para mudar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    trackEvent('FileManager', 'page_change', `Page: ${pageNumber}`);
  };
  
  // Função para visualizar detalhes do arquivo
  const handleViewFile = (file) => {
    if (!file) {
      showNotification('Erro ao carregar detalhes do arquivo', 'warning');
      return;
    }
    
    trackEvent('FileManager', 'view_file_details', `File: ${file.name}`);
    
    try {
      // Formatar informações para exibição
      const createdAt = file.createdAt ? new Date(file.createdAt).toLocaleDateString() + ' ' + new Date(file.createdAt).toLocaleTimeString() : 'N/A';
      const lastModified = file.modifiedAt ? new Date(file.modifiedAt).toLocaleDateString() + ' ' + new Date(file.modifiedAt).toLocaleTimeString() : 'N/A';
      const fileSizeKB = Math.round(file.size / 1024);
      const fileSizeMB = fileSizeKB > 1024 ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : fileSizeKB + ' KB';
      
      // Definir ícone com base no tipo
      let fileIcon = '<i class="fas fa-file fa-4x text-secondary"></i>';
      
      if (file.type === 'pdf') {
        fileIcon = '<i class="fas fa-file-pdf fa-4x text-danger"></i>';
      } else if (file.type === 'image') {
        fileIcon = '<i class="fas fa-file-image fa-4x text-primary"></i>';
      } else if (file.type === 'doc' || file.type === 'docx') {
        fileIcon = '<i class="fas fa-file-word fa-4x text-info"></i>';
      } else if (file.type === 'xls' || file.type === 'xlsx') {
        fileIcon = '<i class="fas fa-file-excel fa-4x text-success"></i>';
      }
      
      // Montar mensagem com detalhes do arquivo
      let message = `
        <div class="text-center mb-3">${fileIcon}</div>
        <p><strong>Nome:</strong> ${file.name}</p>
        <p><strong>Tamanho:</strong> ${fileSizeMB}</p>
        <p><strong>Criado em:</strong> ${createdAt}</p>
        <p><strong>Última modificação:</strong> ${lastModified}</p>
      `;
      
      // Se tiver URL pública, mostrar opção para copiar
      if (file.publicUrl) {
        message += `
          <p><strong>URL Pública:</strong></p>
          <div class="input-group mb-3">
            <input type="text" class="form-control" value="${file.publicUrl}" readonly>
            <button class="btn btn-outline-secondary" type="button" onclick="navigator.clipboard.writeText('${file.publicUrl}').then(() => alert('URL copiada!'))">Copiar</button>
          </div>
        `;
      }
      
      // Se for uma imagem, adicionar pré-visualização
      if (file.type && file.type.includes('image') && file.publicUrl) {
        message += `
          <div class="text-center mt-3">
            <p><strong>Pré-visualização:</strong></p>
            <div class="image-preview p-2 border rounded">
              <img 
                src="${file.publicUrl}" 
                alt="Pré-visualização de ${file.name}" 
                class="img-fluid" 
                style="max-height: 200px;"
                onerror="this.onerror=null; this.src=''; this.alt='Pré-visualização não disponível'; this.parentNode.classList.add('bg-light', 'p-4', 'text-center', 'text-muted');"
              / alt="Imagem do site Exclusiva Contabilidade" alt="Imagem ilustrativa Exclusiva Contabilidade">
            </div>
          </div>
        `;
      }
      
      // Abrir modal com detalhes
      setFileDetails(file);
      setModalState({
        show: true,
        title: 'Detalhes do Arquivo',
        message: message,
        type: 'alert',
        confirmLabel: 'Fechar',
        confirmCallback: () => {
          setModalState(prev => ({ ...prev, show: false }));
          setFileDetails(null);
        },
        cancelCallback: null
      });
    } catch (error) {
      console.error('Erro ao processar detalhes do arquivo:', error);
      trackEvent('FileManager', 'error', `View file details error: ${error.message || 'Unknown error'}`);
      showNotification(`Erro ao processar detalhes do arquivo: ${error.message || 'Erro desconhecido'}`, 'danger');
    }
  };

  // Renderizar botões de paginação
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;
    
    const buttons = [];
    const maxButtons = 5; // Mostrar no máximo 5 botões
    
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    // Botão para página anterior
    if (currentPage > 1) {
      buttons.push(
        <li key="prev" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Anterior"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
      );
    } else {
      buttons.push(
        <li key="prev" className="page-item disabled">
          <span className="page-link">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
      );
    }
    
    // Botões numerados
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    
    // Botão para próxima página
    if (currentPage < totalPages) {
      buttons.push(
        <li key="next" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Próximo"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      );
    } else {
      buttons.push(
        <li key="next" className="page-item disabled">
          <span className="page-link">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      );
    }
    
    return (
      <nav aria-label="Navegação de páginas">
        <ul className="pagination mb-0">
          {buttons}
        </ul>
      </nav>
    );
  };
  
  // Obter nome da pasta atual
  const getCurrentFolderName = () => {
    if (currentFolder === null) return "Pasta Raiz";
    const folder = fileService.getFolderById(currentFolder);
    return folder ? folder.name : "Pasta Raiz";
  };
  
  // Função para gerar breadcrumb
  const generateBreadcrumb = () => {
    const breadcrumbItems = [{ id: null, name: 'Raiz' }];
    
    if (currentFolder) {
      let folderId = currentFolder;
      let folder;
      
      while (folderId) {
        folder = fileService.getFolderById(folderId);
        if (folder) {
          breadcrumbItems.unshift(folder);
          folderId = folder.parentId;
        } else {
          break;
        }
      }
    }
    
    return breadcrumbItems;
  };
  
  return (
    <>
      <div 
        className={`gerenciador-arquivos container-fluid p-4 ${isDragging ? 'bg-light border border-primary rounded' : ''}`} 
        ref={dropAreaRef}
        role="region"
        aria-label="Gerenciador de Arquivos"
      >
        {isDragging && (
          <div className="drag-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{background: 'rgba(13, 110, 253, 0.1)', zIndex: 100}}>
            <div className="text-center p-5 rounded bg-white shadow">
              <i className="fas fa-cloud-upload-alt fa-4x text-primary mb-3"></i>
              <h4>Solte os arquivos aqui</h4>
              <p className="text-muted">Limite máximo: 5 arquivos ou 5MB por arquivo</p>
            </div>
          </div>
        )}
        
        {!isDragging && !loading && totalItems === 0 && !isSearching && (
          <div className="text-center p-5 my-5 border border-dashed rounded">
            <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
            <h5>Arraste e solte arquivos aqui para fazer upload</h5>
            <p className="text-muted">Ou clique no botão "Upload" acima</p>
          </div>
        )}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3">Gerenciador de Arquivos</h1>
          <p className="text-muted">Gerencie seus arquivos e pastas</p>
        </div>
        <div className="col-auto">
          <div className="btn-group">
            <button className="btn btn-success"
              onClick={() => {
                // Rastrear evento
                trackEvent('FileManager', 'click_upload_button', 'Upload Button');
                // Aciona o input file oculto para seleção de arquivos
                fileInputRef.current?.click();
              }}
              title="Fazer upload de arquivos"
              aria-label="Fazer upload de arquivos"
            >
              <i className="fas fa-cloud-upload-alt me-1" aria-hidden="true"></i>
              Upload
            </button>
            
            {/* Input file oculto para seleção de arquivos */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInputChange} 
              multiple 
              accept="*/*"
              style={{ display: 'none' }} 
              aria-hidden="true"
            />

            <button className="btn btn-primary ms-2"
              onClick={() => {
                // Rastrear evento
                trackEvent('FileManager', 'click_manual_upload_button', 'Manual Upload');
                // Função de upload usando modal personalizado
                showModal({
                  title: 'Enviar Arquivo Manualmente',
                  message: 'Digite o nome do arquivo (incluindo a extensão):',
                  type: 'prompt',
                  defaultValue: 'Novo arquivo.pdf',
                  confirmLabel: 'Enviar',
                  confirmCallback: (fileName) => {
                    if (fileName && fileName.trim() !== '') {
                      setLoading(true);
                      const fileType = fileName.endsWith('.pdf') ? 'application/pdf' :
                                     fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' :
                                     fileName.endsWith('.png') ? 'image/png' : 'application/octet-stream';

                      try {
                        fileService.uploadFile({
                          name: fileName.trim(),
                          type: fileType,
                          size: Math.floor(Math.random() * 1000000) + 10000, // Tamanho aleatório
                          folderId: currentFolder
                        }).then(() => {
                          loadFilesAndFolders();
                          showNotification(`Arquivo ${fileName.trim()} enviado com sucesso`, 'success');  
                        });
                      } catch (error) {
                        showNotification(`Erro ao enviar arquivo: ${error.message}`, 'danger');
                        setLoading(false);
                      }
                    }
                    hideModal();
                  },
                  cancelCallback: () => hideModal()
                });
              }}
              aria-label="Enviar arquivo manualmente"
              title="Enviar arquivo (entrada manual)"
            >
              <i className="fas fa-upload me-2" aria-hidden="true"></i>
              Upload
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleCreateFolder}
              aria-label="Criar nova pasta"
              title="Criar uma nova pasta"
            >
              <i className="fas fa-folder-plus me-2" aria-hidden="true"></i>
              Nova Pasta
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas de armazenamento */}
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Armazenamento</h5>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    // Forçar atualização de estatísticas
                    setStorageStats(prev => ({ ...prev, lastUpdated: null }));
                    updateStorageStats();
                    showNotification('Estatísticas atualizadas', 'info');
                    trackEvent('FileManager', 'refresh_stats', 'Manual refresh');
                  }}
                  title="Atualizar estatísticas"
                  aria-label="Atualizar estatísticas de armazenamento"
                >
                  <i className="fas fa-sync-alt" aria-hidden="true"></i>
                </button>
              </div>
              <div className="mt-3">
                <div className="progress">
                  <div
                    className={`progress-bar ${storageStats.usagePercent > 90 ? 'bg-danger' : storageStats.usagePercent > 70 ? 'bg-warning' : 'bg-success'}`}
                    role="progressbar"
                    style={{ width: `${storageStats.usagePercent}%` }}
                    aria-valuenow={storageStats.usagePercent} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {storageStats.usagePercent}%
                  </div>
                </div>
                  <div className="d-flex justify-content-between mt-2 text-muted small">
                    <span>{storageStats.totalMB} MB usados</span>
                    <span>{storageStats.maxStorage} MB disponíveis</span>
                  </div>
                  {storageStats.lastUpdated && (
                    <div className="text-muted small text-end mt-1">
                      Atualizado em {new Date(storageStats.lastUpdated).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8">
            {/* Campo de busca */}
            <div className="input-group mb-3">
              <input 
                type="search"
                className="form-control"
                placeholder="Buscar arquivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                aria-label="Buscar arquivos e pastas"
              />
              <button 
                className="btn btn-outline-primary" 
                type="button"
                onClick={() => {
                  trackEvent('FileManager', 'search_button', `Search: ${searchTerm}`);
                  handleSearch(searchTerm);
                }}
                disabled={!searchTerm.trim()}
              >
                <i className="fas fa-search"></i>
              </button>
              {/* ... */}
            </div>
          </div>
          {/* ... */}
        </div>

        {/* ... */}

        {/* Grid de pastas e arquivos */}
        <div className="col-12">
          <div className="row g-3">
            {paginatedItems().map(item => (
              <div 
                key={`${item.isFolder ? 'folder' : 'file'}-${item.id}`} 
                className="col-md-3 col-sm-6"
              >
                {item.isFolder ? (
                  <div className="card h-100 folder-card">
                    <div className="card-img-top text-center p-3 bg-light">
                      <i className="fas fa-folder fa-4x text-warning"></i>
                    </div>
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate mb-1">{item.name}</h6>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`card h-100 ${selectedFile === item.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedFile(selectedFile === item.id ? null : item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-img-top text-center p-3 bg-light">
                      {item.type === 'pdf' && <i className="fas fa-file-pdf fa-4x text-danger"></i>}
                      {item.type === 'image' && <i className="fas fa-file-image fa-4x text-primary"></i>}
                      {item.type !== 'pdf' && item.type !== 'image' && <i className="fas fa-file fa-4x text-secondary"></i>}
                    </div>
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate mb-1">{item.name}</h6>
                      <p className="card-text small text-muted">
                        {Math.round(item.size / 1024)} KB
                        {item.createdAt && ` • ${new Date(item.createdAt).toLocaleDateString()}`}
                      </p>
                      
                      {/* Menu de opções para arquivo selecionado */}
                      {selectedFile === item.id && (
                        <div className="mt-2">
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                trackEvent('FileManager', 'view_file', `File: ${item.name}`);
                                // Chamar a função de visualização de detalhes
                                handleViewFile(item);
                              }}
                              title="Visualizar Detalhes"
                              aria-label="Visualizar detalhes do arquivo"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                trackEvent('FileManager', 'rename_file', `File: ${item.name}`);
                                handleRename(item, false);
                              }}
                              title="Renomear"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                trackEvent('FileManager', 'delete_file', `File: ${item.name}`);
                                handleDelete(item, false);
                              }}
                              title="Excluir"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Área de notificação vazia */}

        <div className="text-center p-5 my-4 border border-dashed rounded">
          {isSearching ? (
            <>
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h5>Nenhum resultado encontrado para "{searchTerm}"</h5>
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  trackEvent('FileManager', 'click_upload_button');
                  fileInputRef.current.click();
                }}
                title="Enviar arquivos"
                aria-label="Fazer upload de arquivos"
              >
                <i className="fas fa-cloud-upload-alt me-1" aria-hidden="true"></i>
                Selecionar Arquivos
              </button>
            </>
          ) : (
            <>
              <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
              <h5>Nenhum arquivo ou pasta nesta localização</h5>
              <p className="text-muted">Arraste e solte arquivos aqui para fazer upload<br />ou use os botões acima para criar novas pastas</p>
            </>
          )}
        </div>

      </div>
      
      {/* Modal personalizado para interações */}
      <CustomModal 
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        defaultValue={modalState.defaultValue}
        onConfirm={modalState.confirmCallback}
        onCancel={modalState.cancelCallback}
        confirmLabel={modalState.confirmLabel}
        cancelLabel={modalState.cancelLabel}
      />
      
      {/* Alerta para notificações */}
      {notification.show && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <AlertNotification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(prev => ({ ...prev, show: false }))} 
          />
        </div>
      )}
    </>
  );
}
