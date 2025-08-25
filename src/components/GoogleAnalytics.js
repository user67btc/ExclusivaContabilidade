import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleAnalytics = ({ measurementId }) => {
  const router = useRouter();

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return;

    // Função para enviar pageviews ao Google Analytics
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', measurementId, {
          page_path: url,
        });
      }
    };

    // Evento quando a rota muda
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Limpeza ao desmontar o componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, measurementId]);

  if (!measurementId) return null;

  return (
    <>
      {/* Script do Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
