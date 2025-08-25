import React, { useState, useEffect, useRef, useCallback } from 'react';
import fileService from '../../services/fileService';
import { Modal } from 'bootstrap';
import Image from 'next/image';
import AlertNotification from './AlertNotification';

// Este componente foi extraído da página arquivos.js e é carregado dinamicamente
// apenas no lado do cliente para evitar problemas com o Bootstrap durante o SSR
export default function GerenciadorArquivosContent() {
  // Estado para manipulação de arquivos
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null); // null representa a pasta raiz
  const [loading, setLoading] = useState(true);
  
  // Estado para feedback e notificações
  const [notification, setNotification] = useState({ message: '', type: 'info', show: false });
  const [errorMessage, setErrorMessage] = useState('');
  
  // Ref para o timeout da notificação
  const notificationTimeoutRef = useRef(null);
  
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
  }, []);
  
  // Função para carregar arquivos e pastas com tratamento de erros aprimorado
  const loadFilesAndFolders = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Aqui implementaríamos a chamada para o serviço de arquivos
      // Por enquanto, apenas simulamos o carregamento bem-sucedido
      setTimeout(() => {
        setFiles([
          { id: '1', name: 'documento.pdf', type: 'pdf', size: 120000, createdAt: new Date().toISOString(), folderId: null },
          { id: '2', name: 'imagem.jpg', type: 'image', size: 450000, createdAt: new Date().toISOString(), folderId: null }
        ]);
        
        setFolders([
          { id: 'folder1', name: 'Imagens', parentId: null },
          { id: 'folder2', name: 'Documentos', parentId: null }
        ]);
        
        setLoading(false);
        showNotification('Arquivos carregados com sucesso', 'success');
      }, 1000);
      
      // Na implementação real, seria algo como:
      // const { files, folders } = await fileService.getFilesAndFolders(currentFolder);
      // setFiles(files);
      // setFolders(folders);
      // setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
      setErrorMessage('Não foi possível carregar os arquivos. Por favor, tente novamente.');
      setLoading(false);
      showNotification('Erro ao carregar arquivos. Tente novamente mais tarde.', 'danger');
    }
  }, [currentFolder, showNotification]);
  
  // Carregar arquivos e pastas ao iniciar ou mudar de pasta
  useEffect(() => {
    loadFilesAndFolders();
  }, [currentFolder, loadFilesAndFolders]);
  
  // Componente encapsulado para evitar problemas com SSR
  return (
    <>
      {/* Sistema de notificações */}
      {notification.show && (
        <AlertNotification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({...notification, show: false})} 
        />
      )}
      
      <div className="gerenciador-arquivos container-fluid p-4">
        <div className="row mb-4">
          <div className="col">
            <h1 className="h3">Gerenciador de Arquivos</h1>
            <p className="text-muted">Gerencie seus arquivos e pastas</p>
          </div>
          <div className="col-auto">
            <div className="btn-group">
              <button className="btn btn-success" onClick={() => alert('Função de upload em desenvolvimento')}>
                <i className="fas fa-upload me-2"></i>
                Upload
              </button>
              <button className="btn btn-primary" onClick={() => alert('Função de nova pasta em desenvolvimento')}>
                <i className="fas fa-folder-plus me-2"></i>
                Nova Pasta
              </button>
            </div>
          </div>
        </div>
        
        <div className="alert alert-info">
          <i className="fas fa-info-circle me-2"></i>
          <strong>Aviso:</strong> O gerenciador de arquivos está em fase de migração para o novo sistema.
          Use a versão anterior em <a href="/admin/gerenciador" className="alert-link">Gerenciador de Arquivos (Legado)</a> até que esta versão esteja concluída.
        </div>
        
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Pastas</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action active" role="button">
                    <i className="fas fa-folder me-2"></i> Raiz
                  </a>
                  <a href="#" className="list-group-item list-group-item-action" role="button">
                    <i className="fas fa-folder me-2"></i> Imagens
                  </a>
                  <a href="#" className="list-group-item list-group-item-action" role="button">
                    <i className="fas fa-folder me-2"></i> Documentos
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Armazenamento</h5>
              </div>
              <div className="card-body">
                <div className="progress mb-3">
                  <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                <div className="small text-muted">
                  <strong>50 MB</strong> de 200 MB utilizados
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" role="button">Raiz</a></li>
                    </ol>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-outline-secondary active">
                      <i className="fas fa-th"></i>
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fas fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-3 col-sm-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="fas fa-folder fa-4x text-warning mb-3"></i>
                        <h5 className="card-title mb-0">Imagens</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="fas fa-folder fa-4x text-warning mb-3"></i>
                        <h5 className="card-title mb-0">Documentos</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card h-100">
                      <div className="card-img-top text-center p-3 bg-light">
                        <i className="fas fa-file-pdf fa-4x text-danger"></i>
                      </div>
                      <div className="card-body p-2">
                        <h6 className="card-title text-truncate">documento.pdf</h6>
                        <p className="card-text small text-muted">120 KB • há 3 dias</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card h-100">
                      <div className="card-img-top text-center p-3 bg-light">
                        <i className="fas fa-file-image fa-4x text-primary"></i>
                      </div>
                      <div className="card-body p-2">
                        <h6 className="card-title text-truncate">imagem.jpg</h6>
                        <p className="card-text small text-muted">450 KB • há 5 dias</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted small">
            </div>
            <div className="card-body">
              <div className="progress mb-3">
                <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
              </div>
              <div className="small text-muted">
                <strong>50 MB</strong> de 200 MB utilizados
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#" role="button">Raiz</a></li>
                  </ol>
                </div>
                <div className="btn-group">
                  <button className="btn btn-outline-secondary active">
                    <i className="fas fa-th"></i>
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-folder fa-4x text-warning mb-3"></i>
                      <h5 className="card-title mb-0">Imagens</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-folder fa-4x text-warning mb-3"></i>
                      <h5 className="card-title mb-0">Documentos</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="card h-100">
                    <div className="card-img-top text-center p-3 bg-light">
                      <i className="fas fa-file-pdf fa-4x text-danger"></i>
                    </div>
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate">documento.pdf</h6>
                      <p className="card-text small text-muted">120 KB • há 3 dias</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="card h-100">
                    <div className="card-img-top text-center p-3 bg-light">
                      <i className="fas fa-file-image fa-4x text-primary"></i>
                    </div>
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate">imagem.jpg</h6>
                      <p className="card-text small text-muted">450 KB • há 5 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted small">
              4 itens
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de carregamento */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2 text-muted">Carregando arquivos...</p>
        </div>
      )}
      
      {/* Mensagem de erro */}
      {errorMessage && (
        <div className="alert alert-danger my-3">
          <i className="fas fa-exclamation-circle me-2"></i>
          {errorMessage}
          <button 
            className="btn btn-sm btn-outline-danger ms-3" 
            onClick={loadFilesAndFolders}
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  </>
);
