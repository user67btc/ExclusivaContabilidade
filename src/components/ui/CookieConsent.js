import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { setCookie, getCookie, savePreferences, getAllPreferences, shouldShowCookieBanner, setAllConsent } from '../../utils/cookieHelper';

/**
 * Componente de consentimento de cookies
 * Exibe um banner para consentimento de cookies em conformidade com LGPD/GDPR
 * Permite que os usuários aceitem todos os cookies ou personalizem suas preferências
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true, não pode ser desativado
    analytics: true,
    marketing: true,
    personalization: true
  });

  useEffect(() => {
    // Usa a função shouldShowCookieBanner para determinar se exibimos o banner
    if (shouldShowCookieBanner()) {
      // Exibe o banner após um breve delay para melhor UX
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Se já houver consentimento, carrega as preferências usando getAllPreferences
      const savedPrefs = getAllPreferences();
      setPreferences(savedPrefs);
      
      // Ativa scripts com base nas preferências salvas
      if (savedPrefs.analytics) {
        enableAnalytics();
      }
      
      if (savedPrefs.marketing) {
        enableMarketing();
      }
    }
  }, []);

  // Função para aceitar todos os cookies
  const acceptAll = () => {
    // Usa a função setAllConsent para aceitar todos os cookies
    const updatedPrefs = setAllConsent(true, 180);
    setPreferences(updatedPrefs);
    
    // Ativa scripts de analytics e marketing
    enableAnalytics();
    enableMarketing();
    
    // Esconde o banner
    setVisible(false);
  };

  // Função para aceitar apenas os cookies necessários
  const acceptNecessary = () => {
    // Usa a função savePreferences definindo apenas necessary como true
    const updatedPrefs = savePreferences({
      analytics: false,
      marketing: false,
      personalization: false
    }, 180);
    
    // Atualiza o estado local
    setPreferences(updatedPrefs);
    
    // Esconde o banner
    setVisible(false);
  };

  // Função para salvar o consentimento
  const saveConsent = (prefs) => {
    // Usa a função savePreferences para salvar as preferências
    savePreferences(prefs, 180);
    
    // Ativa/desativa scripts com base nas preferências
    if (prefs.analytics) {
      enableAnalytics();
    }
    
    if (prefs.marketing) {
      enableMarketing();
    }
  };

  // Função para ativar o Google Analytics
  const enableAnalytics = () => {
    // Exemplo: carregar script do GA de forma condicional
    if (window.dataLayer && window.gtag) return; // Já carregado
    
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', process.env.NEXT_PUBLIC_GA_ID);
  };

  // Função para ativar scripts de marketing (Facebook Pixel, etc.)
  const enableMarketing = () => {
    // Exemplo: carrega Facebook Pixel de forma condicional
    if (window.fbq) return; // Já carregado
    
    const fbPixelScript = document.createElement('script');
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbPixelScript);
  };

  // Se o banner não estiver visível, não renderiza nada
  if (!visible) return null;

  return (
    <div className="cookie-consent-wrapper">
      <div className="cookie-consent">
        <div className="cookie-content">
          <h3>Política de Cookies</h3>
          
          {!showPreferences ? (
            <>
              <p>
                Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site. 
                Ao clicar em "Aceitar todos", você consente com o uso de todos os cookies.
                Para personalizar suas preferências, clique em "Personalizar".
              </p>
              
              <div className="cookie-buttons">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowPreferences(true)}
                >
                  Personalizar
                </button>
                <button 
                  className="btn-secondary"
                  onClick={acceptNecessary}
                >
                  Apenas necessários
                </button>
                <button 
                  className="btn-primary"
                  onClick={acceptAll}
                >
                  Aceitar todos
                </button>
              </div>
              
              <p className="cookie-policy-link">
                Para saber mais, leia nossa <Link href="/politica-privacidade">Política de Privacidade</Link>
              </p>
            </>
          ) : (
            <>
              <div className="cookie-preferences">
                <div className="cookie-option">
                  <div>
                    <strong>Cookies necessários</strong>
                    <p>Essenciais para o funcionamento do site. Não podem ser desativados.</p>
                  </div>
                  <label className="switch disabled">
                    <input 
                      type="checkbox" 
                      checked={preferences.necessary}
                      disabled
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="cookie-option">
                  <div>
                    <strong>Cookies analíticos</strong>
                    <p>Ajudam a entender como os visitantes interagem com o site.</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="cookie-option">
                  <div>
                    <strong>Cookies de marketing</strong>
                    <p>Usados para rastrear visitantes em websites e exibir anúncios relevantes.</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="cookie-option">
                  <div>
                    <strong>Cookies de personalização</strong>
                    <p>Permitem que o site lembre suas preferências e forneça recursos aprimorados.</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.personalization}
                      onChange={(e) => setPreferences({...preferences, personalization: e.target.checked})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className="cookie-buttons preferences-buttons">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowPreferences(false)}
                >
                  Voltar
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    saveConsent(preferences);
                    setVisible(false);
                  }}
                >
                  Salvar preferências
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .cookie-consent-wrapper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 1rem;
        }
        
        .cookie-consent {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 800px;
          overflow: hidden;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .cookie-content {
          padding: 1.5rem;
        }
        
        .cookie-consent h3 {
          margin-top: 0;
          color: #0056b3;
        }
        
        .cookie-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        
        .btn-primary, .btn-secondary {
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-primary {
          background-color: #0056b3;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #004494;
        }
        
        .btn-secondary {
          background-color: #f8f9fa;
          color: #333;
          border: 1px solid #ddd;
        }
        
        .btn-secondary:hover {
          background-color: #e9ecef;
        }
        
        .cookie-policy-link {
          font-size: 0.9rem;
          margin-top: 1rem;
        }
        
        .cookie-policy-link a {
          color: #0056b3;
          text-decoration: none;
        }
        
        .cookie-policy-link a:hover {
          text-decoration: underline;
        }
        
        .cookie-preferences {
          margin: 1rem 0;
        }
        
        .cookie-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .cookie-option:last-child {
          border-bottom: none;
        }
        
        .cookie-option p {
          margin: 0.25rem 0 0 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
          flex-shrink: 0;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .3s;
        }
        
        input:checked + .slider {
          background-color: #0056b3;
        }
        
        input:focus + .slider {
          box-shadow: 0 0 1px #0056b3;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        .slider.round {
          border-radius: 24px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
        
        .switch.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .preferences-buttons {
          justify-content: flex-end;
        }
        
        @media (max-width: 767px) {
          .cookie-consent-wrapper {
            padding: 0.5rem;
          }
          
          .cookie-content {
            padding: 1rem;
          }
          
          .cookie-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .preferences-buttons {
            flex-direction: row;
          }
          
          .cookie-option {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .cookie-option div {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
