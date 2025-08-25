// Service Worker para Exclusiva Contabilidade
// Versão 1.3.0

const CACHE_NAME = 'exclusiva-cache-v1.3';
const OFFLINE_URL = '/offline.html';

// Recursos para cache imediato (shell da aplicação)
const RESOURCES_TO_PRECACHE = [
  '/',
  '/offline.html',
  '/favicon.ico',
  '/site.webmanifest',
  '/images/logo.svg',
  '/images/og-image.jpg',
  '/styles/globals.css',
  // Ferramentas interativas
  '/ferramentas',
  '/ferramentas/calculadora-impostos',
  '/ferramentas/simulador-parcelamento',
  '/ferramentas/consulta-cnpj',
  '/ferramentas/calendario-fiscal',
  '/ferramentas/simulador-regimes',
  '/ferramentas/calculo-encargos',
  // Assets importantes
  '/css/bootstrap.min.css',
  '/js/bootstrap.bundle.min.js',
  '/js/fontawesome.min.js',
];

// Instalação do service worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Pré-cacheando recursos...');
        return cache.addAll(RESOURCES_TO_PRECACHE);
      })
      .then(() => {
        console.log('[ServiceWorker] Pré-cache concluído');
        return self.skipWaiting();
      })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('exclusiva-cache-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          console.log('[ServiceWorker] Removendo cache antigo:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Agora está controlando a página');
      return self.clients.claim();
    })
  );
});

// Estratégia de cache: Network First, falling back to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // Para arquivos HTML, use network-first strategy
    if (event.request.destination === 'document') {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Se a resposta foi bem-sucedida, clone e armazene em cache
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Se offline, tente buscar do cache
            return caches.match(event.request)
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                }
                // Se não estiver em cache, retorne a página offline
                return caches.match(OFFLINE_URL);
              });
          })
      );
      return;
    }
    
    // Para outros recursos, use cache-first strategy com fallback para rede
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Se não estiver em cache, busque da rede
          return fetch(event.request)
            .then((response) => {
              // Se a resposta não for válida, retorne-a como está
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Se for válida, clone-a e armazene em cache
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
  }
});

// Sincronização em background quando a conexão é restaurada
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Função para sincronizar dados de formulários quando a conexão for restaurada
async function syncForms() {
  // Implementar lógica de sincronização de formulários quando offline
  const db = await openDB();
  const pendingSubmissions = await db.getAll('formSubmissions');
  
  for (const submission of pendingSubmissions) {
    try {
      await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission.data)
      });
      
      await db.delete('formSubmissions', submission.id);
    } catch (error) {
      console.error('Erro ao sincronizar formulário:', error);
    }
  }
}

// Manipulador de notificações push
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Novidade da Exclusiva Contabilidade',
      icon: '/images/logo-192x192.png',
      badge: '/images/badge.png',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(
        data.title || 'Exclusiva Contabilidade', 
        options
      )
    );
  }
});

// Ação ao clicar na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
