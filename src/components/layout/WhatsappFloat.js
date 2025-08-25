import React, { memo } from 'react';
import { useRouter } from 'next/router';

// Componente consolidado e otimizado do WhatsApp Float
const WhatsappFloat = memo(function WhatsappFloat() {
  const router = useRouter();
  const phoneNumber = '5567999846350';
  
  // Mensagem personalizada baseada na página atual
  const currentPath = router.asPath;
  const getPageMessage = () => {
    if (currentPath.includes('/setores')) return 'Olá! Vim da página de Setores e gostaria de saber mais sobre os serviços contábeis.';
    if (currentPath.includes('/servicos')) return 'Olá! Vim da página de Serviços e gostaria de um orçamento personalizado.';
    if (currentPath.includes('/contato')) return 'Olá! Estou na página de contato e gostaria de falar com a equipe.';
    return 'Olá! Vim pelo site da Exclusiva Contabilidade e gostaria de mais informações.';
  };
  
  const message = getPageMessage();
  const encodedMessage = encodeURIComponent(message);
  
  // URL padronizada do WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  return (
    <div className="whatsapp-float-container">
      <a 
        href={whatsappUrl}
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
        onClick={() => {
          // Tracking de evento para Analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'contact',
              event_label: 'whatsapp_float',
              event_action: 'click',
              page_location: currentPath
            });
          }
        }}
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
        <span className="whatsapp-text">Fale conosco</span>
      </a>
    </div>
  );
});

export default WhatsappFloat;
