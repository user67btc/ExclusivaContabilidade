/**
 * Utilitários para manipulação de cookies
 */

/**
 * Define um cookie com nome, valor e dias de expiração
 * @param {string} name - Nome do cookie
 * @param {string} value - Valor do cookie
 * @param {number} days - Dias até expirar (opcional)
 */
export function setCookie(name, value, days = 7) {
  let expires = "";
  
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

/**
 * Obtém o valor de um cookie pelo nome
 * @param {string} name - Nome do cookie
 * @returns {string|null} - Valor do cookie ou null se não existir
 */
export function getCookie(name) {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
}

/**
 * Remove um cookie pelo nome
 * @param {string} name - Nome do cookie
 */
export function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * Verifica se há consentimento para tipo específico de cookie
 * @param {string} type - Tipo de cookie (necessary, analytics, marketing, personalization)
 * @returns {boolean} - Verdadeiro se houver consentimento
 */
export function hasConsent(type) {
  if (typeof window === 'undefined') return false;
  
  // Cookies necessários sempre têm consentimento
  if (type === 'necessary') return true;
  
  // Verifica se há consentimento geral
  const consentGiven = getCookie('cookie-consent');
  if (!consentGiven) return false;
  
  // Verifica o tipo específico de consentimento
  try {
    const preferences = JSON.parse(getCookie('cookie-preferences') || '{}');
    return preferences[type] === true;
  } catch (error) {
    console.error('Erro ao verificar preferências de cookies:', error);
    return false;
  }
}

/**
 * Salva as preferências de cookies do usuário
 * @param {Object} preferences - Objeto com preferências de cookies {analytics: boolean, marketing: boolean, personalization: boolean}
 * @param {number} days - Dias até expirar (padrão: 180 dias = 6 meses)
 */
export function savePreferences(preferences, days = 180) {
  // Cookies necessários sempre são ativados
  const fullPreferences = {
    necessary: true,
    ...preferences
  };
  
  // Salva as preferências no formato JSON
  setCookie('cookie-preferences', JSON.stringify(fullPreferences), days);
  
  // Marca que o usuário deu consentimento
  setCookie('cookie-consent', 'true', days);
  
  return fullPreferences;
}

/**
 * Obtém todas as preferências de cookies do usuário
 * @returns {Object} - Objeto com todas as preferências de cookies
 */
export function getAllPreferences() {
  try {
    const preferences = JSON.parse(getCookie('cookie-preferences') || '{}');
    
    // Garante que preferences tenha todas as chaves esperadas
    return {
      necessary: true, // Sempre ativado
      analytics: preferences.analytics === true,
      marketing: preferences.marketing === true,
      personalization: preferences.personalization === true
    };
  } catch (error) {
    console.error('Erro ao obter preferências de cookies:', error);
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
  }
}

/**
 * Verifica se o banner de cookies precisa ser exibido
 * @returns {boolean} - Verdadeiro se o banner deve ser exibido
 */
export function shouldShowCookieBanner() {
  // Se estamos no servidor, não exibimos o banner
  if (typeof window === 'undefined') return false;
  
  // Verifica se o usuário já deu consentimento
  const consentGiven = getCookie('cookie-consent');
  
  // Se não houver consentimento, devemos exibir o banner
  return consentGiven === null;
}

/**
 * Define consentimento para todos os tipos de cookies
 * @param {boolean} accept - Se todos os cookies devem ser aceitos
 * @param {number} days - Dias até expirar (padrão: 180 dias = 6 meses)
 */
export function setAllConsent(accept = true, days = 180) {
  return savePreferences({
    analytics: accept,
    marketing: accept,
    personalization: accept
  }, days);
}

/**
 * Remove todos os cookies de preferências e consentimento
 */
export function resetConsent() {
  eraseCookie('cookie-consent');
  eraseCookie('cookie-preferences');
}
