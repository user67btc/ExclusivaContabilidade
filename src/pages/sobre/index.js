import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';

export default function SobrePage() {
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Exclusiva Contabilidade',
      'description': 'Escritório de contabilidade em Campo Grande - MS, oferecendo serviços contábeis, fiscais e trabalhistas para empresas de todos os portes.',
      'url': 'https://exclusivacontabilidade.com.br',
      'logo': 'https://exclusivacontabilidade.com.br/images/logo.png',
      'foundingDate': '2010',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Rua Marquês de Pombal, nº 112',
        'addressLocality': 'Campo Grande',
        'addressRegion': 'MS',
        'postalCode': '79002-160',
        'addressCountry': 'BR'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '(67) 3211-4750',
        'contactType': 'customer service',
        'email': 'contato@exclusivacontabilidade.com.br'
      },
      'sameAs': [
        'https://www.facebook.com/exclusivacontabilidade',
        'https://www.instagram.com/exclusivacontabilidade'
      ]
    }
  ];


  return (
    <Layout>
      <SEOHead
        title="Sobre a Exclusiva Contabilidade | Escritório em Campo Grande - MS"
        description="Conheça a história da Exclusiva Contabilidade, escritório especializado em serviços contábeis, fiscais e trabalhistas em Campo Grande - MS desde 2010."
        keywords="sobre exclusiva contabilidade, escritório contábil campo grande, história empresa contabilidade"
        canonical="https://exclusivacontabilidade.com.br/sobre/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Sobre</li>
            </ol>
          </nav>
          <h1>Sobre a Exclusiva Contabilidade</h1>
          <p>Há mais de 15 anos oferecendo soluções contábeis personalizadas para empresas de todos os portes em Campo Grande - MS, com foco em excelência e inovação.</p>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Nossa História</span>
            <h2>Tradição e Inovação</h2>
            <p>Fundada em 2010, a Exclusiva Contabilidade nasceu com o propósito de oferecer serviços contábeis de excelência, combinando tradição e inovação para atender empresas de todos os portes.</p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="content-card">
                <div className="icon-pattern">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3>Fundação em 2010</h3>
                <p>Iniciamos nossas atividades com o objetivo de revolucionar o atendimento contábil em Campo Grande, oferecendo um serviço personalizado e de alta qualidade.</p>
                
                <h4>Marcos Importantes:</h4>
                <ul className="list-pattern">
                  <li>2010 - Fundação da empresa</li>
                  <li>2012 - Expansão da equipe técnica</li>
                  <li>2015 - Implementação de tecnologias digitais</li>
                  <li>2018 - Certificação em sistemas integrados</li>
                  <li>2020 - Adaptação para atendimento remoto</li>
                  <li>2023 - Modernização completa dos processos</li>
                </ul>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="content-card">
                <div className="icon-pattern">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Crescimento Contínuo</h3>
                <p>Ao longo dos anos, expandimos nossa base de clientes e aprimoramos nossos serviços, sempre mantendo o foco na qualidade e na satisfação do cliente.</p>
                
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Clientes Atendidos</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Anos de Experiência</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Nossos Pilares</span>
            <h2>Missão, Visão e Valores</h2>
            <p>Os princípios que norteiam nossa atuação e definem nosso compromisso com a excelência</p>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>Missão</h3>
                <p>Oferecer soluções contábeis, fiscais e trabalhistas de excelência, contribuindo para o crescimento sustentável dos nossos clientes através de um atendimento personalizado e tecnologia de ponta.</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Visão</h3>
                <p>Ser reconhecida como a principal referência em serviços contábeis em Mato Grosso do Sul, destacando-se pela inovação, qualidade e relacionamento duradouro com os clientes.</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Valores</h3>
                <ul className="list-unstyled text-left">
                  <li><i className="fas fa-check text-success me-2"></i> Ética e transparência</li>
                  <li><i className="fas fa-check text-success me-2"></i> Excelência no atendimento</li>
                  <li><i className="fas fa-check text-success me-2"></i> Inovação constante</li>
                  <li><i className="fas fa-check text-success me-2"></i> Compromisso com resultados</li>
                  <li><i className="fas fa-check text-success me-2"></i> Responsabilidade social</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Nossa Equipe</span>
            <h2>Profissionais Qualificados</h2>
            <p>Conheça os profissionais que fazem a diferença na Exclusiva Contabilidade</p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="team-photo">
                  <i className="fas fa-user-tie fa-4x text-primary mb-3"></i>
                </div>
                <h4>João Silva</h4>
                <p className="text-muted">Contador Responsável</p>
                <p>CRC/MS 12345 - Especialista em contabilidade empresarial com mais de 10 anos de experiência.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="team-photo">
                  <i className="fas fa-user-tie fa-4x text-primary mb-3"></i>
                </div>
                <h4>Maria Santos</h4>
                <p className="text-muted">Consultora Fiscal</p>
                <p>Especialista em legislação tributária e planejamento fiscal para empresas de diversos segmentos.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="team-photo">
                  <i className="fas fa-user-tie fa-4x text-primary mb-3"></i>
                </div>
                <h4>Carlos Oliveira</h4>
                <p className="text-muted">Analista Trabalhista</p>
                <p>Responsável pelo departamento pessoal e rotinas trabalhistas, com foco em compliance.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="team-photo">
                  <i className="fas fa-user-tie fa-4x text-primary mb-3"></i>
                </div>
                <h4>Ana Costa</h4>
                <p className="text-muted">Consultora Empresarial</p>
                <p>Especialista em abertura de empresas e reestruturação societária, com vasta experiência.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Pronto para transformar a contabilidade da sua empresa?</h2>
              <p>Entre em contato agora e solicite uma proposta personalizada para o seu negócio.</p>
              <div className="cta-buttons-pattern">
                <Link href="/contato" className="btn-pattern btn-primary">
                  Solicitar Proposta
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20gostaria%20de%20informações%20sobre%20os%20serviços%20da%20Exclusiva%20Contabilidade!" 
                  className="btn-pattern btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp me-2"></i> Fale pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
