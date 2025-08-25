import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const FileList = ({ 
  files, 
  viewMode = 'grid',
  onSelect,
  onDelete,
  onRename,
  onShowDetails,
  onCopyUrl,
  selectedFiles = [], 
  toggleSelection
}) => {
  // Formatar tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formatar data relativa (ex: "há 2 dias")
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: ptBR
      });
    } catch (e) {
      return dateString;
    }
  };

  // Obter ícone para o tipo de arquivo
  const getFileIcon = (fileType) => {
    if (!fileType) return 'fas fa-file';
    
    if (fileType.startsWith('image/')) return 'fas fa-file-image';
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'fas fa-file-excel';
    if (fileType.startsWith('video/')) return 'fas fa-file-video';
    if (fileType.startsWith('audio/')) return 'fas fa-file-audio';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return 'fas fa-file-archive';
    if (fileType.includes('text') || fileType.includes('txt')) return 'fas fa-file-alt';
    
    return 'fas fa-file';
  };

  // Verificar se é uma imagem
  const isImage = (fileType) => {
    return fileType && fileType.startsWith('image/');
  };

  // Mostrar visualização em grade
  if (viewMode === 'grid') {
    return (
      <div className="row g-3">
        {files.length === 0 && (
          <div className="col-12 text-center py-5">
            <i className="fas fa-folder-open text-muted mb-3" style={{ fontSize: '3rem' }}></i>
            <p className="text-muted">Nenhum arquivo encontrado nesta pasta.</p>
          </div>
        )}
        
        {files.map((file) => (
          <div className="col-md-3 col-sm-4 col-6" key={file.id}>
            <div 
              className={`card h-100 ${selectedFiles.includes(file.id) ? 'border-primary' : ''}`}
              onClick={(e) => {
                if (!e.target.closest('.file-actions')) {
                  toggleSelection && toggleSelection(file.id);
                }
              }}
            >
              <div className="card-img-top text-center p-2 bg-light">
                {isImage(file.type) ? (
                  <div 
                    className="image-thumbnail" 
                    style={{
                      height: '120px',
                      backgroundImage: `url(${file.path})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                ) : (
                  <i className={`${getFileIcon(file.type)} fa-4x text-secondary my-3`}></i>
                )}
              </div>
              
              <div className="card-body p-2">
                <h6 className="card-title text-truncate mb-0" title={file.name}>
                  {file.name}
                </h6>
                <p className="card-text small text-muted mb-2">
                  {formatFileSize(file.size)} • {formatDate(file.dateUploaded)}
                </p>
                
                <div className="file-actions">
                  <div className="btn-group btn-group-sm w-100">
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => onSelect(file)}
                      title="Selecionar arquivo"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => onShowDetails(file)}
                      title="Detalhes"
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                    <button 
                      className="btn btn-outline-secondary dropdown-toggle" 
                      data-bs-toggle="dropdown"
                      title="Mais opções"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)" onClick={() = role="button" role="button"> onCopyUrl(file.id)}>
                          <i className="fas fa-link me-2"></i> Copiar URL
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)" onClick={() = role="button" role="button"> onRename(file)}>
                          <i className="fas fa-edit me-2"></i> Renomear
                        </a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <a className="dropdown-item text-danger" href="javascript:void(0)" onClick={() = role="button" role="button"> onDelete(file)}>
                          <i className="fas fa-trash-alt me-2"></i> Excluir
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {selectedFiles.includes(file.id) && (
                <div className="position-absolute top-0 start-0 m-2">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px'}}>
                    <i className="fas fa-check small"></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Mostrar visualização em lista
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{width: '36px'}}>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Lógica para selecionar todos
                    } else {
                      // Lógica para desmarcar todos
                    }
                  }} 
                />
              </div>
            </th>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <i className="fas fa-folder-open text-muted mb-3 d-block" style={{ fontSize: '2rem' }}></i>
                <p className="text-muted">Nenhum arquivo encontrado nesta pasta.</p>
              </td>
            </tr>
          )}
          
          {files.map((file) => (
            <tr 
              key={file.id} 
              className={selectedFiles.includes(file.id) ? 'table-primary' : ''}
              onClick={(e) => {
                if (!e.target.closest('button, a, input')) {
                  toggleSelection && toggleSelection(file.id);
                }
              }}
            >
              <td>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleSelection && toggleSelection(file.id)}
                  />
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <i className={`${getFileIcon(file.type)} me-2 text-secondary`}></i>
                  <span>{file.name}</span>
                </div>
              </td>
              <td>{formatFileSize(file.size)}</td>
              <td>{formatDate(file.dateUploaded)}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => onSelect(file)}
                    title="Selecionar arquivo"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => onShowDetails(file)}
                    title="Detalhes"
                  >
                    <i className="fas fa-info-circle"></i>
                  </button>
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={() => onDelete(file)}
                    title="Excluir"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
