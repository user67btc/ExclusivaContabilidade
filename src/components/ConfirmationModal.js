import { useState, useEffect, useRef } from 'react';

export default function ConfirmationModal({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar',
  variant = 'danger',
  requireVerification = false,
  verificationText = 'confirmar'
}) {
  const [verificationInput, setVerificationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  
  // Definir classes de botão com base na variante
  const getButtonClass = () => {
    switch (variant) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'success':
        return 'btn-success';
      case 'info':
        return 'btn-info';
      default:
        return 'btn-primary';
    }
  };
  
  // Verificar se a entrada de verificação é válida
  const isVerificationValid = () => {
    if (!requireVerification) return true;
    return verificationInput.toLowerCase() === verificationText.toLowerCase();
  };
  
  // Manipular confirmação
  const handleConfirm = async () => {
    if (!isVerificationValid()) return;
    
    setLoading(true);
    
    try {
      if (onConfirm) {
        await onConfirm();
      }
    } catch (error) {
      console.error('Erro na ação de confirmação:', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  
  // Fechar modal e limpar estado
  const handleClose = () => {
    setVerificationInput('');
    if (onClose) onClose();
  };
  
  // Efeito para manipular ESC para fechar
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && show) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [show]);
  
  // Efeito para manipular clique fora do modal para fechar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && show) {
        handleClose();
      }
    };
    
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal" ref={modalRef}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Fechar"
            onClick={handleClose}
            disabled={loading}
          ></button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          
          {requireVerification && (
            <div className="verification-input mt-3">
              <label htmlFor="verificationInput" className="form-label">
                Para confirmar, digite <strong>{verificationText}</strong> abaixo:
              </label>
              <input
                type="text"
                className="form-control"
                id="verificationInput"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                placeholder={`Digite "${verificationText}" para confirmar`}
                disabled={loading}
              />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            type="button" 
            className={`btn ${getButtonClass()}`}
            onClick={handleConfirm}
            disabled={loading || (requireVerification && !isVerificationValid())}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processando...
              </>
            ) : confirmText}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .confirmation-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 20px;
        }
        
        .confirmation-modal {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 500px;
          overflow: hidden;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
        }
        
        .modal-title {
          margin: 0;
          font-size: 1.25rem;
        }
        
        .modal-body {
          padding: 1rem;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 1rem;
          border-top: 1px solid #e9ecef;
        }
      `}</style>
    </div>
  );
}
