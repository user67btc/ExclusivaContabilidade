import React, { memo, useState, useEffect, useRef } from 'react';
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
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // FORCE SERVICES SECTION VISIBILITY WITH JAVASCRIPT
    const forceServicesVisibility = () => {
      try {
        const servicesSection = document.querySelector('.services-section');
        const servicesHeader = document.querySelector('.services-section .section-header');
        const servicesTitle = document.querySelector('.services-section .section-title');
        const servicesSubtitle = document.querySelector('.services-section .section-subtitle');
        const servicesDescription = document.querySelector('.services-section .section-description');
        
        if (servicesSection) {
          servicesSection.style.setProperty('display', 'block', 'important');
          servicesSection.style.setProperty('visibility', 'visible', 'important');
          servicesSection.style.setProperty('opacity', '1', 'important');
          servicesSection.style.setProperty('background', 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', 'important');
          servicesSection.style.setProperty('margin-top', '-1px', 'important');
          console.log(' Services section forced visible');
        }
        
        if (servicesHeader) {
          servicesHeader.style.setProperty('display', 'block', 'important');
          servicesHeader.style.setProperty('visibility', 'visible', 'important');
          servicesHeader.style.setProperty('opacity', '1', 'important');
          console.log(' Services header forced visible');
        }
        
        if (servicesTitle) {
          servicesTitle.style.setProperty('display', 'block', 'important');
          servicesTitle.style.setProperty('visibility', 'visible', 'important');
          servicesTitle.style.setProperty('color', '#ffffff', 'important');
          servicesTitle.style.setProperty('font-size', '32px', 'important');
          servicesTitle.style.setProperty('font-weight', '900', 'important');
          servicesTitle.style.setProperty('text-shadow', '0 3px 6px rgba(0, 0, 0, 0.4)', 'important');
          servicesTitle.style.setProperty('position', 'relative', 'important');
          servicesTitle.style.setProperty('padding-bottom', '12px', 'important');
          console.log(' Services title forced visible');
        }
        
        if (servicesSubtitle) {
          servicesSubtitle.style.setProperty('display', 'inline-block', 'important');
          servicesSubtitle.style.setProperty('visibility', 'visible', 'important');
          servicesSubtitle.style.setProperty('color', 'rgba(255, 255, 255, 0.9)', 'important');
          servicesSubtitle.style.setProperty('background', 'rgba(255, 255, 255, 0.1)', 'important');
          servicesSubtitle.style.setProperty('padding', '8px 16px', 'important');
          servicesSubtitle.style.setProperty('border-radius', '20px', 'important');
          servicesSubtitle.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
          servicesSubtitle.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
          servicesSubtitle.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.3)', 'important');
          console.log(' Services subtitle forced visible');
        }
        
        if (servicesDescription) {
          servicesDescription.style.setProperty('display', 'block', 'important');
          servicesDescription.style.setProperty('visibility', 'visible', 'important');
          servicesDescription.style.setProperty('color', 'rgba(255, 255, 255, 0.9)', 'important');
          servicesDescription.style.setProperty('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.3)', 'important');
          console.log(' Services description forced visible');
        }
      } catch (error) {
        console.error('Error forcing services visibility:', error);
      }
    };
    
    // Force visibility with error handling
    const timeouts = [];
    timeouts.push(setTimeout(forceServicesVisibility, 0));
    timeouts.push(setTimeout(forceServicesVisibility, 100));
    timeouts.push(setTimeout(forceServicesVisibility, 500));
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="services-section" 
      ref={sectionRef} 
      id="servicos"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: '1',
        padding: '0',
        margin: '0',
        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
        minHeight: 'auto',
        marginTop: '-1px'
      }}
    >
      <div className="services-bg-elements">
        <div className="services-shape services-shape-1"></div>
        <div className="services-shape services-shape-2"></div>
        <div className="services-shape services-shape-3"></div>
      </div>
      <div className="container" style={{
        padding: '40px 20px',
        maxWidth: '100%',
        margin: '0'
      }}>
        <div className={`section-header text-center ${sectionInView ? 'animate-fade-in' : ''}`} style={{
          marginBottom: '30px',
          display: 'block',
          visibility: 'visible'
        }}>
          <span className="section-subtitle" style={{
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>O QUE OFERECEMOS</span>
          <h2 className="section-title page-title" style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            textShadow: '0 3px 6px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            paddingBottom: '12px'
          }}>
            Nossos Serviços
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(255, 255, 255, 0.3)'
            }}></div>
          </h2>
          <p className="section-description" style={{
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '16px', 
            maxWidth: '320px', 
            margin: '0 auto',
            lineHeight: '1.5',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>Soluções contábeis personalizadas para o sucesso do seu negócio</p>
        </div>
        
        <div className="services-grid" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px'
        }}>
          {servicesList.map((service, index) => (
            <div key={service.id} className="service-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              minHeight: '240px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '16px'
            }}>
              <div className="service-image-wrapper" style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                flexShrink: 0,
                alignSelf: 'flex-start'
              }}>
                <i className={`${service.icon}`} style={{
                  fontSize: '28px',
                  color: '#ffffff'
                }} aria-hidden="true"></i>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em'
                }}>{service.title}</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginBottom: '0',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  flex: 1
                }}>{service.description}</p>
              </div>
              <Link 
                href={service.link} 
                className="btn-link"
                onClick={() => trackServiceClick(service.title)}
                aria-label={`Saiba mais sobre ${service.title}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  backgroundColor: '#3b82f6',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  width: '100%',
                  minHeight: '44px',
                  marginTop: 'auto'
                }}
              >
                <span>Saiba mais</span> <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-5 ${sectionInView ? 'animate-fade-up' : ''}`} style={{ 
          animationDelay: '600ms',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <Link 
            href="/servicos" 
            className="btn-pattern btn-primary"
            aria-label="Visualizar todos os nossos serviços contábeis"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          >
            <i className="fas fa-file-alt" style={{ fontSize: '14px' }}></i>
            <span>Ver todos os serviços</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
