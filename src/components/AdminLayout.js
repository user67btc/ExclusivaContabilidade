import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

/**
 * Layout administrativo com proteção de rota
 * Só permite acesso de usuários autenticados
 */
const AdminLayout = ({ children, activeMenu, pageTitle }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  
  const title = pageTitle ? `${pageTitle} | Admin` : 'Painel Administrativo';
  
  return (
    <ProtectedRoute>
      <div className="admin-wrapper">
        <Head>
          <title>{title} | Exclusiva Contabilidade</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="logo-container">
              <img src="/images/logo.png" alt="Logo da Exclusiva Contabilidade" className="img-fluid" />
            </div>
            <button 
              className="toggle-sidebar-btn" 
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              <i className={`fas fa-${isSidebarCollapsed ? 'angle-right' : 'angle-left'}`}></i>
            </button>
          </div>

          <ul className="sidebar-menu">
            <li className={activeMenu === 'dashboard' ? 'active' : ''}>
              <Link href="/admin"><i className="fas fa-tachometer-alt menu-icon"></i><span>Dashboard</span></Link>
            </li>
            <li className={activeMenu === 'blog' ? 'active' : ''}>
              <Link href="/admin/blog"><i className="fas fa-newspaper menu-icon"></i><span>Blog</span></Link>
            </li>
            <li className={activeMenu === 'faq' ? 'active' : ''}>
              <Link href="/admin/faq"><i className="fas fa-question-circle menu-icon"></i><span>FAQ</span></Link>
            </li>
            <li className={activeMenu === 'setores' ? 'active' : ''}>
              <Link href="/admin/setores"><i className="fas fa-users menu-icon"></i><span>Setores</span></Link>
            </li>
            <li className={activeMenu === 'paginas' ? 'active' : ''}>
              <Link href="/admin/paginas"><i className="fas fa-file-alt menu-icon"></i><span>Páginas</span></Link>
            </li>
            <li className={activeMenu.includes('arquivos') ? 'active' : ''}>
              <Link href="/admin/arquivos"><i className="fas fa-folder-open menu-icon"></i><span>Arquivos</span></Link>
              <ul className={`submenu ${activeMenu.includes('arquivos') ? 'show' : ''}`}>
                <li className={activeMenu === 'arquivos' ? 'active' : ''}>
                  <Link href="/admin/arquivos"><i className="fas fa-circle-dot submenu-icon"></i><span>Antigo</span></Link>
                </li>
                <li className={activeMenu === 'gerenciador' ? 'active' : ''}>
                  <Link href="/admin/gerenciador"><i className="fas fa-file-alt submenu-icon"></i><span>Gerenciador</span></Link>
                </li>
              </ul>
            </li>
            <li className={activeMenu === 'usuarios' ? 'active' : ''}>
              <Link href="/admin/usuarios"><i className="fas fa-users-cog menu-icon"></i><span>Usuários</span></Link>
            </li>
            <li className={activeMenu.includes('configuracoes') ? 'active' : ''}>
              <Link href="/admin/configuracoes"><i className="fas fa-cog menu-icon"></i><span>Configurações</span></Link>
              <ul className={`submenu ${activeMenu.includes('configuracoes') ? 'show' : ''}`}>
                <li className={activeMenu === 'configuracoes' ? 'active' : ''}>
                  <Link href="/admin/configuracoes"><i className="fas fa-circle-dot submenu-icon"></i><span>Gerais</span></Link>
                </li>
                <li className={activeMenu === 'configuracoes-seo' ? 'active' : ''}>
                  <Link href="/admin/configuracoes-seo"><i className="fas fa-search submenu-icon"></i><span>SEO</span></Link>
                </li>
                <li className={activeMenu === 'configuracoes-email' ? 'active' : ''}>
                  <Link href="/admin/configuracoes-email"><i className="fas fa-envelope submenu-icon"></i><span>Email</span></Link>
                </li>
              </ul>
            </li>
            <li className={activeMenu === 'seguranca' ? 'active' : ''}>
              <Link href="/admin/seguranca"><i className="fas fa-shield-alt menu-icon"></i><span>Segurança</span></Link>
            </li>
          </ul>
        </div>

        <div className={`admin-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
          <div className="admin-header">
            <div className="header-content">
              <h1 className="page-title">{pageTitle || 'Painel Administrativo'}</h1>
              <div className="user-info">
                <div className="dropdown">
                  <button 
                    className="user-dropdown-btn" 
                    type="button" 
                    id="userMenu" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span>{user?.name || 'Admin'}</span>
                    <div className="user-avatar">
                      <img src="/images/admin/avatar.png" alt="Avatar do Administrador" />
                    </div>
                    <i className="fas fa-chevron-down ms-2"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li><Link className="dropdown-item" href="/admin/perfil"><i className="fas fa-user me-2"></i> Meu Perfil</Link></li>
                    <li><Link className="dropdown-item" href="/admin/configuracoes"><i className="fas fa-cog me-2"></i> Configurações</Link></li>
                    <li><Link className="dropdown-item" href="/admin/seguranca"><i className="fas fa-shield-alt me-2"></i> Segurança</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={logout}><i className="fas fa-sign-out-alt me-2"></i> Sair</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-wrapper">
            {children}
          </div>
        </div>

        <style jsx>{`
          .admin-wrapper {
            display: flex;
            min-height: 100vh;
          }
          
          .admin-sidebar {
            width: 250px;
            background: #2c3e50;
            color: #fff;
            transition: all 0.3s;
            position: fixed;
            height: 100%;
            overflow-y: auto;
            z-index: 999;
          }
          
          .admin-sidebar.collapsed {
            width: 70px;
          }
          
          .sidebar-header {
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          
          .logo-container {
            max-width: 150px;
            overflow: hidden;
          }
          
          .logo-container img {
            max-width: 100%;
          }
          
          .toggle-sidebar-btn {
            background: transparent;
            color: #fff;
            border: none;
            font-size: 18px;
            cursor: pointer;
          }
          
          .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }
          
          .sidebar-menu li {
            margin-bottom: 5px;
          }
          
          .sidebar-menu li a {
            display: flex;
            align-items: center;
            color: #ecf0f1;
            padding: 10px 15px;
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
          }
          
          .sidebar-menu li.active > a {
            background: rgba(255,255,255,0.1);
            border-left: 3px solid #3498db;
            color: #fff;
          }
          
          .sidebar-menu li a:hover {
            background: rgba(255,255,255,0.05);
          }
          
          .sidebar-menu .submenu {
            list-style: none;
            padding-left: 30px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            margin: 0;
          }
          
          .sidebar-menu .submenu.show {
            max-height: 200px;
          }
          
          .sidebar-menu .submenu li a {
            padding: 8px 15px;
            font-size: 0.9rem;
          }
          
          .submenu-icon {
            font-size: 0.6rem;
            margin-right: 10px;
            width: 15px;
            text-align: center;
          }
          
          .menu-icon {
            margin-right: 10px;
            width: 20px;
            text-align: center;
          }
          
          .admin-content {
            flex: 1;
            margin-left: 250px;
            transition: all 0.3s;
            background: #f5f7fa;
          }
          
          .admin-content.expanded {
            margin-left: 70px;
          }
          
          .admin-header {
            background: #fff;
            padding: 15px 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .page-title {
            font-size: 1.5rem;
            margin: 0;
            color: #2c3e50;
          }
          
          .user-info {
            display: flex;
            align-items: center;
          }
          
          .user-dropdown-btn {
            display: flex;
            align-items: center;
            background: none;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
          }
          
          .user-dropdown-btn:hover {
            background: #f5f7fa;
          }
          
          .user-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 10px;
            border: 2px solid #f0f0f0;
          }
          
          .user-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .content-wrapper {
            padding: 30px;
          }
          
          /* Ajustes para dispositivos móveis */
          @media (max-width: 768px) {
            .admin-sidebar {
              width: 70px;
              transform: translateX(0);
            }
            
            .admin-sidebar.expanded {
              width: 250px;
            }
            
            .admin-content {
              margin-left: 70px;
            }
            
            .admin-content.expanded {
              margin-left: 250px;
            }
            
            .admin-sidebar .sidebar-menu span {
              opacity: 0;
              display: none;
            }
            
            .admin-sidebar.expanded .sidebar-menu span {
              opacity: 1;
              display: inline;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
