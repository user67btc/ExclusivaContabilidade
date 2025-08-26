// Exportações centralizadas dos componentes de analytics
export { default as GoogleAnalytics, trackEvent, trackConversion } from './GoogleAnalytics';
export { default as FacebookPixel, trackFBEvent, trackFBConversion } from './FacebookPixel';

// Função universal para tracking de eventos
export const trackUniversalEvent = (eventName, parameters = {}) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Eventos específicos para o site da Exclusiva Contabilidade
export const exclusivaEvents = {
  // Contato
  contactForm: (method = 'form') => {
    trackUniversalEvent('contact_form_submit', { method });
  },
  
  // WhatsApp
  whatsappClick: (page) => {
    trackUniversalEvent('whatsapp_click', { page });
  },
  
  // Orçamento
  quoteRequest: (service) => {
    trackUniversalEvent('quote_request', { service });
  },
  
  // Telefone
  phoneClick: () => {
    trackUniversalEvent('phone_click', {});
  },
  
  // Visualização de serviço
  serviceView: (serviceName) => {
    trackUniversalEvent('service_view', { service_name: serviceName });
  },
  
  // Download de material
  downloadMaterial: (materialName) => {
    trackUniversalEvent('download', { material_name: materialName });
  }
};
