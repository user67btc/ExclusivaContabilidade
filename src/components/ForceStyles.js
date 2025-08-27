import { useEffect } from 'react';

const ForceStyles = () => {
  useEffect(() => {
    // FORÇA NUCLEAR: Aplicar estilos via JavaScript inline
    const applyForceStyles = () => {
      // Hero sections - FORÇA GRADIENTE AZUL
      const heroSelectors = [
        '.page-hero',
        '.hero-section', 
        '.content-hero',
        '.services-hero',
        '.about-hero'
      ];
      
      heroSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)';
          el.style.color = '#ffffff';
          el.style.padding = '50px 0';
          el.style.textAlign = 'center';
          el.style.margin = '0';
          
          // Força texto branco em todos os filhos
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
        el.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
      });

      // Badges - FORÇA FUNDO BRANCO
      const badgeSelectors = [
        '.specialization-badge',
        '.badge', 
        '.section-badge',
        '[class*="badge"]',
        '[class*="specialization"]'
      ];
      
      badgeSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.background = '#ffffff';
          el.style.color = '#1e3a8a';
          el.style.fontWeight = '800';
          el.style.textShadow = 'none';
          el.style.border = '2px solid #ffffff';
          el.style.padding = '6px 12px';
          el.style.borderRadius = '15px';
          el.style.fontSize = '0.75rem';
          el.style.textTransform = 'uppercase';
          el.style.letterSpacing = '1px';
        });
      });

      // Seções homepage - FORÇA FUNDO AZUL
      const sectionElements = document.querySelectorAll('.services-section, .sectors-section');
      sectionElements.forEach(el => {
        el.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)';
        el.style.color = '#ffffff';
        el.style.padding = '60px 0';
        
        const children = el.querySelectorAll('*');
        children.forEach(child => {
          child.style.color = '#ffffff';
          child.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.4)';
        });
      });

      // Textos problemáticos identificados nos screenshots
      const problemTexts = document.querySelectorAll('.quick-links, .services-list, .contact-info');
      problemTexts.forEach(el => {
        el.style.color = '#ffffff';
        el.style.fontWeight = '600';
        el.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.6)';
      });
    };

    // Aplica imediatamente
    applyForceStyles();
    
    // Aplica novamente após 1 segundo (para componentes que carregam depois)
    setTimeout(applyForceStyles, 1000);
    
    // Aplica quando a página terminar de carregar
    window.addEventListener('load', applyForceStyles);
    
    // Observer para aplicar em elementos que aparecem dinamicamente
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
