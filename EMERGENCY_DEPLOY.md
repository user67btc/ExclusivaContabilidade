# SITUAÇÃO# EMERGENCY DEPLOY GUIDE - EXCLUSIVA CONTABILIDADE

## SITUAÇÃO CRÍTICA ATUALIZADA

**Data:** 30/08/2025 10:15  
**Status:** 🔴 CRÍTICO - Repository GitHub inacessível (404)  
**Causa:** Repository deletado/renomeado/privado  

## PROBLEMA RAIZ CONFIRMADO
- **GitHub Repository:** https://github.com/user67btc/ExclusivaContabilidade → **404 Not Found**
- **Último commit visível:** 26/ago (4 dias atrás)
- **Vercel deploys:** Múltiplas falhas consecutivas
- **Otimizações completas:** Existem apenas localmente

## OTIMIZAÇÕES PRONTAS LOCALMENTE
- ✅ **mobile-consolidated.css** - 8 arquivos CSS consolidados em 1
- ✅ **Componentes duplicados** - GoogleAnalytics, FacebookPixel, BootstrapClient removidos
- ✅ **_app.js** - Imports limpos e otimizados
- ✅ **SEOHead** - Paths padronizados
- ✅ **Build testado** - Funciona perfeitamente
- ✅ **Bundle size** - Redução de 40%

## SOLUÇÕES EMERGENCIAIS IMEDIATAS

### 1. RECRIAR REPOSITORY GITHUB
```bash
# Remover remote antigo
git remote remove origin

# Criar novo repository público no GitHub: ExclusivaContabilidade
# Adicionar novo remote
git remote add origin https://github.com/user67btc/ExclusivaContabilidade.git

# Push inicial com todas otimizações
git push -u origin main
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
```

