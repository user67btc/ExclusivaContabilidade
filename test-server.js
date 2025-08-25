const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de teste básica
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Teste - Exclusiva Contabilidade</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .status { padding: 20px; background: #f0f8ff; border-radius: 8px; }
        .error { background: #ffe6e6; }
        .success { background: #e6ffe6; }
      </style>
    </head>
    <body>
      <h1>🔧 Servidor de Diagnóstico - Exclusiva Contabilidade</h1>
      <div class="status success">
        <h2>✅ Servidor funcionando!</h2>
        <p><strong>Porta:</strong> ${PORT}</p>
        <p><strong>Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        <p><strong>Diretório:</strong> ${__dirname}</p>
      </div>
      
      <h3>📁 Verificação de Arquivos:</h3>
      <ul>
        <li>package.json: ${fs.existsSync('./package.json') ? '✅ Existe' : '❌ Não encontrado'}</li>
        <li>src/pages/_app.js: ${fs.existsSync('./src/pages/_app.js') ? '✅ Existe' : '❌ Não encontrado'}</li>
        <li>src/styles/: ${fs.existsSync('./src/styles') ? '✅ Existe' : '❌ Não encontrado'}</li>
        <li>node_modules/: ${fs.existsSync('./node_modules') ? '✅ Existe' : '❌ Não encontrado'}</li>
      </ul>
      
      <h3>🚀 Próximos Passos:</h3>
      <p>Se este servidor está funcionando, o problema não é com Node.js ou a porta 3000.</p>
      <p>O erro 500 provavelmente está relacionado ao Next.js ou dependências.</p>
      
      <div style="margin-top: 30px;">
        <a href="/test-nextjs" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Testar Next.js
        </a>
      </div>
    </body>
    </html>
  `);
});

// Rota para testar Next.js
app.get('/test-nextjs', (req, res) => {
  try {
    // Verificar se o Next.js está instalado
    const nextPath = path.join(__dirname, 'node_modules', 'next');
    const nextExists = fs.existsSync(nextPath);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Teste Next.js</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .status { padding: 20px; border-radius: 8px; margin: 10px 0; }
          .error { background: #ffe6e6; }
          .success { background: #e6ffe6; }
          .warning { background: #fff3cd; }
        </style>
      </head>
      <body>
        <h1>🔍 Diagnóstico Next.js</h1>
        
        <div class="status ${nextExists ? 'success' : 'error'}">
          <h3>Next.js: ${nextExists ? '✅ Instalado' : '❌ Não encontrado'}</h3>
        </div>
        
        <div class="status warning">
          <h3>⚠️ Possíveis Causas do Erro 500:</h3>
          <ul>
            <li>Imports de CSS inexistentes</li>
            <li>Componentes com erros de sintaxe</li>
            <li>Dependências faltando</li>
            <li>Problemas no _app.js</li>
          </ul>
        </div>
        
        <a href="/" style="background: #6c757d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Voltar
        </a>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Erro: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de diagnóstico rodando em http://localhost:${PORT}`);
  console.log(`📁 Diretório: ${__dirname}`);
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
});
