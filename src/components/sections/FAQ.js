import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { faqData } from '../../data/faqData';

// Função para determinar o ícone da categoria
const getCategoryIcon = (categoryId) => {
  const iconMap = {
    'geral': 'info-circle',
    'servicos': 'briefcase',
    'contabil': 'calculator',
    'fiscal': 'file',
    'trabalhista': 'user',
    'simples-nacional': 'percent',
    'mei': 'store',
    'imposto-renda': 'file-invoice',
    'esocial': 'home'
  };
  return iconMap[categoryId] || 'question-circle';
};

// Função para destacar termos de busca
const highlightSearchTerm = (text, term) => {
  if (!term || term.length < 3) return text;
  
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
};

export default function FAQ({ previewMode = false }) {
  const [activeCategory, setActiveCategory] = useState('geral');
  const [activeQuestions, setActiveQuestions] = useState({});
  const [currentCategoryData, setCurrentCategoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Carrega apenas os dados da categoria ativa para melhor performance
  useEffect(() => {
    setCurrentCategoryData(faqData[activeCategory] || []);
    setSearchTerm('');
    setSearchResults([]);
  }, [activeCategory]);
  
  // Processa a busca quando o termo de busca muda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    
    // Busca em todas as categorias se o termo tiver mais de 3 caracteres
    if (term.length >= 3) {
      const results = [];
      
      // Busca em todas as categorias
      Object.entries(faqData).forEach(([category, questions]) => {
        questions.forEach((item, index) => {
          if (item.question.toLowerCase().includes(term) || 
              item.answer.toLowerCase().includes(term)) {
            results.push({
              ...item,
              category,
              id: `${category}-${index}`
            });
          }
        });
      });
      
      setSearchResults(results);
    } else {
      // Se o termo for curto, busca apenas na categoria atual
      const results = currentCategoryData.filter((item, index) => 
        item.question.toLowerCase().includes(term) || 
        item.answer.toLowerCase().includes(term)
      ).map((item, index) => ({
        ...item,
        category: activeCategory,
        id: `${activeCategory}-${index}`
      }));
      
      setSearchResults(results);
    }
  }, [searchTerm, currentCategoryData, activeCategory]);
  
  // Limitar perguntas para preview na página inicial
  const questionsToShow = previewMode ? 3 : 999;
  
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
    { id: 'esocial', name: 'E-Social Doméstico' }
  ];

  const toggleQuestion = (questionId) => {
    // Animação suave para a questão clicada
    setActiveQuestions((prev) => {
      const newState = {
        ...prev,
        [questionId]: !prev[questionId]
      };
      
      // Se estiver abrindo uma questão e não estiver no modo preview,
      // feche outras questões para manter uma boa experiência de usuário
      if (newState[questionId] && !previewMode) {
        Object.keys(newState).forEach(key => {
          if (key !== questionId) {
            newState[key] = false;
          }
        });
      }
      
      return newState;
    });
  };

  const searchInputRef = useRef(null);
  
  const focusSearch = () => {
    if (searchInputRef.current && !previewMode) {
      searchInputRef.current.focus();
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-background-elements">
        <div className="faq-shape faq-shape-1"></div>
        <div className="faq-shape faq-shape-2"></div>
        <div className="faq-shape faq-shape-3"></div>
      </div>
      <div className="container">
        {!previewMode && (
          <div className="section-header text-center">
            <span className="section-subtitle" style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem', display: 'block'}}>Dúvidas Frequentes</span>
            <h2 className="section-title page-title">Perguntas e Respostas</h2>
            <p className="section-description" style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem'}}>Encontre respostas para as principais dúvidas sobre nossos serviços contábeis</p>
          </div>
        )}
        {!previewMode && (
          <div className="row">
            <div className="col-lg-4">
              <div className="faq-categories-container">
                <div className="faq-illustration">
                  <Image
                    src="/assets/images/faq-illustration.svg"
                    width={200}
                    height={120}
                    alt="Tire suas dúvidas conosco"
                  />
                </div>
                <div className="faq-categories">
                  <h3>Categorias</h3>
                  <ul className="faq-category-list">
                    {categories.map(category => (
                      <li 
                        key={category.id}
                        className={activeCategory === category.id ? 'active' : ''}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span className="category-icon">
                          <i className={`fas fa-${getCategoryIcon(category.id)}`}></i>
                        </span>
                        <span className="category-name">{category.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              <div className="faq-search-container">
                <div className="faq-search mb-4">
                  <div className="search-icon">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </div>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Buscar perguntas..." 
                    className="form-control search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="search-clear-btn" 
                      onClick={() => setSearchTerm('')}
                      aria-label="Limpar pesquisa"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
                <button 
                  type="button" 
                  className="btn btn-light search-faq-btn"
                  onClick={focusSearch}
                  aria-label="Buscar perguntas e respostas"
                >
                  <i className="fas fa-search" aria-hidden="true"></i> Buscar respostas
                </button>
              </div>
              
              <div className="faq-content">
                {searchResults && searchResults.length > 0 ? (
                  <>
                    <div className="search-results-header">
                      <p><i className="fas fa-search"></i> Resultados para <strong>"{searchTerm}"</strong> <span className="result-count">({searchResults.length})</span></p>
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={() => setSearchTerm('')}
                      >
                        <i className="fas fa-times"></i> Limpar
                      </button>
                    </div>
                    
                    <div className="faq-search-results">
                      {searchResults.map((item) => (
                        <div className="faq-item" key={item.id}>
                          <div 
                            className={`faq-question ${activeQuestions[item.id] ? 'active' : ''}`}
                            onClick={() => toggleQuestion(item.id)}
                          >
                            <div className="question-content">
                              <span className="question-icon"><i className="fas fa-question-circle" aria-hidden="true"></i></span>
                              <span>{item.question}</span>
                            </div>
                            <div className="question-toggle">
                              <i className={`fas fa-chevron-${activeQuestions[item.id] ? 'up' : 'down'}`}></i>
                            </div>
                            <span className="search-category-badge">
                              <i className={`fas fa-${getCategoryIcon(item.category)}`} aria-hidden="true"></i>
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                          <div className={`faq-answer ${activeQuestions[item.id] ? 'active' : ''}`}>
                            <div className="answer-content">
                              <span className="answer-icon"><i className="fas fa-info-circle" aria-hidden="true"></i></span>
                              <div dangerouslySetInnerHTML={{__html: highlightSearchTerm(item.answer, searchTerm)}} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="faq-category-content">
                    {searchTerm && searchTerm.length > 0 ? (
                      <div className="faq-no-results">
                        <div className="no-results-icon">
                          <i className="fas fa-search"></i>
                        </div>
                        <h4>Nenhum resultado encontrado</h4>
                        <p>Não encontramos resultados para <strong>"{searchTerm}"</strong></p>
                        <button 
                          className="btn btn-outline-primary mt-3" 
                          onClick={() => setSearchTerm('')}
                        >
                          <i className="fas fa-arrow-left"></i> Voltar para as perguntas
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="category-header">
                          <h3>
                            <i className={`fas fa-${getCategoryIcon(activeCategory)}`}></i>
                            {categories.find(cat => cat.id === activeCategory)?.name}
                          </h3>
                          <span className="question-count">{currentCategoryData.length} perguntas</span>
                        </div>
                        {currentCategoryData.slice(0, questionsToShow).map((item, index) => (
                          <div className="faq-item" key={`${activeCategory}-${index}`}>
                            <div 
                              className={`faq-question ${activeQuestions[`${activeCategory}-${index}`] ? 'active' : ''}`}
                              onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
                            >
                              <div className="question-content">
                                <span className="question-icon"><i className="fas fa-question-circle" aria-hidden="true"></i></span>
                                <span>{item.question}</span>
                              </div>
                              <div className="question-toggle">
                                <i className={`fas fa-chevron-${activeQuestions[`${activeCategory}-${index}`] ? 'up' : 'down'}`}></i>
                              </div>
                            </div>
                            <div className={`faq-answer ${activeQuestions[`${activeCategory}-${index}`] ? 'active' : ''}`}>
                              <div className="answer-content">
                                <span className="answer-icon"><i className="fas fa-info-circle" aria-hidden="true"></i></span>
                                <div dangerouslySetInnerHTML={{__html: item.answer}} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {previewMode && (
          <div className="faq-preview">
            <div className="row">
              <div className="col-lg-12">
                <div className="faq-content preview-faq-content">
                  {/* Perguntas populares de diferentes categorias */}
                  {[
                    { category: 'geral', index: 0 },
                    { category: 'mei', index: 0 },
                    { category: 'imposto-renda', index: 0 }
                  ].map((item, idx) => {
                    const faq = faqData[item.category]?.[item.index];
                    if (!faq) return null;
                    
                    return (
                      <div className="faq-item" key={idx}>
                        <div 
                          className={`faq-question ${activeQuestions[`preview-${idx}`] ? 'active' : ''}`}
                          onClick={() => toggleQuestion(`preview-${idx}`)}
                        >
                          <div className="question-content">
                            <span className="question-icon">
                              <i className={`fas fa-${getCategoryIcon(item.category)}`} aria-hidden="true"></i>
                            </span>
                            <span>{faq.question}</span>
                          </div>
                          <div className="question-toggle">
                            <i className={`fas fa-chevron-${activeQuestions[`preview-${idx}`] ? 'up' : 'down'}`}></i>
                          </div>
                        </div>
                        <div className={`faq-answer ${activeQuestions[`preview-${idx}`] ? 'active' : ''}`}>
                          <div className="answer-content">
                            <span className="answer-icon"><i className="fas fa-info-circle" aria-hidden="true"></i></span>
                            <div dangerouslySetInnerHTML={{__html: faq.answer}} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-center mt-4">
                  <Link href="/faq" className="btn btn-primary btn-with-icon" aria-label="Ver página completa de perguntas frequentes">
                    <i className="fas fa-question-circle" aria-hidden="true"></i> Ver todas as perguntas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
