/**
 * Módulo de cálculos para o Cálculo de Encargos Trabalhistas
 * Implementa os cálculos precisos para diferentes tipos de encargos trabalhistas
 */

/**
 * Constantes e parâmetros para os cálculos
 */
const parametrosPadrao = {
  // Percentuais de encargos básicos (FGTS, INSS, etc.)
  fgts: 0.08,
  fgtsMensal: 0.08,
  fgtsRescisao: 0.04, // Multa adicional em rescisão sem justa causa
  inssPatronal: 0.20,
  
  // Salário Família (valores aproximados para 2025)
  salarioFamiliaTeto: 1754.18,
  salarioFamiliaValor: 59.82,
  
  // Férias
  adicionalFerias: 0.3333, // 1/3 constitucional
  
  // 13º salário
  decimoTerceiroParcelas: 2, // Número padrão de parcelas
  
  // Outros encargos
  rat: 0.01, // Risco Ambiental do Trabalho (varia conforme CNAE)
  terceirosBovicultura: 0.025, // Terceiros para empresas do ramo bovicultura
  terceirosIndustria: 0.055, // Terceiros para empresas do ramo industrial
  terceirosComercio: 0.0465, // Terceiros para empresas do ramo comercial
  
  // Contribuição sindical
  contribuicaoSindical: 0.01,
  
  // Rescisão
  avisoIndenizado: 1, // Um mês de salário
  multaRescisoria: 0.5 // 50% do FGTS acumulado
};

