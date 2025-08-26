import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Componente para Facebook Pixel
const FacebookPixel = () => {
  const router = useRouter();
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    // Só carrega se o Pixel ID estiver configurado
    if (!FB_PIXEL_ID) return;

    // Inicializa o Facebook Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    // Cleanup não é necessário para o Facebook Pixel
  }, [FB_PIXEL_ID]);

  useEffect(() => {
    if (!FB_PIXEL_ID || !window.fbq) return;

    const handleRouteChange = () => {
      window.fbq('track', 'PageView');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, FB_PIXEL_ID]);

  return (
    <>
      {FB_PIXEL_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Facebook Pixel"
          />
        </noscript>
      )}
    </>
  );
};

export default FacebookPixel;

// Função helper para tracking de eventos customizados
export const trackFBEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Eventos pré-definidos para contabilidade
export const trackFBConversion = {
  // Contato via formulário
  contact: (method = 'form') => {
    trackFBEvent('Contact', { contact_method: method });
  },
  
  // Solicitação de orçamento
  quote: (service = 'general') => {
    trackFBEvent('SubmitApplication', { service_type: service });
  },
  
  // WhatsApp click
  whatsapp: (page = 'unknown') => {
    trackFBEvent('Contact', { 
      contact_method: 'whatsapp',
      page_location: page 
    });
  },
  
  // Visualização de serviço específico
  viewService: (serviceName) => {
    trackFBEvent('ViewContent', {
      content_type: 'service',
      content_name: serviceName
    });
  }
};
