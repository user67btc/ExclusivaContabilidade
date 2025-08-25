import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';
import { useRouter } from 'next/router';

export default function ComercioPage() {
  const router = useRouter();
  const canonicalUrl = `https://exclusivacontabilidade.com.br${router.pathname}`;
  
  // Metadados para SEO
  const seoData = {
    title: "Contabilidade para Comércio | Varejo, Atacado e E-commerce | Exclusiva",
    description: "Serviços contábeis especializados para empresas de comércio, com foco em ICMS, controle de estoque, e tributação para varejo, atacado e e-commerce.",
    keywords: "contabilidade para comércio, contador para varejo, contabilidade para e-commerce, contador para loja, tributação comércio, icms, substituição tributária, contabilidade atacado",
    url: canonicalUrl,
    imageUrl: "https://exclusivacontabilidade.com.br/images/og-comercio.jpg",
  };
  
  // Schema JSON-LD para a página de Comércio
  const schemaData = [
    // Schema unificado com @context único
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Contabilidade para Comércio - Exclusiva Contabilidade",
      "description": "Serviços contábeis especializados para empresas comerciais, incluindo varejo, atacado, e-commerce e distribuidoras em Campo Grande - MS.",
      "@graph": [
        {
          "@type": "Service",
          "name": "Contabilidade para Comércio",
          "description": "Serviços contábeis especializados para empresas comerciais, incluindo varejo, atacado, e-commerce e distribuidoras.",
          "provider": {
            "@type": "Organization",
            "name": "Exclusiva Contabilidade",
            "url": "https://exclusivacontabilidade.com.br"
          },
          "serviceType": "Serviços Contábeis para Comércio",
          "areaServed": "Brasil",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços para Comércio",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Gestão Fiscal e ICMS"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Controle de Estoque"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Documentos Fiscais"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Análise de Lucratividade"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Soluções para E-commerce"
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Como funciona a Substituição Tributária no comércio?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Substituição Tributária (ST) é um regime onde o recolhimento do ICMS é antecipado e realizado por um contribuinte no início da cadeia. Para empresas comerciais, é fundamental verificar se o produto comercializado está sujeito a ST, pois isso impacta diretamente no preço de aquisição, margens e preço final."
              }
            },
            {
              "@type": "Question",
              "name": "Qual o melhor regime tributário para uma empresa comercial?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O melhor regime tributário depende de diversos fatores como faturamento, margem de lucro, tipo de produtos comercializados e modelo de negócio. Uma análise contábil personalizada é essencial para determinar se Simples Nacional, Lucro Presumido ou Lucro Real é mais vantajoso para sua operação comercial específica."
              }
            }
          ]
        }
      ]
    }
  ];

  // Segmentação de clientes
  const segmentos = [
    {
      titulo: 'Varejo',
      icone: 'fa-store',
      descricao: 'Lojas físicas, butiques, farmácias, supermercados e demais estabelecimentos de venda direta ao consumidor.',
    },
    {
      titulo: 'Atacado',
      icone: 'fa-warehouse',
      descricao: 'Distribuidores, atacadistas e empresas que vendem produtos em grande quantidade para outros negócios.',
    },
    {
      titulo: 'E-commerce',
      icone: 'fa-shopping-cart',
      descricao: 'Lojas virtuais, marketplaces e negócios de venda online com desafios específicos de tributação.',
    },
    {
      titulo: 'Distribuidoras',
      icone: 'fa-truck',
      descricao: 'Empresas de distribuição de produtos com necessidades específicas de logística e controle de estoque.',
    }
  ];

  // Serviços especializados para comércio
  const servicosEspecializados = [
    {
      titulo: 'Gestão Fiscal e ICMS',
      icone: 'fa-file-invoice-dollar',
      descricao: 'Controle completo das obrigações fiscais, com foco na gestão do ICMS, substituição tributária e regimes especiais para o comércio.',
    },
    {
      titulo: 'Controle de Estoque',
      icone: 'fa-boxes',
      descricao: 'Integração contábil-fiscal do controle de estoque, conciliação de inventário e métodos de valorização para otimizar resultados.',
    },
    {
      titulo: 'Documentos Fiscais',
      icone: 'fa-receipt',
      descricao: 'Gestão completa de NF-e, NFC-e e demais documentos fiscais obrigatórios para o comércio, garantindo conformidade e evitando multas.',
    },
    {
      titulo: 'Análise de Lucratividade',
      icone: 'fa-chart-pie',
      descricao: 'Relatórios gerenciais para análise de margem por produto, giro de estoque e outros indicadores essenciais para tomada de decisão.',
    },
    {
      titulo: 'Soluções para E-commerce',
      icone: 'fa-laptop',
      descricao: 'Tratamento fiscal especializado para vendas online, marketplaces e questões interestaduais específicas do comércio eletrônico.',
    }
  ];

  // Benefícios específicos
  const beneficios = [
    {
      titulo: 'Redução da carga tributária',
      descricao: 'Planejamento tributário específico para o comércio, considerando regimes especiais e incentivos fiscais disponíveis.'
    },
    {
      titulo: 'Controle eficiente do estoque',
      descricao: 'Integração entre fiscal e contábil para garantir precisão no controle de estoques e valorização de inventário.'
    },
    {
      titulo: 'Gestão de obrigações acessórias',
      descricao: 'Administração completa das declarações específicas do setor comercial, como SPED Fiscal, SINTEGRA e outras.'
    },
    {
      titulo: 'Prevenção de autuações fiscais',
      descricao: 'Processos rigorosos para evitar inconsistências fiscais, especialmente em operações de ICMS e Substituição Tributária.'
    }
  ];

  // Perguntas frequentes específicas do setor
  const faqComercio = [
    {
      pergunta: 'Como funciona a Substituição Tributária no comércio?',
      resposta: 'A Substituição Tributária (ST) é um regime onde o recolhimento do ICMS é antecipado e realizado por um contribuinte no início da cadeia, geralmente o fabricante ou importador, que se torna "substituto tributário". Para empresas comerciais, é fundamental verificar se o produto comercializado está sujeito a ST, pois isso impacta diretamente no preço de aquisição, margens e preço final. Nossa contabilidade gerencia esse controle, identificando produtos sujeitos a ST, calculando valores corretos e orientando sobre créditos possíveis para evitar tributação em cascata.'
    },
    {
      pergunta: 'Qual o melhor regime tributário para uma empresa comercial?',
      resposta: 'A escolha do regime tributário ideal para comércio depende de diversos fatores como faturamento, margem de lucro, mix de produtos e modelo de operação. Para empresas com faturamento até R$ 4,8 milhões, o Simples Nacional geralmente é vantajoso pela simplificação fiscal. Empresas com margens baixas podem se beneficiar do Lucro Presumido. Para operações mais complexas ou com maior faturamento, o Lucro Real pode ser mais econômico. Realizamos uma análise personalizada considerando simulações em diferentes cenários para determinar o enquadramento tributário mais vantajoso para sua operação comercial específica.'
    },
    {
      pergunta: 'Como implementar um controle de estoque eficiente para fins contábeis e fiscais?',
      resposta: 'Um controle de estoque eficiente integra aspectos operacionais, fiscais e contábeis. Recomendamos: 1) Utilizar um sistema ERP com módulo de estoque integrado ao fiscal; 2) Implementar processos de inventário periódico para reconciliação; 3) Definir método de valorização adequado (PEPS, UEPS ou Custo Médio) conforme o perfil do negócio; 4) Estabelecer controles por CFOP para rastreabilidade fiscal; 5) Configurar alertas para inconsistências entre estoque físico e fiscal. Nossa contabilidade trabalha em conjunto com sua equipe para implementar estes controles e garantir conformidade com obrigações como Bloco H do SPED e inventários obrigatórios.'
    },
    {
      pergunta: 'Quais são as principais obrigações acessórias para o comércio?',
      resposta: 'Empresas comerciais possuem diversas obrigações acessórias específicas, que variam conforme o regime tributário e porte. As principais incluem: SPED Fiscal (EFD ICMS/IPI), que registra operações de entrada e saída e inventário; SPED Contribuições para PIS/COFINS; SINTEGRA em alguns estados; Bloco K do SPED Fiscal (controle de produção e estoque); DEFIS (para Simples Nacional) ou ECF (para demais regimes); além de obrigações municipais. Nosso escritório gerencia todo o calendário fiscal, garantindo entregas pontuais e consistência entre as diversas declarações para evitar autuações.'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        imageUrl={seoData.imageUrl}
        schemaData={schemaData}
      />

      {/* Page Title */}
      <section className="page-title">
        <div className="container">
          <h1>Contabilidade para Comércio</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/setores">Setores</Link></li>
            <li>Comércio</li>
          </ul>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2>Soluções contábeis para empresas comerciais</h2>
              </div>
              <p>Na Exclusiva Contabilidade, entendemos os desafios específicos do setor comercial: gestão de estoque, complexidades tributárias do ICMS e substituição tributária, margens apertadas e alta competitividade.</p>
              <p>Oferecemos muito mais que serviços contábeis básicos: proporcionamos consultoria estratégica para otimizar a carga tributária, controlar eficientemente seu estoque e melhorar seus resultados financeiros.</p>
              
              <div className="sector-features mt-4">
                <h3>Por que escolher a Exclusiva:</h3>
                <ul className="sector-features">
                  <li><i className="fas fa-check"></i> Especialistas em tributação do comércio</li>
                  <li><i className="fas fa-check"></i> Experiência em varejo, atacado e e-commerce</li>
                  <li><i className="fas fa-check"></i> Gerenciamento preciso de estoques e obrigações fiscais</li>
                  <li><i className="fas fa-check"></i> Soluções personalizadas para cada modelo de negócio</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sector-image">
                <img src="/assets/images/sectors/comercio-main.jpg" alt="Contabilidade para Comércio - varejo e atacado" className="img-fluid rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segmentos Atendidos */}
      <section className="section-bg-light section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Segmentos Comerciais Atendidos</h2>
            <p>Soluções especializadas para diferentes modelos de negócio</p>
          </div>

          <div className="row">
            {segmentos.map((segmento, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="service-card text-center h-100">
                  <div className="service-icon mx-auto">
                    <i className={`fas ${segmento.icone}`}></i>
                  </div>
                  <h3>{segmento.titulo}</h3>
                  <p>{segmento.descricao}</p>
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
            <h2>Serviços Especializados para Comércio</h2>
            <p>Soluções desenvolvidas para enfrentar os desafios específicos do seu setor</p>
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

      {/* Benefícios */}
      <section className="section-bg-primary section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Benefícios para sua Empresa Comercial</h2>
            <p>Resultados reais que nossa contabilidade especializada proporciona</p>
          </div>

          <div className="row">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="col-lg-6 mb-4">
                <div className="case-study-card bg-white p-4 h-100 rounded">
                  <h4>{beneficio.titulo}</h4>
                  <p>{beneficio.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Sucesso */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Casos de Sucesso</h2>
            <p>Empresas comerciais que transformamos</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-light p-4 h-100 rounded">
                <h4>Loja de Vestuário</h4>
                <p className="text-muted">Desafio: Controle de estoque e tributação</p>
                <p>Uma rede com 3 lojas físicas enfrentava problemas com controle de estoque e inconsistências fiscais. Implementamos um sistema integrado de controle de estoque com a contabilidade e reorganizamos os processos fiscais.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Redução de 18% nas perdas de estoque e economia de R$ 45.000 em impostos no primeiro ano
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-light p-4 h-100 rounded">
                <h4>E-commerce de Eletrônicos</h4>
                <p className="text-muted">Desafio: Expansão para vendas interestaduais</p>
                <p>Um e-commerce em crescimento estava inseguro sobre como expandir as vendas para outros estados devido às complexidades tributárias. Estruturamos toda a operação fiscal interestadual e implementamos um sistema de cálculo automático de tributos.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Expansão segura para todo território nacional com aumento de 135% no faturamento
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Perguntas Frequentes</h2>
            <p>Dúvidas comuns sobre contabilidade para comércio</p>
          </div>

          <div className="faq-content">
            {faqComercio.map((faq, index) => (
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
              <h2>Pronto para otimizar a contabilidade do seu comércio?</h2>
              <p>Entre em contato e descubra como nossa contabilidade especializada pode ajudar seu comércio a crescer com segurança fiscal e financeira.</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn btn-light btn-large">
                  Solicite um orçamento
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20tenho%20uma%20empresa%20de%20comércio%20e%20gostaria%20de%20informações%20sobre%20contabilidade!" 
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
