import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

/**
 * Página 404 personalizada
 * Esta página é exibida quando uma URL não é encontrada
 */
export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Página não encontrada | Exclusiva Contabilidade</title>
        <meta name="description" content="A página que você está procurando não foi encontrada" />
        <meta name="robots" content="noindex, follow" />
      </Head>
      
      <div className="error-page container">
        <div className="error-content text-center">
          <h1>404</h1>
          <h2>Página não encontrada</h2>
          <p>A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
          
          <div className="error-suggestions">
            <h3>Você pode tentar:</h3>
            <ul>
              <li>Verificar se a URL foi digitada corretamente</li>
              <li>Voltar para a <Link href="/">página inicial</Link></li>
              <li>Visitar nossa página de <Link href="/servicos">serviços</Link></li>
              <li>Consultar o <Link href="/faq">FAQ</Link> para esclarecer suas dúvidas</li>
              <li>Entrar em <Link href="/contato">contato conosco</Link> para obter ajuda</li>
            </ul>
          </div>
          
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
          color: #0056b3;
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
        
        .error-suggestions {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .error-suggestions h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #333;
        }
        
        .error-suggestions ul {
          padding-left: 20px;
        }
        
        .error-suggestions li {
          margin-bottom: 10px;
          color: #555;
        }
        
        .error-suggestions a {
          color: #0056b3;
          text-decoration: none;
        }
        
        .error-suggestions a:hover {
          text-decoration: underline;
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