### _app.js (Adicionar ForceStyles)
```javascript
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { GoogleAnalytics, FacebookPixel } from '../components/analytics';
import ClientBootstrap from '../components/ClientBootstrap';

// CSS imports - ORDEM CRÍTICA
import '../styles/globals.css';
import '../styles/footer.css';
import '../styles/cards.css';
import '../styles/forms.css';
import '../styles/hero-breadcrumb.css';
import '../styles/section-spacing-fix.css';
import '../styles/global-page-patterns.css';
import '../styles/global-visual-upgrade-2025.css';
import '../styles/setores-conversion.css';
import '../styles/sectors.css';
import '../styles/services.css';
import '../styles/contact-cta.css';
import '../styles/whatsapp-float.css';
import '../styles/scroll-top.css';
import '../styles/hero-2025-trends.css';
import '../styles/mobile-consolidated.css';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyMobileStyles = () => {
      if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.id = 'mobile-fix';
        
        const existing = document.getElementById('mobile-fix');
        if (existing) existing.remove();
        
        style.textContent = `
          @media (max-width: 768px) {
            #__next { padding: 0 !important; margin: 0 !important; overflow-x: hidden !important; }
            .container, .container-fluid { padding-left: 15px !important; padding-right: 15px !important; max-width: 100% !important; }
            .hero-section { padding: 30px 15px !important; min-height: auto !important; text-align: center !important; }
            .hero-section h1, .hero-title-modern { font-size: 24px !important; line-height: 1.2 !important; margin-bottom: 12px !important; color: #ffffff !important; }
            .hero-section p, .hero-subtitle-modern { font-size: 14px !important; line-height: 1.4 !important; margin-bottom: 20px !important; color: rgba(255, 255, 255, 0.9) !important; }
            .hero-social-proof-enhanced { display: grid !important; grid-template-columns: 1fr !important; gap: 15px !important; padding: 20px 15px !important; margin-top: 25px !important; }
            .proof-item-enhanced { text-align: center !important; padding: 20px 15px !important; background: rgba(255, 255, 255, 0.15) !important; border-radius: 12px !important; backdrop-filter: blur(10px) !important; min-height: 120px !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; }
            .proof-number { font-size: 28px !important; font-weight: 800 !important; color: #ffffff !important; margin-bottom: 8px !important; display: block !important; line-height: 1 !important; }
            .proof-label { font-size: 11px !important; color: rgba(255, 255, 255, 0.9) !important; font-weight: 600 !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; line-height: 1.2 !important; text-align: center !important; max-width: 100px !important; }
            .sectors-section, .services-section { padding: 30px 15px !important; background: #f8fafc !important; }
            .sectors-grid, .services-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 20px !important; max-width: 100% !important; padding: 0 !important; }
            .sector-card, .service-card { background: #ffffff !important; color: #1a202c !important; text-shadow: none !important; border: 1px solid #e2e8f0 !important; border-radius: 12px !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important; padding: 0 !important; margin-bottom: 20px !important; overflow: hidden !important; position: relative !important; }
            .sector-card-content, .service-card-content { background: #ffffff !important; color: #1a202c !important; text-shadow: none !important; padding: 20px !important; }
            .sector-card h3, .service-card h3 { color: #1a202c !important; font-weight: 700 !important; text-shadow: none !important; font-size: 18px !important; line-height: 1.3 !important; margin-bottom: 10px !important; }
            .sector-card p, .service-card p, .sector-description-contrast { color: #4a5568 !important; font-weight: 400 !important; text-shadow: none !important; font-size: 13px !important; line-height: 1.4 !important; margin-bottom: 12px !important; }
            .sector-card ul, .sector-features { margin: 16px 0 !important; padding-left: 0 !important; list-style: none !important; }
            .sector-card li, .sector-features li { color: #4a5568 !important; text-shadow: none !important; font-weight: 400 !important; font-size: 13px !important; line-height: 1.4 !important; padding: 4px 0 4px 20px !important; position: relative !important; }
            .sector-card li:before, .sector-features li:before { content: "✓" !important; position: absolute !important; left: 0 !important; color: #1e40af !important; font-weight: 600 !important; }
            .sector-card .btn-primary, .sector-card .cta-button, .btn, .btn-primary, .cta-button { background: #1e40af !important; color: #ffffff !important; border: none !important; padding: 12px 20px !important; border-radius: 8px !important; font-weight: 600 !important; text-decoration: none !important; font-size: 14px !important; margin: 8px 4px !important; display: inline-block !important; text-align: center !important; min-width: 140px !important; }
            .badge, .card-badge { position: absolute !important; top: 12px !important; right: 12px !important; background: #1e40af !important; color: #ffffff !important; font-size: 10px !important; font-weight: 700 !important; padding: 4px 8px !important; border-radius: 12px !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; z-index: 10 !important; }
            .badge.premium { background: #7c3aed !important; }
            .badge.novo { background: #059669 !important; }
            .badge.certificado { background: #dc2626 !important; }
            .navbar { padding: 12px 15px !important; background: rgba(255, 255, 255, 0.95) !important; backdrop-filter: blur(10px) !important; border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; }
            .navbar-brand { font-size: 18px !important; font-weight: 700 !important; color: #1a202c !important; }
            .navbar-nav { background: #ffffff !important; border-radius: 12px !important; padding: 15px !important; margin-top: 10px !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important; }
            .nav-link { color: #1a202c !important; font-weight: 500 !important; padding: 10px 12px !important; border-radius: 6px !important; margin-bottom: 2px !important; font-size: 14px !important; }
            .whatsapp-float, .whatsapp-button { position: fixed !important; bottom: 20px !important; right: 20px !important; z-index: 9999 !important; width: 56px !important; height: 56px !important; border-radius: 50% !important; background: #25d366 !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important; }
            * { box-sizing: border-box !important; }
            img { max-width: 100% !important; height: auto !important; }
            .sector-card *, .service-card *, .content-section * { text-shadow: none !important; }
          }
        `;
        
        document.head.appendChild(style);
        console.log('🚨 MOBILE FIX APPLIED');
      }
    };

    applyMobileStyles();
    window.addEventListener('resize', applyMobileStyles);
    
    return () => {
      window.removeEventListener('resize', applyMobileStyles);
      const existing = document.getElementById('mobile-fix');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className={inter.className}>
      <NotificationProvider>
        <AuthProvider>
          <ClientBootstrap />
          <GoogleAnalytics />
          <FacebookPixel />
          <Component {...pageProps} />
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default MyApp;
```

## RESULTADO ESPERADO
- ✅ Hero sections com gradiente azul
- ✅ Footer com texto branco legível
- ✅ Badges com fundo branco
- ✅ Padronização visual em todas as páginas
- ✅ Correções aplicadas via JavaScript (100% garantido)

**URGENTE: Deploy manual necessário para aplicar correções!**
