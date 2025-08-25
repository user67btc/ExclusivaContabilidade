import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Layout para área administrativa do site
 * Inclui cabeçalho administrativo, menu lateral e área de conteúdo
 */
const AdminLayout = ({ children, title = 'Administração' }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  
  // Menu de administração
  const adminMenu = [
    { name: 'Dashboard', path: '/admin', icon: 'fas fa-tachometer-alt' },
    { name: 'Status do Sistema', path: '/admin/status', icon: 'fas fa-server' },
    { name: 'Configurações', path: '/admin/configuracoes', icon: 'fas fa-cog' },
    { name: 'SEO', path: '/admin/seo', icon: 'fas fa-search' },
    { name: 'Blog', path: '/admin/blog', icon: 'fas fa-blog' },
  ];
  
  return (
    <div className="admin-layout">
      <Head>
        <title>{title} | Exclusiva Contabilidade</title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>
      
      {/* Admin Header */}
      <header className="admin-header">
        <div className="logo">
          <Link href="/admin">
            <span className="logo-icon"><i className="fas fa-chart-line"></i></span>
            <span className="logo-text">Exclusiva Admin</span>
          </Link>
        </div>
        
        <div className="header-actions">
          <div className="user-info">
            <img src="/images/admin/avatar.png" alt="Administrador" className="avatar" />
            <span className="user-name">Administrador</span>
          </div>
          
          <Link href="/" className="view-site">
            <i className="fas fa-external-link-alt"></i> Ver site
          </Link>
          
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Sair
          </button>
        </div>
      </header>
      
      <div className="admin-container">
        {/* Admin Sidebar */}
        <nav className="admin-sidebar">
          <ul className="admin-menu">
            {adminMenu.map((item) => (
              <li key={item.path} className={currentPath === item.path ? 'active' : ''}>
                <Link href={item.path}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="sidebar-footer">
            <p className="version">v1.0.0</p>
            <p className="copyright">&copy; {new Date().getFullYear()} Exclusiva</p>
          </div>
        </nav>
        
        {/* Admin Content */}
        <main className="admin-content">
          <div className="content-header">
            <h1>{title}</h1>
            <div className="breadcrumb">
              <Link href="/admin">Admin</Link> / 
              <span>{title}</span>
            </div>
          </div>
          
          <div className="content-body">
            {children}
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        /* Estilos globais para a área administrativa */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f5f7fa;
          color: #333;
        }
        
        * {
          box-sizing: border-box;
        }
        
        a {
          color: #0056b3;
          text-decoration: none;
        }
      `}</style>
      
      <style jsx>{`
        .admin-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        /* Header styles */
        .admin-header {
          background-color: #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          height: 70px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.2rem;
        }
        
        .logo a {
          display: flex;
          align-items: center;
          color: #0056b3;
        }
        
        .logo-icon {
          margin-right: 0.5rem;
          font-size: 1.4rem;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .view-site, .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .view-site {
          color: #555;
          background-color: #f5f5f5;
        }
        
        .view-site:hover {
          background-color: #e9e9e9;
        }
        
        .logout-btn {
          border: none;
          background-color: #f8f0f0;
          color: #d32f2f;
          cursor: pointer;
        }
        
        .logout-btn:hover {
          background-color: #fde8e8;
        }
        
        /* Container styles */
        .admin-container {
          display: flex;
          flex: 1;
          padding-top: 70px;
        }
        
        /* Sidebar styles */
        .admin-sidebar {
          width: 250px;
          background-color: #ffffff;
          box-shadow: 1px 0 4px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 0;
          height: calc(100vh - 70px);
          position: fixed;
          left: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .admin-menu {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .admin-menu li {
          padding: 0;
          margin: 0.25rem 0;
        }
        
        .admin-menu li a {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: #555;
          transition: all 0.2s;
        }
        
        .admin-menu li a i {
          margin-right: 0.75rem;
          width: 20px;
          text-align: center;
        }
        
        .admin-menu li:hover a {
          background-color: #f5f7fa;
          color: #0056b3;
        }
        
        .admin-menu li.active a {
          background-color: #e6f0ff;
          color: #0056b3;
          font-weight: 500;
          border-right: 3px solid #0056b3;
        }
        
        .sidebar-footer {
          padding: 1rem 1.5rem;
          font-size: 0.85rem;
          color: #888;
          text-align: center;
          border-top: 1px solid #eee;
        }
        
        .sidebar-footer p {
          margin: 0.25rem 0;
        }
        
        /* Content styles */
        .admin-content {
          flex: 1;
          padding: 2rem;
          margin-left: 250px;
        }
        
        .content-header {
          margin-bottom: 2rem;
        }
        
        .content-header h1 {
          margin: 0 0 0.5rem;
          font-size: 1.8rem;
          color: #333;
        }
        
        .breadcrumb {
          color: #888;
          font-size: 0.9rem;
        }
        
        .content-body {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
        }
        
        /* Responsive styles */
        @media (max-width: 991px) {
          .admin-sidebar {
            width: 70px;
            padding: 1rem 0;
          }
          
          .admin-menu li a span {
            display: none;
          }
          
          .admin-menu li a i {
            margin-right: 0;
            font-size: 1.2rem;
          }
          
          .sidebar-footer {
            display: none;
          }
          
          .admin-content {
            margin-left: 70px;
          }
        }
        
        @media (max-width: 767px) {
          .admin-header {
            padding: 0 1rem;
          }
          
          .logo-text {
            display: none;
          }
          
          .header-actions {
            gap: 1rem;
          }
          
          .user-name {
            display: none;
          }
          
          .view-site span, .logout-btn span {
            display: none;
          }
          
          .admin-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
