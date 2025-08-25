import { useState } from 'react';
import Image from 'next/image';

const ImageOptimizer = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  placeholder = 'blur',
  quality = 85,
  fallback = '/assets/images/placeholder.svg'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder SVG base64
  const placeholderSVG = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f1f5f9"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#64748b" font-family="Arial, sans-serif" font-size="14">
        Carregando...
      </text>
    </svg>`
  ).toString('base64')}`;

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div 
        className={`image-fallback ${className}`}
        style={{ 
          width: width, 
          height: height,
          background: 'var(--bg-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid var(--bg-gray)'
        }}
      >
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <i className="fas fa-image fa-2x mb-2"></i>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Imagem não disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`} style={{ position: 'relative' }}>
      {isLoading && (
        <div 
          className="image-loading"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--bg-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            zIndex: 1
          }}
        >
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholderSVG}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default ImageOptimizer;
