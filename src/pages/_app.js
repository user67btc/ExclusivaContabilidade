import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { GoogleAnalytics, FacebookPixel } from '../components/analytics';
import ClientBootstrap from '../components/ClientBootstrap';
// import MobileForceFix from '../components/MobileForceFix'; // DESABILITADO - Conflita com CSS otimizado

// CSS imports - ORDEM OTIMIZADA: base styles primeiro, nova paleta, cards unificados, mobile limpo por último
import '../styles/globals.css';
import '../styles/color-palette.css';
import '../styles/footer.css';
import '../styles/forms.css';
import '../styles/hero-breadcrumb.css';
import '../styles/section-spacing-fix.css';
import '../styles/global-page-patterns.css';
// GLOBAL VISUAL UPGRADE - DESABILITADO - conflita com mobile consolidado
// import '../styles/global-visual-upgrade-2025.css';
import '../styles/setores-conversion.css';
import '../styles/contact-cta.css';
import '../styles/whatsapp-float.css';
import '../styles/scroll-top.css';
// HERO 2025 TRENDS - DESABILITADO - conflita com mobile consolidado
// import '../styles/hero-2025-trends.css';
// CARDS UNIFICADOS - substitui services.css e sectors.css
import '../styles/cards-unified.css';
// MOBILE STYLES - DESABILITADO - conflita com versão consolidada
// import '../styles/mobile-clean.css';
// MOBILE HEADER FIX - versão consolidada com cascade layers
import '../styles/mobile-header-fix-CONSOLIDATED.css';

// Fonte Inter via next/font (melhor performance e estabilidade)
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <NotificationProvider>
        <AuthProvider>
          {/* FORÇA NUCLEAR: Componente JavaScript para aplicar estilos inline */}
          <ClientBootstrap />
          
          {/* MOBILE FORCE FIX: DESABILITADO - Conflitava com CSS otimizado */}
          {/* <MobileForceFix /> */}
          
          {/* Analytics Components - Carregam apenas se as variáveis estiverem configuradas */}
          <GoogleAnalytics />
          <FacebookPixel />
          
          <Component {...pageProps} />
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default MyApp;
