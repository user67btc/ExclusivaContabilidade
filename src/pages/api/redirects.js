/**
 * API para gerenciar redirecionamentos personalizados
 * Permite redirecionar URLs antigas para novas, útil após reestruturação do site
 * 
 * Exemplo de uso:
 * /api/redirects?url=/antiga-pagina
 * Redirecionará para a nova URL configurada
 */

// Mapa de redirecionamentos (URL antiga -> URL nova)
const redirectMap = {
  // Exemplos
  '/servicos-contabeis': '/servicos',
  '/contato-nos': '/contato',
  '/quem-somos': '/sobre',
  
  // URLs potencialmente antigas do site que precisam ser redirecionadas
  '/servicos/contabilidade-fiscal': '/servicos#fiscal',
  '/servicos/departamento-pessoal': '/servicos#pessoal',
  '/blog-contabilidade': '/blog',
  '/faq-perguntas-frequentes': '/faq',
  
  // Redirecionamentos para setores específicos
  '/servicos-prestadores': '/setores/prestadores',
  '/servicos-comercio': '/setores/comercio',
  '/servicos-esocial': '/setores/esocial',
};

export default function handler(req, res) {
  // Obtém a URL da query string
  const { url } = req.query;
  
  // Verifica se a URL existe no mapa de redirecionamentos
  if (url && redirectMap[url]) {
    // Retorna redirecionamento 301 (permanente) para a nova URL
    return res.redirect(301, redirectMap[url]);
  }
  
  // Se não encontrar redirecionamento, retorna 404 ou redireciona para a home
  return res.redirect(302, '/');
}
