import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

/**
 * Componente para integração do Facebook Pixel
 * @param {string} pixelId - O ID do Pixel do Facebook
 */
const FacebookPixel = ({ pixelId }) => {
  const router = useRouter();

  useEffect(() => {
    if (!pixelId) {
      return;
    }

    // Função para carregar o Facebook Pixel
    const loadFacebookPixel = () => {
      if (window.fbq) return;
      
      window.fbq = function() {
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
      };
      
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    };

    // Inicializar o Pixel
    loadFacebookPixel();
    
    // Inicializar e enviar PageView
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // Configurar listener para mudanças de rota
    const handleRouteChange = () => {
      window.fbq('track', 'PageView');
    };

    // Registrar evento para alterações de rota
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup ao desmontar o componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [pixelId, router.events]);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;
