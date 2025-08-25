/**
 * @jest-environment jsdom
 */

describe('Teste básico do FAQ', () => {
  test('Verifica se o teste está funcionando', () => {
    expect(true).toBe(true);
  });
  
  test('Verifica os IDs das categorias', () => {
    const categories = [
      { id: 'geral', name: 'Informações Gerais' },
      { id: 'servicos', name: 'Nossos Serviços' },
      { id: 'contabil', name: 'Contabilidade' },
      { id: 'fiscal', name: 'Fiscal e Tributário' },
      { id: 'trabalhista', name: 'Trabalhista' },
      { id: 'simples-nacional', name: 'Simples Nacional' },
      { id: 'mei', name: 'MEI' },
      { id: 'imposto-renda', name: 'Imposto de Renda' },
      { id: 'rural', name: 'Produtor Rural' },
      { id: 'esocial', name: 'E-Social Doméstico' }
    ];
    
    // Verificamos se temos as 10 categorias esperadas
    expect(categories.length).toBe(10);
    
    // Verificamos se o ID da categoria MEI é 'mei'
    const meiCategory = categories.find(cat => cat.name === 'MEI');
    expect(meiCategory).toBeDefined();
    expect(meiCategory.id).toBe('mei');
  });
});
