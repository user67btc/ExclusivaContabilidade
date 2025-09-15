import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Hero() {
  const [animated, setAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [countersAnimated, setCountersAnimated] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setAnimated(true);
        // Start counter animation after main animation
        setTimeout(() => {
          setCountersAnimated(true);
          animateCounters();
        }, 800);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Counter animation function
  const animateCounters = () => {
    const counters = document.querySelectorAll('.proof-number[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };

  // Dados para os cards interativos (Bento Layout) - Baseado em pesquisa Big 4
  const bentoCards = [
    {
      icon: 'chart-line',
      title: 'Análise Fiscal',
      description: 'IA aplicada à otimização tributária',
      color: '#2563eb',
      stats: '98% economia',
      delay: 0,
      interactive: true,
      badge: 'IA'
    },
    {
      icon: 'shield-check',
      title: 'Compliance',
      description: 'Conformidade 100% garantida',
      color: '#16a34a',
      stats: 'Zero multas',
      delay: 0.2,
      interactive: true,
      badge: 'Certificado'
    },
    {
      icon: 'clock',
      title: 'Resposta Rápida',
      description: 'Atendimento em tempo real',
      color: '#ea580c',
      stats: '< 2h resposta',
      delay: 0.4,
      interactive: true,
      badge: 'Express'
    },
    {
      icon: 'users-cog',
      title: 'Expertise',
      description: 'Time especializado Big 4',
      color: '#7c3aed',
      stats: '500+ empresas',
      delay: 0.6,
      interactive: true,
      badge: 'Premium'
    }
  ];

  // Trust elements e social proof
  const trustElements = [
    { icon: 'award', text: 'CRC Ativo', verified: true },
    { icon: 'star', text: '4.9/5 Avaliação', verified: true },
    { icon: 'shield-alt', text: 'ISO 27001', verified: true }
  ];

  // Force styles with useEffect to override any CSS conflicts
  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      // Test different padding values to find what works
      heroSection.style.setProperty('padding-top', '140px', 'important');
      heroSection.style.setProperty('margin-top', '0', 'important');
      heroSection.style.setProperty('position', 'relative', 'important');
      heroSection.style.setProperty('z-index', '1', 'important');
      
      // Remove body padding that creates white space
      document.body.style.setProperty('padding-top', '0', 'important');
      
      console.log('🔥 HERO: Emergency styles applied - padding-top: 140px');
      
      // Debug: check actual header height
      const header = document.querySelector('.site-header');
      if (header) {
        const headerHeight = header.offsetHeight;
        console.log('📏 HEADER HEIGHT:', headerHeight + 'px');
        
        // Adjust hero padding based on actual header height (now 80px + margin)
        const safePadding = 100; // 80px header + 20px margin
        heroSection.style.setProperty('padding-top', safePadding + 'px', 'important');
        console.log('🎯 HERO ADJUSTED TO:', safePadding + 'px');
      }
    }
  }, []);

  return (
    <section 
      className="hero-section"
      style={{
        paddingTop: '140px !important',
        marginTop: '0 !important',
        position: 'relative !important',
        zIndex: '1 !important'
      }}
    >
      <div className="hero-background-modern">
        <div className="gradient-mesh"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="container-fluid">
        <div className="hero-grid">
          {/* Coluna Principal - Texto */}
          <div className={`hero-main-content ${animated ? 'slide-up' : ''}`}>
            <div className="hero-badge" style={{
              display: 'inline-flex !important',
              alignItems: 'center',
              padding: '16px 28px',
              background: 'rgba(30, 58, 138, 0.1)',
              border: '2px solid rgba(30, 58, 138, 0.3)',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e3a8a',
              marginBottom: '32px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 24px rgba(30, 58, 138, 0.15)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              zIndex: '1000'
            }}>
              <i className="fas fa-award" style={{ marginRight: '8px' }}></i>
              <span>Assessoria Contábil Especializada</span>
            </div>
            
            <h1 className="hero-title-modern" style={{
              fontSize: '32px',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: '20px'
            }}>
              Transforme sua <br />
              <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900',
                textShadow: 'none'
              }}>Contabilidade</span> <br />
              em Vantagem Competitiva
            </h1>
            
            <p className="hero-subtitle-modern" style={{
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: '32px',
              maxWidth: '90%'
            }}>
              Soluções contábeis inteligentes para empresas que buscam crescimento 
              sustentável e conformidade fiscal em Campo Grande - MS
            </p>
            
            {/* Dual CTA Strategy - Baseado em melhores práticas 2024 */}
            <div className="hero-cta-group" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '40px'
            }}>
              <Link href="/contato" className="btn-modern btn-primary-modern cta-primary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                backgroundColor: '#ffffff',
                border: '3px solid #ffffff',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '16px',
                minHeight: '56px'
              }}>
                <i className="fas fa-calculator" style={{ fontSize: '20px' }}></i>
                <span>Análise Gratuita</span>
                <div className="btn-badge" style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}>Sem compromisso</div>
              </Link>
              
              <a href="https://wa.me/5567999846350?text=Olá! Gostaria de falar com a equipe da Exclusiva." 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="btn-modern btn-secondary-enhanced cta-secondary"
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '12px',
                   padding: '16px 32px',
                   fontSize: '18px',
                   fontWeight: '700',
                   color: '#ffffff',
                   backgroundColor: '#16a34a',
                   border: '3px solid #16a34a',
                   borderRadius: '12px',
                   textDecoration: 'none',
                   boxShadow: '0 8px 24px rgba(22, 163, 74, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)',
                   transform: 'translateY(0)',
                   transition: 'all 0.3s ease',
                   position: 'relative',
                   overflow: 'hidden',
                   minHeight: '56px'
                 }}>
                <i className="fab fa-whatsapp" style={{ fontSize: '20px' }}></i>
                <span>Especialista</span>
                <div className="btn-indicator-enhanced" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginLeft: '8px'
                }}>
                  <div className="online-dot" style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#34d399',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span style={{ fontSize: '14px', opacity: '0.9' }}>Online</span>
                </div>
              </a>
            </div>
            
            {/* Enhanced Trust Elements - Mobile Optimized */}
            <div className="hero-trust-elements-enhanced" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '24px',
              padding: '0 20px',
              maxWidth: '100%',
              overflow: 'hidden'
            }}>
              {trustElements.slice(0, 2).map((element, index) => (
                <div key={index} className="trust-item-enhanced" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  whiteSpace: 'nowrap'
                }}>
                  <i className={`fas fa-${element.icon}`} style={{
                    color: '#34d399',
                    fontSize: '16px'
                  }}></i>
                  <span>{element.text}</span>
                </div>
              ))}
            </div>
            
            {/* Social Proof - Hidden on Mobile to reduce clutter */}
            <div className="hero-social-proof-enhanced" style={{
              display: 'none'
            }}>
              {/* Hidden on mobile - too much visual clutter */}
            </div>
          </div>
          
          {/* Visual Content - Hidden on Mobile to reduce clutter */}
          <div className={`hero-visual-content ${animated ? 'fade-in-up' : ''}`} style={{
            display: 'none'
          }}>
            {/* All visual elements hidden on mobile for clean layout */}
          </div>
        </div>
      </div>
      
      {/* Bottom Wave - Hidden on Mobile */}
      <div className="hero-bottom-modern" style={{
        display: 'none'
      }}>
        {/* Wave divider hidden on mobile - causes visual clutter */}
      </div>
    </section>
  );
}

export default Hero;
