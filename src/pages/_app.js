import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { GoogleAnalytics, FacebookPixel } from '../components/analytics';
import ClientBootstrap from '../components/ClientBootstrap';
// import MobileForceFix from '../components/MobileForceFix'; // DESABILITADO - Conflita com CSS otimizado

// CSS ARCHITECTURE - CLEAN & MODULAR SYSTEM
// 1. Design System Foundation (variables, reset, base styles)
import '../styles/design-system.css';

// 2. Modular Components (header, hero, cards)
import '../styles/components/header.css';
import '../styles/components/hero.css';
import '../styles/components/cards.css';

// 3. Specific Features (preserved from original)
import '../styles/footer.css';
import '../styles/forms.css';
import '../styles/contact-cta.css';
import '../styles/whatsapp-float.css';
import '../styles/scroll-top.css';
import '../styles/faq.css';

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
