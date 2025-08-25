import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faBriefcase, faFileAlt, faBook, faQuestionCircle, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: "Páginas Principais",
      icon: faHome,
      links: [
        { title: "Página Inicial", url: "/" },
        { title: "Sobre Nós", url: "/sobre" },
        { title: "Serviços", url: "/servicos" },
        { title: "Blog", url: "/blog" },
        { title: "FAQ", url: "/faq" },
        { title: "Contato", url: "/contato" }
      ]
    },
    {
      title: "Serviços",
      icon: faBriefcase,
      links: [
        { title: "Contabilidade", url: "/servicos#contabilidade" },
        { title: "Fiscal", url: "/servicos#fiscal" },
        { title: "Pessoal", url: "/servicos#pessoal" },
        { title: "Societário", url: "/servicos#societario" },
        { title: "Consultoria", url: "/servicos#consultoria" },
        { title: "MEI", url: "/servicos#mei" },
        { title: "Imposto de Renda", url: "/servicos#imposto-renda" },
        { title: "E-Social", url: "/servicos#esocial" }
      ]
    },
    {
      title: "Setores Atendidos",
      icon: faUserTie,
      links: [
        { title: "Prestadores de Serviços", url: "/setores/prestadores-servicos" },
        { title: "Comércio", url: "/setores/comercio" },
        { title: "E-Social Doméstico", url: "/setores/esocial-domestico" },
        { title: "Índice de Setores", url: "/setores" }
      ]
    },
    {
      title: "FAQ por Categoria",
      icon: faQuestionCircle,
      links: [
        { title: "Informações Gerais", url: "/faq#geral" },
        { title: "Nossos Serviços", url: "/faq#servicos" },
        { title: "Contabilidade", url: "/faq#contabil" },
        { title: "Fiscal e Tributário", url: "/faq#fiscal" },
        { title: "Trabalhista", url: "/faq#trabalhista" },
        { title: "Simples Nacional", url: "/faq#simples-nacional" },
        { title: "MEI", url: "/faq#mei" },
        { title: "Imposto de Renda", url: "/faq#imposto-renda" },
        { title: "E-Social Doméstico", url: "/faq#esocial" }
      ]
    },
    {
      title: "Blog",
      icon: faBook,
      links: [
        { title: "Todos os Artigos", url: "/blog" },
        { title: "Fiscal e Tributário", url: "/blog?categoria=fiscal" },
        { title: "Contabilidade", url: "/blog?categoria=contabilidade" },
        { title: "Trabalhista", url: "/blog?categoria=trabalhista" },
        { title: "Finanças", url: "/blog?categoria=financas" },
        { title: "Notícias", url: "/blog?categoria=noticias" }
      ]
    },
    {
      title: "Informações Legais",
      icon: faFileAlt,
      links: [
        { title: "Termos de Uso", url: "/termos-de-uso" },
        { title: "Política de Privacidade", url: "/politica-privacidade" }
      ]
    },
    {
      title: "Contato",
      icon: faPhone,
      links: [
        { title: "Fale Conosco", url: "/contato" },
        { title: "Localização", url: "/contato#localizacao" },
        { title: "Trabalhe Conosco", url: "/contato#trabalhe-conosco" }
      ]
    },
    {
      title: "Sobre Nós",
      icon: faInfoCircle,
      links: [
        { title: "Nossa História", url: "/sobre#historia" },
        { title: "Missão, Visão e Valores", url: "/sobre#missao" },
        { title: "Equipe", url: "/sobre#equipe" },
        { title: "Depoimentos", url: "/sobre#depoimentos" }
      ]
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Mapa do Site | Exclusiva Contabilidade</title>
        <meta name="description" content="Mapa completo do site da Exclusiva Contabilidade. Encontre facilmente todas as páginas e serviços oferecidos por nossa assessoria contábil." />
        <link rel="canonical" href="https://exclusivacontabilidade.com.br/mapa-do-site/" />
      </Head>

      {/* Page Title */}
      <section className="page-title">
        <div className="container">
          <h1>Mapa do Site</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Mapa do Site</li>
          </ul>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="sitemap-intro text-center">
                <p>Bem-vindo ao Mapa do Site da Exclusiva Contabilidade. Utilize esta página para navegar facilmente por todas as seções do nosso site.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {sitemapSections.map((section, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <div className="card h-100">
                  <div className="card-header">
                    <h2 className="h4 mb-0">
                      <FontAwesomeIcon icon={section.icon} className="me-2" />
                      {section.title}
                    </h2>
                  </div>
                  <div className="card-body">
                    <ul className="sitemap-links">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.url}>
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XML Sitemap Notice */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <h2>XML Sitemap para Mecanismos de Busca</h2>
              <p>Se você é um robô de busca, também disponibilizamos um <Link href="/api/sitemap">sitemap XML</Link> para melhor indexação do conteúdo.</p>
              <p>Nossa estrutura de URL é organizada para facilitar tanto a navegação humana quanto o rastreamento por mecanismos de busca, seguindo as melhores práticas de SEO.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Não Encontrou o Que Procura?</h2>
              <p className="mb-4">Entre em contato com nossa equipe para tirar suas dúvidas ou solicitar informações adicionais.</p>
              <Link href="/contato" className="btn btn-primary">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://exclusivacontabilidade.com.br/",
            "name": "Exclusiva Contabilidade",
            "description": "Serviços contábeis especializados para empresas e pessoas físicas em Campo Grande-MS",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://exclusivacontabilidade.com.br/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Layout>
  );
}
