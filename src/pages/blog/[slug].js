import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Dados de exemplo para os posts do blog
const blogPosts = [
  {
    id: 1,
    title: 'Principais mudanças fiscais para 2023',
    content: `
      <p>As mudanças fiscais para 2023 trazem importantes atualizações que impactam empresas de todos os portes. Estar atualizado é fundamental para garantir a conformidade fiscal e evitar problemas com o fisco.</p>
      
      <h2>Novas alíquotas e obrigações acessórias</h2>
      <p>Entre as principais mudanças estão as novas alíquotas de impostos federais e estaduais, bem como atualizações nas obrigações acessórias. A Receita Federal tem intensificado a fiscalização digital, utilizando cruzamento de dados para identificar inconsistências nas declarações fiscais.</p>
      
      <h2>Impactos para o Simples Nacional</h2>
      <p>Para empresas optantes pelo Simples Nacional, haverá alterações nos limites de faturamento e nas formas de apuração dos tributos. É importante que os empresários estejam atentos a essas mudanças para evitar desenquadramento do regime.</p>
      
      <h2>Novas regras para o MEI</h2>
      <p>Os Microempreendedores Individuais também serão afetados com novas regulamentações, incluindo mudanças nos limites de faturamento e nas obrigações declaratórias. O governo tem investido em sistemas de controle mais eficientes para monitorar o faturamento dos MEIs.</p>
      
      <h2>E-Social e obrigações trabalhistas</h2>
      <p>Na área trabalhista, as novas fases do E-Social trazem desafios adicionais para os departamentos de RH. A digitalização completa das obrigações trabalhistas exige sistemas atualizados e processos bem definidos nas empresas.</p>
      
      <h3>Como se preparar?</h3>
      <p>Para se adequar a estas mudanças, recomendamos:</p>
      <ul>
        <li>Atualização constante sobre as legislações</li>
        <li>Revisão dos processos internos</li>
        <li>Investimento em sistemas integrados</li>
        <li>Consultoria especializada para planejamento tributário</li>
        <li>Treinamento das equipes contábeis e fiscais</li>
      </ul>
      
      <p>Na Exclusiva Contabilidade, oferecemos suporte completo para que sua empresa se adapte a todas essas mudanças com tranquilidade e segurança. Conte com nossa equipe especializada para orientação personalizada sobre como essas alterações afetam especificamente o seu negócio.</p>
    `,
    excerpt: 'Confira as principais alterações na legislação fiscal para o ano de 2023 e como elas podem impactar o seu negócio.',
    date: '05/01/2023',
    author: 'Carlos Eduardo Silva',
    authorPosition: 'Contador e Diretor',
    authorImage: '/assets/images/team/contador1.jpg',
    image: '/assets/images/blog/post1.jpg',
    category: 'fiscal',
    slug: 'principais-mudancas-fiscais-2023',
    tags: ['Fiscal', 'Tributário', 'Legislação', 'Impostos', 'Planejamento']
  },
  {
    id: 2,
    title: 'Como otimizar a gestão financeira da sua empresa',
    content: `
      <p>A gestão financeira eficiente é um dos pilares fundamentais para o sucesso e longevidade de qualquer negócio. Em tempos de incerteza econômica, saber gerenciar os recursos financeiros pode ser a diferença entre prosperar ou enfrentar dificuldades.</p>
      
      <h2>Controle de fluxo de caixa</h2>
      <p>O fluxo de caixa é o coração financeiro da empresa. Manter um controle detalhado das entradas e saídas permite visualizar a saúde financeira do negócio em tempo real e tomar decisões baseadas em dados concretos. Recomendamos criar categorias claras de despesas e receitas, além de estabelecer um cronograma regular para análise dos resultados.</p>
      
      <h2>Separação entre finanças pessoais e empresariais</h2>
      <p>Um dos erros mais comuns entre pequenos empresários é misturar as finanças pessoais com as do negócio. Essa prática dificulta a visualização real da situação financeira da empresa e pode criar problemas fiscais. Mantenha contas bancárias separadas e estabeleça um pró-labore fixo para os sócios.</p>
      
      <h2>Gestão de custos e despesas</h2>
      <p>Identificar e classificar corretamente os custos fixos e variáveis permite encontrar oportunidades de economia e otimização. Alguns pontos importantes:</p>
      <ul>
        <li>Revise contratos com fornecedores regularmente</li>
        <li>Identifique gastos desnecessários</li>
        <li>Implemente metas de redução de despesas</li>
        <li>Invista em tecnologias que otimizem processos</li>
      </ul>
      
      <h2>Formação de preço adequada</h2>
      <p>Muitas empresas falham ao precificar seus produtos ou serviços, seja por desconhecer todos os custos envolvidos ou por não considerar fatores de mercado. Uma formação de preço adequada deve considerar:</p>
      <ul>
        <li>Custos diretos e indiretos</li>
        <li>Impostos incidentes</li>
        <li>Margem de lucro desejada</li>
        <li>Valor percebido pelo cliente</li>
        <li>Preços praticados pela concorrência</li>
      </ul>
      
      <h2>Indicadores financeiros</h2>
      <p>Estabeleça e acompanhe indicadores financeiros relevantes para seu negócio, como:</p>
      <ul>
        <li>Lucratividade</li>
        <li>Rentabilidade</li>
        <li>Ponto de equilíbrio</li>
        <li>Prazo médio de recebimento e pagamento</li>
        <li>Índice de inadimplência</li>
      </ul>
      
      <h3>A importância do planejamento financeiro</h3>
      <p>Por fim, desenvolva um planejamento financeiro de curto, médio e longo prazo. Definir metas claras e mensuráveis permite direcionar esforços e recursos para os objetivos estratégicos da empresa.</p>
      
      <p>Na Exclusiva Contabilidade, oferecemos consultoria especializada em gestão financeira para empresas de diversos portes e segmentos. Nossos profissionais podem ajudar a implementar sistemas eficientes de controle financeiro e desenvolver estratégias personalizadas para maximizar os resultados do seu negócio.</p>
    `,
    excerpt: 'Dicas práticas para melhorar o controle financeiro e aumentar a saúde fiscal da sua empresa em tempos desafiadores.',
    date: '18/02/2023',
    author: 'Ana Paula Ferreira',
    authorPosition: 'Contadora',
    authorImage: '/assets/images/team/contador2.jpg',
    image: '/assets/images/blog/post2.jpg',
    category: 'contabil',
    slug: 'como-otimizar-gestao-financeira-empresa',
    tags: ['Gestão Financeira', 'Fluxo de Caixa', 'Custos', 'Finanças', 'Contabilidade']
  }
];

