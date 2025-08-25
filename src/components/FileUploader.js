import { useState, useRef } from 'react';

export default function FileUploader({ onFileUpload, accept = "*", maxSizeMB = 5 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Converter MB para bytes

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const validateFile = (file) => {
    // Validar tamanho do arquivo
    if (file.size > maxSizeBytes) {
      setError(`O arquivo excede o tamanho máximo de ${maxSizeMB}MB.`);
      return false;
    }

    // Validar tipo de arquivo se accept não for "*"
    if (accept !== "*") {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const fileType = file.type;
      
      const isAccepted = acceptedTypes.some(type => {
        // Verificar se bate com o tipo MIME ou com a extensão
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase();
        } else {
          return fileType.match(new RegExp(type.replace('*', '.*')));
        }
      });

      if (!isAccepted) {
        setError(`Tipo de arquivo não permitido. Tipos aceitos: ${accept}`);
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = async (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (files.length === 0) return;

    // Validar cada arquivo
    let validFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        validFiles.push(files[i]);
      } else {
        // Se encontrar arquivo inválido, parar processamento
        return;
      }
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    
    try {
      // Em uma implementação real, aqui enviaria os arquivos para o servidor
      // Por enquanto, simulamos um upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Callback para o componente pai
      if (onFileUpload) {
        // Criamos URLs locais temporárias para os arquivos
        const fileObjects = validFiles.map(file => ({
          id: `temp_${Date.now()}_${file.name}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          file: file, // Passamos o arquivo para processamento real futuro
          uploadDate: new Date().toISOString()
        }));
        
        onFileUpload(fileObjects);
      }
      
      // Reset do input para permitir upload do mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error("Erro no upload:", err);
      setError("Ocorreu um erro no upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-uploader">
      {error && (
        <div className="alert alert-danger mb-3">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}
      
      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Enviando...</span>
            </div>
            <p className="mt-2">Enviando arquivo(s)...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <i className="fas fa-cloud-upload-alt"></i>
            </div>
            <p className="upload-text">
              Arraste e solte arquivos aqui ou <span className="browse-text">clique para selecionar</span>
            </p>
            <p className="upload-hint">
              {accept === "*" ? "Todos os formatos aceitos" : `Formatos aceitos: ${accept}`}
              <br />
              Tamanho máximo: {maxSizeMB}MB
            </p>
          </>
        )}
        
        <input 
          ref={fileInputRef}
          type="file"
          className="file-input"
          onChange={handleFileInput}
          accept={accept}
          multiple
          disabled={uploading}
        />
      </div>

      <style jsx>{`
        .file-uploader {
          margin-bottom: 20px;
        }

        .upload-zone {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #f9f9f9;
        }

        .upload-zone:hover {
          background-color: #f0f0f0;
          border-color: #aaa;
        }

        .upload-zone.dragging {
          background-color: #e8f4ff;
          border-color: #3498db;
        }

        .upload-zone.uploading {
          opacity: 0.7;
          pointer-events: none;
        }

        .upload-icon {
          font-size: 48px;
          color: #aaa;
          margin-bottom: 15px;
        }

        .upload-text {
          font-size: 16px;
          margin-bottom: 10px;
          color: #555;
        }

        .browse-text {
          color: #3498db;
          text-decoration: underline;
        }

        .upload-hint {
          font-size: 12px;
          color: #888;
        }

        .file-input {
          display: none;
        }
      `}</style>
    </div>
  );
}
