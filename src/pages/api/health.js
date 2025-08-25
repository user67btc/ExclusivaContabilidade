/**
 * API route para health check
 * Este endpoint pode ser usado por ferramentas de monitoramento para verificar se o site está online
 * Acesse em: /api/health
 */

export default function handler(req, res) {
  // Coleta informações do sistema
  const healthData = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'ok',
    environment: process.env.NODE_ENV,
    nextVersion: process.env.NEXT_RUNTIME || 'Unknown',
    memory: process.memoryUsage(),
  };

  // Retorna status 200 e dados de saúde
  res.status(200).json(healthData);
}
