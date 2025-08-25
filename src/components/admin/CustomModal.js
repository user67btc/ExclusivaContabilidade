import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Componente CustomModal para substituir prompts e confirms padrão com UI mais agradável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.show - Controla se o modal está visível
 * @param {string} props.title - Título do modal
 * @param {string} props.message - Mensagem do modal (opcional)
 * @param {string} props.type - Tipo do modal: 'confirm', 'prompt', 'alert'
 * @param {string} props.defaultValue - Valor padrão para modal tipo prompt
 * @param {function} props.onConfirm - Callback quando confirmado (recebe valor input em caso de prompt)
 * @param {function} props.onCancel - Callback quando cancelado
 * @param {string} props.confirmLabel - Texto do botão de confirmação (padrão: "Confirmar")
 * @param {string} props.cancelLabel - Texto do botão de cancelação (padrão: "Cancelar")
 */
export default function CustomModal({
  show,
  title,
  message = '',
  type = 'confirm',
  defaultValue = '',
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar'
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef(null);
  const [modalElement, setModalElement] = useState(null);
  
  useEffect(() => {
    // Resetar valor do input quando modal abre
    if (show) {
      setInputValue(defaultValue);
    }
  }, [show, defaultValue]);
  
  useEffect(() => {
    // Focar no input quando modal abre (para tipo prompt)
    if (show && type === 'prompt' && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }
  }, [show, type]);
  
  useEffect(() => {
    // Criar elemento para portal apenas no cliente
    if (typeof window !== 'undefined') {
      // Verificar se já existe um elemento para modal
      let element = document.getElementById('modal-root');
      if (!element) {
        element = document.createElement('div');
        element.id = 'modal-root';
        document.body.appendChild(element);
      }
      setModalElement(element);
      
      // Cleanup ao desmontar
      return () => {
        // Não remover o elemento, apenas garantir que está limpo
        if (element && element.childNodes.length === 0) {
          // document.body.removeChild(element);
        }
      };
    }
  }, []);
  
  // Manipulador do evento submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'prompt') {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  // Manipulador do evento teclado para fechar com ESC
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };
  
  // Se o elemento do modal não estiver disponível ou não estiver visível, não renderizar
  if (!modalElement || !show) {
    return null;
  }
  
  // Renderiza o modal em um portal
  return createPortal(
    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => {
        // Fechar ao clicar fora do modal
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Fechar"
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {message && <p className="mb-3">{message}</p>}
              
              {type === 'prompt' && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    ref={inputRef}
                  />
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              {type !== 'alert' && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </button>
              )}
              <button type="submit" className={`btn ${type === 'alert' ? 'btn-primary' : type === 'confirm' ? 'btn-danger' : 'btn-success'}`}>
                {confirmLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    modalElement
  );
}
