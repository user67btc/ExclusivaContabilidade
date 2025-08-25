import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { faqData } from '../../data/faqData';
import SEOHead from '../../components/SEO/SEOHead';

export default function ServicosPage() {
  // Dados estruturados específicos para a página de serviços
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      'name': 'Serviços Contábeis da Exclusiva Contabilidade',
      'description': 'Serviços contábeis profissionais oferecidos pela Exclusiva Contabilidade em Campo Grande - MS',
      'url': 'https://exclusivacontabilidade.com.br/servicos/',
      'priceRange': 'Sob consulta',
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
        'name': 'Serviços Contábeis',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@type': 'Service',
              'name': 'Contabilidade Empresarial',
              'description': 'Serviços contábeis completos para empresas de todos os portes, incluindo classificação e escrituração contábil',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/servicos#contabilidade'
            }
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@type': 'Service',
              'name': 'Departamento Fiscal',
              'description': 'Gerenciamento completo das obrigações fiscais da sua empresa, incluindo escrituração de documentos fiscais',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/servicos#fiscal'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'Service',
              'name': 'Departamento Pessoal',
              'description': 'Gestão completa das rotinas trabalhistas, desde a admissão até o desligamento, incluindo folha de pagamento',
              'provider': {
                '@type': 'Organization',
                'name': 'Exclusiva Contabilidade',
                'url': 'https://exclusivacontabilidade.com.br'
              },
              'url': 'https://exclusivacontabilidade.com.br/servicos#pessoal'
            }
          }
        ]
      }
    }
  ];
  const servicos = [
    {
      id: 'contabilidade',
      title: 'Contabilidade Empresarial',
      icon: 'fa-chart-line',
      description: 'Serviços contábeis completos para empresas de todos os portes, incluindo classificação e escrituração contábil, elaboração de demonstrações financeiras e relatórios gerenciais personalizados.',
      items: [
        'Classificação e escrituração contábil',
        'Elaboração de balanços e demonstrativos',
        'Análise de demonstrações financeiras',
        'Relatórios gerenciais customizados',
        'Controle patrimonial',
        'Conciliações bancárias',
        'Apuração de resultados'
      ]
    },
    {
      id: 'fiscal',
      title: 'Departamento Fiscal',
      icon: 'fa-file-invoice-dollar',
      description: 'Gerenciamento completo das obrigações fiscais da sua empresa, incluindo escrituração de documentos fiscais, apuração de impostos e entrega de declarações obrigatórias.',
      items: [
        'Escrituração de notas fiscais',
        'Apuração de impostos (ICMS, PIS, COFINS, ISS)',
        'Envio de declarações fiscais (SPED, DCTF, GIA)',
        'Emissão de guias de recolhimento',
        'Parcelamento de débitos tributários',
        'Planejamento tributário',
        'Consultoria para regimes especiais'
      ]
    },
    {
      id: 'pessoal',
      title: 'Departamento Pessoal',
      icon: 'fa-users',
      description: 'Gestão completa das rotinas trabalhistas, desde a admissão até o desligamento, incluindo folha de pagamento, férias, rescisões e todas as obrigações acessórias.',
      items: [
        'Registro de funcionários e estagiários',
        'Folha de pagamento e encargos sociais',
        'Férias, 13º salário e rescisões',
        'E-Social e DIRF',
        'Homologações trabalhistas',
        'Controle de ponto eletrônico',
        'Acordos trabalhistas',
        'Consultoria em legislação trabalhista'
      ]
    },
    {
      id: 'societario',
      title: 'Departamento Societário',
      icon: 'fa-handshake',
      description: 'Serviços de abertura, alteração e encerramento de empresas, com acompanhamento em todos os órgãos necessários, obtendo alvarás e licenças específicas.',
      items: [
        'Abertura de empresas',
        'Alterações contratuais',
        'Baixa e encerramento de empresas',
        'Registros em órgãos públicos',
        'Obtenção de licenças e alvarás',
        'Regularização de empresas',
        'Reestruturação societária',
        'Elaboração de atas e contratos sociais'
      ]
    },
    {
      id: 'consultoria',
      title: 'Consultoria Empresarial',
      icon: 'fa-lightbulb',
      description: 'Assessoria especializada para tomada de decisões estratégicas, incluindo análises financeiras, planejamento tributário e estudos de viabilidade para novos projetos.',
      items: [
        'Planejamento tributário',
        'Análise financeira e econômica',
        'Estudo de viabilidade para novos negócios',
        'Recuperação de impostos pagos indevidamente',
        'Diagnóstico empresarial',
        'Reorganização empresarial',
        'Assessoria para fusões e aquisições',
        'Consultoria para sucessão familiar'
      ]
    },
    {
      id: 'mei',
      title: 'Serviços para MEI',
      icon: 'fa-store',
      description: 'Serviços especializados para Microempreendedores Individuais, incluindo formalização, emissão de notas fiscais, declaração anual e transição para ME quando necessário.',
      items: [
        'Formalização e abertura de MEI',
        'Emissão de notas fiscais',
        'Declaração Anual (DASN-SIMEI)',
        'Consultoria para crescimento',
        'Controle financeiro simplificado',
        'Desenquadramento e transição para ME',
        'Parcelamento de débitos',
        'Regularização de pendências'
      ]
    },
    {
      id: 'imposto-renda',
      title: 'Imposto de Renda',
      icon: 'fa-file-alt',
      description: 'Elaboração e transmissão de declarações de imposto de renda para pessoas físicas e jurídicas, com análise detalhada para otimização legal da carga tributária.',
      items: [
        'Declaração de Imposto de Renda Pessoa Física',
        'Declaração de Imposto de Renda Pessoa Jurídica',
        'Planejamento tributário anual',
        'Análise de documentos e comprovantes',
        'Declarações retificadoras',
        'Malha fina e fiscalizações',
        'Consultoria para investimentos e tributação',
        'Apuração de ganho de capital'
      ]
    },
    {
      id: 'esocial',
      title: 'E-Social Doméstico',
      icon: 'fa-home',
      description: 'Serviço completo de administração de empregados domésticos, incluindo registro, folha de pagamento, férias, 13º e todas as obrigações legais via E-Social.',
      items: [
        'Cadastro no E-Social',
        'Registro de empregados domésticos',
        'Folha de pagamento mensal',
        'Cálculo de férias e 13º salário',
        'Rescisão de contrato de trabalho',
        'Emissão de guias de pagamento',
        'Orientação sobre legislação doméstica',
        'Suporte para acordos trabalhistas'
      ]
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Serviços Contábeis | Exclusiva Contabilidade em Campo Grande"
        description="Conheça os serviços contábeis oferecidos pela Exclusiva Contabilidade: contabilidade empresarial, fiscal, departamento pessoal, MEI e muito mais."
        keywords="contabilidade empresarial, departamento fiscal, departamento pessoal, abertura de empresas, mei, imposto de renda"
        canonical="https://exclusivacontabilidade.com.br/servicos/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Serviços</li>
            </ol>
          </nav>
          <h1>Nossos Serviços Contábeis</h1>
          <p>Soluções contábeis completas e personalizadas para empresas de todos os portes. Nossa equipe especializada oferece desde contabilidade básica até consultoria estratégica avançada.</p>
        </div>
      </section>

      {/* Services Intro */}
      <section className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-header-pattern">
                <span className="section-subtitle">Nossos Serviços</span>
                <h2>Soluções Contábeis Completas</h2>
                <p>Oferecemos uma ampla gama de serviços contábeis e financeiros para empresas de todos os portes e segmentos. Nossa equipe de profissionais qualificados está pronta para atender às necessidades específicas do seu negócio.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {servicos.map((servico, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-4">
                <div className="content-card" id={servico.id}>
                  <div className="icon-pattern">
                    <i className={`fas ${servico.icon}`}></i>
                  </div>
                  <div className="service-content">
                    <h3>{servico.title}</h3>
                    <p>{servico.description}</p>
                    <button 
                      className="btn-link" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${servico.id}`} 
                      aria-expanded="false"
                    >
                      Ver mais detalhes
                    </button>
                    <div className="collapse" id={`collapse${servico.id}`}>
                      <div className="service-details">
                        <h4>O que incluímos nesse serviço:</h4>
                        <ul>
                          {servico.items.map((item, idx) => (
                            <li key={idx}><i className="fas fa-check"></i> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern text-center">
            <span className="section-subtitle">Nosso Processo</span>
            <h2>Como Trabalhamos</h2>
            <p>Nosso processo de atendimento é estruturado para oferecer a melhor experiência para nossos clientes</p>
          </div>

          <div className="process-timeline">
            <div className="process-item">
              <div className="process-number">1</div>
              <div className="process-content">
                <h3>Diagnóstico Inicial</h3>
                <p>Realizamos uma análise completa da situação atual da sua empresa para identificar necessidades específicas.</p>
              </div>
            </div>
            
            <div className="process-item">
              <div className="process-number">2</div>
              <div className="process-content">
                <h3>Planejamento Personalizado</h3>
                <p>Desenvolvemos um plano de ação customizado com base nas necessidades identificadas.</p>
              </div>
            </div>
            
            <div className="process-item">
              <div className="process-number">3</div>
              <div className="process-content">
                <h3>Implementação de Soluções</h3>
                <p>Nossa equipe implementa as soluções contábeis, fiscais e trabalhistas conforme o planejamento.</p>
              </div>
            </div>
            
            <div className="process-item">
              <div className="process-number">4</div>
              <div className="process-content">
                <h3>Acompanhamento Contínuo</h3>
                <p>Monitoramos constantemente os resultados e fazemos os ajustes necessários para otimizar os processos.</p>
              </div>
            </div>
            
            <div className="process-item">
              <div className="process-number">5</div>
              <div className="process-content">
                <h3>Relatórios e Consultoria</h3>
                <p>Fornecemos relatórios periódicos e consultoria estratégica para apoiar a tomada de decisões.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="page-content-alt">
        <div className="container">
          <div className="section-header-pattern text-center">
            <span className="section-subtitle">Dúvidas Frequentes</span>
            <h2>Perguntas Frequentes</h2>
            <p>Tire suas dúvidas sobre nossos serviços</p>
          </div>

          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="faq-accordion">
                {(faqData.servicos || []).slice(0, 5).map((item, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question" data-bs-toggle="collapse" data-bs-target={`#faqServicos${index}`}>
                      {item.question}
                    </div>
                    <div className="faq-answer collapse" id={`faqServicos${index}`}>
                      <div className="faq-answer-content">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <Link href="/faq" className="btn-pattern btn-secondary">
                  Ver todas as perguntas frequentes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern text-center">
            <span className="section-subtitle">Especialização</span>
            <h2>Setores Atendidos</h2>
            <p>Soluções especializadas para diferentes segmentos de mercado</p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3>Prestadores de Serviços</h3>
                <p>Soluções específicas para profissionais liberais e empresas de serviços.</p>
                <Link href="/setores/prestadores" className="btn-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3>Comércio</h3>
                <p>Atendimento especializado para empresas de varejo e atacado.</p>
                <Link href="/setores/comercio" className="btn-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern">
                  <i className="fas fa-home"></i>
                </div>
                <h3>E-Social Doméstico</h3>
                <p>Gestão completa de funcionários domésticos via E-Social.</p>
                <Link href="/setores/esocial" className="btn-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/setores" className="btn-pattern btn-primary">
              Ver todos os setores
            </Link>
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
