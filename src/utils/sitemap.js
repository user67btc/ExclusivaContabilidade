/**
 * Configuração e geração do sitemap.xml
 * Inclui todas as páginas e ferramentas do site
 */

const fs = require('fs');
const path = require('path');

// URLs base do site
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://exclusivacontabilidade.com.br';

// Páginas estáticas principais
const staticPages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString()
  },
  {
    url: '/sobre',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/servicos',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString()
  },
  {
    url: '/contato',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString()
  }
];

// Páginas das ferramentas
const toolPages = [
  {
    url: '/ferramentas/calculadora-impostos',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas/simulador-parcelamento',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas/calendario-fiscal',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas/simulador-regimes',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas/calculo-encargos',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/ferramentas/consulta-cnpj',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  }
];

/**
 * Gera o conteúdo XML do sitemap
 * @returns {string} Conteúdo XML do sitemap
 */
function generateSitemapXML() {
  const allPages = [...staticPages, ...toolPages];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  allPages.forEach(page => {
    xml += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

/**
 * Gera o arquivo robots.txt
 * @returns {string} Conteúdo do robots.txt
 */
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /_next/
Disallow: /api/

# Allow important pages
Allow: /ferramentas/
Allow: /servicos/
Allow: /sobre/
Allow: /contato/`;
}

/**
 * Salva o sitemap.xml no diretório public
 */
function saveSitemap() {
  const sitemapContent = generateSitemapXML();
  const publicDir = path.join(process.cwd(), 'public');
  
  // Criar diretório public se não existir
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Salvar sitemap.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('✅ Sitemap.xml gerado com sucesso!');
  
  // Salvar robots.txt
  const robotsContent = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  console.log('✅ Robots.txt gerado com sucesso!');
}

/**
 * Função para ser executada via script
 */
if (require.main === module) {
  saveSitemap();
}

module.exports = {
  generateSitemapXML,
  generateRobotsTxt,
  saveSitemap,
  staticPages,
  toolPages
};
