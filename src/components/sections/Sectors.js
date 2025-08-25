import Link from 'next/link';

export default function Sectors() {
  const sectors = [
    {
      id: 'prestadores',
      title: 'Prestadores de Serviços',
      image: '/assets/images/sectors/prestadores.jpg',
      description: 'Soluções contábeis especializadas para profissionais liberais, empresas de TI, marketing, consultoria e demais prestadores de serviços.',
      features: ['Tributação otimizada', 'Gestão de notas fiscais', 'Relatórios gerenciais'],
      link: '/setores/prestadores'
    },
    {
      id: 'comercio',
      title: 'Comércio',
      image: '/assets/images/sectors/comercio.jpg',
      description: 'Atendimento especializado para empresas de varejo, atacado, e-commerce e distribuidoras com foco em gestão fiscal e controle de estoque.',
      features: ['Gestão Fiscal e ICMS', 'Controle de Estoque', 'Documentos Fiscais'],
      link: '/setores/comercio'
    },
    {
      id: 'esocial',
      title: 'E-Social Doméstico',
      image: '/assets/images/sectors/esocial.jpg',
      description: 'Suporte completo para empregadores domésticos, desde o registro até a gestão mensal das obrigações no e-Social.',
      features: ['Registro de empregados', 'Folha de pagamento', 'Obrigações acessórias'],
      link: '/setores/esocial'
    },
    {
      id: 'rurais',
      title: 'Produtores Rurais',
      image: '/assets/images/sectors/rurais.jpg',
      description: 'Contabilidade especializada para agronegócio com foco nas particularidades do setor rural.',
      features: [
        'Contabilidade Rural',
        'Gestão de Safras',
        'Tributação Específica'
      ],
      link: '/setores/rurais'
    }
  ];

  return (
    <section className="sectors-section">
      <div className="sectors-bg-elements">
        <div className="sectors-shape sectors-shape-1"></div>
        <div className="sectors-shape sectors-shape-2"></div>
        <div className="sectors-shape sectors-shape-3"></div>
      </div>
      <div className="container">
        <div className="section-header text-center animate-fade-in">
          <span className="section-subtitle" style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem', display: 'block'}}>Especialização</span>
          <h2 className="section-title">Nossos Setores</h2>
          <p className="section-description" style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem'}}>Soluções contábeis específicas para diferentes segmentos de mercado</p>
        </div>
        
        <div className="sectors-grid">
          {sectors.map((sector, index) => (
            <div key={sector.id}>
              <div 
                className="sector-card animate-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="sector-card-header">
                  <div className="sector-image-wrapper">
                    <img src={sector.image} alt={`Setor ${sector.title}`} className="sector-image" loading="lazy" />
                  </div>
                  <div className="sector-icon-large">
                    <i className={`fas fa-${sector.id === 'prestadores' ? 'building' : sector.id === 'comercio' ? 'store' : sector.id === 'esocial' ? 'home' : sector.id === 'rurais' ? 'tractor' : 'industry'}`}></i>
                  </div>
                </div>
                <div className="sector-card-content glassmorphism">
                  <h3>{sector.title}</h3>
                  <p className="sector-description-contrast">{sector.description}</p>
                  <ul className="sector-features">
                    {sector.features.map((feature, featureIndex) => (
                      <li key={featureIndex}><i className="fas fa-check-circle"></i> {feature}</li>
                    ))}
                  </ul>
                  <Link href={sector.link} className="btn-primary cta-button">
                    <span>Saiba Mais</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
