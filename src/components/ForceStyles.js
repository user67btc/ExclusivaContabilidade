import { useEffect } from 'react';

const ForceStyles = () => {
  useEffect(() => {
    const applyForceStyles = () => {
      // Hero sections - FORÇA GRADIENTE AZUL
      const heroSelectors = ['.page-hero', '.hero-section', '.content-hero'];
      heroSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)';
          el.style.color = '#ffffff';
          el.style.padding = '50px 0';
          
          const children = el.querySelectorAll('*');
          children.forEach(child => {
            child.style.color = '#ffffff';
            child.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
          });
        });
      });

      // Footer - FORÇA TEXTO BRANCO
      const footerElements = document.querySelectorAll('.footer, .footer *, .links-section, .links-section *');
      footerElements.forEach(el => {
        el.style.color = '#ffffff';
        el.style.fontWeight = '500';
      });

      // Badges - FORÇA FUNDO BRANCO
      const badgeElements = document.querySelectorAll('.badge, .specialization-badge');
      badgeElements.forEach(el => {
        el.style.background = '#ffffff';
        el.style.color = '#1e3a8a';
        el.style.fontWeight = '800';
      });
    };

    applyForceStyles();
    setTimeout(applyForceStyles, 1000);
    window.addEventListener('load', applyForceStyles);
    
    const observer = new MutationObserver(applyForceStyles);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('load', applyForceStyles);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ForceStyles;
