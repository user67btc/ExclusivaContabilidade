import { useState, useEffect, createContext, useContext } from 'react';

// Context para notificações
const NotificationContext = createContext();

// Hook para usar notificações
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de NotificationProvider');
  }
  return context;
};

// Componente de notificação individual
const Notification = ({ notification, onRemove }) => {
  const { id, type, title, message, duration = 5000, persistent = false } = notification;

  useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, persistent, onRemove]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-bell';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      case 'info':
        return 'notification-info';
      default:
        return 'notification-default';
    }
  };

  return (
    <div className={`notification ${getTypeClass()} fade-in-right`}>
      <div className="notification-icon">
        <i className={`fas ${getIcon()}`}></i>
      </div>
      <div className="notification-content">
        {title && <div className="notification-title">{title}</div>}
        <div className="notification-message">{message}</div>
      </div>
      <button 
        className="notification-close"
        onClick={() => onRemove(id)}
        aria-label="Fechar notificação"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

// Container de notificações
const NotificationContainer = ({ notifications, removeNotification }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

// Provider de notificações
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Funções de conveniência
  const showSuccess = (message, title = 'Sucesso!', options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options,
    });
  };

  const showError = (message, title = 'Erro!', options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 8000, // Erros ficam mais tempo
      ...options,
    });
  };

  const showWarning = (message, title = 'Atenção!', options = {}) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      ...options,
    });
  };

  const showInfo = (message, title = 'Informação', options = {}) => {
    return addNotification({
      type: 'info',
      title,
      message,
      ...options,
    });
  };

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
