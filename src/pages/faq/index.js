import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { faqData } from '../../data/faqData';
import SEOHead from '../../components/SEO/SEOHead';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('geral');
  
  // Adicionar data-page ao body para CSS específico
  useEffect(() => {
    document.body.setAttribute('data-page', 'faq');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);
  const [activeQuestions, setActiveQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dados estruturados JSON-LD para a página de FAQ
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': Object.values(faqData)
        .flat()
        .slice(0, 50) // Limitando a 50 perguntas para evitar schemas muito grandes
        .map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'url': 'https://exclusivacontabilidade.com.br/faq/',
      'name': 'Perguntas Frequentes | Exclusiva Assessoria Contábil',
      'description': 'Encontre respostas para suas dúvidas sobre contabilidade, fiscal, trabalhista, MEI e mais.',
      'publisher': {
        '@type': 'Organization',
        'name': 'Exclusiva Contabilidade',
        'url': 'https://exclusivacontabilidade.com.br',
        'logo': 'https://exclusivacontabilidade.com.br/images/logo.png'
      }
    }
  ];

  // Categorias disponíveis conforme identificado no site original
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

  const toggleQuestion = (questionId) => {
    setActiveQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Efeito para busca
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    const query = searchQuery.toLowerCase();
    const results = [];
    
    // Procurar em todas as categorias
    Object.entries(faqData).forEach(([categoryId, questions]) => {
      questions.forEach((item, index) => {
        if (
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        ) {
          results.push({
            categoryId,
            categoryName: categories.find(cat => cat.id === categoryId)?.name || categoryId,
            questionIndex: index,
            question: item.question,
            answer: item.answer,
            id: `${categoryId}-${index}`
          });
        }
      });
    });
    
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <Layout>
      <SEOHead
        title="Perguntas Frequentes | Exclusiva Assessoria Contábil em Campo Grande"
        description="Encontre respostas para suas dúvidas sobre contabilidade, fiscal, trabalhista, MEI e mais. Veja nossa seção de perguntas frequentes."
        keywords="FAQ contabilidade, perguntas contabilidade, dúvidas contábeis, MEI, Simples Nacional"
        canonical="https://exclusivacontabilidade.com.br/faq/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Perguntas Frequentes</li>
            </ol>
          </nav>
          <h1>Perguntas Frequentes</h1>
          <p>Encontre respostas para as perguntas mais comuns sobre nossos serviços e assuntos contábeis</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Central de Ajuda</span>
            <h2>O que você precisa saber</h2>
            <p>Tire suas dúvidas sobre contabilidade, fiscal, trabalhista e muito mais</p>
          </div>

          <div className="content-card mb-4">
            <div className="faq-search">
              <input 
                type="text" 
                placeholder="Buscar perguntas..." 
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="btn-pattern btn-outline">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="content-card">
                <h3>Categorias</h3>
                <ul className="faq-category-list">
                  {categories.map(category => (
                    <li 
                      key={category.id}
                      className={activeCategory === category.id && !isSearching ? 'active' : ''}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setSearchQuery('');
                      }}
                    >
                      <i className="fas fa-chevron-right"></i>
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="content-card mt-4">
                <div className="faq-contact-info">
                  <div className="icon-pattern mx-auto mb-3">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <h4>Ainda tem dúvidas?</h4>
                  <p>Entre em contato conosco para atendimento personalizado.</p>
                  <Link href="/contato" className="btn-pattern btn-primary">
                    <i className="fas fa-comments me-2"></i>
                    Fale Conosco
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              {!isSearching ? (
                <div className="content-card">
                  <div className="section-header-pattern">
                    <span className="section-subtitle">Categoria</span>
                    <h3>{categories.find(cat => cat.id === activeCategory)?.name}</h3>
                  </div>
                  {(faqData[activeCategory] || []).map((item, index) => (
                    <div className="faq-item" key={`${activeCategory}-${index}`}>
                      <div 
                        className={`faq-question ${activeQuestions[`${activeCategory}-${index}`] ? 'active' : ''}`}
                        onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
                      >
                        <i className="fas fa-chevron-down"></i>
                        {item.question}
                      </div>
                      <div className={`faq-answer ${activeQuestions[`${activeCategory}-${index}`] ? 'active' : ''}`}>
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="content-card">
                  <div className="section-header-pattern">
                    <span className="section-subtitle">Busca</span>
                    <h3>Resultados encontrados: {searchResults.length}</h3>
                  </div>
                  
                  {searchResults.length === 0 ? (
                    <div className="no-results text-center">
                      <div className="icon-pattern mx-auto mb-3">
                        <i className="fas fa-search"></i>
                      </div>
                      <p>Nenhum resultado encontrado para "{searchQuery}".</p>
                      <p>Tente buscar com outras palavras-chave.</p>
                    </div>
                  ) : (
                    searchResults.map((result) => (
                      <div className="faq-item" key={result.id}>
                        <div 
                          className={`faq-question ${activeQuestions[result.id] ? 'active' : ''}`}
                          onClick={() => toggleQuestion(result.id)}
                        >
                          <span className="faq-category-badge">{result.categoryName}</span>
                          <i className="fas fa-chevron-down"></i>
                          {result.question}
                        </div>
                        <div className={`faq-answer ${activeQuestions[result.id] ? 'active' : ''}`}>
                          {result.answer}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Não encontrou sua resposta?</h2>
              <p>Nossa equipe está pronta para esclarecer todas as suas dúvidas sobre contabilidade.</p>
              <div className="cta-buttons">
                <Link href="/contato" className="btn-pattern btn-primary me-3">
                  <i className="fas fa-envelope me-2"></i>
                  Enviar Mensagem
                </Link>
                <a 
                  href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20tenho%20uma%20dúvida%20sobre%20contabilidade!" 
                  className="btn-pattern btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data já foi adicionado via SEOHead */}
    </Layout>
  );
}
