import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { useInView } from 'react-intersection-observer';

// Componentes
import SEOHead from '../../components/SEOHead';
import ShareTools from '../../components/common/ShareTools';

const CalculadoraImpostos = () => {
  // Estados para os valores da calculadora
  const [formData, setFormData] = useState({
    faturamentoMensal: '',
    regime: 'simples',
    atividade: 'comercio',
    funcionarios: '0',
  });
  
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Hook de animação para elementos que entram na viewport
  const { ref: titleRef, inView: titleVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Atualiza valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calcula os impostos com base nos valores do formulário
  const calcularImpostos = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulando um carregamento
    setTimeout(() => {
      const { faturamentoMensal, regime, atividade, funcionarios } = formData;
      
      // Convertendo string para número
      const faturamento = parseFloat(faturamentoMensal.replace(/\./g, '').replace(',', '.'));
      const numFuncionarios = parseInt(funcionarios);
      
      // Valores base para cálculo (simplificados)
      let percentualImposto = 0;
      let valorImposto = 0;
      let taxaContabilidade = 0;
      let economiaEstimada = 0;
      
      // Lógica simplificada para simulação
      if (regime === 'simples') {
        if (atividade === 'comercio') {
          percentualImposto = faturamento <= 10000 ? 4 : 
                             faturamento <= 30000 ? 5.5 : 
                             faturamento <= 100000 ? 6.5 : 8.5;
        } else if (atividade === 'servicos') {
          percentualImposto = faturamento <= 10000 ? 6 : 
                             faturamento <= 30000 ? 8.5 : 
                             faturamento <= 100000 ? 10.5 : 13.5;
        } else { // Indústria
          percentualImposto = faturamento <= 10000 ? 4.5 : 
                             faturamento <= 30000 ? 5.8 : 
                             faturamento <= 100000 ? 7.5 : 10;
        }
        
        // Cálculos
        valorImposto = faturamento * (percentualImposto / 100);
        taxaContabilidade = 350 + (numFuncionarios * 50);
        economiaEstimada = faturamento * 0.015; // Estimativa simplificada
        
      } else if (regime === 'lucroreal') {
        if (atividade === 'comercio') {
          percentualImposto = 15.5;
        } else if (atividade === 'servicos') {
          percentualImposto = 17.5;
        } else { // Indústria
          percentualImposto = 16.5;
        }
        
        // Cálculos
        valorImposto = faturamento * (percentualImposto / 100);
        taxaContabilidade = 650 + (numFuncionarios * 80);
        economiaEstimada = faturamento * 0.02; // Estimativa simplificada
        
      } else { // Lucro presumido
        if (atividade === 'comercio') {
          percentualImposto = 7.6;
        } else if (atividade === 'servicos') {
          percentualImposto = 11.33;
        } else { // Indústria
          percentualImposto = 9.5;
        }
        
        // Cálculos
        valorImposto = faturamento * (percentualImposto / 100);
        taxaContabilidade = 450 + (numFuncionarios * 65);
        economiaEstimada = faturamento * 0.018; // Estimativa simplificada
      }
      
      setResultados({
        valorImposto: valorImposto.toFixed(2),
        percentualImposto,
        taxaContabilidade: taxaContabilidade.toFixed(2),
        economiaEstimada: economiaEstimada.toFixed(2),
        valorLiquido: (faturamento - valorImposto).toFixed(2)
      });
      
      setLoading(false);
      
      // Registra evento no Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'calculadora_usada', {
          'event_category': 'engagement',
          'event_label': regime,
          'value': Math.round(faturamento)
        });
      }
    }, 800);
  };
  
  // Formatação do input de faturamento como moeda (R$)
  const formatCurrency = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    
    setFormData({
      ...formData,
      faturamentoMensal: value
    });
  };
  
  return (
    <Layout>
      <SEOHead
        title="Calculadora de Impostos | Exclusiva Contabilidade"
        description="Simule os impostos da sua empresa de acordo com o regime tributário. Calculadora gratuita da Exclusiva Contabilidade."
        canonicalUrl="/ferramentas/calculadora-impostos"
        ogType="website"
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Calculadora de Impostos</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Simule os impostos da sua empresa com base no faturamento e regime tributário.
            Uma ferramenta gratuita para você planejar melhor suas finanças.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-calculator"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form onSubmit={calcularImpostos}>
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="faturamentoMensal" className="form-label fw-semibold">
                        Faturamento Mensal (R$) <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-money-bill-alt text-primary"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="faturamentoMensal"
                          name="faturamentoMensal"
                          placeholder="0,00"
                          value={formData.faturamentoMensal}
                          onChange={formatCurrency}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="regime" className="form-label fw-semibold">
                        Regime Tributário <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-file-alt text-primary"></i>
                        </span>
                        <select
                          className="form-select"
                          id="regime"
                          name="regime"
                          value={formData.regime}
                          onChange={handleChange}
                          required
                        >
                          <option value="simples">Simples Nacional</option>
                          <option value="presumido">Lucro Presumido</option>
                          <option value="lucroreal">Lucro Real</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="atividade" className="form-label fw-semibold">
                        Tipo de Atividade <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-building text-primary"></i>
                        </span>
                        <select
                          className="form-select"
                          id="atividade"
                          name="atividade"
                          value={formData.atividade}
                          onChange={handleChange}
                          required
                        >
                          <option value="comercio">Comércio</option>
                          <option value="servicos">Serviços</option>
                          <option value="industria">Indústria</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="funcionarios" className="form-label fw-semibold">
                        Número de Funcionários
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-user text-primary"></i>
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          id="funcionarios"
                          name="funcionarios"
                          min="0"
                          placeholder="0"
                          value={formData.funcionarios}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary py-3 px-5"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Calculando...
                        </>
                      ) : (
                        <>
                          <i className="far fa-calculator me-2"></i>
                          Calcular Impostos
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {resultados && (
              <div 
                className="card shadow mt-4 border-0 animate__animated animate__fadeIn"
                style={{ 
                  borderTop: '4px solid #1966b4',
                  backgroundColor: '#f8fafc'
                }}
              >
                <div className="card-body p-4">
                  <h3 className="h4 mb-4 text-primary fw-bold">
                    <i className="far fa-chart-bar me-2"></i>
                    Resultados da Simulação
                  </h3>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Valor Estimado de Impostos</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-danger">
                              R$ {resultados.valorImposto.replace('.', ',')}
                            </span>
                            <small className="ms-2 text-muted">
                              ({resultados.percentualImposto}% do faturamento)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Valor Líquido Aproximado</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-success">
                              R$ {resultados.valorLiquido.replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Taxa Mensal de Contabilidade</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-primary">
                              R$ {resultados.taxaContabilidade.replace('.', ',')}
                            </span>
                            <small className="ms-2 text-muted">
                              (estimada)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Economia Potencial com Planejamento</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-success">
                              R$ {resultados.economiaEstimada.replace('.', ',')}
                            </span>
                            <small className="ms-2 text-muted">
                              (anual)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Componente de compartilhamento */}
                  <ShareTools 
                    title="Calculadora de Impostos - Exclusiva Contabilidade" 
                    description="Simule os impostos da sua empresa com base no faturamento e regime tributário."
                    className="my-4"
                  />

                  <div className="alert alert-info mb-0" role="alert">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="far fa-lightbulb fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5 className="alert-heading">Precisa de uma análise detalhada?</h5>
                        <p className="mb-1">Esta é apenas uma simulação básica. Para um planejamento tributário completo e personalizado para sua empresa, entre em contato com nossa equipe.</p>
                        <a href="/contato" className="btn btn-sm btn-primary mt-2">
                          <i className="far fa-envelope me-2"></i>
                          Solicitar Consultoria
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center mt-4 text-muted">
              <small>
                <i className="far fa-info-circle me-1"></i>
                Os valores apresentados são estimativas e podem variar conforme a situação específica da empresa.
              </small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalculadoraImpostos;
