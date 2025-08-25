// Script para aplicar máscaras de telefone aos campos de input
document.addEventListener('DOMContentLoaded', function() {
  initInputMasks();
  
  // Re-inicializa quando houver mudanças de rota no Next.js
  if (typeof window !== 'undefined') {
    // Usar um debounce para evitar múltiplas execuções em curto período de tempo
    let debounceTimer;
    
    const observer = new MutationObserver(function(mutations) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        initInputMasks();
      }, 300);
    });
    
    // Observa apenas as mudanças no container principal ou no #__next do Next.js
    const targetNode = document.querySelector('#__next') || document.querySelector('main') || document.body;
    
    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });
  }
});

function initInputMasks() {
  // Busca todos os inputs de telefone
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="telefone"], input#telefone');
  
  if (phoneInputs.length > 0) {
    phoneInputs.forEach(input => {
      // Remove listeners anteriores para evitar duplicação
      const newInput = input.cloneNode(true);
      input.parentNode.replaceChild(newInput, input);
      
      // Adiciona novos event listeners
      newInput.addEventListener('input', function(e) {
        applyPhoneMask(e.target);
      });
      
      newInput.addEventListener('keydown', function(e) {
        // Permitir teclas especiais como backspace, delete, etc.
        if (!isNumberOrSpecialKey(e)) {
          e.preventDefault();
        }
      });
      
      // Aplica a máscara inicial se já houver um valor
      if (newInput.value) {
        applyPhoneMask(newInput);
      }
    });
  }
}

// Aplica a máscara de telefone baseada no número de dígitos
function applyPhoneMask(input) {
  // Remove todos os caracteres não numéricos
  let value = input.value.replace(/\D/g, '');
  let formattedValue = '';
  
  // Limita a 11 dígitos (com DDD)
  if (value.length > 11) {
    value = value.substring(0, 11);
  }
  
  // Formata com base na quantidade de dígitos
  if (value.length <= 2) {
    // Só o começo do DDD
    formattedValue = value;
  } else if (value.length <= 6) {
    // DDD + começo do número: (99) 9
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
  } else if (value.length <= 10) {
    // Telefone fixo: (99) 9999-9
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
  } else {
    // Celular com 9 dígitos: (99) 99999-9999
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
  }
  
  // Atualiza o valor do campo
  input.value = formattedValue;
}

// Verifica se a tecla pressionada é um número ou uma tecla especial permitida
function isNumberOrSpecialKey(e) {
  const specialKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 
    'Home', 'End', 'Enter', 'Escape'
  ];
  
  // Se for uma tecla especial, permite
  if (specialKeys.includes(e.key)) {
    return true;
  }
  
  // Permite copiar/colar e atalhos comuns
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
    return true;
  }
  
  // Verifica se é um dígito (0-9)
  return /^\d$/.test(e.key);
}
