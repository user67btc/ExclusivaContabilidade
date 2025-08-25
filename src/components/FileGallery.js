import { useState } from 'react';

export default function FileGallery({ files, onDelete, onSelect }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const handleSelectFile = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(file => file.id));
    }
  };
  
  const handleDeleteSelected = () => {
    if (onDelete && selectedFiles.length > 0) {
      onDelete(selectedFiles);
      setSelectedFiles([]);
    }
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType.startsWith('video/')) return 'fas fa-video';
    if (fileType.startsWith('audio/')) return 'fas fa-music';
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'fas fa-file-excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'fas fa-file-powerpoint';
    if (fileType.includes('zip') || fileType.includes('compressed')) return 'fas fa-file-archive';
    return 'fas fa-file';
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  };
  
  return (
    <div className="file-gallery">
      {files && files.length > 0 ? (
        <>
          <div className="gallery-actions mb-3">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-sm btn-outline-primary me-2" 
                onClick={handleSelectAll}
              >
                {selectedFiles.length === files.length ? (
                  <><i className="far fa-square me-1"></i> Desmarcar Todos</>
                ) : (
                  <><i className="fas fa-check-square me-1"></i> Selecionar Todos</>
                )}
              </button>
              
              {selectedFiles.length > 0 && (
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={handleDeleteSelected}
                >
                  <i className="fas fa-trash me-1"></i> 
                  Excluir {selectedFiles.length} selecionado{selectedFiles.length !== 1 ? 's' : ''}
                </button>
              )}
            </div>
            
            <div className="selected-info">
              {selectedFiles.length > 0 && (
                <span className="badge bg-info">
                  {selectedFiles.length} arquivo{selectedFiles.length !== 1 ? 's' : ''} selecionado{selectedFiles.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="files-grid">
            {files.map(file => {
              const isImage = file.type.startsWith('image/');
              const isSelected = selectedFiles.includes(file.id);
              
              return (
                <div 
                  key={file.id}
                  className={`file-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectFile(file.id)}
                >
                  <div className="file-select">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={isSelected}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                  
                  <div className="file-preview">
                    {isImage ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="file-thumbnail"
                      />
                    ) : (
                      <div className="file-icon">
                        <i className={getFileIcon(file.type)}></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-info">
                    <div className="file-name" title={file.name}>
                      {file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name}
                    </div>
                    <div className="file-details">
                      <div className="file-size">{formatFileSize(file.size)}</div>
                      <div className="file-date">{formatDate(file.uploadDate)}</div>
                    </div>
                  </div>
                  
                  <div className="file-actions">
                    <button 
                      className="btn btn-sm btn-outline-primary action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelect) onSelect(file);
                      }}
                      title="Usar arquivo"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) onDelete([file.id]);
                      }}
                      title="Excluir arquivo"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-gallery">
          <div className="empty-icon">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Nenhum arquivo disponível.</p>
          <p className="empty-hint">Faça upload de arquivos para visualizá-los aqui.</p>
        </div>
      )}

      <style jsx>{`
        .file-gallery {
          margin-top: 20px;
        }
        
        .gallery-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .file-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
        }
        
        .file-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .file-card.selected {
          border-color: #3498db;
          background-color: rgba(52, 152, 219, 0.05);
        }
        
        .file-select {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 10;
        }
        
        .file-preview {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
          overflow: hidden;
        }
        
        .file-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .file-icon {
          font-size: 48px;
          color: #aaa;
        }
        
        .file-info {
          padding: 10px;
        }
        
        .file-name {
          font-weight: 500;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .file-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #777;
        }
        
        .file-actions {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
          background-color: #f5f5f5;
        }
        
        .action-btn {
          padding: 2px 8px;
          margin-left: 5px;
        }
        
        .empty-gallery {
          text-align: center;
          padding: 50px 20px;
          border: 2px dashed #e0e0e0;
          border-radius: 8px;
        }
        
        .empty-icon {
          font-size: 48px;
          color: #ccc;
          margin-bottom: 10px;
        }
        
        .empty-hint {
          font-size: 14px;
          color: #888;
        }
      `}</style>
    </div>
  );
}
