import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const router = useRouter();
  const navRef = useRef(null);
  const menuToggleRef = useRef(null);

  // Force header to top with useEffect
  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.style.setProperty('position', 'fixed', 'important');
      header.style.setProperty('top', '0', 'important');
      header.style.setProperty('left', '0', 'important');
      header.style.setProperty('right', '0', 'important');
      header.style.setProperty('z-index', '10000', 'important');
      header.style.setProperty('margin', '0', 'important');
      header.style.setProperty('transform', 'translateZ(0)', 'important');
      console.log('🔥 HEADER: Force positioned to top');
    }
    
    // Also reset body margin/padding that might push header down
    document.body.style.setProperty('margin', '0', 'important');
    document.body.style.setProperty('padding', '0', 'important');
    document.documentElement.style.setProperty('margin', '0', 'important');
    document.documentElement.style.setProperty('padding', '0', 'important');
    
    // Force viewport to start at 0,0 with no white space
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
    
    // Remove any container margins that might create white space
    const containers = document.querySelectorAll('.container, .container-fluid, #__next');
    containers.forEach(container => {
      container.style.setProperty('margin-top', '0', 'important');
      container.style.setProperty('padding-top', '0', 'important');
    });
  }, []);

  // Controla a aparência do header ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
      setActiveSubMenu(null);
      // Remove a classe do body que impede o scroll
      document.body.classList.remove('menu-open');
    };

    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Detecta cliques fora do menu para fechá-lo em dispositivos móveis
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && 
          navRef.current && 
          !navRef.current.contains(event.target) &&
          menuToggleRef.current &&
          !menuToggleRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setActiveSubMenu(null);
        document.body.classList.remove('menu-open');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Fecha o menu mobile quando um link é clicado
  const handleLinkClick = (e) => {
    // Verifica se é um link com âncora
    const href = e.currentTarget.getAttribute('href');
    const isAnchorLink = href && href.includes('#') && href !== '#';
    
    if (isAnchorLink && window.innerWidth <= 991) {
      // Para links com âncora, usamos um delay maior para garantir navegação suave
      setTimeout(() => {
        setMobileMenuOpen(false);
        setActiveSubMenu(null);
        document.body.classList.remove('menu-open');
      }, 100);
    } else {
      // Para links normais, fechamos o menu imediatamente
      setMobileMenuOpen(false);
      setActiveSubMenu(null);
      document.body.classList.remove('menu-open');
    }
    return true; // Permite que a navegação continue normalmente
  };

  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    // Adiciona ou remove a classe do body para controlar o overlay de fundo
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      setActiveSubMenu(null);
    }
  };
  
  const toggleSubmenu = (e, menuName) => {
    // Apenas em dispositivos móveis
    if (window.innerWidth <= 991) {
      e.preventDefault();
      e.stopPropagation();
      setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
    }
  };

  return (
    <header 
      className={`site-header ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed !important',
        top: '0 !important',
        left: '0 !important',
        right: '0 !important',
        width: '100vw !important',
        height: '80px !important',
        zIndex: '10000 !important',
        backgroundColor: '#ffffff !important',
        borderBottom: '2px solid #1e40af !important',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15) !important',
        display: 'flex !important',
        alignItems: 'center !important',
        padding: '0 20px !important',
        margin: '0 !important',
        transform: 'translateZ(0) !important'
      }}
    >
      <div className="container" style={{
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        margin: '0'
      }}>
        <div className="site-logo">
          <Link href="/">
            <Image 
              src="/assets/images/logo.png" 
              alt="Exclusiva Assessoria Contábil" 
              width={180} 
              height={48} 
              priority
              style={{
                maxHeight: '48px',
                width: 'auto'
              }}
            />
          </Link>
        </div>
        
        <button 
          ref={menuToggleRef}
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Menu" 
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <nav ref={navRef} className={`main-navigation ${mobileMenuOpen ? 'active' : ''}`} aria-hidden={!mobileMenuOpen}>
          <ul>
            <li>
              <Link href="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link href="/sobre" onClick={handleLinkClick}>Sobre Nós</Link>
            </li>
            <li className={`has-submenu ${activeSubMenu === 'setores' ? 'submenu-active' : ''}`}>
              <Link href="/setores" onClick={(e) => toggleSubmenu(e, 'setores')}>Setores <i className="fas fa-chevron-down mobile-dropdown-icon"></i></Link>
              <ul className={`sub-menu ${activeSubMenu === 'setores' ? 'show-submenu' : ''}`}>
                <li><Link href="/setores/prestadores" onClick={handleLinkClick}>Prestadores de Serviços</Link></li>
                <li><Link href="/setores/comercio" onClick={handleLinkClick}>Comércio</Link></li>
                <li><Link href="/setores/esocial" onClick={handleLinkClick}>E-Social Doméstico</Link></li>
              </ul>
            </li>
            <li className={`has-submenu ${activeSubMenu === 'servicos' ? 'submenu-active' : ''}`}>
              <Link href="/servicos" onClick={(e) => toggleSubmenu(e, 'servicos')}>Serviços <i className="fas fa-chevron-down mobile-dropdown-icon"></i></Link>
              <ul className={`sub-menu ${activeSubMenu === 'servicos' ? 'show-submenu' : ''}`}>
                <li><Link href="/servicos#contabilidade" onClick={handleLinkClick}>Contabilidade</Link></li>
                <li><Link href="/servicos#fiscal" onClick={handleLinkClick}>Fiscal e Tributário</Link></li>
                <li><Link href="/servicos#pessoal" onClick={handleLinkClick}>Departamento Pessoal</Link></li>
                <li><Link href="/servicos#consultoria" onClick={handleLinkClick}>Consultoria Empresarial</Link></li>
              </ul>
            </li>

            <li><Link href="/blog" onClick={handleLinkClick}>Blog</Link></li>
            <li><Link href="/faq" onClick={handleLinkClick}>FAQ</Link></li>
            <li><Link href="/contato" onClick={handleLinkClick}>Contato</Link></li>
          </ul>
          
        </nav>
      </div>
    </header>
  );
}
