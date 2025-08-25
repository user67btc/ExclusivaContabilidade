import { NextResponse } from 'next/server';

/**
 * Middleware do Next.js para adicionar cabeçalhos de segurança
 * e implementar redirecionamentos/proteções em nível de request
 */
export function middleware(request) {
  // Inicializa o objeto de resposta baseado na requisição atual
  const response = NextResponse.next();
  
  // Adiciona cabeçalhos de segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Remove o cabeçalho X-Powered-By para não expor informações da tecnologia
  response.headers.delete('X-Powered-By');
  
  // Força redirecionamento para HTTPS se estiver em produção e não for localhost
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  if (process.env.NODE_ENV === 'production' && !isLocalhost && url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }
  
  return response;
}

// Configuração para executar o middleware apenas nas rotas especificadas
export const config = {
  matcher: [
    // Aplicar em todas as rotas exceto nas que começam com api, _next e alguns arquivos estáticos
    '/((?!api/|_next/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
