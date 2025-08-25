import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SEOHead from '../../components/SEOHead';
import { useInView } from 'react-intersection-observer';
import CalculoEncargosTrabalhistas from '../../components/ferramentas/CalculoEncargosTrabalhistas';
import ShareTools from '../../components/common/ShareTools';
import { getCalculoEncargosJsonLd, getToolKeywords, getToolDescription, getToolTitle } from '../../utils/seoTools';

const CalculoEncargos = () => {
  // Hook de animação para elementos que entram na viewport
  const { ref: titleRef, inView: titleVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <Layout>
      <SEOHead
        title={getToolTitle('calculo-encargos')}
        description={getToolDescription('calculo-encargos')}
        canonicalUrl="/ferramentas/calculo-encargos"
        ogType="website"
        keywords={getToolKeywords('calculo-encargos')}
        indexPage={true}
        jsonLd={getCalculoEncargosJsonLd()}
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Cálculo de Encargos Trabalhistas</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Calcule férias, 13º salário, rescisões e outros encargos trabalhistas
            de forma rápida e precisa.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-users"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Componente de Cálculo de Encargos Trabalhistas */}
            <CalculoEncargosTrabalhistas />
            
            {/* Componente de compartilhamento social */}
            <div className="mt-5">
              <ShareTools 
                title="Calculadora de Encargos Trabalhistas"
                text="Calcule férias, 13º salário, rescisões e encargos trabalhistas com precisão usando nossa calculadora gratuita!"
                hashtags={["contabilidade", "rh", "recursoshumanos", "folhadepagamento", "encargos", "direito"]}
              />
            </div>
            
            {/* Guia informativo */}
            <div className="card shadow-sm border-0 mt-5">
              <div className="card-header bg-light py-3">
                <h3 className="h5 mb-0 fw-bold">
                  <i className="far fa-info-circle me-2 text-primary"></i>
                  Guia de Encargos Trabalhistas
                </h3>
              </div>
              <div className="card-body p-4">
                <div className="accordion" id="accordionEncargos">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFGTS">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFGTS" aria-expanded="true" aria-controls="collapseFGTS">
                        FGTS - Fundo de Garantia do Tempo de Serviço
                      </button>
                    </h2>
                    <div id="collapseFGTS" className="accordion-collapse collapse show" aria-labelledby="headingFGTS" data-bs-parent="#accordionEncargos">
                      <div className="accordion-body">
                        <p>O FGTS é um direito do trabalhador com carteira assinada. O empregador deve depositar mensalmente 8% do salário em uma conta vinculada ao trabalhador na Caixa Econômica Federal.</p>
                        <ul>
                          <li><strong>Percentual:</strong> 8% sobre a remuneração</li>
                          <li><strong>Pagamento:</strong> Mensal, até o dia 7 do mês seguinte</li>
                          <li><strong>Base de cálculo:</strong> Salário bruto, incluindo adicionais, horas extras, etc.</li>
                          <li><strong>Multa rescisória:</strong> 40% do saldo em caso de demissão sem justa causa</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingINSS">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseINSS" aria-expanded="false" aria-controls="collapseINSS">
                        INSS Patronal e Terceiros
                      </button>
                    </h2>
                    <div id="collapseINSS" className="accordion-collapse collapse" aria-labelledby="headingINSS" data-bs-parent="#accordionEncargos">
                      <div className="accordion-body">
                        <p>O INSS patronal é a contribuição da empresa para a Previdência Social, calculado sobre a folha de pagamento:</p>
                        <ul>
                          <li><strong>INSS patronal:</strong> 20% sobre a remuneração</li>
                          <li><strong>RAT (Risco Ambiental do Trabalho):</strong> 1% a 3%, dependendo do risco da atividade</li>
                          <li><strong>Terceiros (Sistema S):</strong> até 5,8%, varia conforme o setor econômico</li>
                          <li><strong>Pagamento:</strong> até o dia 20 do mês seguinte através da GPS</li>
                        </ul>
                        <p className="mt-2"><strong>Nota:</strong> Alguns regimes, como Simples Nacional, possuem alíquotas diferenciadas.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFerias">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFerias" aria-expanded="false" aria-controls="#collapseFerias">
                        Férias e 13º Salário
                      </button>
                    </h2>
                    <div id="collapseFerias" className="accordion-collapse collapse" aria-labelledby="headingFerias" data-bs-parent="#accordionEncargos">
                      <div className="accordion-body">
                        <h6>Férias</h6>
                        <ul>
                          <li><strong>Período aquisitivo:</strong> 12 meses de trabalho</li>
                          <li><strong>Remuneração:</strong> Salário + 1/3 constitucional</li>
                          <li><strong>Abono pecuniário:</strong> Possibilidade de vender 10 dias (opcional)</li>
                          <li><strong>Incidência:</strong> INSS, FGTS e IRRF sobre o valor total</li>
                        </ul>
                        
                        <h6 className="mt-3">13º Salário</h6>
                        <ul>
                          <li><strong>Valor:</strong> 1/12 da remuneração por mês trabalhado</li>
                          <li><strong>Pagamento:</strong> 1ª parcela até 30/11 (50%) e 2ª até 20/12</li>
                          <li><strong>Incidência:</strong> INSS e FGTS (somente na 2ª parcela para INSS)</li>
                          <li><strong>Proporcionalidade:</strong> 1/12 para cada mês trabalhado (15 dias ou mais)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info mt-4" role="alert">
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="far fa-lightbulb fa-2x text-info"></i>
                    </div>
                    <div>
                      <h5 className="alert-heading">Sabia que...</h5>
                      <p className="mb-0">
                        O custo total de um funcionário para a empresa pode chegar a quase o dobro do salário nominal, 
                        dependendo do setor e benefícios oferecidos. Nossa calculadora ajuda a estimar esse custo real, 
                        permitindo um planejamento financeiro mais preciso para sua empresa.
                      </p>
                      <div className="mt-3">
                        <Link href="/contato" passHref>
                          <a className="btn btn-info text-white">
                            <i className="far fa-handshake me-2"></i>
                            Consultar nossos especialistas
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

export default CalculoEncargos;
