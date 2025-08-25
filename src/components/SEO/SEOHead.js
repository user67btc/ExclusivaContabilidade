import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Componente SEOHead para gerenciar meta tags e SEO
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da página
 * @param {string} props.description - Descrição da página
 * @param {string} props.keywords - Palavras-chave separadas por vírgula
 * @param {string} props.url - URL canônica da página
 * @param {string} props.imageUrl - URL da imagem para compartilhamento (Open Graph)
 * @param {string} props.ogType - Tipo de conteúdo Open Graph (website, article, etc)
 * @param {Array|Object} props.schemaData - Dados para Schema.org (pode ser um objeto único ou array de objetos)
 * @param {string} props.lang - Idioma da página
 * @param {boolean} props.noindex - Se a página não deve ser indexada
 * @param {string} props.publishedAt - Data de publicação (para artigos)
 * @param {string} props.updatedAt - Data de atualização (para artigos)
 */
const SEOHead = ({
  title = 'Exclusiva Assessoria Contábil em Campo Grande | Contabilidade Especializada',
  description = 'A Exclusiva Contabilidade oferece serviços contábeis especializados para empresas, prestadores de serviços, comércio e e-social doméstico em Campo Grande - MS.',
  keywords = 'contabilidade campo grande, assessoria contábil, serviços fiscais, imposto de renda, e-social, contabilidade digital',
  url = '',
  imageUrl = '/images/sharing-image.jpg',
  ogType = 'website',
  schemaData = null,
  lang = 'pt-BR',
  noindex = false,
  publishedAt = '',
  updatedAt = ''
}) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const baseUrl = 'https://exclusivacontabilidade.com.br';
  
  // Determina URL canônica
  const canonicalUrl = url || `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
  
  // Verifica se a imagem OG começa com http, se não, adiciona o baseUrl
  const fullOgImage = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  return (
    <>
      <Head>
        {/* Meta tags básicas */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta charSet="UTF-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="language" content={lang} />
        <meta httpEquiv="content-language" content={lang} />
        <meta name="rating" content="general" />
        
        {/* Mobile meta tags */}
        <meta name="theme-color" content="#00407a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Exclusiva Contabilidade" />
        
        {/* Robots meta tags */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        )}
        
        {/* Meta tags canônicas */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Exclusiva Contabilidade" />
        <meta property="og:locale" content="pt_BR" />
        {publishedAt && <meta property="article:published_time" content={publishedAt} />}
        {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />
        
        {/* Favicon e ícones */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="BR-MS" />
        <meta name="geo.placename" content="Campo Grande" />
        <meta name="geo.position" content="-20.4435;-54.6478" />
        <meta name="ICBM" content="-20.4435, -54.6478" />
      </Head>
      
      {/* Schema.org JSON-LD */}
      {schemaData && Array.isArray(schemaData) ? (
        // Se for um array de schemas, renderiza cada um
        schemaData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))
      ) : schemaData ? (
        // Se for um único objeto schema
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      ) : (
        // Schema padrão da empresa
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            "name": "Exclusiva Contabilidade",
            "description": "Soluções contábeis personalizadas para empresas, prestadores de serviços e comércio em Campo Grande - MS",
            "url": baseUrl,
            "logo": `${baseUrl}/images/logo.png`,
            "image": `${baseUrl}/images/sharing-image.jpg`,
            "telephone": "+5567999846350",
            "email": "contato@exclusivacontabilidade.com.br",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Marquês de Pombal, nº 112",
              "addressLocality": "Campo Grande",
              "addressRegion": "MS",
              "postalCode": "79002-160",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-20.4435",
              "longitude": "-54.6478"
            },
            "openingHours": "Mo,Tu,We,Th,Fr 08:00-18:00",
            "sameAs": [
              "https://www.facebook.com/exclusivacontabilidade",
              "https://www.instagram.com/exclusivacontabilidade/",
              "https://www.linkedin.com/company/exclusiva-contabilidade/"
            ]
          }) }}
        />
      )}
    </>
  );
};

export default SEOHead;
