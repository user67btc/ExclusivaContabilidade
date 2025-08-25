// Script para controlar o FAQ accordion
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o FAQ
  initFaq();
  
  // Re-inicializa quando houver mudanças de rota no Next.js
  if (typeof window !== 'undefined') {
    // Usar um debounce para evitar múltiplas execuções em curto período de tempo
    let debounceTimer;
    
    const observer = new MutationObserver(function(mutations) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        // Verifica se há elementos FAQ na página antes de tentar inicializar
        if (document.querySelectorAll('.faq-question').length > 0) {
          console.log('FAQ encontrado após mudança de rota, inicializando...');
          initFaq();
        }
      }, 300); // Aguarda 300ms após última mudança
    });
    
    // Observa apenas as mudanças no container principal ou no #__next do Next.js
    const targetNode = document.querySelector('#__next') || document.querySelector('main') || document.body;
    
    // Observa mudanças no DOM para reinicializar o FAQ quando o conteúdo muda (rotas do Next.js)
    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });
  }
});

function initFaq() {
  // Verifica se já foi inicializado para evitar reinicialização duplicada
  if (window.faqInitialized) {
    return;
  }

  // Marca que o FAQ foi inicializado nesta renderização
  window.faqInitialized = true;

  // Função para lidar com cliques nas perguntas
  const handleFaqClick = function(e) {
    e.preventDefault();
    const faqItem = this.closest('.faq-item');
    const currentlyActive = faqItem.classList.contains('active');
    
    // Fecha todos os outros itens abertos
    document.querySelectorAll('.faq-item.active').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle do item atual
    if (currentlyActive) {
      faqItem.classList.remove('active');
    } else {
      faqItem.classList.add('active');
    }
  };
  
  // Delegação de eventos para melhor performance - um único listener para todo o contêiner FAQ
  document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-question')) {
      handleFaqClick.call(e.target.closest('.faq-question'), e);
    }
  });

  // Adiciona também suporte para eventos de toque para melhorar experiência em dispositivos móveis
  document.addEventListener('touchend', function(e) {
    if (e.target.closest('.faq-question')) {
      handleFaqClick.call(e.target.closest('.faq-question'), e);
    }
  }, {passive: true});
  
  // Ativa o primeiro item por padrão em páginas com FAQ (apenas na primeira inicialização)
  if (document.querySelectorAll('.faq-item').length > 0 && !document.querySelector('.faq-item.active')) {
    document.querySelector('.faq-item').classList.add('active');
  }
  
  // Após navegação, resetamos o flag para permitir reinicialização em mudanças de rota
  setTimeout(() => {
    window.faqInitialized = false;
  }, 500);
}
