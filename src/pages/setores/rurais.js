import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';
import { useRouter } from 'next/router';

export default function ProdutoresRuraisPage() {
  const router = useRouter();
  const canonicalUrl = `https://exclusivacontabilidade.com.br${router.pathname}`;
  
  // Metadados para SEO
  const seoData = {
    title: "Contabilidade para Produtores Rurais | Tributação e Gestão | Exclusiva",
    description: "Serviços contábeis especializados para produtores rurais, incluindo tributação rural, gestão de custos, declaração ITR e imposto de renda rural.",
    keywords: "contabilidade rural, contador para produtor rural, declaração ITR, imposto de renda produtor rural, tributação rural, FUNRURAL, CAR, nota fiscal produtor",
    url: canonicalUrl,
    imageUrl: "https://exclusivacontabilidade.com.br/images/og-rurais.jpg",
  };
  
  // Schema JSON-LD para a página de Produtores Rurais
  const schemaData = [
    // Schema unificado com @context único
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Contabilidade para Produtores Rurais - Exclusiva Contabilidade",
      "description": "Serviços contábeis especializados para produtores rurais, com foco em tributação rural e incentivos fiscais em Campo Grande - MS.",
      "@graph": [
        {
          "@type": "Service",
          "name": "Contabilidade para Produtores Rurais",
          "description": "Serviços contábeis especializados para produtores rurais, incluindo pequenos, médios e grandes produtores e cooperativas rurais.",
          "provider": {
            "@type": "Organization",
            "name": "Exclusiva Contabilidade",
            "url": "https://exclusivacontabilidade.com.br"
          },
          "serviceType": "Serviços Contábeis Rurais",
          "areaServed": "Brasil",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços para Produtores Rurais",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tributação Rural"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Notas Fiscais do Produtor"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Declaração ITR"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Imposto de Renda Rural"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Gestão de Custos"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Regularização Fundiária"
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
              "name": "Qual a melhor forma de tributação para produtores rurais?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Produtores rurais podem ser tributados como pessoa física (com inscrição estadual de produtor rural) ou como pessoa jurídica (constituindo empresa rural). A escolha ideal depende do porte da atividade, volume de investimentos, necessidade de financiamentos, tipo de produto e mercado."
              }
            },
            {
              "@type": "Question",
              "name": "Como funciona a tributação do FUNRURAL?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O FUNRURAL (Contribuição Social Rural) é uma contribuição previdenciária paga pelo produtor rural sobre a receita bruta da comercialização da produção. Para pessoas físicas, a alíquota é de 1,5% (sendo 1,2% para Seguridade Social e 0,1% para RAT), já para pessoas jurídicas a alíquota é de 2,6%."
              }
            }
          ]
        }
      ]
    }
  ];

  // Serviços especializados para produtores rurais
  const servicosRurais = [
    {
      titulo: 'Tributação Rural',
      icone: 'fa-file-invoice-dollar',
      descricao: 'Orientação sobre o melhor regime tributário para produtores rurais, incluindo opções de tributação como pessoa física ou jurídica.',
    },
    {
      titulo: 'Notas Fiscais do Produtor',
      icone: 'fa-receipt',
      descricao: 'Controle e gestão de Notas Fiscais de Produtor Rural, garantindo conformidade com a legislação específica do setor.',
    },
    {
      titulo: 'Declaração ITR',
      icone: 'fa-file-alt',
      descricao: 'Elaboração da Declaração do Imposto sobre a Propriedade Territorial Rural (ITR) com planejamento para otimizar a tributação.',
    },
    {
      titulo: 'Imposto de Renda Rural',
      icone: 'fa-calculator',
      descricao: 'Preparação do Livro Caixa do Produtor Rural e da Declaração de Imposto de Renda com tratamento adequado das receitas e despesas rurais.',
    },
    {
      titulo: 'Gestão de Custos',
      icone: 'fa-chart-pie',
      descricao: 'Controle de custos de produção e análise de viabilidade de culturas, auxiliando na tomada de decisões para maximizar a rentabilidade.',
    },
    {
      titulo: 'Regularização Fundiária',
      icone: 'fa-map-marked-alt',
      descricao: 'Suporte para regularização de propriedades rurais, incluindo CAR (Cadastro Ambiental Rural) e CCIR.',
    }
  ];

  // Tipos de produtores atendidos
  const tiposProdutores = [
    {
      titulo: 'Pequenos Produtores',
      icone: 'fa-seedling',
      descricao: 'Agricultura familiar e pequenas propriedades com necessidades específicas de planejamento tributário.',
    },
    {
      titulo: 'Médios Produtores',
      icone: 'fa-tractor',
      descricao: 'Propriedades rurais de porte médio com diversificação de culturas e necessidade de controle financeiro mais detalhado.',
    },
    {
      titulo: 'Grandes Produtores',
      icone: 'fa-warehouse',
      descricao: 'Grandes fazendas e empresas rurais com estrutura complexa que exigem gestão contábil e fiscal especializada.',
    },
    {
      titulo: 'Cooperativas Rurais',
      icone: 'fa-users',
      descricao: 'Contabilidade especializada para cooperativas de produtores com tratamento tributário diferenciado.',
    }
  ];

  // Perguntas frequentes específicas do setor rural
  const faqRural = [
    {
      pergunta: 'Qual a melhor forma de tributação para produtores rurais?',
      resposta: 'Produtores rurais podem ser tributados como pessoa física (com inscrição estadual de produtor rural) ou como pessoa jurídica (constituindo empresa rural). Como pessoa física, o produtor declara receitas e despesas no Livro Caixa Rural e apura o imposto de renda com base no resultado da atividade. Como pessoa jurídica, há opções como Simples Nacional (para faturamento até R$ 4,8 milhões), Lucro Presumido ou Lucro Real. A escolha ideal depende do porte da atividade, volume de investimentos, necessidade de financiamentos, tipo de produto e mercado. Nossa análise personalizada considera todos estes fatores para recomendar o modelo mais vantajoso.'
    },
    {
      pergunta: 'Como funciona a tributação do FUNRURAL?',
      resposta: 'O FUNRURAL (Fundo de Assistência ao Trabalhador Rural) é uma contribuição previdenciária que incide sobre a receita bruta da comercialização da produção rural. Para produtores rurais pessoas físicas, a alíquota é de 1,5% (1,2% para o INSS, 0,1% para o RAT e 0,2% para o SENAR). Para pessoas jurídicas, a alíquota é de 2,05% (1,7% para o INSS, 0,1% para o RAT e 0,25% para o SENAR). O recolhimento geralmente é feito pelo adquirente da produção (responsabilidade por sub-rogação), que retém o valor no momento da compra e recolhe em nome do produtor. É importante manter controle destas retenções para evitar recolhimento em duplicidade e garantir futuros benefícios previdenciários.'
    },
    {
      pergunta: 'Quais são as obrigações fiscais específicas para produtores rurais?',
      resposta: 'Produtores rurais possuem obrigações específicas que variam conforme seu porte e regime tributário. As principais incluem: 1) Emissão de Nota Fiscal de Produtor Rural para comercialização da produção; 2) Declaração do ITR (Imposto Territorial Rural) anualmente; 3) Livro Caixa da Atividade Rural para registrar receitas e despesas; 4) Declaração de Imposto de Renda com anexo específico para atividade rural; 5) CCIR (Certificado de Cadastro de Imóvel Rural) atualizado; 6) CAR (Cadastro Ambiental Rural); 7) GTA (Guia de Trânsito Animal) para produtores pecuaristas; 8) Obrigações trabalhistas específicas para contratação de trabalhadores rurais. Nossa contabilidade especializada gerencia todas estas obrigações, garantindo conformidade e evitando penalidades.'
    },
    {
      pergunta: 'Como é calculado o Imposto de Renda para produtores rurais?',
      resposta: 'O cálculo do Imposto de Renda para produtores rurais pessoa física é diferenciado. A apuração é feita pelo confronto entre receitas e despesas da atividade rural através do Livro Caixa Rural. O resultado (lucro ou prejuízo) é transportado para a Declaração de Ajuste Anual no anexo específico para atividade rural. Os prejuízos podem ser compensados nos anos seguintes, sem limite de tempo. É possível deduzir investimentos em bens necessários à atividade (tratores, implementos, benfeitorias) diretamente como despesa no ano da aquisição. Há ainda a opção de arbitrar 20% da receita bruta como lucro, o que pode ser vantajoso em alguns casos. Produtores com receita bruta anual superior a R$ 4,8 milhões são obrigados a manter escrituração contábil completa. Nossa assessoria avalia a melhor estratégia para cada produtor, considerando seu perfil específico.'
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
          <h1>Contabilidade para Produtores Rurais</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/setores">Setores</Link></li>
            <li>Produtores Rurais</li>
          </ul>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2>Soluções contábeis especializadas para o campo</h2>
              </div>
              <p>A atividade rural possui particularidades tributárias e fiscais que exigem conhecimento especializado. Na Exclusiva Contabilidade, oferecemos suporte completo para produtores rurais de todos os portes, ajudando a maximizar resultados e garantir conformidade legal.</p>
              <p>Nossa equipe entende os desafios do agronegócio e oferece soluções personalizadas para cada tipo de produtor, seja você da agricultura, pecuária ou qualquer outro segmento do setor rural.</p>
              
              <div className="sector-features mt-4">
                <h3>Por que escolher a Exclusiva:</h3>
                <ul className="sector-features">
                  <li><i className="fas fa-check"></i> Especialistas em tributação rural</li>
                  <li><i className="fas fa-check"></i> Experiência em diferentes culturas e atividades agropecuárias</li>
                  <li><i className="fas fa-check"></i> Otimização do Imposto de Renda e ITR</li>
                  <li><i className="fas fa-check"></i> Controle eficiente de receitas e despesas rurais</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sector-image">
                <img src="/assets/images/sectors/rurais-main.jpg" alt="Contabilidade para Produtores Rurais" className="img-fluid rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Produtores */}
      <section className="section-bg-light section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Atendimento para todos os perfis de produtores</h2>
            <p>Soluções adaptadas para cada tamanho de propriedade e atividade rural</p>
          </div>

          <div className="row">
            {tiposProdutores.map((tipo, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="service-card text-center h-100">
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
            <h2>Serviços Especializados para o Agronegócio</h2>
            <p>Soluções desenvolvidas para as necessidades específicas do produtor rural</p>
          </div>

          <div className="row">
            {servicosRurais.map((servico, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
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
            <h2>Benefícios da nossa contabilidade rural</h2>
            <p>Resultados concretos para sua atividade agropecuária</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Economia tributária</h4>
                <p>Nossa análise detalhada das operações rurais permite identificar oportunidades legais para redução da carga tributária, incluindo aproveitamento correto de despesas, compensação de prejuízos e aplicação de incentivos fiscais específicos para o setor.</p>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Controle financeiro eficiente</h4>
                <p>Implementamos sistemas de controle financeiro adaptados à realidade rural, permitindo acompanhamento detalhado de custos por cultura ou atividade, gerando informações valiosas para tomada de decisões estratégicas.</p>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Conformidade legal</h4>
                <p>Garantimos o cumprimento de todas as obrigações fiscais, ambientais e trabalhistas específicas do setor rural, evitando multas e problemas que podem comprometer o funcionamento da propriedade.</p>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-white p-4 h-100 rounded">
                <h4>Acesso facilitado a crédito rural</h4>
                <p>Uma contabilidade rural bem estruturada aumenta significativamente as chances de aprovação em linhas de crédito específicas para o setor, com documentação organizada e demonstrativos financeiros adequados às exigências bancárias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caso de Sucesso */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Histórias de Sucesso</h2>
            <p>Como temos ajudado produtores rurais a prosperar</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-light p-4 h-100 rounded">
                <h4>Fazenda de Gado</h4>
                <p className="text-muted">Desafio: Organização fiscal e tributária</p>
                <p>Um produtor com três fazendas de gado enfrentava dificuldades com a organização fiscal e tributária de suas propriedades, resultando em pagamento excessivo de impostos e problemas com fiscalizações. Implementamos um sistema completo de controle financeiro rural e reorganizamos a estrutura tributária.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Economia de 32% em tributos e regularização completa perante os órgãos fiscalizadores.
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="case-study-card bg-light p-4 h-100 rounded">
                <h4>Produtor de Soja</h4>
                <p className="text-muted">Desafio: Transição de pessoa física para jurídica</p>
                <p>Um médio produtor de soja precisava decidir se deveria continuar como produtor rural pessoa física ou constituir uma empresa rural. Realizamos um estudo detalhado comparando cenários tributários, considerando investimentos planejados e projeção de crescimento.</p>
                <div className="text-success mt-3">
                  <i className="fas fa-chart-line me-2"></i> Resultado: Estruturação ideal que permitiu economia anual de R$ 87.000 em tributos e acesso facilitado a uma linha de financiamento para expansão.
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
            <p>Dúvidas comuns sobre contabilidade rural</p>
          </div>

          <div className="faq-content">
            {faqRural.map((faq, index) => (
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
              <h2>Pronto para otimizar a gestão contábil da sua atividade rural?</h2>
              <p>Entre em contato e descubra como nossa contabilidade especializada pode ajudar sua propriedade rural a prosperar com segurança fiscal e financeira.</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn btn-light btn-large">
                  Solicite um orçamento
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20sou%20produtor%20rural%20e%20gostaria%20de%20informações%20sobre%20contabilidade!" 
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
