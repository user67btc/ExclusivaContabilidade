import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de notificação para exibir alertas temporários
 * @param {object} props - Propriedades do componente
 * @param {string} props.message - Mensagem a ser exibida
 * @param {string} props.type - Tipo do alerta (success, danger, warning, info)
 * @param {number} props.duration - Duração em milissegundos que o alerta ficará visível
 * @param {function} props.onClose - Função a ser chamada quando o alerta for fechado
 */
const AlertNotification = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  const alertClass = `alert alert-${type} alert-dismissible fade show`;

  return (
    <div className={alertClass} role="alert" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050, maxWidth: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      {message}
      <button 
        type="button" 
        className="btn-close" 
        aria-label="Fechar" 
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      />
    </div>
  );
};

AlertNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func
};

export default AlertNotification;
