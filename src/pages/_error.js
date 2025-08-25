import React from 'react';

function Error({ statusCode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', color: '#0f172a' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Erro {statusCode || 'desconhecido'}</h1>
      <p style={{ fontSize: '1.25rem', maxWidth: 480, textAlign: 'center' }}>
        {statusCode
          ? `Ocorreu um erro ${statusCode} na renderização desta página.`
          : 'Ocorreu um erro inesperado na aplicação.'}
      </p>
      <a href="/" style={{ marginTop: 32, color: '#1e40af', textDecoration: 'underline', fontWeight: 500 }}>Voltar para a Home</a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
