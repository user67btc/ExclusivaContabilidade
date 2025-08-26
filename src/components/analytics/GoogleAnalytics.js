import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Componente para Google Analytics 4
const GoogleAnalytics = () => {
  const router = useRouter();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Só carrega se o GA_ID estiver configurado
    if (!GA_ID) return;

    // Carrega o script do Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Inicializa o gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [GA_ID]);

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;

    const handleRouteChange = (url) => {
      window.gtag('config', GA_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, GA_ID]);

  return null;
};

export default GoogleAnalytics;

// Função helper para tracking de eventos
export const trackEvent = (action, category = 'general', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Função para tracking de conversões
export const trackConversion = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: process.env.NEXT_PUBLIC_GA_ID,
    });
  }
};
