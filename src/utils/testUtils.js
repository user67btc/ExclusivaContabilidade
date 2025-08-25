/**
 * Utilitários para testes das ferramentas financeiras
 * Inclui dados de teste, mocks e helpers
 */

/**
 * Dados de teste para a Calculadora de Impostos
 */
export const testDataCalculadoraImpostos = {
  // Cenário 1: Empresa pequena no Simples Nacional
  simplesNacional: {
    faturamentoMensal: 50000,
    regimeTributario: 'simples',
    anexo: 'anexo1',
    estadoUF: 'SP',
    resultadoEsperado: {
      impostoTotal: 3000, // 6% aproximadamente
      aliquotaEfetiva: 6.0
    }
  },
  
  // Cenário 2: Empresa média no Lucro Presumido
  lucroPresumido: {
    faturamentoMensal: 300000,
    regimeTributario: 'presumido',
    anexo: 'comercio',
    estadoUF: 'SP',
    resultadoEsperado: {
      impostoTotal: 36000, // 12% aproximadamente
      aliquotaEfetiva: 12.0
    }
  },
  
  // Cenário 3: Empresa grande no Lucro Real
  lucroReal: {
    faturamentoMensal: 1000000,
    regimeTributario: 'real',
    anexo: 'servicos',
    estadoUF: 'SP',
    despesasDedutíveis: 700000,
    resultadoEsperado: {
      impostoTotal: 75000, // 7.5% sobre lucro líquido
      aliquotaEfetiva: 7.5
    }
  }
};

/**
 * Dados de teste para o Simulador de Parcelamento
 */
export const testDataSimuladorParcelamento = {
  // Cenário 1: Parcelamento federal ordinário
  federalOrdinario: {
    valorDivida: 100000,
    tipoTributo: 'federal',
    modalidade: 'ordinario',
    prazoPagamento: 60,
    resultadoEsperado: {
      valorParcela: 2000,
      valorTotal: 120000,
      jurosTotal: 20000
    }
  },
  
  // Cenário 2: Parcelamento estadual especial
  estadualEspecial: {
    valorDivida: 50000,
    tipoTributo: 'estadual',
    modalidade: 'especial',
    prazoPagamento: 36,
    resultadoEsperado: {
      valorParcela: 1500,
      valorTotal: 54000,
      jurosTotal: 4000
    }
  }
};

/**
 * Dados de teste para o Cálculo de Encargos Trabalhistas
 */
export const testDataCalculoEncargos = {
  // Cenário 1: Funcionário CLT básico
  funcionarioBasico: {
    salarioBase: 3000,
    numeroDependentes: 2,
    tipoEmpresa: 'comercio',
    outrosBeneficios: 500,
    periculosidadeInsalubridade: 0,
    resultadoEsperado: {
      fgts: 240, // 8%
      inssPatronal: 600, // 20%
      totalEncargos: 1050,
      custoTotalMensal: 4550
    }
  },
  
  // Cenário 2: Funcionário com periculosidade
  funcionarioPericulosidade: {
    salarioBase: 5000,
    numeroDependentes: 1,
    tipoEmpresa: 'industria',
    outrosBeneficios: 800,
    periculosidadeInsalubridade: 30,
    resultadoEsperado: {
      fgts: 520, // 8% sobre salário + periculosidade
      inssPatronal: 1300, // 20% sobre salário + periculosidade
      totalEncargos: 2200,
      custoTotalMensal: 8300
    }
  }
};

/**
 * Dados de teste para o Simulador de Regimes Tributários
 */
export const testDataSimuladorRegimes = {
  // Cenário 1: Empresa que deve optar pelo Simples Nacional
  melhorSimples: {
    faturamentoAnual: 2400000,
    custosDespesas: 1200000,
    numeroFuncionarios: 15,
    atividadePrincipal: 'comercio',
    resultadoEsperado: {
      melhorRegime: 'simples',
      economiaAnual: 50000,
      aliquotaEfetiva: 8.5
    }
  },
  
  // Cenário 2: Empresa que deve optar pelo Lucro Real
  melhorReal: {
    faturamentoAnual: 10000000,
    custosDespesas: 8000000,
    numeroFuncionarios: 50,
    atividadePrincipal: 'servicos',
    resultadoEsperado: {
      melhorRegime: 'real',
      economiaAnual: 200000,
      aliquotaEfetiva: 15.0
    }
  }
};

/**
 * Mock do Google Analytics para testes
 */
export const mockGoogleAnalytics = {
  events: [],
  gtag: jest.fn((type, event, params) => {
    mockGoogleAnalytics.events.push({ type, event, params });
  }),
  clear: () => {
    mockGoogleAnalytics.events = [];
  },
  getEvents: () => mockGoogleAnalytics.events,
  getLastEvent: () => mockGoogleAnalytics.events[mockGoogleAnalytics.events.length - 1]
};

