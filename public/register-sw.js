// Script para registrar o Service Worker

// Verifica se o navegador suporta Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration.scope);
        
        // Registra para sincronização em background
        if ('sync' in registration) {
          console.log('Sincronização em background suportada');
        }
        
        // Verifica suporte para notificações push
        if ('pushManager' in registration) {
          console.log('Notificações push suportadas');
        }
      })
      .catch(function(error) {
        console.error('Erro no registro do Service Worker:', error);
      });
  });

  // Gerencia atualizações do Service Worker
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    refreshing = true;
    console.log('Service Worker atualizado, recarregando...');
    window.location.reload();
  });
  
  // Detecta mudanças no status de conexão
  window.addEventListener('online', function() {
    console.log('Você está online!');
    // Dispara sincronização em background quando online
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready
        .then(function(registration) {
          if ('sync' in registration) {
            registration.sync.register('sync-forms');
          }
        });
    }
  });

  window.addEventListener('offline', function() {
    console.log('Você está offline!');
    // Mostra um pequeno aviso ao usuário
    if (document.getElementById('offline-notification')) return;
    
    const notification = document.createElement('div');
    notification.id = 'offline-notification';
    notification.innerHTML = `
      <div style="
        background-color: #fff3cd;
        color: #856404;
        padding: 10px 15px;
        border-left: 4px solid #ffeeba;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        font-family: inherit;
        display: flex;
        align-items: center;
        max-width: 300px;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        </svg>
        Você está offline. Alguns recursos podem não estar disponíveis.
        <button style="
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          margin-left: 10px;
          color: #856404;
        " onclick="this.parentElement.parentElement.remove();">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
  });
}
