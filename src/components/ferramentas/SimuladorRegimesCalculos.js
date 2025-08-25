/**
 * Módulo de cálculos para o Simulador de Regimes Tributários
 * Implementa os cálculos precisos para os diferentes regimes tributários
 */

/**
 * Calcula os impostos do Simples Nacional
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularSimplesNacional = (dados) => {
  const { 
    receitaBruta,
    custosMercadorias,
    custosFolha,
    custosOperacionais,
    atividade,
    anexoSimples
  } = dados;

  // Definição de alíquotas e deduções por anexo do Simples Nacional
  // Valores baseados nas tabelas vigentes para 2025
  const tabelaSimples = {
    1: { // Comércio
      faixas: [
        { limite: 180000, aliquota: 0.04, deducao: 0 },
        { limite: 360000, aliquota: 0.073, deducao: 5940 },
        { limite: 720000, aliquota: 0.095, deducao: 13860 },
        { limite: 1800000, aliquota: 0.107, deducao: 22500 },
        { limite: 3600000, aliquota: 0.143, deducao: 87300 },
        { limite: 4800000, aliquota: 0.19, deducao: 378000 },
      ]
    },
    2: { // Indústria
      faixas: [
        { limite: 180000, aliquota: 0.045, deducao: 0 },
        { limite: 360000, aliquota: 0.078, deducao: 5940 },
        { limite: 720000, aliquota: 0.10, deducao: 13860 },
        { limite: 1800000, aliquota: 0.112, deducao: 22500 },
        { limite: 3600000, aliquota: 0.147, deducao: 85500 },
        { limite: 4800000, aliquota: 0.30, deducao: 720000 },
      ]
    },
    3: { // Serviços I
      faixas: [
        { limite: 180000, aliquota: 0.06, deducao: 0 },
        { limite: 360000, aliquota: 0.112, deducao: 9360 },
        { limite: 720000, aliquota: 0.135, deducao: 17640 },
        { limite: 1800000, aliquota: 0.16, deducao: 35640 },
        { limite: 3600000, aliquota: 0.21, deducao: 125640 },
        { limite: 4800000, aliquota: 0.33, deducao: 648000 },
      ]
    },
    4: { // Serviços II
      faixas: [
        { limite: 180000, aliquota: 0.045, deducao: 0 },
        { limite: 360000, aliquota: 0.09, deducao: 8100 },
        { limite: 720000, aliquota: 0.102, deducao: 12420 },
        { limite: 1800000, aliquota: 0.14, deducao: 39780 },
        { limite: 3600000, aliquota: 0.22, deducao: 183780 },
        { limite: 4800000, aliquota: 0.33, deducao: 828000 },
      ]
    },
    5: { // Serviços III
      faixas: [
        { limite: 180000, aliquota: 0.155, deducao: 0 },
        { limite: 360000, aliquota: 0.18, deducao: 4500 },
        { limite: 720000, aliquota: 0.195, deducao: 9900 },
        { limite: 1800000, aliquota: 0.205, deducao: 17100 },
        { limite: 3600000, aliquota: 0.23, deducao: 62100 },
        { limite: 4800000, aliquota: 0.305, deducao: 540000 },
      ]
    }
  };

  // Determinar a faixa com base na receita bruta anual
  const receitaAnual = receitaBruta * 12;
  const anexo = anexoSimples || (atividade === 'comercio' ? 1 : atividade === 'industria' ? 2 : 3);
  
  // Encontrar a faixa aplicável
  let faixaAplicavel = tabelaSimples[anexo].faixas[tabelaSimples[anexo].faixas.length - 1];
  for (const faixa of tabelaSimples[anexo].faixas) {
    if (receitaAnual <= faixa.limite) {
      faixaAplicavel = faixa;
      break;
    }
  }

  // Calcular a alíquota efetiva
  const aliquotaEfetiva = (receitaAnual * faixaAplicavel.aliquota - faixaAplicavel.deducao) / receitaAnual;
  
  // Calcular os impostos
  const valorImpostoMensal = receitaBruta * aliquotaEfetiva;
  const valorImpostoAnual = valorImpostoMensal * 12;

  // Distribuição aproximada dos tributos no Simples Nacional
  const distribuicaoTributos = {
    irpj: valorImpostoMensal * 0.055,
    csll: valorImpostoMensal * 0.035,
    cofins: valorImpostoMensal * 0.127,
    pisPasep: valorImpostoMensal * 0.03,
    cpp: valorImpostoMensal * 0.428,
    icms: anexo <= 2 ? valorImpostoMensal * 0.325 : valorImpostoMensal * 0.075,
    iss: anexo >= 3 ? valorImpostoMensal * 0.25 : 0
  };
  
  // Calcular o lucro líquido aproximado
  const faturamentoAnual = receitaAnual;
  const custoTotalAnual = (custosMercadorias + custosFolha + custosOperacionais) * 12;
  const lucroAntesDeTributosAnual = faturamentoAnual - custoTotalAnual;
  const lucroLiquidoAnual = lucroAntesDeTributosAnual - valorImpostoAnual;
  
  // Resultados
  return {
    regime: 'Simples Nacional',
    aliquotaEfetiva: aliquotaEfetiva * 100,
    valorImpostoMensal,
    valorImpostoAnual,
    lucroLiquidoAnual,
    cargaTributariaPercentual: (valorImpostoAnual / faturamentoAnual) * 100,
    distribuicaoTributos,
    anexoUtilizado: anexo,
    faixaUtilizada: faixaAplicavel
  };
};

/**
 * Calcula os impostos do Lucro Presumido
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularLucroPresumido = (dados) => {
  const { 
    receitaBruta,
    custosMercadorias,
    custosFolha,
    custosOperacionais,
    atividade
  } = dados;
  
  // Definir percentuais de presunção por atividade
  let percentualPresuncaoIRPJ, percentualPresuncaoCSLL;
  
  if (atividade === 'comercio' || atividade === 'industria') {
    percentualPresuncaoIRPJ = 0.08;
    percentualPresuncaoCSLL = 0.12;
  } else { // serviços
    percentualPresuncaoIRPJ = 0.32;
    percentualPresuncaoCSLL = 0.32;
  }
  
  // Base de cálculo presumida
  const baseCalculoIRPJ = receitaBruta * percentualPresuncaoIRPJ;
  const baseCalculoCSLL = receitaBruta * percentualPresuncaoCSLL;
  
  // Alíquotas
  const aliquotaIRPJ = 0.15;
  const aliquotaAdicionalIRPJ = baseCalculoIRPJ > 20000 ? 0.10 : 0; // Adicional se base > 20.000/mês
  const aliquotaCSLL = 0.09;
  const aliquotaPIS = 0.0065;
  const aliquotaCOFINS = 0.03;
  
  // Cálculo dos tributos
  const valorIRPJ = baseCalculoIRPJ * aliquotaIRPJ;
  const valorAdicionalIRPJ = baseCalculoIRPJ > 20000 ? (baseCalculoIRPJ - 20000) * aliquotaAdicionalIRPJ : 0;
  const valorCSLL = baseCalculoCSLL * aliquotaCSLL;
  const valorPIS = receitaBruta * aliquotaPIS;
  const valorCOFINS = receitaBruta * aliquotaCOFINS;
  
  // ICMS ou ISS (valores aproximados)
  let valorICMS = 0;
  let valorISS = 0;
  
  if (atividade === 'comercio' || atividade === 'industria') {
    valorICMS = receitaBruta * 0.18; // Alíquota média ICMS
  } else {
    valorISS = receitaBruta * 0.05; // Alíquota média ISS
  }
  
  // Total de impostos mensais
  const valorImpostoMensal = valorIRPJ + valorAdicionalIRPJ + valorCSLL + valorPIS + valorCOFINS + valorICMS + valorISS;
  const valorImpostoAnual = valorImpostoMensal * 12;
  
  // Calcular o lucro líquido aproximado
  const faturamentoAnual = receitaBruta * 12;
  const custoTotalAnual = (custosMercadorias + custosFolha + custosOperacionais) * 12;
  const lucroAntesDeTributosAnual = faturamentoAnual - custoTotalAnual;
  const lucroLiquidoAnual = lucroAntesDeTributosAnual - valorImpostoAnual;
  
  // Distribuição detalhada dos tributos
  const distribuicaoTributos = {
    irpj: valorIRPJ + valorAdicionalIRPJ,
    csll: valorCSLL,
    cofins: valorCOFINS,
    pisPasep: valorPIS,
    icms: valorICMS,
    iss: valorISS
  };
  
  // Resultados
  return {
    regime: 'Lucro Presumido',
    baseCalculoIRPJ,
    baseCalculoCSLL,
    valorImpostoMensal,
    valorImpostoAnual,
    lucroLiquidoAnual,
    cargaTributariaPercentual: (valorImpostoAnual / faturamentoAnual) * 100,
    distribuicaoTributos,
    percentualPresuncaoIRPJ: percentualPresuncaoIRPJ * 100,
    percentualPresuncaoCSLL: percentualPresuncaoCSLL * 100
  };
};

/**
 * Calcula os impostos do Lucro Real
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularLucroReal = (dados) => {
  const { 
    receitaBruta,
    custosMercadorias,
    custosFolha,
    custosOperacionais,
    despesasDedutiveis,
    atividade,
    regimeContribuicao
  } = dados;
  
  // Lucro antes do IRPJ e CSLL
  const despesasTotais = custosMercadorias + custosFolha + custosOperacionais + (despesasDedutiveis || 0);
  const lucroContabil = receitaBruta - despesasTotais;
  
  // Alíquotas
  const aliquotaIRPJ = 0.15;
  const aliquotaAdicionalIRPJ = lucroContabil > 20000 ? 0.10 : 0; // Adicional se lucro > 20.000/mês
  const aliquotaCSLL = 0.09;
  
  // Cálculo do IRPJ e CSLL
  const valorIRPJ = lucroContabil * aliquotaIRPJ;
  const valorAdicionalIRPJ = lucroContabil > 20000 ? (lucroContabil - 20000) * aliquotaAdicionalIRPJ : 0;
  const valorCSLL = lucroContabil * aliquotaCSLL;
  
  // Regime de contribuição para PIS e COFINS
  let valorPIS, valorCOFINS;
  
  if (regimeContribuicao === 'cumulativo') {
    // Regime cumulativo
    valorPIS = receitaBruta * 0.0065;
    valorCOFINS = receitaBruta * 0.03;
  } else {
    // Regime não-cumulativo
    const aliquotaPIS = 0.0165;
    const aliquotaCOFINS = 0.076;
    
    // Base de cálculo (receita bruta menos créditos)
    const creditosPisCofins = custosMercadorias * 0.5; // Estimativa simples de créditos
    const baseCalculoPisCofins = receitaBruta - creditosPisCofins;
    
    valorPIS = baseCalculoPisCofins * aliquotaPIS;
    valorCOFINS = baseCalculoPisCofins * aliquotaCOFINS;
  }
  
  // ICMS ou ISS (valores aproximados)
  let valorICMS = 0;
  let valorISS = 0;
  
  if (atividade === 'comercio' || atividade === 'industria') {
    const aliquotaICMS = 0.18; // Alíquota média ICMS
    const creditosICMS = custosMercadorias * aliquotaICMS * 0.7; // Estimativa de créditos
    valorICMS = (receitaBruta * aliquotaICMS) - creditosICMS;
  } else {
    valorISS = receitaBruta * 0.05; // Alíquota média ISS
  }
  
  // Total de impostos mensais
  const valorImpostoMensal = valorIRPJ + valorAdicionalIRPJ + valorCSLL + valorPIS + valorCOFINS + valorICMS + valorISS;
  const valorImpostoAnual = valorImpostoMensal * 12;
  
  // Calcular o lucro líquido aproximado
  const faturamentoAnual = receitaBruta * 12;
  const custoTotalAnual = despesasTotais * 12;
  const lucroAntesDeTributosAnual = faturamentoAnual - custoTotalAnual;
  const lucroLiquidoAnual = lucroAntesDeTributosAnual - valorImpostoAnual;
  
  // Distribuição detalhada dos tributos
  const distribuicaoTributos = {
    irpj: valorIRPJ + valorAdicionalIRPJ,
    csll: valorCSLL,
    cofins: valorCOFINS,
    pisPasep: valorPIS,
    icms: valorICMS,
    iss: valorISS
  };
  
  // Resultados
  return {
    regime: 'Lucro Real',
    lucroContabil,
    valorImpostoMensal,
    valorImpostoAnual,
    lucroLiquidoAnual,
    cargaTributariaPercentual: (valorImpostoAnual / faturamentoAnual) * 100,
    distribuicaoTributos,
    regimeContribuicao: regimeContribuicao || 'não-cumulativo'
  };
};

/**
 * Compara os diferentes regimes tributários
 * @param {Object} dados - Dados para a comparação
 * @returns {Object} Resultados da comparação
 */
