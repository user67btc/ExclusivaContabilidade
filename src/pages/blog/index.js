import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Adicionar data-page ao body para CSS específico
  useEffect(() => {
    document.body.setAttribute('data-page', 'blog');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);
  
  // Categorias do blog
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'contabil', name: 'Contabilidade' },
    { id: 'fiscal', name: 'Fiscal e Tributário' },
    { id: 'trabalhista', name: 'Trabalhista' },
    { id: 'mei', name: 'MEI' },
    { id: 'simples', name: 'Simples Nacional' },
    { id: 'noticias', name: 'Notícias' }
  ];

  // Posts do blog (exemplo de dados)
  const posts = [
    {
      id: 1,
      title: 'Principais mudanças fiscais para 2023',
      excerpt: 'Confira as principais alterações na legislação fiscal para o ano de 2023 e como elas podem impactar o seu negócio.',
      date: '05/01/2023',
      author: 'Carlos Eduardo Silva',
      image: '/assets/images/blog/post1.jpg',
      category: 'fiscal',
      slug: 'principais-mudancas-fiscais-2023'
    },
    {
      id: 2,
      title: 'Como otimizar a gestão financeira da sua empresa',
      excerpt: 'Dicas práticas para melhorar o controle financeiro e aumentar a saúde fiscal da sua empresa em tempos desafiadores.',
      date: '18/02/2023',
      author: 'Ana Paula Ferreira',
      image: '/assets/images/blog/post2.jpg',
      category: 'contabil',
      slug: 'como-otimizar-gestao-financeira-empresa'
    },
    {
      id: 3,
      title: 'Guia completo sobre o E-Social para empregadores domésticos',
      excerpt: 'Tudo o que você precisa saber sobre o E-Social Doméstico: cadastro, obrigações, prazos e como evitar multas.',
      date: '25/03/2023',
      author: 'Ricardo Oliveira',
      image: '/assets/images/blog/post3.jpg',
      category: 'trabalhista',
      slug: 'guia-completo-esocial-empregadores-domesticos'
    },
    {
      id: 4,
      title: 'MEI: O que muda com o novo limite de faturamento',
      excerpt: 'Entenda as mudanças nos limites de faturamento para Microempreendedores Individuais e como se adequar às novas regras.',
      date: '10/04/2023',
      author: 'Juliana Martins',
      image: '/assets/images/blog/post4.jpg',
      category: 'mei',
      slug: 'mei-novo-limite-faturamento'
    },
    {
      id: 5,
      title: 'Simples Nacional: Como não ser excluído do regime',
      excerpt: 'Confira as principais causas de exclusão do Simples Nacional e saiba como evitar problemas com o fisco.',
      date: '22/05/2023',
      author: 'Carlos Eduardo Silva',
      image: '/assets/images/blog/post5.jpg',
      category: 'simples',
      slug: 'simples-nacional-como-nao-ser-excluido'
    },
    {
      id: 6,
      title: 'Reforma tributária: o que muda para o seu negócio',
      excerpt: 'Análise detalhada dos impactos da reforma tributária para diferentes setores e portes de empresas.',
      date: '14/06/2023',
      author: 'Ana Paula Ferreira',
      image: '/assets/images/blog/post6.jpg',
      category: 'fiscal',
      slug: 'reforma-tributaria-impactos-negocios'
    },
    {
      id: 7,
      title: 'Contratação CLT x PJ: vantagens e desvantagens',
      excerpt: 'Comparativo completo entre contratação CLT e Pessoa Jurídica: aspectos legais, custos e benefícios para ambas as partes.',
      date: '08/07/2023',
      author: 'Ricardo Oliveira',
      image: '/assets/images/blog/post7.jpg',
      category: 'trabalhista',
      slug: 'contratacao-clt-pj-vantagens-desvantagens'
    },
    {
      id: 8,
      title: 'Demonstrações contábeis obrigatórias: entenda cada uma',
      excerpt: 'Guia completo sobre as demonstrações contábeis obrigatórias para empresas: Balanço Patrimonial, DRE, DFC, DMPL e Notas Explicativas.',
      date: '19/08/2023',
      author: 'Juliana Martins',
      image: '/assets/images/blog/post8.jpg',
      category: 'contabil',
      slug: 'demonstracoes-contabeis-obrigatorias'
    },
    {
      id: 9,
      title: 'Receita Federal facilita regularização de débitos para MEI',
      excerpt: 'Nova portaria da Receita Federal traz condições especiais para regularização de débitos de Microempreendedores Individuais.',
      date: '05/09/2023',
      author: 'Carlos Eduardo Silva',
      image: '/assets/images/blog/post9.jpg',
      category: 'noticias',
      slug: 'receita-federal-facilita-regularizacao-debitos-mei'
    }
  ];

  // Filtrar posts por categoria
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  // Dados estruturados JSON-LD para a página de blog
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'Blog da Exclusiva Contabilidade',
      'description': 'Blog com artigos e notícias sobre contabilidade, fiscal, trabalhista, MEI e outros temas relevantes para empresários',
      'url': 'https://exclusivacontabilidade.com.br/blog/',
      'publisher': {
        '@type': 'Organization',
        'name': 'Exclusiva Contabilidade',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://exclusivacontabilidade.com.br/images/logo.png'
        }
      },
      'blogPost': posts.map(post => {
        // Converter data do formato DD/MM/YYYY para YYYY-MM-DD (ISO 8601)
        const dateParts = post.date.split('/');
        const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        
        return {
          '@type': 'BlogPosting',
          'headline': post.title,
          'description': post.excerpt,
          'author': {
            '@type': 'Person',
            'name': post.author
          },
          'datePublished': isoDate,
          'image': post.image,
          'url': `https://exclusivacontabilidade.com.br/blog/${post.slug}`,
          'publisher': {
            '@type': 'Organization',
            'name': 'Exclusiva Contabilidade',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://exclusivacontabilidade.com.br/images/logo.png'
            }
          }
        };
      })
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Blog de Contabilidade | Exclusiva Contabilidade"
        description="Blog da Exclusiva Contabilidade com artigos e notícias sobre contabilidade, fiscal, trabalhista, MEI e outros temas relevantes para empresários."
        keywords="blog contabilidade, artigos contábeis, notícias contábeis, MEI, Simples Nacional"
        canonical="https://exclusivacontabilidade.com.br/blog/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </nav>
          <h1>Blog da Exclusiva Contabilidade</h1>
          <p>Artigos, notícias e dicas especializadas sobre contabilidade, fiscal, trabalhista e gestão empresarial para manter você sempre atualizado.</p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-content">
                <div className="section-header-pattern">
                  <span className="section-subtitle">Conteúdo Especializado</span>
                  <h2>Artigos e Notícias</h2>
                  <p>Conteúdo relevante sobre contabilidade, fiscal, tributário e gestão empresarial</p>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="no-posts">
                    <p>Nenhum artigo encontrado nesta categoria. Em breve teremos novidades!</p>
                  </div>
                ) : (
                  <div className="row">
                    {filteredPosts.map(post => (
                      <div key={post.id} className="col-md-6 mb-4">
                        <div className="content-card">
                          <div className="blog-image">
                            <Link href={`/blog/${post.slug}`}>
                              <img src={post.image} alt={post.title} className="img-fluid" />
                            </Link>
                            <div className="blog-category">
                              <span>{categories.find(cat => cat.id === post.category)?.name}</span>
                            </div>
                          </div>
                          <div className="blog-content">
                            <div className="blog-meta">
                              <span><i className="far fa-calendar-alt"></i> {post.date}</span>
                              <span><i className="far fa-user"></i> {post.author}</span>
                            </div>
                            <h3 className="blog-title">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className="read-more">
                              Ler mais <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pagination-wrapper">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <span className="page-link"><i className="fas fa-chevron-left"></i></span>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <Link href="/blog?page=2" className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                      <Link href="/blog?page=3" className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                      <Link href="/blog?page=2" className="page-link"><i className="fas fa-chevron-right"></i></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="content-card">
                  <div className="search-form">
                    <input type="text" placeholder="Buscar no blog..." className="form-control" />
                    <button type="submit" className="search-btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>

                <div className="content-card">
                  <h3 className="widget-title">Categorias</h3>
                  <ul className="category-list">
                    {categories.map(category => (
                      <li 
                        key={category.id} 
                        className={activeCategory === category.id ? 'active' : ''}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                        <span className="count">
                          {category.id === 'all' 
                            ? posts.length 
                            : posts.filter(post => post.category === category.id).length}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="content-card">
                  <h3 className="widget-title">Posts Recentes</h3>
                  <div className="recent-posts">
                    {posts.slice(0, 4).map(post => (
                      <div key={post.id} className="recent-post-item">
                        <div className="recent-post-image">
                          <Link href={`/blog/${post.slug}`}>
                            <img src={post.image} alt={post.title} />
                          </Link>
                        </div>
                        <div className="recent-post-content">
                          <h4>
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <span className="date"><i className="far fa-calendar-alt"></i> {post.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-card">
                  <h3 className="widget-title">Tags</h3>
                  <div className="tag-cloud">
                    <Link href="/blog/categoria/contabilidade" className="tag">Contabilidade</Link>
                    <Link href="/blog/categoria/impostos" className="tag">Impostos</Link>
                    <Link href="/blog/categoria/mei" className="tag">MEI</Link>
                    <Link href="/blog/categoria/esocial" className="tag">E-Social</Link>
                    <Link href="/blog/categoria/simples-nacional" className="tag">Simples Nacional</Link>
                    <Link href="/blog/categoria/fiscal" className="tag">Fiscal</Link>
                    <Link href="/blog/categoria/trabalhista" className="tag">Trabalhista</Link>
                    <Link href="/blog/categoria/empresas" className="tag">Empresas</Link>
                    <Link href="/blog/categoria/folha-pagamento" className="tag">Folha de Pagamento</Link>
                    <Link href="/blog/categoria/reforma-tributaria" className="tag">Reforma Tributária</Link>
                  </div>
                </div>

                <div className="content-card">
                  <div className="newsletter-box">
                    <h4>Inscreva-se em nossa Newsletter</h4>
                    <p>Receba as últimas novidades e atualizações contábeis diretamente no seu e-mail.</p>
                    <form className="newsletter-form">
                      <input type="email" placeholder="Seu e-mail" className="form-control" required />
                      <button type="submit" className="btn-pattern btn-primary">Inscrever</button>
                    </form>
                  </div>
                </div>

                <div className="content-card">
                  <div className="cta-widget">
                    <h4>Precisa de ajuda com contabilidade?</h4>
                    <p>Entre em contato conosco para uma consultoria gratuita.</p>
                    <Link href="/contato" className="btn-pattern btn-primary">Fale Conosco</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Tem dúvidas sobre contabilidade?</h2>
              <p>Nossos especialistas estão prontos para ajudar com as melhores soluções para o seu negócio.</p>
              <Link href="/contato" className="btn-pattern btn-primary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
