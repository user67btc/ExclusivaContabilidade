import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Componente SEOHead - Gerencia todas as tags meta, títulos e outros elementos de SEO
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da página
 * @param {string} props.description - Descrição da página
 * @param {string} props.canonicalUrl - URL canônica (opcional)
 * @param {string} props.ogImage - Imagem para compartilhamento em redes sociais (opcional)
 * @param {string} props.ogType - Tipo de conteúdo para Open Graph (opcional, padrão: website)
 * @param {Array} props.keywords - Palavras-chave para meta tags (opcional)
 * @param {boolean} props.indexPage - Se a página deve ser indexada (opcional, padrão: true)
 * @param {Object} props.jsonLd - Dados estruturados JSON-LD (opcional)
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  keywords,
  indexPage = true,
  jsonLd,
  children
}) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exclusivacontabilidade.com.br';
  const fullUrl = canonicalUrl ? canonicalUrl : `${siteUrl}${router.asPath}`;
  const ogImg = ogImage || `${siteUrl}/images/og-image.jpg`;
  const siteName = 'Exclusiva Contabilidade';
  
  // Título completo com o nome do site
  const fullTitle = `${title} | ${siteName}`;
  
  return (
    <Head>
      {/* Metadados básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && Array.isArray(keywords) && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots - Controle de indexação */}
      <meta 
        name="robots" 
        content={indexPage ? 'index, follow' : 'noindex, nofollow'} 
      />
      
      {/* Open Graph - Facebook, LinkedIn */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImg} />
      
      {/* Tags importantes para SEO mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* SEO Adicional */}
      <meta name="author" content="Exclusiva Contabilidade" />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR-MS" />
      <meta name="geo.placename" content="Campo Grande" />
      <meta name="geo.position" content="-20.4697;-54.6201" />
      <meta name="ICBM" content="-20.4697, -54.6201" />
      
      {/* Favicons e ícones */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch para recursos externos */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      
      {/* Dados estruturados JSON-LD para Rich Snippets */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      {/* Elementos adicionais de SEO passados como children */}
      {children}
    </Head>
  );
}
