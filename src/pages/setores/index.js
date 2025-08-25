import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEO/SEOHead';
import Sectors from '../../components/sections/Sectors';

export default function SetoresPage() {
  // Dados estruturados específicos para a página de setores
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      'name': 'Setores Atendidos pela Exclusiva Contabilidade',
      'description': 'Serviços contábeis personalizados para diferentes setores econômicos',
      'url': 'https://exclusivacontabilidade.com.br/setores/',
      'priceRange': 'Consulte-nos',
      'telephone': '(67) 3211-4750',
      'email': 'contato@exclusivacontabilidade.com.br',
      'image': 'https://exclusivacontabilidade.com.br/images/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Rua Marquês de Pombal, nº 112',
        'addressLocality': 'Campo Grande',
        'addressRegion': 'MS',
        'postalCode': '79002-160',
        'addressCountry': 'BR'
      },
      'openingHours': 'Mo,Tu,We,Th,Fr 08:00-18:00',
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '18:00'
        }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Setores Atendidos',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@type': 'Service',
              'name': 'Contabilidade para Prestadores de Serviços',
              'description': 'Soluções contábeis especializadas para profissionais liberais, empresas de TI, marketing, consultoria e demais prestadores de serviços.',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/setores/prestadores'
            }
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@type': 'Service',
              'name': 'Contabilidade para Comércio',
              'description': 'Atendimento especializado para empresas de varejo, atacado, e-commerce e distribuidoras com foco em gestão fiscal e controle de estoque.',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/setores/comercio'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'Service',
              'name': 'E-Social Doméstico',
              'description': 'Suporte completo para empregadores domésticos, desde o registro até a gestão mensal das obrigações no e-Social.',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/setores/esocial'
            }
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'item': {
              '@type': 'Service',
              'name': 'Contabilidade para Produtores Rurais',
              'description': 'Contabilidade especializada para o agronegócio, com conhecimento específico das particularidades do setor rural.',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/setores/rurais'
            }
          }
        ]
      }
    }
  ];
  const sectors = [
    {
      id: 'prestadores',
      title: 'Prestadores de Serviços',
      image: '/assets/images/sectors/prestadores.jpg',
      description: 'Soluções contábeis especializadas para profissionais liberais, empresas de TI, marketing, consultoria e demais prestadores de serviços.',
      features: [
        'Tributação otimizada para prestadores de serviços',
        'Gestão de notas fiscais eletrônicas',
        'Controle de retenções de impostos',
        'Relatórios gerenciais específicos',
        'Planejamento tributário para MEI, Simples Nacional e Lucro Presumido'
      ],
      link: '/setores/prestadores'
    },
    {
      id: 'comercio',
      title: 'Comércio',
      image: '/assets/images/sectors/comercio.jpg',
      description: 'Atendimento especializado para empresas de varejo, atacado, e-commerce e distribuidoras com foco em gestão fiscal e controle de estoque.',
      features: [
        'Gestão Fiscal e ICMS',
        'Controle de Estoque',
        'Documentos Fiscais e NFe',
        'Análise de Lucratividade',
        'Soluções para e-commerce'
      ],
      link: '/setores/comercio'
    },
    {
      id: 'esocial',
      title: 'E-Social Doméstico',
      image: '/assets/images/sectors/esocial.jpg',
      description: 'Suporte completo para empregadores domésticos, desde o registro até a gestão mensal das obrigações no e-Social.',
      features: [
        'Registro de empregados domésticos',
        'Folha de pagamento mensal',
        'Cálculo de férias e 13º salário',
        'Geração de guias DAE',
        'Suporte completo ao e-Social'
      ],
      link: '/setores/esocial'
    },
    {
      id: 'rurais',
      title: 'Produtores Rurais',
      image: '/assets/images/sectors/rurais.jpg',
      description: 'Contabilidade especializada para o agronegócio, com conhecimento específico das particularidades do setor rural.',
      features: [
        'Contabilidade Rural',
        'Gestão de Safras',
        'Tributação Específica',
        'Controle de Estoque',
        'Relatórios Gerenciais'
      ],
      link: '/setores/rurais'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Setores Atendidos | Exclusiva Assessoria Contábil em Campo Grande"
        description="A Exclusiva Contabilidade atende diversos setores com soluções contábeis especializadas para prestadores de serviços, comércio, produtores rurais e domésticos."
        keywords="contabilidade especializada, prestadores de serviços, contabilidade comércio, contabilidade rural, e-social doméstico, contador campo grande"
        canonical="https://exclusivacontabilidade.com.br/setores/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Setores Atendidos</li>
            </ol>
          </nav>
          <h1>Setores Atendidos em Campo Grande MS</h1>
          <p>Soluções contábeis especializadas para diversos segmentos do mercado em Campo Grande e região, com expertise e conhecimento específico para cada área de atuação.</p>
          <div className="hero-cta-mobile">
            <a 
              href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20preciso%20de%20um%20orçamento%20contábil%20para%20minha%20empresa!" 
              className="btn-whatsapp-hero"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
              Orçamento Grátis pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Sectors Intro */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Expertise Especializada em Campo Grande</span>
            <h2>Contabilidade para Diversos Segmentos</h2>
            <p style={{
              fontSize: '1.2rem !important',
              lineHeight: '1.6 !important',
              color: '#475569 !important',
              marginBottom: '2rem !important',
              textAlign: 'center !important',
              maxWidth: '800px !important',
              margin: '0 auto 2rem !important'
            }}>Nossa equipe em Campo Grande MS está preparada para lidar com as demandas específicas do seu negócio</p>
            <div className="trust-indicators-fixed" style={{
              display: 'flex !important',
              justifyContent: 'center !important',
              gap: '2rem !important',
              margin: '3rem auto !important',
              flexWrap: 'wrap !important',
              background: '#ffffff !important',
              padding: '2.5rem !important',
              borderRadius: '20px !important',
              maxWidth: '1000px !important',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15) !important',
              border: '3px solid #0d47a1 !important',
              position: 'relative !important',
              zIndex: '999 !important',
              visibility: 'visible !important',
              opacity: '1 !important'
            }}>
              <div className="trust-item-fixed-1" style={{
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '0.75rem !important',
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb) !important',
                padding: '1rem 1.5rem !important',
                borderRadius: '30px !important',
                border: '2px solid #0d47a1 !important',
                color: '#0d47a1 !important',
                fontSize: '1rem !important',
                fontWeight: '700 !important',
                boxShadow: '0 4px 15px rgba(13, 71, 161, 0.3) !important',
                minWidth: '200px !important',
                justifyContent: 'center !important',
                visibility: 'visible !important',
                opacity: '1 !important'
              }}>
                <i className="fas fa-clock" style={{
                  color: '#25D366 !important',
                  fontSize: '1.4rem !important',
                  marginRight: '0.5rem !important',
                  visibility: 'visible !important',
                  opacity: '1 !important'
                }}></i>
                <span>Orçamento em 1 hora</span>
              </div>
              <div className="trust-item-fixed-2" style={{
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '0.75rem !important',
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb) !important',
                padding: '1rem 1.5rem !important',
                borderRadius: '30px !important',
                border: '2px solid #0d47a1 !important',
                color: '#0d47a1 !important',
                fontSize: '1rem !important',
                fontWeight: '700 !important',
                boxShadow: '0 4px 15px rgba(13, 71, 161, 0.3) !important',
                minWidth: '200px !important',
                justifyContent: 'center !important',
                visibility: 'visible !important',
                opacity: '1 !important'
              }}>
                <i className="fas fa-map-marker-alt" style={{
                  color: '#25D366 !important',
                  fontSize: '1.4rem !important',
                  marginRight: '0.5rem !important',
                  visibility: 'visible !important',
                  opacity: '1 !important'
                }}></i>
                <span>Atendimento em Campo Grande MS</span>
              </div>
              <div className="trust-item-fixed-3" style={{
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '0.75rem !important',
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb) !important',
                padding: '1rem 1.5rem !important',
                borderRadius: '30px !important',
                border: '2px solid #0d47a1 !important',
                color: '#0d47a1 !important',
                fontSize: '1rem !important',
                fontWeight: '700 !important',
                boxShadow: '0 4px 15px rgba(13, 71, 161, 0.3) !important',
                minWidth: '200px !important',
                justifyContent: 'center !important',
                visibility: 'visible !important',
                opacity: '1 !important'
              }}>
                <i className="fas fa-users" style={{
                  color: '#25D366 !important',
                  fontSize: '1.4rem !important',
                  marginRight: '0.5rem !important',
                  visibility: 'visible !important',
                  opacity: '1 !important'
                }}></i>
                <span>Mais de 500 empresas atendidas</span>
              </div>
            </div>
          </div>

          <div className="content-section-wrapper content-section-responsive" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div className="content-text">
              <div className="content-card" style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(13, 71, 161, 0.1)'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#334155',
                  marginBottom: '1.5rem'
                }}>A Exclusiva Assessoria Contábil atende diversos setores do mercado em Campo Grande MS com soluções especializadas que atendem às particularidades de cada segmento. Nossa equipe está preparada para lidar com as demandas específicas do seu negócio.</p>
                
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#334155',
                  marginBottom: '2rem'
                }}>Cada setor possui desafios únicos e requisitos específicos quando se trata de contabilidade e gestão fiscal. Por isso, desenvolvemos metodologias personalizadas para atender com excelência às diferentes áreas de atuação em Campo Grande e região.</p>
                
                <div className="cta-intermediate" style={{
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <a 
                    href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20gostaria%20de%20receber%20um%20orçamento%20personalizado%20para%20minha%20empresa!" 
                    className="btn-whatsapp-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Receba Seu Orçamento Agora!
                  </a>
                </div>
                
                <div className="features-list" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: 'rgba(13, 71, 161, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(13, 71, 161, 0.1)'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#0d47a1',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <i className="fas fa-check-circle" style={{
                      color: '#25D366',
                      fontSize: '1.2rem'
                    }}></i>
                    <span>Metodologias personalizadas</span>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#0d47a1',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <i className="fas fa-check-circle" style={{
                      color: '#25D366',
                      fontSize: '1.2rem'
                    }}></i>
                    <span>Equipe especializada</span>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#0d47a1',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <i className="fas fa-check-circle" style={{
                      color: '#25D366',
                      fontSize: '1.2rem'
                    }}></i>
                    <span>Atendimento dedicado</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="content-image">
              <div className="sectors-image" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(13, 71, 161, 0.1)',
                minHeight: '400px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src="/assets/images/hero-escritorio.jpeg" 
                  alt="Escritório da Exclusiva Contabilidade - Setores Atendidos" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }} 
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = '/assets/images/placeholder.svg'; 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sectors */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Áreas de Atuação</span>
            <h2>Nossos Setores Especializados</h2>
            <p>Conheça as áreas em que podemos ajudar seu negócio a crescer</p>
          </div>
          
          <Sectors />
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Precisa de Contabilidade em Campo Grande MS?</h2>
              <p>Receba um orçamento personalizado sem compromisso! Atendemos empresas de todos os setores em Campo Grande e região com soluções contábeis sob medida.</p>
              <div className="final-cta-section">
                <div className="urgency-badge">
                  <i className="fas fa-clock"></i>
                  <span>Orçamento em até 1 hora!</span>
                </div>
                <div className="cta-buttons">
                  <a 
                    href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20preciso%20de%20um%20orçamento%20contábil%20completo%20para%20minha%20empresa%20em%20Campo%20Grande!" 
                    className="btn-pattern btn-primary btn-large"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    Solicitar Orçamento Gratuito
                  </a>
                  <Link href="/contato" className="btn-pattern btn-outline">
                    <i className="fas fa-envelope me-2"></i>
                    Outros Contatos
                  </Link>
                </div>
                <div className="trust-final">
                  <span>✓ Sem compromisso</span>
                  <span>✓ Resposta rápida</span>
                  <span>✓ Atendimento local</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
