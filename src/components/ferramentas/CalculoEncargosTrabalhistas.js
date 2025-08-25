import React, { useState } from 'react';
import CalculoEncargosCalculos from './CalculoEncargosCalculos';

const CalculoEncargosTrabalhistas = () => {
  const [formData, setFormData] = useState({
    salario: '',
    tipoCalculo: 'mensal',
    incluirFerias: true,
    incluirDecimoTerceiro: true,
    incluirFgts: true,
    incluirInss: true
  });

  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calcularEncargos = () => {
    if (!formData.salario || formData.salario <= 0) {
      alert('Por favor, insira um salário válido.');
      return;
    }

    const calculo = CalculoEncargosCalculos.calcularEncargosCompletos(
      parseFloat(formData.salario),
      formData
    );

    setResultado(calculo);
  };

  const limparFormulario = () => {
    setFormData({
      salario: '',
      tipoCalculo: 'mensal',
      incluirFerias: true,
      incluirDecimoTerceiro: true,
      incluirFgts: true,
      incluirInss: true
    });
    setResultado(null);
  };

  return (
    <div className="calculo-encargos-container">
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-calculator"></i> Dados do Funcionário</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); calcularEncargos(); }}>
                <div className="mb-3">
                  <label htmlFor="salario" className="form-label">
                    Salário Base (R$) *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salario"
                    name="salario"
                    value={formData.salario}
                    onChange={handleInputChange}
                    placeholder="Ex: 2500.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tipoCalculo" className="form-label">
                    Tipo de Cálculo
                  </label>
                  <select
                    className="form-select"
                    id="tipoCalculo"
                    name="tipoCalculo"
                    value={formData.tipoCalculo}
                    onChange={handleInputChange}
                  >
                    <option value="mensal">Encargos Mensais</option>
                    <option value="anual">Custo Anual Total</option>
                    <option value="ferias">Férias</option>
                    <option value="decimoTerceiro">13º Salário</option>
                    <option value="rescisao">Rescisão</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Incluir nos Cálculos:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="incluirFgts"
                      name="incluirFgts"
                      checked={formData.incluirFgts}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="incluirFgts">
                      FGTS (8%)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="incluirInss"
                      name="incluirInss"
                      checked={formData.incluirInss}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="incluirInss">
                      INSS Patronal (20%)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="incluirFerias"
                      name="incluirFerias"
                      checked={formData.incluirFerias}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="incluirFerias">
                      Férias + 1/3 Constitucional
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="incluirDecimoTerceiro"
                      name="incluirDecimoTerceiro"
                      checked={formData.incluirDecimoTerceiro}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="incluirDecimoTerceiro">
                      13º Salário
                    </label>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-calculator"></i> Calcular Encargos
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={limparFormulario}
                  >
                    <i className="fas fa-eraser"></i> Limpar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          {resultado && (
            <div className="card">
              <div className="card-header">
                <h3><i className="fas fa-chart-bar"></i> Resultado dos Cálculos</h3>
              </div>
              <div className="card-body">
                <div className="resultado-encargos">
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Salário Base:</strong>
                    </div>
                    <div className="col-6 text-end">
                      R$ {resultado.salarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {resultado.encargos.map((encargo, index) => (
                    <div key={index} className="row mb-2">
                      <div className="col-8">
                        {encargo.nome}:
                      </div>
                      <div className="col-4 text-end">
                        R$ {encargo.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}

                  <hr />
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Total de Encargos:</strong>
                    </div>
                    <div className="col-6 text-end">
                      <strong className="text-primary">
                        R$ {resultado.totalEncargos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Custo Total:</strong>
                    </div>
                    <div className="col-6 text-end">
                      <strong className="text-success">
                        R$ {resultado.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <small>
                      <i className="fas fa-info-circle"></i>
                      <strong> Percentual de Encargos: </strong>
                      {resultado.percentualEncargos.toFixed(1)}% sobre o salário base
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!resultado && (
            <div className="card">
              <div className="card-body text-center text-muted">
                <i className="fas fa-calculator fa-3x mb-3"></i>
                <p>Preencha os dados ao lado para calcular os encargos trabalhistas.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculoEncargosTrabalhistas;
