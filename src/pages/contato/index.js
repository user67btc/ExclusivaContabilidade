import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SEOHead from '../../components/SEO/SEOHead';

export default function ContatoPage() {
  const { error: showError, success: showSuccess } = useNotification();
  
  // Adicionar data-page ao body para CSS específico
  useEffect(() => {
    document.body.setAttribute('data-page', 'contato');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Dados estruturados JSON-LD para a página de contato
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      'name': 'Exclusiva Contabilidade',
      'description': 'Soluções contábeis personalizadas para empresas, profissionais e produtores rurais em Campo Grande - MS',
      'url': 'https://exclusivacontabilidade.com.br/contato/',
      'logo': 'https://exclusivacontabilidade.com.br/images/logo.png',
      'telephone': '+5567999846350',
      'email': 'contato@exclusivacontabilidade.com.br',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Rua Marquês de Pombal, nº 112',
        'addressLocality': 'Campo Grande',
        'addressRegion': 'MS',
        'postalCode': '79002-160',
        'addressCountry': 'BR'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '-20.4435',
        'longitude': '-54.6478'
      },
      'openingHours': 'Mo,Tu,We,Th,Fr 08:00-18:00',
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '18:00'
        }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.mensagem.trim()) newErrors.mensagem = 'Mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      // Aqui seria a integração com API de envio de email
      // Por enquanto apenas simulamos o envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resetar formulário e mostrar mensagem de sucesso
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        assunto: '',
        mensagem: ''
      });
      
      setFormSubmitted(true);
      showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      // Substituído alert por notificação moderna
      showError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Entre em Contato | Exclusiva Contabilidade"
        description="Entre em contato com a Exclusiva Contabilidade para tirar dúvidas, solicitar orçamentos ou agendar uma visita em Campo Grande - MS."
        keywords="contato contabilidade, contabilidade campo grande, orçamento contábil, assessoria fiscal"
        canonical="https://exclusivacontabilidade.com.br/contato/"
        schemaData={schemaData}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contato</li>
            </ol>
          </nav>
          <h1>Entre em Contato</h1>
          <p>Estamos prontos para atender você e sua empresa. Entre em contato conosco para tirar dúvidas, solicitar orçamentos ou agendar uma visita.</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Informações de Contato</span>
            <h2>Fale Conosco</h2>
            <p>Estamos prontos para atender você e sua empresa. Escolha a forma de contato mais conveniente.</p>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fas fa-phone"></i>
                </div>
                <h3>Telefone</h3>
                <p>(67) 3211-4750</p>
                <a href="tel:+556732114750" className="btn-pattern btn-outline">Ligar Agora</a>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <h3>WhatsApp</h3>
                <p>(67) 99984-6350</p>
                <a href="https://wa.me/5567999846350?text=Olá! Gostaria de falar com a equipe da Exclusiva." target="_blank" rel="noopener noreferrer" className="btn-pattern btn-outline">Conversar</a>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="content-card text-center">
                <div className="icon-pattern mx-auto">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>E-mail</h3>
                <p>contato@exclusivacontabilidade.com.br</p>
                <a href="mailto:contato@exclusivacontabilidade.com.br" className="btn-pattern btn-outline">Enviar E-mail</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-card">
                <div className="section-header-pattern">
                  <span className="section-subtitle">Formulário de Contato</span>
                  <h2>Envie sua Mensagem</h2>
                  <p>Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nome" className="form-label">Nome Completo *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                      {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">E-mail *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="telefone" className="form-label">Telefone *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                      />
                      {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="empresa" className="form-label">Empresa</label>
                      <input
                        type="text"
                        className="form-control"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="assunto" className="form-label">Assunto</label>
                    <select
                      className="form-control"
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="orcamento">Solicitação de Orçamento</option>
                      <option value="duvidas">Dúvidas sobre Serviços</option>
                      <option value="abertura">Abertura de Empresa</option>
                      <option value="consultoria">Consultoria Fiscal</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="mensagem" className="form-label">Mensagem *</label>
                    <textarea
                      className={`form-control ${errors.mensagem ? 'is-invalid' : ''}`}
                      id="mensagem"
                      name="mensagem"
                      rows="5"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {errors.mensagem && <div className="invalid-feedback">{errors.mensagem}</div>}
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-pattern btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="page-content">
        <div className="container">
          <div className="section-header-pattern">
            <span className="section-subtitle">Nossa Localização</span>
            <h2>Onde Estamos</h2>
            <p>Visite nosso escritório em Campo Grande - MS</p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="content-card">
                <h3>Endereço</h3>
                <p><strong>Rua Marquês de Pombal, nº 112</strong><br />
                Centro, Campo Grande - MS<br />
                CEP: 79002-160</p>
                
                <h4>Horário de Funcionamento:</h4>
                <ul className="list-pattern">
                  <li>Segunda a Sexta: 08:00 às 18:00</li>
                  <li>Sábado: Sob agendamento</li>
                  <li>Domingo: Fechado</li>
                </ul>
                
                <div className="contact-actions">
                  <a href="https://maps.google.com/?q=Rua+Marquês+de+Pombal+112+Campo+Grande+MS" target="_blank" rel="noopener noreferrer" className="btn-pattern btn-outline">
                    <i className="fas fa-map-marker-alt me-2"></i>Ver no Mapa
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4!2d-54.6478!3d-20.4435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDI2JzM2LjYiUyA1NMKwMzgnNTIuMSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="300"
                  style={{border: 0, borderRadius: '10px'}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Exclusiva Contabilidade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Quer um atendimento mais rápido?</h2>
              <p>Entre em contato pelo WhatsApp para um atendimento imediato.</p>
              <a 
                href="https://api.whatsapp.com/send?phone=5567999846350&text=Olá,%20gostaria%20de%20informações%20sobre%20os%20serviços%20da%20Exclusiva%20Contabilidade!" 
                className="btn-pattern btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp me-2"></i> Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