/**
 * Calcula os encargos da folha de pagamento mensal
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularEncargosMensais = (dados) => {
  const { 
    salarioBase,
    numeroDependentes = 0,
    tipoEmpresa = 'comercio',
    outrosBeneficios = 0,
    periculosidadeInsalubridade = 0
  } = dados;
  
  // Cálculos básicos
  const fgts = salarioBase * parametrosPadrao.fgts;
  const inssPatronal = salarioBase * parametrosPadrao.inssPatronal;
  
  // Adicional de insalubridade/periculosidade (se aplicável)
  const valorPericulosidadeInsalubridade = periculosidadeInsalubridade > 0 ? 
    salarioBase * (periculosidadeInsalubridade / 100) : 0;
  
  // Calcular RAT e Terceiros conforme tipo de empresa
  let rat = salarioBase * parametrosPadrao.rat;
  let terceiros = 0;
  
  switch (tipoEmpresa) {
    case 'industria':
      terceiros = salarioBase * parametrosPadrao.terceirosIndustria;
      break;
    case 'comercio':
      terceiros = salarioBase * parametrosPadrao.terceirosComercio;
      break;
    case 'agropecuaria':
      terceiros = salarioBase * parametrosPadrao.terceirosBovicultura;
      break;
    default:
      terceiros = salarioBase * parametrosPadrao.terceirosComercio;
  }
  
  // Salário família (se aplicável)
  let salarioFamilia = 0;
  if (salarioBase <= parametrosPadrao.salarioFamiliaTeto && numeroDependentes > 0) {
    salarioFamilia = parametrosPadrao.salarioFamiliaValor * numeroDependentes;
  }
  
  // Total de encargos
  const totalEncargosMensais = fgts + inssPatronal + rat + terceiros;
  const custoTotalMensal = salarioBase + valorPericulosidadeInsalubridade + totalEncargosMensais + outrosBeneficios - salarioFamilia;
  
  // Detalhamento dos encargos
  return {
    salarioBase,
    fgts,
    inssPatronal,
    rat,
    terceiros,
    valorPericulosidadeInsalubridade,
    salarioFamilia,
    outrosBeneficios,
    totalEncargosMensais,
    custoTotalMensal,
    percentualEncargos: (totalEncargosMensais / salarioBase) * 100
  };
};

/**
 * Calcula os valores relacionados a férias
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularFerias = (dados) => {
  const { 
    salarioBase,
    diasFerias = 30,
    abonoPecuniario = false,
    diasAbono = 10,
    adiantamento13Ferias = false
  } = dados;
  
  // Valor base das férias (proporcional aos dias)
  const valorBaseFeriasProporcional = salarioBase * (diasFerias / 30);
  
  // Adicional constitucional de 1/3
  const adicionalConstitucional = valorBaseFeriasProporcional * parametrosPadrao.adicionalFerias;
  
  // Cálculo do abono pecuniário (venda de 10 dias)
  let valorAbonoPecuniario = 0;
  let adicionalAbono = 0;
  
  if (abonoPecuniario) {
    valorAbonoPecuniario = salarioBase * (diasAbono / 30);
    adicionalAbono = valorAbonoPecuniario * parametrosPadrao.adicionalFerias;
  }
  
  // Adiantamento de 50% do 13º nas férias (se solicitado)
  const adiantamentoDecimoTerceiro = adiantamento13Ferias ? salarioBase / 2 : 0;
  
  // Encargos do empregador sobre férias
  const fgtsFerias = (valorBaseFeriasProporcional + adicionalConstitucional) * parametrosPadrao.fgts;
  const inssPatronalFerias = (valorBaseFeriasProporcional + adicionalConstitucional) * parametrosPadrao.inssPatronal;
  
  // Total bruto a receber (empregado)
  const valorTotalBrutoFerias = valorBaseFeriasProporcional + adicionalConstitucional + valorAbonoPecuniario + adicionalAbono + adiantamentoDecimoTerceiro;
  
  // Total de encargos do empregador
  const totalEncargosFerias = fgtsFerias + inssPatronalFerias;
  
  // Custo total das férias para a empresa
  const custoTotalFerias = valorTotalBrutoFerias + totalEncargosFerias;
  
  return {
    valorBaseFeriasProporcional,
    adicionalConstitucional,
    valorAbonoPecuniario,
    adicionalAbono,
    adiantamentoDecimoTerceiro,
    fgtsFerias,
    inssPatronalFerias,
    valorTotalBrutoFerias,
    totalEncargosFerias,
    custoTotalFerias
  };
};

/**
 * Calcula os valores relacionados ao 13º salário
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularDecimoTerceiro = (dados) => {
  const { 
    salarioBase,
    mesesTrabalhados = 12,
    adiantamentoJaRealizado = false
  } = dados;
  
  // Valor proporcional aos meses trabalhados
  const valorProporcional = (salarioBase / 12) * mesesTrabalhados;
  
  // Primeira parcela (normalmente paga até 30/11)
  // Não tem incidência de INSS e IRRF
  const primeiraParcela = adiantamentoJaRealizado ? 0 : valorProporcional / 2;
  
  // Segunda parcela (normalmente paga até 20/12)
  const segundaParcela = adiantamentoJaRealizado ? valorProporcional : valorProporcional / 2;
  
  // Encargos do empregador
  const fgtsDecimoTerceiro = valorProporcional * parametrosPadrao.fgts;
  const inssPatronalDecimoTerceiro = valorProporcional * parametrosPadrao.inssPatronal;
  
  // Total de encargos
  const totalEncargosDecimoTerceiro = fgtsDecimoTerceiro + inssPatronalDecimoTerceiro;
  
  // Custo total do 13º para a empresa
  const custoTotalDecimoTerceiro = valorProporcional + totalEncargosDecimoTerceiro;
  
  return {
    valorProporcional,
    primeiraParcela,
    segundaParcela,
    fgtsDecimoTerceiro,
    inssPatronalDecimoTerceiro,
    totalEncargosDecimoTerceiro,
    custoTotalDecimoTerceiro
  };
};

/**
 * Calcula os valores relacionados à rescisão de contrato
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularRescisao = (dados) => {
  const { 
    salarioBase,
    tempoServicoAnos = 1,
    tempoServicoMeses = 0,
    saldoSalarioDias = 15,
    avisoPrevioIndenizado = true,
    feriasVencidas = false,
    feriasProporcionalMeses = 8,
    decimoTerceiroProporcional = true,
    tipoRescisao = 'sem_justa_causa'
  } = dados;
  
  // Saldo de salário
  const saldoSalario = salarioBase * (saldoSalarioDias / 30);
  
  // Aviso prévio
  const valorAvisoPrevio = avisoPrevioIndenizado && tipoRescisao === 'sem_justa_causa' ? salarioBase : 0;
  
  // Férias vencidas
  const valorFeriasVencidas = feriasVencidas ? salarioBase * (1 + parametrosPadrao.adicionalFerias) : 0;
  
  // Férias proporcionais
  const valorFeriasProporcionais = tipoRescisao === 'sem_justa_causa' || tipoRescisao === 'pedido_demissao' ? 
    (salarioBase * (feriasProporcionalMeses / 12)) * (1 + parametrosPadrao.adicionalFerias) : 0;
  
  // 13º proporcional
  const valorDecimoTerceiroProporcional = decimoTerceiroProporcional ? 
    (salarioBase / 12) * feriasProporcionalMeses : 0;
  
  // Multa FGTS (apenas sem justa causa)
  const saldoFGTS = salarioBase * parametrosPadrao.fgts * ((tempoServicoAnos * 12) + tempoServicoMeses);
  const multaFGTS = tipoRescisao === 'sem_justa_causa' ? saldoFGTS * parametrosPadrao.multaRescisoria : 0;
  const fgtsRescisao = tipoRescisao === 'sem_justa_causa' ? saldoSalario * parametrosPadrao.fgtsRescisao : 0;
  
  // Total da rescisão
  const totalRescisaoBruto = saldoSalario + valorAvisoPrevio + valorFeriasVencidas + valorFeriasProporcionais + valorDecimoTerceiroProporcional + multaFGTS;
  
  // Encargos adicionais para a empresa
  const encargosAdicionais = (saldoSalario + valorFeriasVencidas + valorFeriasProporcionais + valorDecimoTerceiroProporcional) * parametrosPadrao.inssPatronal;
  
  // Custo total da rescisão para a empresa
  const custoTotalRescisao = totalRescisaoBruto + encargosAdicionais + fgtsRescisao;
  
  return {
    saldoSalario,
    valorAvisoPrevio,
    valorFeriasVencidas,
    valorFeriasProporcionais,
    valorDecimoTerceiroProporcional,
    saldoFGTS,
    multaFGTS,
    fgtsRescisao,
    totalRescisaoBruto,
    encargosAdicionais,
    custoTotalRescisao,
    tipoRescisao
  };
};

/**
 * Calcula o custo total anual de um funcionário
 * @param {Object} dados - Dados para o cálculo
 * @returns {Object} Resultados do cálculo
 */
