import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import SEOHead from '../../components/SEOHead';
import { useInView } from 'react-intersection-observer';
import ShareTools from '../../components/common/ShareTools';

const SimuladorParcelamento = () => {
  // Estados para os valores do simulador
  const [formData, setFormData] = useState({
    valorDivida: '',
    tipoTributo: 'federal',
    modalidade: 'ordinario',
    prazoPagamento: '60'
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

  // Formatação do input como moeda (R$)
  const formatCurrency = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    
    setFormData({
      ...formData,
      valorDivida: value
    });
  };

  // Calcula o parcelamento com base nos valores do formulário
  const calcularParcelamento = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulando um carregamento
    setTimeout(() => {
      const { valorDivida, tipoTributo, modalidade, prazoPagamento } = formData;
      
      // Convertendo string para número
      const valorTotal = parseFloat(valorDivida.replace(/\./g, '').replace(',', '.'));
      const prazoMeses = parseInt(prazoPagamento);
      
      // Parâmetros de cálculo com base no tipo de tributo e modalidade
      let taxaJurosAnual = 0;
      let reducaoMulta = 0;
      let entradaPercentual = 0;
      let valorEntrada = 0;
      let saldoParcelamento = 0;
      let valorParcela = 0;
      let totalPagar = 0;
      let economiaTotal = 0;
      let parcelasDetalhes = [];
      
      // Definição de parâmetros conforme tipo de tributo e modalidade
      if (tipoTributo === 'federal') {
        taxaJurosAnual = 12; // 1% ao mês ou 12% ao ano (Selic aproximada)
        
        if (modalidade === 'ordinario') {
          reducaoMulta = 0;
          entradaPercentual = 0;
        } else if (modalidade === 'especial') {
          reducaoMulta = 10; // 10% de redução na multa
          entradaPercentual = 5; // 5% de entrada
        } else { // excepcional
          reducaoMulta = 20; // 20% de redução na multa
          entradaPercentual = 10; // 10% de entrada
        }
      } else if (tipoTributo === 'estadual') {
        taxaJurosAnual = 10; // Aproximação para estados
        
        if (modalidade === 'ordinario') {
          reducaoMulta = 0;
          entradaPercentual = 0;
        } else if (modalidade === 'especial') {
          reducaoMulta = 15; // 15% de redução na multa
          entradaPercentual = 7; // 7% de entrada
        } else { // excepcional
          reducaoMulta = 25; // 25% de redução na multa
          entradaPercentual = 15; // 15% de entrada
        }
      } else { // municipal
        taxaJurosAnual = 8; // Aproximação para municípios
        
        if (modalidade === 'ordinario') {
          reducaoMulta = 0;
          entradaPercentual = 0;
        } else if (modalidade === 'especial') {
          reducaoMulta = 8; // 8% de redução na multa
          entradaPercentual = 5; // 5% de entrada
        } else { // excepcional
          reducaoMulta = 15; // 15% de redução na multa
          entradaPercentual = 10; // 10% de entrada
        }
      }
      
      // Estimativa simplificada de multa (20% do valor principal)
      const multa = valorTotal * 0.2;
      const multaReduzida = multa * (1 - (reducaoMulta / 100));
      const economiaMulta = multa - multaReduzida;
      
      // Cálculo da entrada
      valorEntrada = valorTotal * (entradaPercentual / 100);
      
      // Cálculo do saldo a parcelar (valor total - entrada)
      saldoParcelamento = valorTotal - valorEntrada + multaReduzida;
      
      // Taxa de juros mensal (taxaJurosAnual / 12)
      const taxaJurosMensal = taxaJurosAnual / 12 / 100;
      
      // Cálculo do valor da parcela usando fórmula de amortização
      if (taxaJurosMensal > 0) {
        valorParcela = saldoParcelamento * (
          (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, prazoMeses)) / 
          (Math.pow(1 + taxaJurosMensal, prazoMeses) - 1)
        );
      } else {
        valorParcela = saldoParcelamento / prazoMeses;
      }
      
      // Cálculo do valor total a pagar (entrada + parcelas)
      totalPagar = valorEntrada + (valorParcela * prazoMeses);
      
      // Economia total (redução de multa + juros evitados)
      economiaTotal = economiaMulta;
      
      // Detalhes das parcelas para exibição
      for (let i = 1; i <= Math.min(prazoMeses, 12); i++) {
        parcelasDetalhes.push({
          numero: i,
          valor: valorParcela.toFixed(2)
        });
      }
      
      setResultados({
        valorEntrada: valorEntrada.toFixed(2),
        valorParcela: valorParcela.toFixed(2),
        prazoMeses,
        taxaJurosAnual,
        totalPagar: totalPagar.toFixed(2),
        economiaTotal: economiaTotal.toFixed(2),
        parcelasDetalhes,
        valorDivida: valorTotal.toFixed(2),
        reducaoMulta
      });
      
      setLoading(false);
      
      // Registra evento no Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'simulador_parcelamento_usado', {
          'event_category': 'engagement',
          'event_label': `${tipoTributo}_${modalidade}`,
          'value': Math.round(valorTotal)
        });
      }
    }, 800);
  };
  
  return (
    <Layout>
      <SEOHead
        title="Simulador de Parcelamento de Dívidas | Exclusiva Contabilidade"
        description="Simule o parcelamento de dívidas fiscais e tributárias. Calcule valores de parcelas, juros e economias potenciais com nossa ferramenta gratuita."
        canonicalUrl="/ferramentas/simulador-parcelamento"
        ogType="website"
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Simulador de Parcelamento Fiscal</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Calcule as condições de parcelamento para regularizar dívidas tributárias
            e planeje a melhor estratégia para sua empresa.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-file-invoice-dollar"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form onSubmit={calcularParcelamento}>
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="valorDivida" className="form-label fw-semibold">
                        Valor Total da Dívida (R$) <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-money-bill-alt text-primary"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="valorDivida"
                          name="valorDivida"
                          placeholder="0,00"
                          value={formData.valorDivida}
                          onChange={formatCurrency}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="tipoTributo" className="form-label fw-semibold">
                        Tipo de Tributo <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-landmark text-primary"></i>
                        </span>
                        <select
                          className="form-select"
                          id="tipoTributo"
                          name="tipoTributo"
                          value={formData.tipoTributo}
                          onChange={handleChange}
                          required
                        >
                          <option value="federal">Federal (Receita Federal/INSS)</option>
                          <option value="estadual">Estadual (ICMS/IPVA)</option>
                          <option value="municipal">Municipal (ISS/IPTU)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="modalidade" className="form-label fw-semibold">
                        Modalidade de Parcelamento <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-file-alt text-primary"></i>
                        </span>
                        <select
                          className="form-select"
                          id="modalidade"
                          name="modalidade"
                          value={formData.modalidade}
                          onChange={handleChange}
                          required
                        >
                          <option value="ordinario">Ordinário (Padrão)</option>
                          <option value="especial">Especial (com redução)</option>
                          <option value="excepcional">Excepcional (maior redução)</option>
                        </select>
                      </div>
                      <small className="text-muted d-block mt-1">
                        <i className="far fa-info-circle me-1"></i>
                        Diferentes modalidades oferecem condições e descontos distintos.
                      </small>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="prazoPagamento" className="form-label fw-semibold">
                        Prazo para Pagamento <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="far fa-calendar-alt text-primary"></i>
                        </span>
                        <select
                          className="form-select"
                          id="prazoPagamento"
                          name="prazoPagamento"
                          value={formData.prazoPagamento}
                          onChange={handleChange}
                          required
                        >
                          <option value="12">12 meses</option>
                          <option value="24">24 meses</option>
                          <option value="36">36 meses</option>
                          <option value="48">48 meses</option>
                          <option value="60">60 meses</option>
                          <option value="84">84 meses</option>
                          <option value="120">120 meses</option>
                        </select>
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
                          Simular Parcelamento
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
                          <h6 className="text-muted small text-uppercase">Valor da Entrada</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-primary">
                              R$ {resultados.valorEntrada.replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Valor da Parcela Mensal</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-primary">
                              R$ {resultados.valorParcela.replace('.', ',')}
                            </span>
                            <small className="ms-2 text-muted">
                              x{resultados.prazoMeses}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Total a Pagar</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-warning">
                              R$ {resultados.totalPagar.replace('.', ',')}
                            </span>
                          </div>
                          <small className="text-muted d-block mt-2">
                            <i className="far fa-info-circle me-1"></i>
                            Já inclui juros de {resultados.taxaJurosAnual}% a.a.
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-white shadow-sm">
                        <div className="card-body">
                          <h6 className="text-muted small text-uppercase">Economia em Multas</h6>
                          <div className="d-flex align-items-center">
                            <span className="display-6 fw-bold text-success">
                              R$ {resultados.economiaTotal.replace('.', ',')}
                            </span>
                          </div>
                          <small className="text-muted d-block mt-2">
                            <i className="far fa-check-circle me-1"></i>
                            Redução de {resultados.reducaoMulta}% nas multas
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detalhes do parcelamento */}
                  <div className="card border-0 bg-white shadow-sm mt-3">
                    <div className="card-header bg-light border-0">
                      <h5 className="mb-0 py-2">
                        <i className="far fa-calendar-check me-2 text-primary"></i>
                        Detalhamento das Parcelas
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Parcela</th>
                              <th className="text-end">Valor (R$)</th>
                              <th className="text-end">Data Estimada</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultados.parcelasDetalhes.map((parcela) => {
                              // Calcular data estimada (mês atual + número da parcela)
                              const hoje = new Date();
                              const dataEstimada = new Date(hoje.getFullYear(), hoje.getMonth() + parcela.numero, hoje.getDate());
                              const dataFormatada = dataEstimada.toLocaleDateString('pt-BR', {
                                month: 'short',
                                year: 'numeric'
                              });
                              
                              return (
                                <tr key={parcela.numero}>
                                  <td>{parcela.numero}ª parcela</td>
                                  <td className="text-end">R$ {parcela.valor.replace('.', ',')}</td>
                                  <td className="text-end">{dataFormatada}</td>
                                </tr>
                              );
                            })}
                            {resultados.prazoMeses > 12 && (
                              <tr>
                                <td colSpan="3" className="text-center text-muted">
                                  <i className="far fa-ellipsis-h me-2"></i>
                                  Exibindo apenas as 12 primeiras parcelas de {resultados.prazoMeses}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  {/* Componente de compartilhamento */}
                  <ShareTools 
                    title="Simulador de Parcelamento - Exclusiva Contabilidade" 
                    description="Simule condições de parcelamento de dívidas tributárias com redução de multa e juros."
                    className="my-4"
                  />

                  <div className="alert alert-info mb-0" role="alert">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="far fa-lightbulb fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5 className="alert-heading">Precisa de assessoria para regularizar sua empresa?</h5>
                        <p className="mb-1">Esta é apenas uma simulação. Condições reais de parcelamento podem variar conforme o caso específico, histórico fiscal e negociação com os órgãos competentes.</p>
                        <a href="/contato" className="btn btn-sm btn-primary mt-2">
                          <i className="far fa-handshake me-2"></i>
                          Solicitar Assessoria Especializada
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
                Os valores apresentados são estimativas e podem variar conforme a legislação vigente e condições específicas do contribuinte.
              </small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimuladorParcelamento;
