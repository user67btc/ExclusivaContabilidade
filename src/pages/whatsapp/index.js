import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function WhatsAppRedirecionador() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { query } = router;

    // Número padronizado em E.164
    const phone = (query && query.phone) || '5567999846350';

    // Mensagem padronizada com suporte a parâmetros
    const nome = query?.nome ? `\nMeu nome é ${query.nome}.` : '';
    const tipo = query?.tipo ? `Assunto: ${query.tipo}.` : '';
    const setor = query?.setor ? ` Setor: ${query.setor}.` : '';
    const utmSource = query?.utm_source || 'direct';
    const utmMedium = query?.utm_medium || 'none';
    const utmCampaign = query?.utm_campaign || 'none';

    const baseMsg = 'Olá! Vim pelo site da Exclusiva Contabilidade e gostaria de uma avaliação fiscal gratuita.';
    const utm = `\n\nUTM Source: ${utmSource} | UTM Medium: ${utmMedium} | UTM Campaign: ${utmCampaign}`;
    const fullMessage = `${baseMsg} ${tipo}${setor}${nome}${utm}`.trim();
    const encodedMessage = encodeURIComponent(fullMessage);

    // wa.me padronizado
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Redireciono imediatamente para garantir consistência
    setLoading(false);
    window.location.replace(waUrl);
  }, [router]);
  
  return (
    <div className="whatsapp-redirect-container">
      <Head>
        <title>Redirecionando para WhatsApp | Exclusiva Contabilidade</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="redirect-content text-center">
        {loading ? (
          <div className="loading-spinner my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="mb-3">Abrindo WhatsApp…</h1>
            <p className="mb-4">Se não abrir automaticamente, clique no botão abaixo:</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const params = new URLSearchParams(window.location.search);
                const phone = params.get('phone') || '5567999846350';
                const nome = params.get('nome');
                const tipo = params.get('tipo');
                const setor = params.get('setor');
                const utm_source = params.get('utm_source') || 'direct';
                const utm_medium = params.get('utm_medium') || 'none';
                const utm_campaign = params.get('utm_campaign') || 'none';
                const baseMsg = 'Olá! Vim pelo site da Exclusiva Contabilidade e gostaria de uma avaliação fiscal gratuita.';
                const nomeMsg = nome ? `\nMeu nome é ${nome}.` : '';
                const tipoMsg = tipo ? ` Assunto: ${tipo}.` : '';
                const setorMsg = setor ? ` Setor: ${setor}.` : '';
                const utm = `\n\nUTM Source: ${utm_source} | UTM Medium: ${utm_medium} | UTM Campaign: ${utm_campaign}`;
                const msg = encodeURIComponent(`${baseMsg}${tipoMsg}${setorMsg}${nomeMsg}${utm}`);
                window.location.href = `https://wa.me/${phone}?text=${msg}`;
              }}
              className="btn btn-success btn-lg"
            >
              <i className="fab fa-whatsapp me-2"></i>
              Abrir WhatsApp
            </a>
            <div className="text-center mt-4">
              <Link href="/" className="btn btn-link">Voltar para o site</Link>
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        .whatsapp-redirect-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f8f9fa;
        }
        
        .redirect-content {
          max-width: 600px;
          width: 100%;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          margin: 40px 0;
        }
        
        .whatsapp-icon {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
