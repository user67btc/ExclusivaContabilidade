import React, { memo, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

// Lista de serviços contábeis principais - movida para fora do componente para evitar recriação
const servicesList = [
  {
    id: 'contabilidade',
    icon: 'fas fa-chart-bar',
    title: 'Contabilidade Empresarial',
    description: 'Controle financeiro completo para sua empresa com relatórios mensais, análise de resultados e consultoria personalizada.',
    link: '/servicos',
    image: '/assets/images/services/contabilidade.jpg'
  },
  {
    id: 'fiscal',
    icon: 'fas fa-file-alt',
    title: 'Departamento Fiscal',
    description: 'Gerenciamento completo de obrigações fiscais, apuração de impostos e acompanhamento de legislação tributária.',
    link: '/servicos',
    image: '/assets/images/services/fiscal.jpg'
  },
  {
    id: 'trabalhista',
    icon: 'fas fa-users',
    title: 'Departamento Pessoal',
    description: 'Administração completa da folha de pagamento, admissões, férias, rescisões e obrigações trabalhistas.',
    link: '/servicos',
    image: '/assets/images/services/trabalhista.jpg'
  },
  {
    id: 'societario',
    icon: 'fas fa-handshake',
    title: 'Assessoria Societária',
    description: 'Constituição, alteração e encerramento de empresas, além de regularização e atualização cadastral.',
    link: '/servicos',
    image: '/assets/images/services/societario.jpg'
  },
  {
    id: 'consultoria',
    icon: 'fas fa-lightbulb',
    title: 'Consultoria Empresarial',
    description: 'Orientação especializada para redução da carga tributária e planejamento fiscal estratégico.',
    link: '/servicos',
    image: '/assets/images/services/consultoria.jpg'
  },
  {
    id: 'auditoria',
    icon: 'fas fa-search',
    title: 'Auditoria Contábil',
    description: 'Análise detalhada das demonstrações financeiras e processos contábeis para garantir conformidade.',
    link: '/servicos',
    image: '/assets/images/services/auditoria.jpg'
  }
];

// Função de rastreamento de eventos do Google Analytics
const trackServiceClick = (title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_click', {
      'event_category': 'engagement',
      'event_label': title,
      'non_interaction': false,
      'value': 1
    });
  }
};

// Componente de serviço individual - extraído para melhorar legibilidade e manutenção
const ServiceCard = memo(({ service, animationDelay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      style={{ 
        animationDelay: `${animationDelay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="service-card-inner">
        <div className="service-image-wrapper ultimate-fix-wrapper">
          {!isImageError ? (
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
              loading="lazy"
              onError={() => setIsImageError(true)}
            />
          ) : (
            <div className="service-image-fallback">
              <i className={`${service.icon} fa-2x`} aria-hidden="true"></i>
            </div>
          )}
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link 
          href={service.link} 
          className="btn-link"
          onClick={() => trackServiceClick(service.title)}
          aria-label={`Saiba mais sobre ${service.title}`}
        >
          <span>Saiba mais</span> <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </Link>
        <div className="service-card-shine"></div>
        <div className="service-card-decoration"></div>
      </div>
    </div>
  );
});

// Componente principal otimizado com memo para evitar renderizações desnecessárias
function Services() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section className="services-section" ref={sectionRef} id="servicos">
      <div className="services-bg-elements">
        <div className="services-shape services-shape-1"></div>
        <div className="services-shape services-shape-2"></div>
        <div className="services-shape services-shape-3"></div>
      </div>
      <div className="container">
        <div className={`section-header text-center ${sectionInView ? 'animate-fade-in' : ''}`}>
          <span className="section-subtitle" style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem', display: 'block'}}>O que oferecemos</span>
          <h2 className="section-title page-title">Nossos Serviços</h2>
          <p className="section-description" style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem'}}>Soluções contábeis personalizadas para o sucesso do seu negócio</p>
        </div>
        
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={service.id} className="service-card">
              <div className="service-image-wrapper">
                <div className="service-image-fallback">
                  <i className={`${service.icon}`} aria-hidden="true"></i>
                </div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link 
                href={service.link} 
                className="btn-link"
                onClick={() => trackServiceClick(service.title)}
                aria-label={`Saiba mais sobre ${service.title}`}
              >
                <span>Saiba mais</span> <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-5 ${sectionInView ? 'animate-fade-up' : ''}`} style={{ animationDelay: '600ms' }}>
          <Link 
            href="/servicos" 
            className="btn-pattern btn-primary"
            aria-label="Visualizar todos os nossos serviços contábeis"
          >
            <i className="fas fa-file-alt"></i>
            <span>Ver todos os serviços</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
