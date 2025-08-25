import Script from 'next/script';

/**
 * Componente para integração do Microsoft Clarity
 * @param {string} clarityId - O ID do projeto Microsoft Clarity
 */
const MicrosoftClarity = ({ clarityId }) => {
  if (!clarityId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
};

export default MicrosoftClarity;
