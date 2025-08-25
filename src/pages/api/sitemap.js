import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Esta função será chamada quando a rota /api/sitemap for acessada
// Função auxiliar para formatar a data no formato W3C
function formatW3CDate(date) {
  return date.toISOString();
}

// Função auxiliar para obter a última data de modificação
async function getLastModified(defaultDate = new Date()) {
  // Em um sistema real, isso buscaria do banco de dados ou sistema de arquivos
  // Por enquanto, retornamos a data atual
  return defaultDate;
}

export default async function handler(req, res) {
  try {
    // Define a URL base do site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exclusivacontabilidade.com.br';
  
    // Data de última modificação
    const lastMod = formatW3CDate(await getLastModified());

    // Páginas estáticas principais
    const staticPages = [
      { url: `${baseUrl}/`, lastmod: lastMod, changefreq: 'daily', priority: 1.0 },
      { url: `${baseUrl}/sobre`, lastmod: lastMod, changefreq: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/servicos`, lastmod: lastMod, changefreq: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/contato`, lastmod: lastMod, changefreq: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/blog`, lastmod: lastMod, changefreq: 'daily', priority: 0.9 },
      { url: `${baseUrl}/faq`, lastmod: lastMod, changefreq: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/mapa-do-site`, lastmod: lastMod, changefreq: 'monthly', priority: 0.4 },
      
      // Páginas de setores
      { url: `${baseUrl}/setores`, lastmod: lastMod, changefreq: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/setores/prestadores`, lastmod: lastMod, changefreq: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/setores/comercio`, lastmod: lastMod, changefreq: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/setores/esocial`, lastmod: lastMod, changefreq: 'monthly', priority: 0.8 },
      
      // Páginas legais
      { url: `${baseUrl}/termos-de-uso`, lastmod: lastMod, changefreq: 'yearly', priority: 0.3 },
      { url: `${baseUrl}/politica-privacidade`, lastmod: lastMod, changefreq: 'yearly', priority: 0.3 },
      
      // Categorias do FAQ
      { url: `${baseUrl}/faq#geral`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#servicos`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#contabil`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#fiscal`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#trabalhista`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#simples-nacional`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#mei`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#imposto-renda`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#rural`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/faq#esocial`, lastmod: lastMod, changefreq: 'weekly', priority: 0.7 },
      
      // Adicionar aqui futuras URLs dinâmicas do blog, quando implementadas
      // Em um sistema real, essas URLs seriam carregadas do banco de dados
      // { url: `${baseUrl}/blog/titulo-do-post`, lastmod: formatW3CDate(new Date('2025-07-25')), changefreq: 'monthly', priority: 0.6 },
    ];

    // Aqui você pode adicionar lógica para buscar URLs dinâmicas de um banco de dados ou API
    // Por exemplo, artigos do blog, perguntas do FAQ, etc.
    
    // Criação do stream de sitemap
    const stream = new SitemapStream({ hostname: baseUrl });
    
    // Converte a lista de páginas em um stream legível
    const sitemapEntries = staticPages.map(page => ({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: page.lastmod || lastMod,
    }));

    // Gera o sitemap XML
    const xmlData = await streamToPromise(
      Readable.from(sitemapEntries).pipe(stream)
    );

    // Define os cabeçalhos e retorna o XML
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');
    res.write(xmlData.toString());
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}
