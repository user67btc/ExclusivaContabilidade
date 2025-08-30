import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import FacebookPixel from '../components/analytics/FacebookPixel';
import ForceStyles from '../components/ForceStyles';

// CSS imports - ORDEM CRÍTICA: footer.css primeiro, mobile nuclear por último
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
// MOBILE STYLES - DEVEM VIR POR ÚLTIMO PARA SOBRESCREVER
import '../styles/mobile-responsive-2024.css';
import '../styles/mobile-force-override.css';
// SOLUÇÃO NUCLEAR FINAL - CSS MÁXIMA ESPECIFICIDADE - SEMPRE POR ÚLTIMO
import '../styles/nuclear-mobile-fix.css';
import '../styles/nuclear-card-fix.css';
import '../styles/absolute-mobile-fix.css';
import '../styles/sector-card-fix.css';
import '../styles/ultimate-sector-fix.css';
import '../styles/comprehensive-mobile-fix.css';

// Fonte Inter via next/font (melhor performance e estabilidade)
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <NotificationProvider>
        <AuthProvider>
          {/* FORÇA NUCLEAR: Componente JavaScript para aplicar estilos inline */}
          <ForceStyles />
          
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
