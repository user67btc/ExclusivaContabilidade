import React from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';

const Ferramentas = () => {
  const ferramentasDisponiveis = [
    {
      id: 'calculadora-impostos',
      titulo: 'Calculadora de Impostos',
      descricao: 'Simule os impostos da sua empresa com base no faturamento e regime tributário.',
      icon: 'calculator',
      cor: '#1966b4',
      url: '/ferramentas/calculadora-impostos',
      badge: 'Novo'
    },
    {
      id: 'simulador-parcelamento',
      titulo: 'Simulador de Parcelamento',
      descricao: 'Calcule as condições de parcelamento para regularizar dívidas tributárias.',
      icon: 'file-invoice-dollar',
      cor: '#1966b4',
      url: '/ferramentas/simulador-parcelamento',
      badge: 'Novo'
    },
    {
      id: 'consulta-cnpj',
      titulo: 'Consulta de CNPJ',
      descricao: 'Verifique a situação cadastral de empresas através do CNPJ.',
      icon: 'building',
      cor: '#1966b4',
      url: '/ferramentas/consulta-cnpj',
      badge: 'Novo'
    },
    {
      id: 'calculo-encargos',
      titulo: 'Cálculo de Encargos',
      descricao: 'Calcule encargos trabalhistas, férias, 13º salário e rescisões.',
      icon: 'users',
      cor: '#1966b4',
      url: '/ferramentas/calculo-encargos',
      badge: 'Novo'
    },
    {
      id: 'planejamento-tributario',
      titulo: 'Simulador de Regime Tributário',
      descricao: 'Compare os regimes tributários e identifique o mais vantajoso para sua empresa.',
      icon: 'chart-pie',
      cor: '#1966b4',
      url: '/ferramentas/simulador-regimes',
      badge: 'Novo'
    },
    {
      id: 'calendarios-fiscais',
      titulo: 'Calendários Fiscais',
      descricao: 'Consulte os prazos de obrigações fiscais e tributárias atualizados.',
      icon: 'calendar-check',
      cor: '#1966b4',
      url: '/ferramentas/calendario-fiscal',
      badge: 'Novo'
    }
  ];
  
  return (
    <Layout>
      <SEOHead
        title="Ferramentas e Calculadoras | Exclusiva Contabilidade"
        description="Ferramentas gratuitas para auxiliar empresas e empreendedores: calculadora de impostos, simuladores fiscais, consultas e mais."
        canonical="https://exclusivacontabilidade.com.br/ferramentas/"
        keywords="calculadora impostos, simulador fiscal, ferramentas contábeis, consulta cnpj, cálculo tributário"
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Ferramentas</li>
            </ol>
          </nav>
          <h1>Ferramentas Contábeis</h1>
          <p>Acesse nossas calculadoras e simuladores gratuitos para ajudar na gestão financeira, fiscal e tributária da sua empresa.</p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Recursos Gratuitos</span>
            <h2>Calculadoras e Simuladores</h2>
            <p>Ferramentas desenvolvidas para facilitar a gestão do seu negócio</p>
          </div>
          <div className="row">
            {ferramentasDisponiveis.map((ferramenta) => (
              <div key={ferramenta.id} className="col-lg-4 col-md-6 mb-4">
                <div className="content-card text-center">
                  <div className="icon-pattern mx-auto mb-3">
                    <i className={`fas fa-${ferramenta.icon}`}></i>
                  </div>
                  
                  <h3>{ferramenta.titulo}</h3>
                  {ferramenta.badge && (
                    <span className={`badge ${ferramenta.badge === 'Novo' ? 'badge-success' : 'badge-secondary'} mb-2`}>
                      {ferramenta.badge}
                    </span>
                  )}
                  
                  <p>{ferramenta.descricao}</p>
                  
                  {ferramenta.badge !== 'Em breve' ? (
                    <Link 
                      href={ferramenta.url}
                      className="btn-pattern btn-primary"
                    >
                      <i className="fas fa-arrow-right me-2"></i>
                      Acessar Ferramenta
                    </Link>
                  ) : (
                    <button 
                      className="btn-pattern btn-outline"
                      disabled
                    >
                      <i className="fas fa-clock me-2"></i>
                      Em Desenvolvimento
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Precisa de uma ferramenta específica?</h2>
              <p>Tem alguma sugestão de calculadora ou simulador que gostaria de ver aqui? Entre em contato conosco!</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn-pattern btn-primary me-3">
                  <i className="fas fa-envelope me-2"></i>
                  Entre em Contato
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20gostaria%20de%20sugerir%20uma%20ferramenta!" 
                  className="btn-pattern btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ferramentas;
