import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';
import { useRouter } from 'next/router';

export default function ESocialPage() {
  const router = useRouter();
  const canonicalUrl = `https://exclusivacontabilidade.com.br${router.pathname}`;
  
  // Metadados para SEO
  const seoData = {
    title: "E-Social Doméstico | Serviços de Folha de Pagamento | Exclusiva",
    description: "Contabilidade especializada em E-Social Doméstico, incluindo cadastro, folha de pagamento, cálculos, emissão de DAE e suporte completo para empregadores domésticos.",
    keywords: "e-social doméstico, contabilidade doméstica, folha de pagamento doméstico, cálculo DAE, empregada doméstica, babá, empregador doméstico, lei doméstica",
    url: canonicalUrl,
    imageUrl: "https://exclusivacontabilidade.com.br/images/og-esocial.jpg",
  };
  
  // Schema JSON-LD para a página de E-Social Doméstico
  const schemaData = [
    // Schema unificado com @context único
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "E-Social Doméstico - Exclusiva Contabilidade",
      "description": "Serviços especializados de suporte ao e-Social Doméstico para empregadores domésticos em Campo Grande - MS.",
      "@graph": [
        {
          "@type": "Service",
          "name": "Serviços de E-Social Doméstico",
          "description": "Suporte completo para empregadores domésticos no cadastro, folha de pagamento, cálculos trabalhistas e gestão do e-Social.",
          "provider": {
            "@type": "Organization",
            "name": "Exclusiva Contabilidade",
            "url": "https://exclusivacontabilidade.com.br"
          },
          "serviceType": "Serviços de E-Social Doméstico",
          "areaServed": "Brasil",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços para Empregadores Domésticos",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cadastro do Empregador e Empregado"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Folha de Pagamento"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cálculo e Emissão de DAE"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Férias e 13º Salário"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Rescisão de Contrato"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Consultoria Trabalhista"
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
              "name": "O que é o eSocial Doméstico e quem deve utilizar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O eSocial Doméstico é um sistema online que unifica o envio de informações pelo empregador doméstico, relacionadas aos seus trabalhadores. Deve ser utilizado por qualquer pessoa que contrata empregado doméstico com registro em carteira de trabalho."
              }
            },
            {
              "@type": "Question",
              "name": "Quais são os direitos obrigatórios de um empregado doméstico?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Conforme a Lei Complementar 150/2015, os empregados domésticos têm direito a carteira de trabalho assinada, salário mínimo, jornada de trabalho definida, horas extras, FGTS, 13º salário, férias remuneradas e outros benefícios trabalhistas."
              }
            }
          ]
        }
      ]
    }
  ];

  // Serviços específicos para o E-Social Doméstico
  const servicosESocial = [
    {
      titulo: 'Cadastro do Empregador e Empregado',
      icone: 'fa-user-plus',
      descricao: 'Auxílio no cadastro completo no sistema do eSocial, incluindo empregador, trabalhador doméstico e seus dependentes.',
    },
    {
      titulo: 'Folha de Pagamento',
      icone: 'fa-file-invoice-dollar',
      descricao: 'Cálculo mensal de salários, adicionais, horas extras, férias, 13º salário e outros benefícios conforme a legislação.',
    },
    {
      titulo: 'Cálculo e Emissão de DAE',
      icone: 'fa-calculator',
      descricao: 'Geração mensal do Documento de Arrecadação do eSocial (DAE) para pagamento de impostos e contribuições.',
    },
    {
      titulo: 'Férias e 13º Salário',
      icone: 'fa-umbrella-beach',
      descricao: 'Cálculo e processamento de férias, 13º salário e recibos conforme a legislação trabalhista doméstica.',
    },
    {
      titulo: 'Rescisão de Contrato',
      icone: 'fa-file-contract',
      descricao: 'Cálculo de verbas rescisórias, preparação de documentos e suporte completo para encerramento de contrato.',
    },
    {
      titulo: 'Consultoria Trabalhista',
      icone: 'fa-comments',
      descricao: 'Esclarecimento de dúvidas sobre direitos e obrigações na relação de trabalho doméstico e atualizações da legislação.',
    }
  ];

  // Benefícios do serviço
  const beneficios = [
    {
      titulo: 'Segurança Jurídica',
      descricao: 'Atuamos em conformidade com a legislação específica do trabalho doméstico (Lei Complementar 150/2015), protegendo o empregador de processos trabalhistas.'
    },
    {
      titulo: 'Praticidade',
      descricao: 'Assumimos toda a complexidade das obrigações do eSocial, liberando seu tempo para se dedicar a outras atividades.'
    },
    {
      titulo: 'Economia',
      descricao: 'Evite multas e pagamentos incorretos com nossa orientação especializada sobre direitos e deveres na relação empregador-empregado doméstico.'
    },
    {
      titulo: 'Suporte Personalizado',
      descricao: 'Atendimento individual para resolução de dúvidas e orientações sobre questões específicas da sua relação de trabalho doméstico.'
    }
  ];

  // Perguntas frequentes específicas do eSocial Doméstico
  const faqESocial = [
    {
      pergunta: 'O que é o eSocial Doméstico e quem deve utilizar?',
      resposta: 'O eSocial Doméstico é um sistema online que unifica o envio de informações pelo empregador doméstico, relacionadas aos seus trabalhadores, como cozinheiros, babás, motoristas, jardineiros, cuidadores e outros profissionais que prestam serviços na residência. Deve ser utilizado por qualquer pessoa que contrata empregado doméstico com registro em carteira de trabalho. O sistema gera guia única (DAE) para pagamento de todos os impostos e encargos, incluindo INSS, FGTS, antecipação da indenização compensatória (multa do FGTS), seguro contra acidentes e IRRF quando aplicável. O uso do sistema é obrigatório para todos os empregadores domésticos desde 2015.'
    },
    {
      pergunta: 'Quais são os direitos obrigatórios de um empregado doméstico?',
      resposta: 'Conforme a Lei Complementar 150/2015, conhecida como "PEC das Domésticas", os empregados domésticos têm direito a: 1) Carteira de trabalho assinada; 2) Salário mínimo ou piso regional; 3) Jornada de 8 horas diárias e 44 horas semanais; 4) Horas extras com adicional de 50%; 5) Adicional noturno; 6) FGTS; 7) Seguro-desemprego; 8) 13º salário; 9) Férias + 1/3; 10) Repouso semanal remunerado; 11) Aviso prévio; 12) Vale-transporte; 13) Estabilidade para gestantes; 14) Salário-família; 15) Auxílio-doença; e 16) Adicional por viagens. O recolhimento destes direitos é feito pelo sistema eSocial através do DAE mensal.'
    },
    {
      pergunta: 'Como funciona o cálculo do DAE no eSocial Doméstico?',
      resposta: 'O Documento de Arrecadação do eSocial (DAE) unifica o recolhimento de todos os encargos do empregador doméstico em uma única guia. O cálculo inclui: 1) INSS do empregado (8% a 14% do salário, conforme a faixa salarial); 2) INSS do empregador (8% do salário); 3) FGTS (8% do salário); 4) Antecipação da indenização compensatória/multa do FGTS (3,2% do salário); 5) Seguro contra acidentes (0,8% do salário); e 6) Imposto de Renda Retido na Fonte (se aplicável, para salários acima do limite de isenção). Nosso serviço realiza todo esse cálculo mensalmente, considerando particularidades como horas extras, faltas, DSR, adicionais, e gera a guia para pagamento que vence no dia 7 do mês seguinte ao trabalhado.'
    },
    {
      pergunta: 'Qual a diferença entre diarista e empregado doméstico?',
      resposta: 'A principal diferença está na frequência do trabalho e no vínculo empregatício. O empregado doméstico trabalha para o mesmo empregador mais de 2 dias por semana de forma contínua, caracterizando vínculo empregatício, com todos os direitos trabalhistas (carteira assinada, férias, 13º salário, FGTS etc.). Já o diarista trabalha até 2 dias por semana para o mesmo contratante, sem vínculo empregatício, atuando como trabalhador autônomo. O diarista emite recibo pelo serviço prestado e é responsável pelo recolhimento de seus próprios impostos (como contribuição ao INSS), enquanto o empregador doméstico deve registrar o funcionário no eSocial e cumprir todas as obrigações trabalhistas. Esta distinção é definida pela jurisprudência do TST e pela Lei Complementar 150/2015.'
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
          <h1>E-Social Doméstico</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/setores">Setores</Link></li>
            <li>E-Social Doméstico</li>
          </ul>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2>Gestão completa do eSocial para empregadores domésticos</h2>
              </div>
              <p>O eSocial Doméstico pode ser complexo e trabalhoso para quem não está familiarizado com a legislação trabalhista e os procedimentos do sistema. Na Exclusiva Contabilidade, oferecemos suporte completo para que você esteja em dia com todas as obrigações legais.</p>
              <p>Nossos especialistas cuidam de todo o processo, desde o cadastro inicial até o cálculo mensal do DAE (Documento de Arrecadação do eSocial), garantindo tranquilidade para você e conformidade com a legislação trabalhista doméstica.</p>
              
              <div className="sector-features mt-4">
                <h3>Por que contar com a Exclusiva:</h3>
                <ul className="sector-features">
                  <li><i className="fas fa-check"></i> Equipe especializada na legislação do trabalho doméstico</li>
                  <li><i className="fas fa-check"></i> Acompanhamento permanente das mudanças legais</li>
                  <li><i className="fas fa-check"></i> Suporte personalizado para suas dúvidas</li>
                  <li><i className="fas fa-check"></i> Garantia de conformidade com a Lei dos Domésticos (LC 150/2015)</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sector-image">
                <img src="/assets/images/sectors/esocial-main.jpg" alt="E-Social Doméstico" className="img-fluid rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Específicos */}
      <section className="section-bg-light section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Nossos Serviços para Empregadores Domésticos</h2>
            <p>Soluções completas para o gerenciamento do eSocial</p>
          </div>

          <div className="row">
            {servicosESocial.map((servico, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="service-card text-center h-100">
                  <div className="service-icon mx-auto">
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

      {/* Como Funciona */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Como Funciona Nosso Serviço</h2>
            <p>Processo simplificado para sua comodidade</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker">1</div>
                  <div className="timeline-content">
                    <h3>Cadastro Inicial</h3>
                    <p>Realizamos o cadastro completo do empregador e empregado no sistema do eSocial, incluindo dados pessoais, informações contratuais e salariais.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">2</div>
                  <div className="timeline-content">
                    <h3>Acompanhamento Mensal</h3>
                    <p>Mensalmente, coletamos as informações necessárias (dias trabalhados, horas extras, faltas, adicionais) para elaboração da folha de pagamento.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">3</div>
                  <div className="timeline-content">
                    <h3>Processamento e Cálculos</h3>
                    <p>Realizamos todos os cálculos trabalhistas e previdenciários conforme a legislação, considerando particularidades como férias, 13º salário e adicionais.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">4</div>
                  <div className="timeline-content">
                    <h3>Emissão de Documentos</h3>
                    <p>Geramos a guia DAE para pagamento dos encargos, recibos de salário e demais documentos necessários para o mês.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">5</div>
                  <div className="timeline-content">
                    <h3>Suporte Contínuo</h3>
                    <p>Oferecemos suporte para esclarecimento de dúvidas e orientações sobre direitos e obrigações na relação de trabalho doméstico.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="section-bg-primary section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Benefícios do Nosso Serviço</h2>
            <p>Por que contar com a Exclusiva para seu eSocial Doméstico</p>
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

      {/* Depoimentos */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>O que Dizem Nossos Clientes</h2>
            <p>Experiências de quem já conta com nosso serviço</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="testimonial-card bg-light p-4 h-100 rounded">
                <div className="testimonial-content">
                  <p>"Eu não tinha ideia de como lidar com as obrigações do eSocial. A equipe da Exclusiva assumiu tudo e me orientou de forma clara. Agora tenho tranquilidade sabendo que está tudo em dia."</p>
                </div>
                <div className="testimonial-author">
                  <h5>Ana Paula M.</h5>
                  <p className="text-muted">Empregadora Doméstica</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="testimonial-card bg-light p-4 h-100 rounded">
                <div className="testimonial-content">
                  <p>"Contratei uma babá e não sabia que havia tantas obrigações. Com o suporte da Exclusiva, consegui regularizar tudo sem dor de cabeça. O serviço é excelente e o atendimento sempre muito atencioso."</p>
                </div>
                <div className="testimonial-author">
                  <h5>Roberto S.</h5>
                  <p className="text-muted">Empregador Doméstico</p>
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
            <p>Dúvidas comuns sobre o eSocial Doméstico</p>
          </div>

          <div className="faq-content">
            {faqESocial.map((faq, index) => (
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
              <h2>Simplifique a gestão do seu eSocial Doméstico</h2>
              <p>Entre em contato e tenha o suporte especializado da Exclusiva Contabilidade para todas as obrigações do trabalho doméstico.</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn btn-light btn-large">
                  Solicite um orçamento
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20preciso%20de%20ajuda%20com%20o%20eSocial%20Doméstico!" 
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
