import { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  const showNotification = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    if (!currentNotification) {
      setCurrentNotification(notification);
    }
  };

  const hideNotification = () => {
    setCurrentNotification(null);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    if (currentNotification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, currentNotification.duration);

      return () => clearTimeout(timer);
    } else if (notifications.length > 0) {
      setCurrentNotification(notifications[0]);
      setNotifications(prev => prev.slice(1));
    }
  }, [currentNotification, notifications]);

  const value = {
    showNotification,
    hideNotification,
    showSuccess: (message, duration) => showNotification(message, 'success', duration),
    showError: (message, duration) => showNotification(message, 'error', duration),
    showWarning: (message, duration) => showNotification(message, 'warning', duration),
    showInfo: (message, duration) => showNotification(message, 'info', duration),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notification Snackbar */}
      <Snackbar
        open={!!currentNotification}
        autoHideDuration={currentNotification?.duration}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {currentNotification && (
          <Alert
            severity={currentNotification.type}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={hideNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ minWidth: 300 }}
          >
            {currentNotification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};
