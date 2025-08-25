import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { Inter } from 'next/font/google';

// Importar estilos globais
import '../styles/globals.css';
import '../styles/variables.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/services.css';
import '../styles/forms.css';
import '../styles/faq.css';
import '../styles/contact-cta.css';
import '../styles/whatsapp-float.css';
import '../styles/scroll-top.css';
import '../styles/hero-2025-trends.css';
import '../styles/hero-breadcrumb.css';
import '../styles/section-spacing-fix.css';
import '../styles/global-page-patterns.css';
import '../styles/global-visual-upgrade-2025.css';
import '../styles/setores-conversion.css';
import '../styles/sectors.css';

// Fonte Inter via next/font (melhor performance e estabilidade)
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  // IDs de analytics
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL;
  const msClarity = process.env.NEXT_PUBLIC_MS_CLARITY;

  return (
    <div className={inter.className}>
      <NotificationProvider>
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        <Component {...pageProps} />
      </NotificationProvider>
    </div>
  );
}

export default MyApp;
