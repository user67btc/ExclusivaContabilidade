import React, { memo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

// Função para rastrear eventos do Google Analytics
const trackEvent = (eventAction, eventLabel = '') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventAction, {
      event_category: 'contact',
      event_label: eventLabel,
      value: 1
    });
  }
};

// Usando memo para evitar re-renderizações desnecessárias
const ContactCTA = memo(function ContactCTA({ customHeading, customText }) {
  const router = useRouter();
  const currentPath = router.asPath;
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  // Mensagem personalizada para o WhatsApp incluindo a origem do contato
  const message = `Olá, estou entrando em contato pelo site! (${currentPath})`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5567999846350&text=${encodeURIComponent(message)}`;
  
  // Efeito de ripple nos botões
  useEffect(() => {
    if (inView) {
      const buttons = document.querySelectorAll('.cta-buttons .btn');
      
      const createRipple = (event) => {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.querySelector('.ripple');
        if (ripple) {
          ripple.remove();
        }
        
        button.appendChild(circle);
      };
      
      buttons.forEach(button => {
        button.addEventListener('click', createRipple);
      });
      
      return () => {
        buttons.forEach(button => {
          button.removeEventListener('click', createRipple);
        });
      };
    }
  }, [inView]);

  return (
    <section className="contact-cta-section" id="contact-cta" ref={ref}>
      <div className="contact-cta-pattern"></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="cta-content-wrapper">
              <div className="cta-badge">
                <i className="fas fa-award"></i>
                <span>Mais de 15 anos de experiência</span>
              </div>
              <h2 className={`section-title page-title ${inView ? 'animated' : ''}`} style={{color: '#ffffff', textAlign: 'left'}}>
                {customHeading || "Pronto para transformar a contabilidade do seu negócio?"}
              </h2>
              <p className={inView ? 'animated' : ''} style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', lineHeight: '1.6'}}>
                {customText || "Entre em contato hoje mesmo e descubra como podemos ajudar sua empresa a crescer com soluções contábeis personalizadas e otimização fiscal."}
              </p>
              <div className="cta-features">
                <div className="feature-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Compliance 100% garantido</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-clock"></i>
                  <span>Atendimento em até 2h</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-line"></i>
                  <span>Consultoria estratégica</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-lg-end">
            <div className={`contact-info-cards ${inView ? 'animated' : ''}`}>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Telefone</h4>
                  <p>(67) 9 9984-6350</p>
                  <span>Seg a Sex: 8h às 18h</span>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-card-content">
                  <h4>E-mail</h4>
                  <p>contato@exclusivacontabilidade.com.br</p>
                  <span>Resposta em até 2h</span>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Endereço</h4>
                  <p>Rua Maracaju, 1234<br/>Centro - Campo Grande/MS</p>
                  <span>CEP: 79002-230</span>
                </div>
              </div>
            </div>
            
            <div className={`cta-buttons-enhanced ${inView ? 'animated' : ''}`}>
              <Link 
                href="/contato" 
                className="btn-primary-enhanced cta-button-main"
                onClick={() => trackEvent('click_contact_button', 'cta_section')}
                aria-label="Solicitar orçamento através de nosso formulário de contato"
              >
                <i className="fas fa-calculator"></i>
                <div className="btn-content">
                  <span className="btn-title">Solicitar Orçamento</span>
                  <span className="btn-subtitle">Resposta em até 2h</span>
                </div>
              </Link>
              <a 
                href={whatsappUrl} 
                className="btn-whatsapp-enhanced" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', 'cta_section')}
                aria-label="Conversar pelo WhatsApp"
              >
                <i className="fab fa-whatsapp" aria-hidden="true"></i> 
                <div className="btn-content">
                  <span className="btn-title">WhatsApp</span>
                </div>
              </a>
              <a 
                href="tel:+5567999846350" 
                className="btn-phone-enhanced"
                onClick={() => trackEvent('click_phone', 'cta_section')}
                aria-label="Ligar para (67) 9 9984-6350"
              >
                <i className="fas fa-phone" aria-hidden="true"></i> 
                <span>Ligar Agora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactCTA;
