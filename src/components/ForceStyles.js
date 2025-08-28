import { useEffect } from 'react';

const ForceStyles = () => {
  useEffect(() => {
    const applyForceStyles = () => {
      // MOBILE ONLY - Aplica apenas em telas <= 768px
      if (window.innerWidth > 768) return;

      // Footer - FORÇA TEXTO BRANCO ABSOLUTA - TODOS OS SELETORES POSSÍVEIS
      const footerSelectors = [
        '.footer', '.footer *', '.site-footer', '.site-footer *',
        '.footer-widget', '.footer-widget *', '.footer-links', '.footer-links *',
        '.footer-contact', '.footer-contact *', '.links-section', '.links-section *',
        '.quick-links', '.quick-links *', '.footer-bottom', '.footer-bottom *',
        '[class*="footer"]', '[class*="footer"] *', '[class*="links"]', '[class*="links"] *'
      ];
      
      footerSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && el.style) {
              el.style.setProperty('color', '#ffffff', 'important');
              el.style.setProperty('font-weight', '600', 'important');
              el.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
              el.style.setProperty('opacity', '1', 'important');
              el.style.setProperty('visibility', 'visible', 'important');
            }
          });
        } catch (e) {
          console.log('Seletor inválido:', selector);
        }
      });

      // Badges - FORÇA FUNDO BRANCO ABSOLUTA
      const badgeSelectors = [
        '.badge', '.specialization-badge', '.section-badge',
        '[class*="badge"]', '[class*="specialization"]', '[class*="section-badge"]'
      ];
      
      badgeSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && el.style) {
              el.style.setProperty('background', '#ffffff', 'important');
              el.style.setProperty('background-color', '#ffffff', 'important');
              el.style.setProperty('color', '#1e3a8a', 'important');
              el.style.setProperty('font-weight', '800', 'important');
              el.style.setProperty('text-shadow', 'none', 'important');
              el.style.setProperty('border', '2px solid #ffffff', 'important');
              el.style.setProperty('padding', '8px 16px', 'important');
              el.style.setProperty('border-radius', '20px', 'important');
              el.style.setProperty('box-shadow', '0 2px 8px rgba(0, 0, 0, 0.3)', 'important');
            }
          });
        } catch (e) {
          console.log('Seletor badge inválido:', selector);
        }
      });

      // Hero sections - FORÇA GRADIENTE AZUL
      const heroSelectors = [
        '.page-hero', '.hero-section', '.content-hero', '.services-hero', '.about-hero',
        '[class*="hero"]'
      ];
      
      heroSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && el.style) {
              el.style.setProperty('background', 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)', 'important');
              el.style.setProperty('background-color', '#1e3a8a', 'important');
              el.style.setProperty('color', '#ffffff', 'important');
              el.style.setProperty('padding', '60px 0', 'important');
              el.style.setProperty('text-align', 'center', 'important');
              
              const children = el.querySelectorAll('*');
              children.forEach(child => {
                if (child && child.style) {
                  child.style.setProperty('color', '#ffffff', 'important');
                  child.style.setProperty('text-shadow', '0 2px 6px rgba(0, 0, 0, 0.7)', 'important');
                }
              });
            }
          });
        } catch (e) {
          console.log('Seletor hero inválido:', selector);
        }
      });

      // Seções homepage - FORÇA FUNDO AZUL
      const sectionSelectors = ['.services-section', '.sectors-section'];
      sectionSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && el.style) {
              el.style.setProperty('background', 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)', 'important');
              el.style.setProperty('background-color', '#1e3a8a', 'important');
              el.style.setProperty('color', '#ffffff', 'important');
              el.style.setProperty('padding', '80px 0', 'important');
              
              const children = el.querySelectorAll('*');
              children.forEach(child => {
                if (child && child.style) {
                  child.style.setProperty('color', '#ffffff', 'important');
                  child.style.setProperty('text-shadow', '0 1px 4px rgba(0, 0, 0, 0.6)', 'important');
                }
              });
            }
          });
        } catch (e) {
          console.log('Seletor section inválido:', selector);
        }
      });

      console.log('ForceStyles aplicado para mobile - largura:', window.innerWidth);
    };

    // Aplica imediatamente
    applyForceStyles();
    
    // Aplica após 500ms, 1s, 2s, 3s para garantir que funcione
    setTimeout(applyForceStyles, 500);
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
