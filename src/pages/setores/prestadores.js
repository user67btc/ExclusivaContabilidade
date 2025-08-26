import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEO/SEOHead';
import { useRouter } from 'next/router';

export default function PrestadoresServicosPage() {
  // Importação do useRouter para URLs canônicas dinâmicas
  const router = useRouter();
  const canonicalUrl = `https://exclusivacontabilidade.com.br${router.pathname}`;
  
  // Dados estruturados específicos para página de prestadores de serviços
  const prestadoresSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contabilidade para Prestadores de Serviços',
    description: 'Serviços contábeis especializados para prestadores de serviços, profissionais liberais, empresas de TI e consultorias em Campo Grande - MS.',
    provider: {
      '@type': 'AccountingService',
      name: 'Exclusiva Contabilidade',
      url: 'https://exclusivacontabilidade.com.br'
    },
    serviceType: 'Serviços Contábeis',
    areaServed: {
      '@type': 'City',
      name: 'Campo Grande',
      '@id': 'https://www.wikidata.org/wiki/Q193760'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços para Prestadores',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tributação Otimizada'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gestão de Notas Fiscais'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Controle de Retenções'
          }
        }
      ]
    }
  };
  // Tipos de prestadores de serviços atendidos
  const tiposPrestadores = [
    {
      titulo: 'Profissionais Liberais',
      icone: 'fa-user-tie',
      descricao: 'Médicos, advogados, engenheiros, arquitetos, dentistas, psicólogos e outros profissionais autônomos.',
    },
    {
      titulo: 'Empresas de TI',
      icone: 'fa-laptop-code',
      descricao: 'Desenvolvimento de software, suporte técnico, consultoria em TI e empresas de tecnologia em geral.',
    },
    {
      titulo: 'Marketing e Comunicação',
      icone: 'fa-bullhorn',
      descricao: 'Agências de publicidade, assessoria de imprensa, produtoras de conteúdo e consultores de marketing.',
    },
    {
      titulo: 'Consultoria e Assessoria',
      icone: 'fa-handshake',
      descricao: 'Consultores empresariais, assessores financeiros, coaches e outros serviços de aconselhamento.',
    }
  ];

  // Serviços especializados
  const servicosEspecializados = [
    {
      titulo: 'Tributação Otimizada',
      icone: 'fa-calculator',
      descricao: 'Escolha do melhor regime tributário (Simples Nacional, Lucro Presumido ou Lucro Real) com base no perfil da sua empresa.',
    },
    {
      titulo: 'Gestão de Notas Fiscais',
      icone: 'fa-file-invoice-dollar',
      descricao: 'Emissão, controle e validação de notas fiscais eletrônicas de serviços (NFS-e) e gerenciamento de obrigações municipais.',
    },
    {
      titulo: 'Controle de Retenções',
      icone: 'fa-percentage',
      descricao: 'Gerenciamento das retenções de impostos (IR, PIS, COFINS, CSLL, ISS) comuns em serviços prestados para pessoas jurídicas.',
    },
    {
      titulo: 'Demonstrações Financeiras',
      icone: 'fa-chart-line',
      descricao: 'Relatórios contábeis e gerenciais adaptados para prestadores de serviços, com foco em análise de lucratividade por projeto.',
    }
  ];

  // Perguntas frequentes específicas do setor
  const faqPrestadores = [
    {
      pergunta: 'Qual o melhor regime tributário para prestadores de serviços?',
      resposta: 'A escolha depende de diversos fatores como faturamento, margem de lucro e tipo de serviço. Para muitos profissionais liberais e empresas de serviços com faturamento até R$ 4,8 milhões, o Simples Nacional é vantajoso pela simplificação fiscal. Para serviços com altas margens de lucro e menor custo operacional, o Lucro Presumido pode ser mais econômico. Realizamos uma análise personalizada para determinar o melhor enquadramento para cada caso.'
    },
    {
      pergunta: 'Como funciona a tributação para profissionais liberais?',
      resposta: 'Profissionais liberais podem atuar como pessoa física (autônomo) ou pessoa jurídica (empresa). Como autônomo, há incidência de Imposto de Renda pela tabela progressiva (até 27,5%), INSS e ISS municipal. Como pessoa jurídica, dependendo do regime tributário, pode haver redução significativa da carga tributária, com impostos como ISS, PIS, COFINS, IRPJ, CSLL e INSS. Nossa consultoria analisa qual formato é mais vantajoso para cada situação específica.'
    },
    {
      pergunta: 'Quais são as obrigações fiscais específicas para prestadores de serviços?',
      resposta: 'Prestadores de serviços precisam cumprir obrigações como emissão de notas fiscais eletrônicas (NFS-e), escrituração fiscal e contábil, entrega de declarações como DCTF, SPED Fiscal, EFD-Contribuições (dependendo do regime), DIRF (se houver retenções), DEFIS ou DASN-SIMEI (para Simples Nacional e MEI), além das obrigações municipais específicas conforme a legislação local de cada cidade.'
    }
  ];

  // Schema JSON-LD para FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPrestadores.map(faq => ({
      '@type': 'Question',
      name: faq.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.resposta
      }
    }))
  };

  // Array com todos os schemas para a página - unificado com @context único
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Contabilidade para Prestadores de Serviços - Exclusiva Contabilidade',
      'description': 'Serviços contábeis especializados para prestadores de serviços, profissionais liberais e empresas de consultória em Campo Grande - MS.',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Contabilidade para Prestadores de Serviços',
          description: 'Serviços contábeis especializados para prestadores de serviços, profissionais liberais, empresas de TI e consultorias em Campo Grande - MS.',
          provider: {
            '@type': 'AccountingService',
            name: 'Exclusiva Contabilidade',
            url: 'https://exclusivacontabilidade.com.br'
          },
          serviceType: 'Serviços Contábeis',
          areaServed: {
            '@type': 'City',
            name: 'Campo Grande',
            '@id': 'https://www.wikidata.org/wiki/Q193760'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Serviços para Prestadores',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Tributação Otimizada'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Gestão de Notas Fiscais'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Controle de Retenções'
                }
              }
            ]
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqPrestadores.map(faq => ({
            '@type': 'Question',
            name: faq.pergunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.resposta
            }
          }))
        }
      ]
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Contabilidade para Prestadores de Serviços | Exclusiva Contabilidade"
        description="Serviços contábeis especializados para prestadores de serviços, profissionais liberais, empresas de TI e consultorias em Campo Grande - MS."
        keywords="contabilidade prestadores de serviços, contador para profissionais liberais, contabilidade empresas TI, tributação serviços, notas fiscais eletrônicas"
        url="https://exclusivacontabilidade.com.br/setores/prestadores/"
        schemaData={schemaData}
        imageUrl="/assets/images/sectors/prestadores.jpg"
      />

      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof document !== 'undefined') {
            document.body.setAttribute('data-page', 'prestadores');
          }
        `
      }} />

      {/* Page Title */}
      <section className="page-title hero-section">
        <div className="container">
          <h1>Contabilidade para Prestadores de Serviços</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/setores">Setores</Link></li>
            <li>Prestadores de Serviços</li>
          </ul>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding content-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2 className="section-title">Soluções contábeis para quem vive de serviços</h2>
              </div>
              <p>Na Exclusiva Contabilidade, entendemos os desafios específicos enfrentados por prestadores de serviços. Nosso time é especializado em oferecer soluções contábeis personalizadas que ajudam sua empresa a crescer com segurança fiscal e otimização tributária.</p>
              <p>Com nossa experiência no setor de serviços, proporcionamos muito mais do que contabilidade básica: oferecemos consultoria estratégica para maximizar seus resultados, reduzir a carga tributária e garantir conformidade com todas as obrigações fiscais.</p>
              
              <div className="sector-features mt-4">
                <h3>Benefícios para seu negócio:</h3>
                <ul className="sector-features">
                  <li><i className="fas fa-check"></i> Redução da carga tributária com planejamento específico</li>
                  <li><i className="fas fa-check"></i> Gestão especializada de notas fiscais e retenções</li>
                  <li><i className="fas fa-check"></i> Informações gerenciais para melhorar a rentabilidade</li>
                  <li><i className="fas fa-check"></i> Orientação sobre MEI, Simples Nacional e outros regimes</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sector-image">
                <img src="/assets/images/sectors/prestadores-main.jpg" alt="Contabilidade para Prestadores de Serviços" className="img-fluid rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Prestadores */}
      <section className="section-bg-light section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Atendemos diversos perfis de prestadores</h2>
            <p>Soluções contábeis adaptadas para diferentes áreas de prestação de serviços</p>
          </div>

          <div className="row">
            {tiposPrestadores.map((tipo, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="service-card text-center">
                  <div className="service-icon mx-auto">
                    <i className={`fas ${tipo.icone}`}></i>
                  </div>
                  <h3>{tipo.titulo}</h3>
                  <p>{tipo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Especializados */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Serviços Especializados para Prestadores</h2>
            <p>Soluções desenvolvidas para as necessidades específicas do seu setor</p>
          </div>

          <div className="row">
            {servicosEspecializados.map((servico, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-4">
                <div className="service-card h-100">
                  <div className="service-icon">
                    <i className={`fas ${servico.icone}`}></i>
                  </div>
                  <h3>{servico.titulo}</h3>
                  <p>{servico.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies/Success Stories */}
      <section className="section-bg-primary section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Histórias de Sucesso</h2>
            <p>Como ajudamos prestadores de serviços a crescerem com tranquilidade fiscal</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Escritório de Arquitetura</h4>
                <p className="text-muted">Simples Nacional → Lucro Presumido</p>
                <p>Um escritório de arquitetura estava pagando tributos elevados no Simples Nacional. Após nossa análise, migramos para o Lucro Presumido e implementamos estratégias fiscais legais que resultaram em economia de 22% em impostos no primeiro ano.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Economia fiscal de R$ 32.000 ao ano
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Empresa de TI</h4>
                <p className="text-muted">Organização fiscal e financeira</p>
                <p>Uma startup de tecnologia com crescimento rápido enfrentava problemas com organização fiscal e financeira. Implementamos processos de gestão contábil e controles gerenciais que proporcionaram visibilidade de custos por projeto e facilitaram a captação de investimento.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Captação de investimento de R$ 1,2 milhão
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Perguntas Frequentes</h2>
            <p>Dúvidas comuns sobre contabilidade para prestadores de serviços</p>
          </div>

          <div className="faq-content">
            {faqPrestadores.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question">
                  {faq.pergunta}
                </div>
                <div className="faq-answer">
                  {faq.resposta}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/faq" className="btn btn-primary">
              Ver mais perguntas frequentes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-bg-primary cta-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Pronto para transformar a contabilidade do seu negócio?</h2>
              <p>Fale com nossa equipe e descubra como podemos ajudar seu serviço a crescer com tranquilidade fiscal e financeira.</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn btn-light btn-large">
                  Solicite um orçamento
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20sou%20prestador%20de%20serviços%20e%20gostaria%20de%20informações%20sobre%20contabilidade!" 
                  className="btn btn-outline btn-large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Fale pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
