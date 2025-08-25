import React from 'react';
import Script from 'next/script';

/**
 * Componente para implementação do Google Tag Manager
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.gtmId - ID do Google Tag Manager (ex: 'GTM-XXXXXX')
 */
const GoogleTagManager = ({ gtmId }) => {
  if (!gtmId) return null;
  
  return (
    <>
      {/* Google Tag Manager - Script para o head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      
      {/* Google Tag Manager - Noscript fallback para o body */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
};

export default GoogleTagManager;
