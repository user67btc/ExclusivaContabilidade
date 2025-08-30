import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SEOHead from '../../components/SEO/SEOHead';
import { useInView } from 'react-intersection-observer';
import SimuladorRegimesTributarios from '../../components/ferramentas/SimuladorRegimesTributarios';
import ShareTools from '../../components/common/ShareTools';
import { getSimuladorRegimesJsonLd, getToolKeywords, getToolDescription, getToolTitle } from '../../utils/seoTools';

const SimuladorRegimes = () => {
  // Hook de animação para elementos que entram na viewport
  const { ref: titleRef, inView: titleVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <Layout>
      <SEOHead
        title={getToolTitle('simulador-regimes')}
        description={getToolDescription('simulador-regimes')}
        canonicalUrl="/ferramentas/simulador-regimes"
        ogType="website"
        keywords={getToolKeywords('simulador-regimes')}
        indexPage={true}
        jsonLd={getSimuladorRegimesJsonLd()}
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Simulador de Regime Tributário</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Compare os regimes tributários e identifique o mais vantajoso para sua empresa
            baseado nas características do seu negócio.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-chart-pie"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Componente do Simulador de Regimes Tributários */}
            <SimuladorRegimesTributarios />
            
            {/* Componente de compartilhamento social */}
            <div className="mt-5">
              <ShareTools 
                title="Simulador de Regimes Tributários"
                text="Compare os diferentes regimes tributários e descubra o mais vantajoso para sua empresa com este simulador gratuito!"
                hashtags={["contabilidade", "impostos", "planejamentotributario", "simplesNacional", "lucroReal", "lucroPresumido"]}
              />
            </div>
            
            {/* Seção de informações adicionais */}
            <div className="card shadow-sm border-0 mt-5">
              <div className="card-header bg-light py-3">
                <h3 className="h5 mb-0 fw-bold">
                  <i className="far fa-lightbulb me-2 text-warning"></i>
                  Entenda os Regimes Tributários
                </h3>
              </div>
              <div className="card-body p-4">
                <div className="accordion" id="accordionRegimes">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Simples Nacional
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionRegimes">
                      <div className="accordion-body">
                        <p>O <strong>Simples Nacional</strong> é um regime tributário simplificado para micro e pequenas empresas, que unifica oito impostos em uma única guia de pagamento.</p>
                        <ul>
                          <li><strong>Limite de faturamento:</strong> R$ 4,8 milhões/ano</li>
                          <li><strong>Impostos incluídos:</strong> IRPJ, CSLL, PIS/PASEP, COFINS, IPI, CPP, ICMS e ISS</li>
                          <li><strong>Alíquotas:</strong> Variam de 4% a 33%, dependendo do anexo e faixa de faturamento</li>
                          <li><strong>Vantagens:</strong> Simplificação burocrática, menos obrigações acessórias</li>
                          <li><strong>Desvantagens:</strong> Limitações para créditos tributários, restrições para algumas atividades</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Lucro Presumido
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionRegimes">
                      <div className="accordion-body">
                        <p>O <strong>Lucro Presumido</strong> é uma forma simplificada de tributação que presume a margem de lucro da empresa conforme sua atividade.</p>
                        <ul>
                          <li><strong>Limite de faturamento:</strong> R$ 78 milhões/ano</li>
                          <li><strong>Base de cálculo:</strong> Percentual sobre a receita bruta (1,6% a 32%, dependendo da atividade)</li>
                          <li><strong>Alíquotas principais:</strong> IRPJ (15% + adicional), CSLL (9%), PIS (0,65%), COFINS (3%)</li>
                          <li><strong>Vantagens:</strong> Previsibilidade tributária, menor complexidade contábil que o Lucro Real</li>
                          <li><strong>Desvantagens:</strong> Não considera despesas reais, pode ser desvantajoso para empresas com margens reais menores que as presumidas</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="#collapseThree">
                        Lucro Real
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionRegimes">
                      <div className="accordion-body">
                        <p>O <strong>Lucro Real</strong> é o regime que calcula os impostos sobre o lucro líquido efetivamente apurado pela empresa.</p>
                        <ul>
                          <li><strong>Limite de faturamento:</strong> Sem limite</li>
                          <li><strong>Base de cálculo:</strong> Lucro contábil ajustado pelas adições, exclusões e compensações</li>
                          <li><strong>Alíquotas principais:</strong> IRPJ (15% + adicional), CSLL (9%), PIS (1,65% não-cumulativo), COFINS (7,6% não-cumulativo)</li>
                          <li><strong>Vantagens:</strong> Tributação sobre o lucro efetivo, possibilidade de aproveitar créditos tributários, dedução de despesas</li>
                          <li><strong>Desvantagens:</strong> Maior complexidade contábil e fiscal, necessidade de controles mais rigorosos</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-warning mt-4" role="alert">
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="far fa-exclamation-triangle fa-2x text-warning"></i>
                    </div>
                    <div>
                      <h5 className="alert-heading">Análise personalizada</h5>
                      <p className="mb-0">
                        A escolha do regime tributário é uma decisão estratégica para seu negócio.
                        Nossa equipe de contadores especializados pode realizar uma análise detalhada
                        considerando todas as particularidades da sua empresa para maximizar a economia fiscal.
                      </p>
                      <div className="mt-3">
                        <Link href="/contato" passHref>
                          <a className="btn btn-warning">
                            <i className="far fa-file-chart-column me-2"></i>
                            Solicitar análise tributária personalizada
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimuladorRegimes;
