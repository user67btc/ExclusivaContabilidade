/**
 * Utilitários de SEO para as ferramentas interativas
 * Contém funções para gerar dados estruturados JSON-LD e outras configurações de SEO
 */

/**
 * Gera dados estruturados JSON-LD básicos para o site
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getSiteJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Exclusiva Contabilidade',
    url: 'https://exclusivacontabilidade.com.br',
    logo: 'https://exclusivacontabilidade.com.br/images/logo.png',
    sameAs: [
      'https://www.facebook.com/exclusivacontabilidade',
      'https://www.instagram.com/exclusivacontabilidade',
      'https://www.linkedin.com/company/exclusiva-contabilidade'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-3456-7890',
      contactType: 'customer service',
      availableLanguage: 'Portuguese'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Paulista, 1000',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01310-100',
      addressCountry: 'BR'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para a calculadora de impostos
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getCalculadoraImpostosJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora de Impostos',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Simule os impostos da sua empresa com base no faturamento e regime tributário. Ferramenta gratuita online.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para o simulador de parcelamento
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getSimuladorParcelamentoJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Simulador de Parcelamento de Dívidas Tributárias',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Simule condições de parcelamento de dívidas tributárias com redução de multa e juros. Ferramenta online gratuita.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para o calendário fiscal
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getCalendarioFiscalJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calendário Fiscal',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Calendário fiscal atualizado com prazos e datas importantes de obrigações tributárias, fiscais e trabalhistas.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para o simulador de regimes tributários
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getSimuladorRegimesJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Simulador de Regimes Tributários',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Compare os diferentes regimes tributários (Simples Nacional, Lucro Presumido e Lucro Real) e descubra qual é o mais vantajoso para sua empresa.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para o cálculo de encargos trabalhistas
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getCalculoEncargosJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora de Encargos Trabalhistas',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Calcule encargos trabalhistas, férias, 13º salário e rescisões com precisão. Ferramenta online para empresas e departamentos de RH.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera dados estruturados JSON-LD para a consulta de CNPJ
 * @returns {Object} Objeto com dados estruturados JSON-LD
 */
export const getConsultaCnpjJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Consulta de CNPJ',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    operatingSystem: 'Web',
    description: 'Consulte dados cadastrais de empresas diretamente na Receita Federal. Acesse informações sobre situação cadastral, endereço e sócios.',
    author: {
      '@type': 'Organization',
      name: 'Exclusiva Contabilidade'
    }
  };
};

/**
 * Gera meta tags para palavras-chave para ferramentas específicas
 * @param {string} toolName - Nome da ferramenta
 * @returns {Array} Array com palavras-chave
 */
export const getToolKeywords = (toolName) => {
  const keywordsByTool = {
    'calculadora-impostos': [
      'calculadora de impostos', 'simular impostos', 'cálculo de tributos', 
      'impostos empresa', 'simulador tributário', 'calcular impostos empresa',
      'ferramenta fiscal', 'cálculo fiscal', 'cálculo de impostos online'
    ],
    'simulador-parcelamento': [
      'simulador de parcelamento', 'parcelamento de dívidas', 'parcelamento tributário',
      'negociação de dívidas', 'renegociação fiscal', 'parcelamento Receita Federal',
      'simular parcelamento impostos', 'refinanciamento dívidas fiscais'
    ],
    'calendario-fiscal': [
      'calendário fiscal', 'obrigações fiscais', 'datas tributárias',
      'prazos fiscais', 'cronograma fiscal', 'agenda tributária',
      'obrigações mensais', 'vencimentos tributários'
    ],
    'simulador-regimes': [
      'simulador regimes tributários', 'comparativo simples nacional',
      'lucro presumido vs lucro real', 'melhor regime tributário',
      'comparação tributária', 'escolha regime tributário',
      'economia fiscal', 'planejamento tributário'
    ],
    'calculo-encargos': [
      'cálculo encargos trabalhistas', 'custo funcionário',
      'férias e 13º salário', 'rescisão contrato', 'folha de pagamento',
      'encargos trabalhistas', 'inss e fgts', 'custo empregado'
    ],
    'consulta-cnpj': [
      'consulta CNPJ', 'verificar empresa', 'dados cadastrais',
      'situação cadastral', 'consulta Receita Federal', 'verificação CNPJ',
      'informações empresariais', 'consultar empresa'
    ]
  };
  
  return keywordsByTool[toolName] || [];
};

/**
 * Gera descrições SEO otimizadas para ferramentas específicas
 * @param {string} toolName - Nome da ferramenta
 * @returns {string} Descrição otimizada para SEO
 */
export const getToolDescription = (toolName) => {
  const descriptionsByTool = {
    'calculadora-impostos': 'Calcule os impostos da sua empresa gratuitamente. Simule tributos como IRPJ, CSLL, PIS, COFINS e outros conforme seu regime tributário. Ferramenta online gratuita da Exclusiva Contabilidade.',
    'simulador-parcelamento': 'Simule o parcelamento de dívidas tributárias com esta ferramenta gratuita. Calcule juros, descontos e parcelas para débitos federais, estaduais e municipais. Consulte condições personalizadas.',
    'calendario-fiscal': 'Calendário fiscal completo com todas as datas de vencimento de tributos federais, estaduais e municipais. Nunca perca um prazo e evite multas. Consulte online e gratuitamente.',
    'simulador-regimes': 'Compare Simples Nacional, Lucro Presumido e Lucro Real para escolher o regime tributário ideal para sua empresa. Economia fiscal garantida com esta simulação precisa e gratuita.',
    'calculo-encargos': 'Calcule todos os encargos trabalhistas da sua empresa: férias, 13º salário, FGTS, INSS e rescisões. Ferramenta online e gratuita para gestão precisa de recursos humanos.',
    'consulta-cnpj': 'Consulte dados cadastrais de qualquer empresa brasileira através do CNPJ. Verifique situação na Receita Federal, endereço, atividade econômica e quadro societário. Consulta gratuita.'
  };
  
  return descriptionsByTool[toolName] || '';
};

/**
 * Gera título otimizado para SEO para ferramentas específicas
 * @param {string} toolName - Nome da ferramenta
 * @returns {string} Título otimizado para SEO
 */
export const getToolTitle = (toolName) => {
  const titlesByTool = {
    'calculadora-impostos': 'Calculadora de Impostos Online | Simulador Tributário Gratuito',
    'simulador-parcelamento': 'Simulador de Parcelamento de Dívidas Tributárias | Cálculo Online',
    'calendario-fiscal': 'Calendário Fiscal 2025 | Datas e Prazos Tributários Atualizados',
    'simulador-regimes': 'Simulador de Regimes Tributários | Compare e Economize em Impostos',
    'calculo-encargos': 'Calculadora de Encargos Trabalhistas | Férias, 13º e Rescisões',
    'consulta-cnpj': 'Consulta de CNPJ | Verificação de Empresas na Receita Federal'
  };
  
  return titlesByTool[toolName] || '';
};
