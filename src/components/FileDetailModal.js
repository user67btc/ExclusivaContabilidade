import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const FileDetailModal = ({ fileDetails }) => {
  if (!fileDetails) return null;

  // Formatar tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formatar data completa
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  // Verificar se é uma imagem
  const isImage = (fileType) => {
    return fileType && fileType.startsWith('image/');
  };

  // Obter ícone para o tipo de arquivo
  const getFileTypeIcon = (fileType) => {
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

  // Obter descrição amigável para o tipo de arquivo
  const getFileTypeDescription = (fileType) => {
    if (!fileType) return 'Arquivo desconhecido';
    
    if (fileType.startsWith('image/jpeg')) return 'Imagem JPEG';
    if (fileType.startsWith('image/png')) return 'Imagem PNG';
    if (fileType.startsWith('image/gif')) return 'Imagem GIF';
    if (fileType.startsWith('image/svg')) return 'Imagem SVG';
    if (fileType.startsWith('image/')) return 'Imagem';
    if (fileType.includes('pdf')) return 'Documento PDF';
    if (fileType.includes('word')) return 'Documento Word';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'Planilha Excel';
    if (fileType.startsWith('video/')) return 'Arquivo de vídeo';
    if (fileType.startsWith('audio/')) return 'Arquivo de áudio';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return 'Arquivo compactado';
    if (fileType.includes('text') || fileType.includes('txt')) return 'Arquivo de texto';
    
    return fileType;
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Detalhes do arquivo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div className="modal-body">
        <div className="row">
          {/* Visualização do arquivo */}
          <div className="col-md-6 text-center mb-4">
            {isImage(fileDetails.type) ? (
              <div className="image-preview">
                <Image 
                  src={fileDetails.path} 
                  width={fileDetails.dimensions?.width || 300} 
                  height={fileDetails.dimensions?.height || 300}
                  alt={fileDetails.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                  unoptimized
                />
              </div>
            ) : (
              <div className="file-icon-large bg-light rounded p-4">
                <i 
                  className={`${getFileTypeIcon(fileDetails.type)} fa-5x text-secondary`}
                  style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                ></i>
              </div>
            )}
          </div>

          {/* Informações do arquivo */}
          <div className="col-md-6">
            <h5 className="mb-3 text-break">{fileDetails.name}</h5>
            
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td className="text-muted">Tipo:</td>
                  <td>{getFileTypeDescription(fileDetails.type)}</td>
                </tr>
                <tr>
                  <td className="text-muted">Tamanho:</td>
                  <td>{formatFileSize(fileDetails.size)}</td>
                </tr>
                <tr>
                  <td className="text-muted">Enviado em:</td>
                  <td>{formatDate(fileDetails.dateUploaded)}</td>
                </tr>
                {fileDetails.dimensions && (
                  <tr>
                    <td className="text-muted">Dimensões:</td>
                    <td>{fileDetails.dimensions.width} × {fileDetails.dimensions.height} pixels</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* URL do arquivo */}
        <div className="mt-3">
          <label className="form-label">URL do arquivo:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm"
              value={fileDetails.path}
              readOnly
            />
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(fileDetails.path);
                // Idealmente, mostrar feedback de que foi copiado
              }}
            >
              <i className="fas fa-copy me-1"></i> Copiar
            </button>
          </div>
          <small className="text-muted">Use esta URL para referenciar o arquivo em seu site.</small>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  );
};

export default FileDetailModal;