export const compararRegimes = (dados) => {
  const resultadoSimples = calcularSimplesNacional(dados);
  const resultadoPresumido = calcularLucroPresumido(dados);
  const resultadoReal = calcularLucroReal(dados);
  
  // Determinar o regime mais vantajoso (menor carga tributária)
  const regimes = [resultadoSimples, resultadoPresumido, resultadoReal];
  regimes.sort((a, b) => a.valorImpostoAnual - b.valorImpostoAnual);
  
  const maisVantajoso = regimes[0].regime;
  const economiaAnual = regimes[1].valorImpostoAnual - regimes[0].valorImpostoAnual;
  const percentualEconomia = (economiaAnual / regimes[1].valorImpostoAnual) * 100;
  
  return {
    simplesNacional: resultadoSimples,
    lucroPresumido: resultadoPresumido,
    lucroReal: resultadoReal,
    maisVantajoso,
    economiaAnual,
    percentualEconomia
  };
};

/**
 * Formata um valor como moeda brasileira (R$)
 * @param {Number} valor - Valor a ser formatado
 * @returns {String} Valor formatado
 */
export const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Formata um valor como percentual
 * @param {Number} valor - Valor a ser formatado
 * @returns {String} Valor formatado
 */
export const formatarPercentual = (valor) => {
  return valor.toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