export const calcularCustoAnualFuncionario = (dados) => {
  const { 
    salarioBase,
    numeroDependentes = 0,
    tipoEmpresa = 'comercio',
    outrosBeneficios = 0,
    periculosidadeInsalubridade = 0
  } = dados;
  
  // Encargos mensais
  const encargosMensais = calcularEncargosMensais({
    salarioBase,
    numeroDependentes,
    tipoEmpresa,
    outrosBeneficios,
    periculosidadeInsalubridade
  });
  
  // Custo mensal total
  const custoMensal = encargosMensais.custoTotalMensal;
  
  // Férias (custo adicional)
  const custosFerias = calcularFerias({ salarioBase });
  const custoAdicionalFerias = custosFerias.custoTotalFerias - salarioBase; // Subtrair o salário para não contar em duplicidade
  
  // 13º salário
  const custosDecimoTerceiro = calcularDecimoTerceiro({ salarioBase });
  
  // Custo anual total
  const custoAnual = (custoMensal * 12) + custoAdicionalFerias;
  
  // Detalhamento
  return {
    salarioBase,
    salarioAnual: salarioBase * 12,
    custoMensalMedio: custoAnual / 12,
    encargosAnuais: custoAnual - (salarioBase * 12),
    custoAnual,
    percentualEncargosAnual: ((custoAnual - (salarioBase * 12)) / (salarioBase * 12)) * 100,
    detalhamento: {
      salarios: salarioBase * 12,
      ferias: custosFerias.custoTotalFerias,
      decimoTerceiro: custosDecimoTerceiro.custoTotalDecimoTerceiro,
      fgtsMensal: encargosMensais.fgts * 12,
      inssPatronal: encargosMensais.inssPatronal * 12,
      outrosEncargos: (encargosMensais.rat + encargosMensais.terceiros) * 12,
      beneficios: outrosBeneficios * 12,
      adicionalPericulosidadeInsalubridade: encargosMensais.valorPericulosidadeInsalubridade * 12
    }
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

/**
 * Calcula encargos completos baseado no tipo de cálculo
 * @param {Number} salarioBase - Salário base do funcionário
 * @param {Object} opcoes - Opções de cálculo
 * @returns {Object} Resultado dos cálculos
 */
export const calcularEncargosCompletos = (salarioBase, opcoes = {}) => {
  const {
    tipoCalculo = 'mensal',
    incluirFerias = true,
    incluirDecimoTerceiro = true,
    incluirFgts = true,
    incluirInss = true
  } = opcoes;

  let resultado = {
    salarioBase,
    encargos: [],
    totalEncargos: 0,
    custoTotal: 0,
    percentualEncargos: 0
  };

  switch (tipoCalculo) {
    case 'mensal':
      const encargosMensais = calcularEncargosMensais({ salarioBase });
      resultado.encargos = [
        { nome: 'FGTS (8%)', valor: incluirFgts ? encargosMensais.fgts : 0 },
        { nome: 'INSS Patronal (20%)', valor: incluirInss ? encargosMensais.inssPatronal : 0 },
        { nome: 'RAT (1-3%)', valor: encargosMensais.rat },
        { nome: 'Terceiros (5,8%)', valor: encargosMensais.terceiros }
      ];
      break;

    case 'anual':
      const custoAnual = calcularCustoAnualFuncionario({ salarioBase });
      resultado.encargos = [
        { nome: 'Salários (12x)', valor: salarioBase * 12 },
        { nome: 'Férias + 1/3', valor: incluirFerias ? custoAnual.detalhamento.ferias : 0 },
        { nome: '13º Salário', valor: incluirDecimoTerceiro ? custoAnual.detalhamento.decimoTerceiro : 0 },
        { nome: 'FGTS Anual', valor: incluirFgts ? custoAnual.detalhamento.fgtsMensal : 0 },
        { nome: 'INSS Patronal', valor: incluirInss ? custoAnual.detalhamento.inssPatronal : 0 }
      ];
      break;

    case 'ferias':
      const ferias = calcularFerias({ salarioBase });
      resultado.encargos = [
        { nome: 'Férias', valor: ferias.valorFerias },
        { nome: '1/3 Constitucional', valor: ferias.umTercoConstitucional },
        { nome: 'FGTS sobre Férias', valor: ferias.fgtsFerias },
        { nome: 'INSS sobre Férias', valor: ferias.inssPatronalFerias }
      ];
      break;

    case 'decimoTerceiro':
      const decimoTerceiro = calcularDecimoTerceiro({ salarioBase });
      resultado.encargos = [
        { nome: '13º Salário', valor: decimoTerceiro.valorProporcional },
        { nome: 'FGTS sobre 13º', valor: decimoTerceiro.fgtsDecimoTerceiro },
        { nome: 'INSS sobre 13º', valor: decimoTerceiro.inssPatronalDecimoTerceiro }
      ];
      break;

    case 'rescisao':
      const rescisao = calcularRescisao({ salarioBase });
      resultado.encargos = [
        { nome: 'Saldo de Salário', valor: rescisao.saldoSalario },
        { nome: 'Aviso Prévio', valor: rescisao.avisoPrevio },
        { nome: 'Férias Proporcionais', valor: rescisao.feriasProporcionais },
        { nome: '13º Proporcional', valor: rescisao.decimoTerceiroProporcionais }
      ];
      break;
  }

  // Calcular totais
  resultado.totalEncargos = resultado.encargos.reduce((total, encargo) => total + encargo.valor, 0);
  resultado.custoTotal = resultado.salarioBase + resultado.totalEncargos;
  resultado.percentualEncargos = (resultado.totalEncargos / resultado.salarioBase) * 100;

  return resultado;
};

// Export default com todas as funções
const CalculoEncargosCalculos = {
  calcularEncargosMensais,
  calcularFerias,
  calcularDecimoTerceiro,
  calcularRescisao,
  calcularCustoAnualFuncionario,
  calcularEncargosCompletos,
  formatarMoeda,
  formatarPercentual
};

export default CalculoEncargosCalculos;
