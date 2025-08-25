import React, { useState, useEffect } from 'react';
import { 
  calcularSimplesNacional,
  calcularLucroPresumido,
  calcularLucroReal,
  compararRegimes,
  formatarMoeda,
  formatarPercentual
} from './SimuladorRegimesCalculos';

/**
 * Componente principal do Simulador de Regimes Tributários
 */
const SimuladorRegimesTributarios = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    receitaBruta: '',
    custosMercadorias: '',
    custosFolha: '',
    custosOperacionais: '',
    despesasDedutiveis: '',
    atividade: 'comercio',
    anexoSimples: '1',
    regimeContribuicao: 'não-cumulativo'
  });
  
  // Estado para os resultados dos cálculos
  const [resultados, setResultados] = useState(null);
  
  // Estado para indicar processamento
  const [loading, setLoading] = useState(false);
  
  // Estado para controle da visualização (formulário ou resultados)
  const [viewMode, setViewMode] = useState('form');

  // Função para atualizar os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Função para formatar entrada de valores monetários
  const formatCurrency = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    
    // Converter para número e formatar
    if (value) {
      const numValue = parseFloat(value) / 100;
      value = numValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };
  
  // Converter valor formatado para número
  const parseValue = (value) => {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  };
  
  // Realizar os cálculos e mostrar resultados
  const calcularResultados = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Preparar dados para cálculo
    const dadosCalculo = {
      receitaBruta: parseValue(formData.receitaBruta),
      custosMercadorias: parseValue(formData.custosMercadorias),
      custosFolha: parseValue(formData.custosFolha),
      custosOperacionais: parseValue(formData.custosOperacionais),
      despesasDedutiveis: parseValue(formData.despesasDedutiveis),
      atividade: formData.atividade,
      anexoSimples: parseInt(formData.anexoSimples),
      regimeContribuicao: formData.regimeContribuicao
    };
    
    // Simular tempo de processamento
    setTimeout(() => {
      const resultadosCalculados = compararRegimes(dadosCalculo);
      setResultados(resultadosCalculados);
      setLoading(false);
      setViewMode('results');
      
      // Registrar evento no Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'regime_tributario_calculado', {
          'event_category': 'ferramentas',
          'event_label': formData.atividade,
          'value': Math.round(dadosCalculo.receitaBruta)
        });
      }
    }, 800);
  };
  
  // Voltar ao formulário
  const voltarFormulario = () => {
    setViewMode('form');
  };
  
  // Renderizar gráfico de comparação
  const renderGraficoComparativo = () => {
    if (!resultados) return null;
    
    const { simplesNacional, lucroPresumido, lucroReal } = resultados;
    const maximo = Math.max(
      simplesNacional.valorImpostoAnual,
      lucroPresumido.valorImpostoAnual,
      lucroReal.valorImpostoAnual
    );
    
    return (
      <div className="mt-4">
        <h5 className="mb-3">Comparativo de Impostos Anuais</h5>
        <div className="row">
          {[simplesNacional, lucroPresumido, lucroReal].map((regime) => {
            const percentual = (regime.valorImpostoAnual / maximo) * 100;
            const isMelhor = regime.regime === resultados.maisVantajoso;
            
            return (
              <div className="col-md-4 mb-3" key={regime.regime}>
                <div className={`card ${isMelhor ? 'border-success' : ''}`}>
                  <div className={`card-header ${isMelhor ? 'bg-success text-white' : 'bg-light'}`}>
                    <strong>{regime.regime}</strong>
                    {isMelhor && <span className="badge bg-white text-success float-end">Recomendado</span>}
                  </div>
                  <div className="card-body">
                    <div className="progress mb-2">
                      <div 
                        className={`progress-bar ${isMelhor ? 'bg-success' : 'bg-primary'}`}
                        role="progressbar"
                        style={{ width: `${percentual}%` }}
                        aria-valuenow={percentual}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="mb-1">Imposto Anual: <strong>{formatarMoeda(regime.valorImpostoAnual)}</strong></p>
                    <p className="mb-1">Alíquota Efetiva: <strong>{regime.aliquotaEfetiva?.toFixed(2) || regime.cargaTributariaPercentual.toFixed(2)}%</strong></p>
                    <p className="mb-0">Lucro Líquido: <strong>{formatarMoeda(regime.lucroLiquidoAnual)}</strong></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizar formulário de entrada de dados
  const renderFormulario = () => (
    <form onSubmit={calcularResultados}>
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Dados Financeiros</h5>
          
          <div className="mb-3">
            <label htmlFor="receitaBruta" className="form-label">Receita Bruta Mensal</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="text"
                className="form-control"
                id="receitaBruta"
                name="receitaBruta"
                value={formData.receitaBruta}
                onChange={formatCurrency}
                placeholder="0,00"
                required
              />
            </div>
            <small className="text-muted">Faturamento médio mensal da empresa</small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="custosMercadorias" className="form-label">Custos com Mercadorias/Insumos</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="text"
                className="form-control"
                id="custosMercadorias"
                name="custosMercadorias"
                value={formData.custosMercadorias}
                onChange={formatCurrency}
                placeholder="0,00"
              />
            </div>
            <small className="text-muted">Custos mensais com produtos para revenda ou insumos</small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="custosFolha" className="form-label">Custos com Folha de Pagamento</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="text"
                className="form-control"
                id="custosFolha"
                name="custosFolha"
                value={formData.custosFolha}
                onChange={formatCurrency}
                placeholder="0,00"
              />
            </div>
            <small className="text-muted">Salários, encargos e benefícios mensais</small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="custosOperacionais" className="form-label">Custos Operacionais</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="text"
                className="form-control"
                id="custosOperacionais"
                name="custosOperacionais"
                value={formData.custosOperacionais}
                onChange={formatCurrency}
                placeholder="0,00"
              />
            </div>
            <small className="text-muted">Aluguel, contas, marketing e outros custos mensais</small>
          </div>
        </div>
        
        <div className="col-md-6">
          <h5 className="mb-3">Dados da Empresa</h5>
          
          <div className="mb-3">
            <label htmlFor="atividade" className="form-label">Atividade Principal</label>
            <select
              className="form-select"
              id="atividade"
              name="atividade"
              value={formData.atividade}
              onChange={handleChange}
              required
            >
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="servicos">Prestação de Serviços</option>
            </select>
          </div>
          
          {formData.atividade === 'servicos' && (
            <div className="mb-3">
              <label htmlFor="anexoSimples" className="form-label">Anexo do Simples Nacional (para serviços)</label>
              <select
                className="form-select"
                id="anexoSimples"
                name="anexoSimples"
                value={formData.anexoSimples}
                onChange={handleChange}
              >
                <option value="3">Anexo III - Serviços em geral</option>
                <option value="4">Anexo IV - Serviços especificados</option>
                <option value="5">Anexo V - Serviços específicos</option>
              </select>
              <small className="text-muted">Consulte um contador para identificar o anexo correto</small>
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor="despesasDedutiveis" className="form-label">Despesas Dedutíveis (Lucro Real)</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="text"
                className="form-control"
                id="despesasDedutiveis"
                name="despesasDedutiveis"
                value={formData.despesasDedutiveis}
                onChange={formatCurrency}
                placeholder="0,00"
              />
            </div>
            <small className="text-muted">Despesas adicionais que podem ser deduzidas no Lucro Real</small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="regimeContribuicao" className="form-label">Regime de contribuição PIS/COFINS (Lucro Real)</label>
            <select
              className="form-select"
              id="regimeContribuicao"
              name="regimeContribuicao"
              value={formData.regimeContribuicao}
              onChange={handleChange}
            >
              <option value="não-cumulativo">Não-Cumulativo</option>
              <option value="cumulativo">Cumulativo</option>
            </select>
          </div>
          
          <div className="alert alert-info mt-4">
            <i className="far fa-info-circle me-2"></i>
            Preencha todos os campos para obter uma simulação mais precisa. Os valores apresentados são estimativas e podem variar conforme a legislação vigente.
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
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
              Calcular Regimes Tributários
            </>
          )}
        </button>
      </div>
    </form>
  );
  
  // Renderizar detalhes de resultados
  const renderResultados = () => {
    if (!resultados) return null;
    
    const { simplesNacional, lucroPresumido, lucroReal, maisVantajoso, economiaAnual, percentualEconomia } = resultados;
    
    return (
      <div>
        <div className="alert alert-success mb-4">
          <h5 className="alert-heading">
            <i className="far fa-check-circle me-2"></i>
            Resultado da Simulação
          </h5>
          <p className="mb-1">
            O regime mais vantajoso para sua empresa é o <strong>{maisVantajoso}</strong>,
            gerando uma economia anual de aproximadamente <strong>{formatarMoeda(economiaAnual)}</strong> ({percentualEconomia.toFixed(2)}%)
            em comparação com a segunda melhor opção.
          </p>
        </div>
        
        {renderGraficoComparativo()}
        
        <div className="mt-4">
          <h5 className="mb-3">Detalhamento por Regime</h5>
          
          <div className="accordion" id="accordionRegimes">
            {/* Simples Nacional */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSimples">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSimples" aria-expanded="true" aria-controls="collapseSimples">
                  <strong>Simples Nacional</strong>
                  <span className="ms-auto me-2">
                    {formatarMoeda(simplesNacional.valorImpostoAnual)} / ano
                  </span>
                </button>
              </h2>
              <div id="collapseSimples" className="accordion-collapse collapse show" aria-labelledby="headingSimples" data-bs-parent="#accordionRegimes">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Alíquota Efetiva: <strong>{simplesNacional.aliquotaEfetiva.toFixed(2)}%</strong></p>
                      <p>Anexo Utilizado: <strong>{simplesNacional.anexoUtilizado}</strong></p>
                      <p>Imposto Mensal: <strong>{formatarMoeda(simplesNacional.valorImpostoMensal)}</strong></p>
                      <p>Lucro Líquido Anual: <strong>{formatarMoeda(simplesNacional.lucroLiquidoAnual)}</strong></p>
                    </div>
                    <div className="col-md-6">
                      <h6>Distribuição de Tributos (mensal)</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td>IRPJ</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.irpj)}</td>
                          </tr>
                          <tr>
                            <td>CSLL</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.csll)}</td>
                          </tr>
                          <tr>
                            <td>COFINS</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.cofins)}</td>
                          </tr>
                          <tr>
                            <td>PIS/PASEP</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.pisPasep)}</td>
                          </tr>
                          <tr>
                            <td>CPP (INSS)</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.cpp)}</td>
                          </tr>
                          <tr>
                            <td>ICMS</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.icms)}</td>
                          </tr>
                          <tr>
                            <td>ISS</td>
                            <td className="text-end">{formatarMoeda(simplesNacional.distribuicaoTributos.iss)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lucro Presumido */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingPresumido">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePresumido" aria-expanded="false" aria-controls="collapsePresumido">
                  <strong>Lucro Presumido</strong>
                  <span className="ms-auto me-2">
                    {formatarMoeda(lucroPresumido.valorImpostoAnual)} / ano
                  </span>
                </button>
              </h2>
              <div id="collapsePresumido" className="accordion-collapse collapse" aria-labelledby="headingPresumido" data-bs-parent="#accordionRegimes">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Base de Cálculo IRPJ: <strong>{formatarMoeda(lucroPresumido.baseCalculoIRPJ)}</strong></p>
                      <p>Base de Cálculo CSLL: <strong>{formatarMoeda(lucroPresumido.baseCalculoCSLL)}</strong></p>
                      <p>Percentual de Presunção IRPJ: <strong>{lucroPresumido.percentualPresuncaoIRPJ}%</strong></p>
                      <p>Imposto Mensal: <strong>{formatarMoeda(lucroPresumido.valorImpostoMensal)}</strong></p>
                      <p>Lucro Líquido Anual: <strong>{formatarMoeda(lucroPresumido.lucroLiquidoAnual)}</strong></p>
                    </div>
                    <div className="col-md-6">
                      <h6>Distribuição de Tributos (mensal)</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td>IRPJ</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.irpj)}</td>
                          </tr>
                          <tr>
                            <td>CSLL</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.csll)}</td>
                          </tr>
                          <tr>
                            <td>COFINS</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.cofins)}</td>
                          </tr>
                          <tr>
                            <td>PIS/PASEP</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.pisPasep)}</td>
                          </tr>
                          <tr>
                            <td>ICMS</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.icms)}</td>
                          </tr>
                          <tr>
                            <td>ISS</td>
                            <td className="text-end">{formatarMoeda(lucroPresumido.distribuicaoTributos.iss)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lucro Real */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingReal">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseReal" aria-expanded="false" aria-controls="collapseReal">
                  <strong>Lucro Real</strong>
                  <span className="ms-auto me-2">
                    {formatarMoeda(lucroReal.valorImpostoAnual)} / ano
                  </span>
                </button>
              </h2>
              <div id="collapseReal" className="accordion-collapse collapse" aria-labelledby="headingReal" data-bs-parent="#accordionRegimes">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Lucro Contábil Mensal: <strong>{formatarMoeda(lucroReal.lucroContabil)}</strong></p>
                      <p>Regime de Contribuição PIS/COFINS: <strong>{lucroReal.regimeContribuicao}</strong></p>
                      <p>Imposto Mensal: <strong>{formatarMoeda(lucroReal.valorImpostoMensal)}</strong></p>
                      <p>Lucro Líquido Anual: <strong>{formatarMoeda(lucroReal.lucroLiquidoAnual)}</strong></p>
                    </div>
                    <div className="col-md-6">
                      <h6>Distribuição de Tributos (mensal)</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td>IRPJ</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.irpj)}</td>
                          </tr>
                          <tr>
                            <td>CSLL</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.csll)}</td>
                          </tr>
                          <tr>
                            <td>COFINS</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.cofins)}</td>
                          </tr>
                          <tr>
                            <td>PIS/PASEP</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.pisPasep)}</td>
                          </tr>
                          <tr>
                            <td>ICMS</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.icms)}</td>
                          </tr>
                          <tr>
                            <td>ISS</td>
                            <td className="text-end">{formatarMoeda(lucroReal.distribuicaoTributos.iss)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={voltarFormulario}
          >
            <i className="far fa-arrow-left me-2"></i>
            Voltar e Simular Novamente
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="simulador-regimes-tributarios">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          {viewMode === 'form' ? renderFormulario() : renderResultados()}
        </div>
      </div>
    </div>
  );
};

export default SimuladorRegimesTributarios;
