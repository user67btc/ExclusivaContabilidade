import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <div className="footer-brand">
                <Image 
                  src="/assets/images/logo-white.png" 
                  alt="Exclusiva Assessoria Contábil" 
                  className="footer-logo-enhanced"
                  width={240}
                  height={60}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className="footer-tagline">
                  <span className="tagline-text">Excelência em Contabilidade Empresarial</span>
                  <div className="tagline-badge">
                    <i className="fas fa-certificate"></i>
                    <span>CRC/MS 6566</span>
                  </div>
                </div>
              </div>
              <p className="footer-description">Mais de 15 anos oferecendo soluções contábeis estratégicas para empresas que buscam crescimento sustentável e compliance total.</p>
              <ul className="social-links">
                <li>
                  <a 
                    href="https://facebook.com/exclusivacontabilidadems" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/exclusivacontabil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com/company/exclusiva-contabilidade" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20estou%20entrando%20em%20contato%20pelo%20site!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h4>Links Rápidos</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/sobre">Sobre Nós</Link></li>
                <li><Link href="/servicos">Serviços</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contato">Contato</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4>Serviços</h4>
              <ul className="footer-links">
                <li><Link href="/servicos">Contabilidade</Link></li>
                <li><Link href="/servicos">Fiscal e Tributário</Link></li>
                <li><Link href="/servicos">Departamento Pessoal</Link></li>
                <li><Link href="/servicos">Consultoria Empresarial</Link></li>
                <li><Link href="/setores/esocial">E-Social Doméstico</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4>Contato</h4>
              <ul className="footer-contact-enhanced">
                <li className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-content">
                    <span className="contact-label">Endereço</span>
                    <span className="contact-value">Rua Marquês de Pombal, nº 112<br/>Campo Grande - MS – CEP. 79002-160</span>
                  </div>
                </li>
                <li className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-content">
                    <span className="contact-label">Telefone</span>
                    <a href="tel:+5567999846350" className="contact-value contact-link">(67) 9 9984-6350</a>
                  </div>
                </li>
                <li className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-content">
                    <span className="contact-label">E-mail</span>
                    <a href="mailto:geraldo@exclusiva.cnt.br" className="contact-value contact-link">geraldo@exclusiva.cnt.br</a>
                  </div>
                </li>
                <li className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-content">
                    <span className="contact-label">Horário</span>
                    <span className="contact-value">Seg-Sex: 8h às 18h</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-enhanced">
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p>&copy; {new Date().getFullYear()} Exclusiva Assessoria Contábil - Todos os direitos reservados</p>
              <div className="footer-certifications">
                <span className="cert-item">
                  <i className="fas fa-shield-alt"></i>
                  Compliance Garantido
                </span>
                <span className="cert-item">
                  <i className="fas fa-award"></i>
                  15+ Anos de Experiência
                </span>
              </div>
            </div>
            <div className="footer-admin-links">
              <Link href="/admin/login" className="footer-admin-link admin-only">
                <i className="fas fa-user-shield"></i> Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
