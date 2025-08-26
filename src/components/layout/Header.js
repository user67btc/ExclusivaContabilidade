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
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="site-logo">
          <Link href="/">
            <Image 
              src="/assets/images/logo.png" 
              alt="Exclusiva Assessoria Contábil" 
              width={220} 
              height={60} 
              priority
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
              <Link href="/setores" onClick={handleLinkClick}>Setores <i className="fas fa-chevron-down mobile-dropdown-icon"></i></Link>
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
