import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import FacebookPixel from '../components/analytics/FacebookPixel';
import { Inter } from 'next/font/google';

// Importar estilos globais
import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import '../styles/all.min.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/cards.css';
import '../styles/forms.css';
import '../styles/buttons.css';
import '../styles/responsive.css';
import '../styles/mobile-responsive-2024.css';
import '../styles/mobile-force-override.css';
import '../styles/hero-breadcrumb.css';
import '../styles/section-spacing-fix.css';
import '../styles/global-page-patterns.css';
import '../styles/global-visual-upgrade-2025.css';
import '../styles/setores-conversion.css';
import '../styles/sectors.css';
import '../styles/contact-cta.css';
import '../styles/whatsapp-float.css';
import '../styles/scroll-top.css';
import '../styles/hero-2025-trends.css';
import '../styles/mobile-responsive-2024.css';
import '../styles/mobile-force-override.css';

// Fonte Inter via next/font (melhor performance e estabilidade)
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <NotificationProvider>
        <AuthProvider>
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
