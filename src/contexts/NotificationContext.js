import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

// Criar contexto
export const NotificationContext = createContext();

/**
 * Provedor de contexto para gerenciar notificações na aplicação
 * Substitui o uso de alerts por um sistema de notificações moderno
 */
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Mostrar uma notificação
  const showNotification = (notificationData) => {
    setNotification(notificationData);
  };

  // Fechar a notificação
  const closeNotification = () => {
    setNotification(null);
  };

  // Funções de ajuda
  const success = (message, duration = 3000) => {
    showNotification({ message, type: 'success', duration, visible: true });
  };

  const error = (message, duration = 5000) => {
    showNotification({ message, type: 'error', duration, visible: true });
  };

  const warning = (message, duration = 4000) => {
    showNotification({ message, type: 'warning', duration, visible: true });
  };

  const info = (message, duration = 3000) => {
    showNotification({ message, type: 'info', duration, visible: true });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        closeNotification,
        success,
        error,
        warning,
        info
      }}
    >
      {children}
      {notification && (
        <Notification
          {...notification}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  }
  
  return context;
};
