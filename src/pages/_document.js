import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00407a" />
          <meta name="msapplication-TileColor" content="#00407a" />
          {/* Theme color per color-scheme for better PWA/Android UI integration */}
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
          {/* Hint UA about supported color schemes */}
          <meta name="color-scheme" content="dark light" />
          {/* Avoid auto-detecting phone numbers which may break layout */}
          <meta name="format-detection" content="telephone=no" />
          
          {/* Meta tags padrão */}
          <meta name="author" content="Exclusiva Assessoria Contábil" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Exclusiva Contabilidade" />
          <meta property="og:image" content="/assets/images/placeholder.svg" />
          <meta name="twitter:card" content="summary_large_image" />
          
          {/* Stylesheets externos */}
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
            crossOrigin="anonymous" 
            referrerPolicy="no-referrer" 
          />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
