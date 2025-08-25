import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function Custom500() {
  return (
    <Layout>
      <Head>
        <title>Erro Interno do Servidor | Exclusiva Contabilidade</title>
        <meta name="description" content="Ocorreu um erro interno no servidor." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="error-page container">
        <div className="error-content text-center">
          <h1>500</h1>
          <h2>Erro Interno do Servidor</h2>
          <p>Desculpe, ocorreu um erro inesperado ao carregar esta página.<br />Nossa equipe já foi notificada.</p>
          <div className="error-actions">
            <Link href="/" className="btn btn-primary">
              <i className="fa fa-home"></i> Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .error-page {
          padding: 80px 0;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-content {
          max-width: 700px;
          margin: 0 auto;
        }
        h1 {
          font-size: 120px;
          color: #c53030;
          margin-bottom: 0;
          line-height: 1;
        }
        h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #333;
        }
        p {
          font-size: 18px;
          margin-bottom: 30px;
          color: #555;
        }
        .error-actions {
          margin-top: 30px;
        }
        .btn-primary {
          background-color: #0056b3;
          border-color: #0056b3;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .btn-primary:hover {
          background-color: #003d7a;
          border-color: #003d7a;
        }
        @media (max-width: 767px) {
          h1 {
            font-size: 80px;
          }
          h2 {
            font-size: 26px;
          }
          p {
            font-size: 16px;
          }
        }
        @media (max-width: 480px) {
          .error-page {
            padding: 50px 0;
          }
          h1 {
            font-size: 60px;
          }
          h2 {
            font-size: 22px;
          }
        }
      `}</style>
    </Layout>
  );
}
