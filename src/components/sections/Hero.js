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

  return (
    <section className="hero-section">
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
            <div className="hero-badge-modern">
              <i className="fas fa-award"></i>
              <span>Assessoria Contábil Especializada</span>
            </div>
            
            <h1 className="hero-title-modern">
              Transforme sua <br />
              <span className="gradient-text">Contabilidade</span> <br />
              em Vantagem Competitiva
            </h1>
            
            <p className="hero-subtitle-modern">
              Soluções contábeis inteligentes para empresas que buscam crescimento 
              sustentável e conformidade fiscal em Campo Grande - MS
            </p>
            
            {/* Dual CTA Strategy - Baseado em melhores práticas 2024 */}
            <div className="hero-cta-group">
              <Link href="/contato" className="btn-modern btn-primary-modern cta-primary">
                <i className="fas fa-calculator"></i>
                <span>Análise Gratuita</span>
                <div className="btn-glow"></div>
                <div className="btn-badge">Sem compromisso</div>
              </Link>
              
              <a href="https://wa.me/5567999846350?text=Olá! Gostaria de falar com a equipe da Exclusiva." 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="btn-modern btn-secondary-enhanced cta-secondary">
                <i className="fab fa-whatsapp"></i>
                <span>Falar com Especialista</span>
                <div className="btn-indicator-enhanced">
                  <div className="online-dot"></div>
                  <span>Online agora</span>
                </div>
              </a>
            </div>
            
            {/* Enhanced Trust Elements */}
            <div className="hero-trust-elements-enhanced">
              {trustElements.map((element, index) => (
                <div key={index} className="trust-item-enhanced">
                  <div className="trust-icon-wrapper">
                    <i className={`fas fa-${element.icon}`}></i>
                  </div>
                  <span className="trust-text">{element.text}</span>
                  {element.verified && (
                    <div className="verified-badge">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="hero-social-proof-enhanced">
              <div className="proof-item-enhanced">
                <div className="proof-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="proof-content">
                  <div className="proof-number" data-count="500">0</div>
                  <div className="proof-plus">+</div>
                  <div className="proof-label">Empresas Atendidas</div>
                </div>
              </div>
              <div className="proof-item-enhanced">
                <div className="proof-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="proof-content">
                  <div className="proof-number" data-count="15">0</div>
                  <div className="proof-plus">+</div>
                  <div className="proof-label">Anos de Experiência</div>
                </div>
              </div>
              <div className="proof-item-enhanced">
                <div className="proof-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="proof-content">
                  <div className="proof-number" data-count="98">0</div>
                  <div className="proof-plus">%</div>
                  <div className="proof-label">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna Visual - Bento Grid */}
          <div className={`hero-visual-content ${animated ? 'fade-in-up' : ''}`}>
            {/* Imagem Principal */}
            <div className="hero-main-image-modern">
              <div className="image-container-modern">
                <Image 
                  src="/assets/images/hero-escritorio.jpeg" 
                  alt="Escritório moderno da Exclusiva Contabilidade" 
                  width={600}
                  height={400}
                  className="main-office-image"
                  priority
                />
                <div className="image-overlay-modern">
                  <div className="overlay-content">
                    <Image 
                      src="/assets/images/logo.png" 
                      alt="Exclusiva Contabilidade" 
                      width={120} 
                      height={36}
                      className="overlay-logo"
                    />
                    <div className="overlay-text">Campo Grande - MS</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Bento Cards Grid - Tendência 2024 */}
            <div className="bento-grid-enhanced">
              {bentoCards.map((card, index) => (
                <div 
                  key={index}
                  className={`bento-card-enhanced ${activeCard === index ? 'active' : ''} ${card.interactive ? 'interactive' : ''}`}
                  style={{ 
                    animationDelay: `${card.delay}s`,
                    '--card-color': card.color 
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onClick={() => setActiveCard(index)}
                >
                  {card.badge && (
                    <div className="card-badge">{card.badge}</div>
                  )}
                  <div className="card-icon">
                    <i className={`fas fa-${card.icon}`}></i>
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="card-stats">
                      <span className="stats-value">{card.stats}</span>
                      <i className="fas fa-arrow-right stats-arrow"></i>
                    </div>
                  </div>
                  <div className="card-glow"></div>
                  <div className="card-interaction-hint">
                    <i className="fas fa-hand-pointer"></i>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Interactive Features Showcase */}
            <div className="features-showcase">
              <div className="feature-highlight">
                <div className="highlight-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="highlight-content">
                  <h4>IA Contábil</h4>
                  <p>Primeira no MS com IA aplicada</p>
                </div>
                <div className="highlight-badge">Novo</div>
              </div>
            </div>
            
            {/* Floating Interactive Elements */}
            <div className="floating-interactive">
              <div className="interactive-element element-1">
                <i className="fas fa-calculator"></i>
                <span>Simulador de Impostos</span>
              </div>
              <div className="interactive-element element-2">
                <i className="fas fa-file-contract"></i>
                <span>Abertura de Empresa</span>
              </div>
              <div className="interactive-element element-3">
                <i className="fas fa-chart-pie"></i>
                <span>Relatórios Gerenciais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section com Wave */}
      <div className="hero-bottom-modern">
        <svg className="wave-divider" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