// Função para buscar posts relacionados
const getRelatedPosts = (currentPostId, category) => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, 2);
};

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      // Simula busca do post pelo slug
      const foundPost = blogPosts.find(post => post.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(foundPost.id, foundPost.category));
      }
      setIsLoading(false);
    }
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h2>Post não encontrado</h2>
                <p>O artigo que você está procurando não existe ou foi removido.</p>
                <Link href="/blog" className="btn btn-primary mt-3">
                  Voltar para o Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>{post.title} | Blog Exclusiva Contabilidade</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://exclusivacontabilidade.com.br/blog/${post.slug}/`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${post.title} | Blog Exclusiva Contabilidade`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://exclusivacontabilidade.com.br${post.image}`} />
        <meta property="og:url" content={`https://exclusivacontabilidade.com.br/blog/${post.slug}/`} />
        <meta property="og:type" content="article" />
      </Head>

      {/* Page Title */}
      <section className="page-title">
        <div className="container">
          <h1>{post.title}</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li>{post.title}</li>
          </ul>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="section-padding blog-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-post-content">
                <div className="post-meta">
                  <span className="post-date"><i className="far fa-calendar-alt"></i> {post.date}</span>
                  <span className="post-category"><i className="far fa-folder"></i> {post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                </div>
                
                <div className="post-image">
                  <img src={post.image} alt={post.title} className="img-fluid rounded" />
                </div>
                
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                
                <div className="post-tags">
                  <h4>Tags:</h4>
                  <div className="tag-list">
                    {post.tags.map((tag, index) => (
                      <Link href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`} key={index} className="tag">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="post-author">
                  <div className="author-image">
                    <img src={post.authorImage} alt={post.author} />
                  </div>
                  <div className="author-info">
                    <h4>{post.author}</h4>
                    <p className="author-position">{post.authorPosition}</p>
                    <p>Especialista em contabilidade e finanças, com vasta experiência em consultoria empresarial e planejamento tributário para pequenas e médias empresas.</p>
                  </div>
                </div>
                
                <div className="post-navigation">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="prev-post">
                        <span>Post Anterior</span>
                        <Link href="/blog/como-planejar-ano-fiscal-empresa">Como planejar o ano fiscal da sua empresa</Link>
                      </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="next-post">
                        <span>Próximo Post</span>
                        <Link href="/blog/dicas-declaracao-imposto-renda">Dicas para declaração de Imposto de Renda</Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="post-comments">
                  <h3>Comentários (3)</h3>
                  
                  <div className="comment-list">
                    <div className="comment-item">
                      <div className="comment-avatar">
                        <img src="/assets/images/blog/user1.jpg" alt="Usuário do blog" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <h4>Roberto Almeida</h4>
                          <span>10/01/2023 às 14:35</span>
                        </div>
                        <p>Excelente artigo! As informações sobre as mudanças fiscais me ajudaram muito a entender como minha empresa será impactada. Obrigado pelo conteúdo.</p>
                        <button className="reply-btn">Responder</button>
                      </div>
                    </div>
                    
                    <div className="comment-item">
                      <div className="comment-avatar">
                        <img src="/assets/images/blog/user2.jpg" alt="Usuário do blog" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.svg'; }} />
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <h4>Mariana Santos</h4>
                          <span>12/01/2023 às 09:22</span>
                        </div>
                        <p>Vocês poderiam detalhar um pouco mais sobre as mudanças específicas para o setor de serviços? Tenho uma empresa de consultoria e gostaria de me preparar melhor.</p>
                        <button className="reply-btn">Responder</button>
                      </div>
                    </div>
                    
                    <div className="comment-item reply">
                      <div className="comment-avatar">
                        <img src={post.authorImage} alt={post.author} />
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <h4>{post.author}</h4>
                          <span>12/01/2023 às 11:45</span>
                        </div>
                        <p>Olá Mariana! Obrigado pelo seu comentário. Vamos publicar um artigo específico sobre o impacto das mudanças fiscais para o setor de serviços na próxima semana. Enquanto isso, você pode agendar uma consultoria gratuita com nossa equipe para analisarmos o caso específico da sua empresa.</p>
                        <button className="reply-btn">Responder</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="comment-form">
                    <h3>Deixe seu comentário</h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Nome*</label>
                            <input type="text" id="name" className="form-control" required />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">E-mail*</label>
                            <input type="email" id="email" className="form-control" required />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="comment">Comentário*</label>
                        <textarea id="comment" rows="5" className="form-control" required></textarea>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" id="save-info" className="form-check-input" />
                        <label htmlFor="save-info" className="form-check-label">Salvar meus dados para próximos comentários</label>
                      </div>
                      <button type="submit" className="btn btn-primary">Enviar Comentário</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar-widget">
                  <div className="search-form">
                    <input type="text" placeholder="Buscar no blog..." className="form-control" />
                    <button type="submit" className="search-btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h3 className="widget-title">Categorias</h3>
                  <ul className="category-list">
                    <li>Contabilidade <span className="count">5</span></li>
                    <li>Fiscal e Tributário <span className="count">7</span></li>
                    <li>Trabalhista <span className="count">4</span></li>
                    <li>MEI <span className="count">6</span></li>
                    <li>Simples Nacional <span className="count">3</span></li>
                    <li>Notícias <span className="count">8</span></li>
                  </ul>
                </div>

                <div className="sidebar-widget">
                  <h3 className="widget-title">Posts Relacionados</h3>
                  <div className="related-posts">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map(relatedPost => (
                        <div key={relatedPost.id} className="related-post-item">
                          <div className="related-post-image">
                            <Link href={`/blog/${relatedPost.slug}`}>
                              <img src={relatedPost.image} alt={relatedPost.title} />
                            </Link>
                          </div>
                          <div className="related-post-content">
                            <h4>
                              <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                            </h4>
                            <span className="date"><i className="far fa-calendar-alt"></i> {relatedPost.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Nenhum post relacionado encontrado.</p>
                    )}
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h3 className="widget-title">Tags</h3>
                  <div className="tag-cloud">
                    {post.tags.map((tag, index) => (
                      <Link href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`} key={index} className="tag">
                        {tag}
                      </Link>
                    ))}
                    <Link href="/blog/categoria/contabilidade" className="tag">Contabilidade</Link>
                    <Link href="/blog/categoria/impostos" className="tag">Impostos</Link>
                    <Link href="/blog/categoria/mei" className="tag">MEI</Link>
                    <Link href="/blog/categoria/esocial" className="tag">E-Social</Link>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <div className="newsletter-box">
                    <h4>Inscreva-se em nossa Newsletter</h4>
                    <p>Receba as últimas novidades e atualizações contábeis diretamente no seu e-mail.</p>
                    <form className="newsletter-form">
                      <input type="email" placeholder="Seu e-mail" className="form-control" required />
                      <button type="submit" className="btn btn-primary">Inscrever</button>
                    </form>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <div className="cta-widget">
                    <h4>Precisa de ajuda com contabilidade?</h4>
                    <p>Entre em contato conosco para uma consultoria gratuita.</p>
                    <Link href="/contato" className="btn btn-primary btn-block">Fale Conosco</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-bg-primary cta-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Gostou do nosso conteúdo?</h2>
              <p>Agende uma consultoria gratuita com nossos especialistas e descubra como podemos ajudar seu negócio.</p>
              <Link href="/contato" className="btn btn-light btn-large">
                Agendar Consultoria
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Pré-renderiza as páginas para cada post
  const paths = blogPosts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Busca os dados do post pelo slug
  const post = blogPosts.find(post => post.slug === params.slug);
  
  // Se o post não existir, retorna notFound
  if (!post) {
    return {
      notFound: true,
    };
  }

  // Busca posts relacionados
  const relatedPosts = getRelatedPosts(post.id, post.category);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}
