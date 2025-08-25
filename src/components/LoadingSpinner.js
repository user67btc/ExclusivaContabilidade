import { useEffect, useState } from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Carregando...', 
  overlay = false,
  fullScreen = false 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide após 10 segundos para evitar loading infinito
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const sizeClasses = {
    small: 'fa-sm',
    medium: 'fa-lg',
    large: 'fa-2x',
    xlarge: 'fa-3x'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    white: 'text-white',
    muted: 'text-muted'
  };

  const spinnerContent = (
    <div className={`loading-spinner-content ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner-icon">
        <i className={`fas fa-spinner fa-spin ${sizeClasses[size]} ${colorClasses[color]}`}></i>
      </div>
      {text && (
        <div className={`spinner-text mt-2 ${colorClasses[color]}`}>
          {text}
        </div>
      )}
    </div>
  );

  if (overlay || fullScreen) {
    return (
      <div 
        className={`loading-overlay ${fullScreen ? 'fullscreen-overlay' : ''}`}
        style={{
          position: fullScreen ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: fullScreen 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: fullScreen ? 9999 : 999,
          backdropFilter: 'blur(2px)'
        }}
      >
        {spinnerContent}
      </div>
    );
  }

  return (
    <div 
      className="loading-spinner"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      {spinnerContent}
    </div>
  );
};

// Componente específico para carregamento de página
export const PageLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simula carregamento da página
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <LoadingSpinner
      size="large"
      color="primary"
      text="Carregando página..."
      fullScreen={true}
    />
  );
};

// Componente para carregamento de seções
export const SectionLoader = ({ text = "Carregando conteúdo..." }) => (
  <LoadingSpinner
    size="medium"
    color="primary"
    text={text}
    overlay={false}
  />
);

// Componente para botões com loading
export const ButtonLoader = ({ size = "small", color = "white" }) => (
  <i className={`fas fa-spinner fa-spin ${size === 'small' ? 'fa-sm' : 'fa-lg'} ${color === 'white' ? 'text-white' : 'text-primary'}`}></i>
);

export default LoadingSpinner;
