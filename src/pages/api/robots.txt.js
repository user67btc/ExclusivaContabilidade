import { getConfigData } from '../../services/configService';

export default async function handler(req, res) {
  try {
    // Buscar configurações do sistema
    const config = await getConfigData();
    
    // Verificar se existe conteúdo personalizado para robots.txt
    let robotsContent;
    
    if (config && config.seo && config.seo.robotsTxt) {
      // Usar conteúdo personalizado das configurações
      robotsContent = config.seo.robotsTxt;
    } else {
      // Conteúdo padrão do robots.txt
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exclusivacontabilidade.com.br';
      
      robotsContent = `# robots.txt gerado para Exclusiva Contabilidade
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;
    }

    // Definir headers e retornar o conteúdo
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=43200, stale-while-revalidate=21600');
    res.write(robotsContent);
    res.end();
  } catch (error) {
    console.error('Erro ao gerar robots.txt:', error);
    res.status(500).send('# Error generating robots.txt');
  }
}