/**
 * Helper para simular entrada de dados em formulários
 * @param {Object} formData - Dados do formulário
 * @param {Function} setFormData - Função para atualizar o estado
 */
export const simulateFormInput = (formData, setFormData) => {
  return {
    changeInput: (name, value) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    },
    
    fillForm: (data) => {
      setFormData(prev => ({
        ...prev,
        ...data
      }));
    },
    
    clearForm: () => {
      const clearedData = {};
      Object.keys(formData).forEach(key => {
        clearedData[key] = '';
      });
      setFormData(clearedData);
    }
  };
};

/**
 * Helper para validar resultados de cálculos
 * @param {Object} resultado - Resultado do cálculo
 * @param {Object} esperado - Resultado esperado
 * @param {number} tolerancia - Tolerância para diferenças (padrão: 1%)
 */
export const validateCalculationResult = (resultado, esperado, tolerancia = 0.01) => {
  const errors = [];
  
  Object.keys(esperado).forEach(key => {
    const valorResultado = resultado[key];
    const valorEsperado = esperado[key];
    
    if (typeof valorEsperado === 'number') {
      const diferenca = Math.abs(valorResultado - valorEsperado);
      const percentualDiferenca = diferenca / valorEsperado;
      
      if (percentualDiferenca > tolerancia) {
        errors.push({
          campo: key,
          esperado: valorEsperado,
          obtido: valorResultado,
          diferenca: diferenca,
          percentual: percentualDiferenca * 100
        });
      }
    } else {
      if (valorResultado !== valorEsperado) {
        errors.push({
          campo: key,
          esperado: valorEsperado,
          obtido: valorResultado
        });
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Helper para medir performance de cálculos
 * @param {Function} calculationFunction - Função de cálculo
 * @param {Object} params - Parâmetros do cálculo
 * @param {number} iterations - Número de iterações (padrão: 100)
 */
export const measureCalculationPerformance = async (calculationFunction, params, iterations = 100) => {
  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await calculationFunction(params);
    const end = performance.now();
    times.push(end - start);
  }
  
  const average = times.reduce((sum, time) => sum + time, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  
  return {
    average: Math.round(average * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    iterations,
    times
  };
};

/**
 * Helper para simular diferentes cenários de uso
 */
export const testScenarios = {
  // Cenários de stress test
  stressTest: {
    highVolume: {
      faturamentoMensal: 10000000,
      numeroFuncionarios: 1000,
      numeroTransacoes: 50000
    },
    
    extremeValues: {
      faturamentoMensal: 0.01,
      numeroFuncionarios: 1,
      numeroTransacoes: 1
    }
  },
  
  // Cenários de edge cases
  edgeCases: {
    limitesSimples: {
      faturamentoAnual: 4800000, // Limite do Simples Nacional
      faturamentoMensal: 400000
    },
    
    limitesPresumido: {
      faturamentoAnual: 78000000, // Limite do Lucro Presumido
      faturamentoMensal: 6500000
    }
  },
  
  // Cenários de validação
  validation: {
    dadosInvalidos: {
      faturamentoMensal: -1000,
      numeroFuncionarios: -5,
      salarioBase: 'abc'
    },
    
    dadosVazios: {
      faturamentoMensal: '',
      numeroFuncionarios: null,
      salarioBase: undefined
    }
  }
};

/**
 * Helper para gerar relatórios de teste
 * @param {Array} resultados - Array com resultados dos testes
 */
export const generateTestReport = (resultados) => {
  const total = resultados.length;
  const passed = resultados.filter(r => r.passed).length;
  const failed = total - passed;
  const successRate = (passed / total) * 100;
  
  const report = {
    summary: {
      total,
      passed,
      failed,
      successRate: Math.round(successRate * 100) / 100
    },
    details: resultados,
    timestamp: new Date().toISOString()
  };
  
  return report;
};

/**
 * Helper para comparar diferentes implementações
 * @param {Array} implementations - Array de funções de implementação
 * @param {Object} testData - Dados de teste
 */
export const compareImplementations = async (implementations, testData) => {
  const results = [];
  
  for (const [name, implementation] of Object.entries(implementations)) {
    try {
      const start = performance.now();
      const result = await implementation(testData);
      const end = performance.now();
      
      results.push({
        name,
        result,
        executionTime: end - start,
        success: true
      });
    } catch (error) {
      results.push({
        name,
        error: error.message,
        success: false
      });
    }
  }
  
  return results;
};
