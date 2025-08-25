import React from 'react';
import { useRouter } from 'next/router';

/**
 * Componente para compartilhamento de ferramentas em redes sociais
 * 
 * @param {Object} props Propriedades do componente
 * @param {string} props.title Título para compartilhamento
 * @param {string} props.description Descrição para compartilhamento
 * @param {string} [props.className] Classes adicionais para o container
 */
const ShareTools = ({ title, description, className = '' }) => {
  const router = useRouter();
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}` 
    : 'https://exclusivacontabilidade.com.br';
  
  const currentUrl = `${baseUrl}${router.asPath}`;
  
  // Título e descrição codificados para URL
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(currentUrl);
  
  // URLs de compartilhamento
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };
  
  // Função para registrar evento de compartilhamento no Google Analytics
  const trackShare = (network) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        'event_category': 'social',
        'event_label': network,
        'content_type': 'tool',
        'content_id': router.asPath.split('/').pop()
      });
    }
  };
  
  // Função para abrir janela de compartilhamento
  const openShareWindow = (url, network) => {
    if (typeof window !== 'undefined') {
      trackShare(network);
      window.open(url, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className={`share-tools ${className}`}>
      <div className="d-flex align-items-center">
        <span className="text-muted me-3">Compartilhe:</span>
        <div className="share-buttons">
          <button 
            className="btn btn-sm text-primary" 
            aria-label="Compartilhar no Facebook" 
            onClick={() => openShareWindow(shareUrls.facebook, 'facebook')}
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          
          <button 
            className="btn btn-sm text-info" 
            aria-label="Compartilhar no Twitter" 
            onClick={() => openShareWindow(shareUrls.twitter, 'twitter')}
          >
            <i className="fab fa-twitter"></i>
          </button>
          
          <button 
            className="btn btn-sm text-primary" 
            aria-label="Compartilhar no LinkedIn" 
            onClick={() => openShareWindow(shareUrls.linkedin, 'linkedin')}
          >
            <i className="fab fa-linkedin-in"></i>
          </button>
          
          <button 
            className="btn btn-sm text-success" 
            aria-label="Compartilhar no WhatsApp" 
            onClick={() => openShareWindow(shareUrls.whatsapp, 'whatsapp')}
          >
            <i className="fab fa-whatsapp"></i>
          </button>
          
          <button 
            className="btn btn-sm text-info" 
            aria-label="Compartilhar no Telegram" 
            onClick={() => openShareWindow(shareUrls.telegram, 'telegram')}
          >
            <i className="fab fa-telegram-plane"></i>
          </button>
        </div>
      </div>
      
      {/* Estilos específicos */}
      <style jsx>{`
        .share-tools {
          margin: 1.5rem 0;
          padding: 1rem 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        
        .share-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .share-buttons .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          transition: all 0.2s ease;
          background-color: #f8f9fa;
        }
        
        .share-buttons .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default ShareTools;
