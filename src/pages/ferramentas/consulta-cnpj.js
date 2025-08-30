import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SEOHead from '../../components/SEO/SEOHead';
import { useInView } from 'react-intersection-observer';
import ShareTools from '../../components/common/ShareTools';
import { getConsultaCnpjJsonLd, getToolKeywords, getToolDescription, getToolTitle } from '../../utils/seoTools';

const ConsultaCNPJ = () => {
  // Hooks de animação para elementos que entram na viewport
  const { ref: titleRef, inView: titleVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <Layout>
      <SEOHead
        title={getToolTitle('consulta-cnpj')}
        description={getToolDescription('consulta-cnpj')}
        canonicalUrl="/ferramentas/consulta-cnpj"
        ogType="website"
        keywords={getToolKeywords('consulta-cnpj')}
        indexPage={true}
        jsonLd={getConsultaCnpjJsonLd()}
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Consulta de CNPJ</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Verificação rápida e gratuita da situação cadastral de empresas através do CNPJ.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-building"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Componente de Consulta CNPJ */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 text-center">
                <div className="mb-4">
                  <div className="d-flex justify-content-center mb-4">
                    <img 
                      src="https://www.gov.br/receitafederal/pt-br/@@govbr.institucional.banner/logo-receita-federal.png" 
                      alt="Receita Federal" 
                      style={{ maxHeight: '80px' }} 
                      className="img-fluid"
                    />
                  </div>
                  <h4 className="fw-bold">Consulta de CNPJ</h4>
                  <p className="text-muted mb-4">
                    Para consultar dados de CNPJ, você será redirecionado para o site oficial da Receita Federal do Brasil
                  </p>
                </div>
                
                <button 
                  className="btn btn-lg btn-primary mb-4" 
                  onClick={() => {
                    window.open('https://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao.asp', '_blank');
                    
                    // Registrar evento no Analytics
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'consulta_cnpj_redirecionamento', {
                        'event_category': 'ferramentas',
                        'event_label': 'receita_federal'
                      });
                    }
                  }}
                >
                  <i className="far fa-external-link me-2"></i>
                  Consultar CNPJ na Receita Federal
                </button>
                
                <div className="alert alert-info">
                  <h5 className="alert-heading"><i className="far fa-info-circle me-2"></i>Informações</h5>
                  <p>
                    A consulta de CNPJ permite verificar dados cadastrais de empresas, 
                    como situação cadastral, endereço, atividades econômicas, 
                    sócios e responsáveis legais.
                  </p>
                  <p className="mb-0">
                    A consulta é gratuita e realizada diretamente no site da Receita Federal, 
                    garantindo informações oficiais e atualizadas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Componente de compartilhamento social */}
            <div className="mt-5">
              <ShareTools 
                title="Consulta de CNPJ"
                text="Consulte dados cadastrais de empresas diretamente na Receita Federal. Verificação gratuita e oficial!"
                hashtags={["contabilidade", "cnpj", "receitafederal", "empresa", "consulta", "cadastro"]}
              />
            </div>
            
            {/* Guia informativo sobre CNPJ */}
            <div className="card shadow-sm border-0 mt-5">
              <div className="card-header bg-light py-3">
                <h3 className="h5 mb-0 fw-bold">
                  <i className="far fa-info-circle me-2 text-primary"></i>
                  Guia Completo sobre CNPJ
                </h3>
              </div>
              <div className="card-body p-4">
                <div className="accordion" id="accordionCNPJ">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingCNPJ">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCNPJ" aria-expanded="true" aria-controls="collapseCNPJ">
                        O que é CNPJ?
                      </button>
                    </h2>
                    <div id="collapseCNPJ" className="accordion-collapse collapse show" aria-labelledby="headingCNPJ" data-bs-parent="#accordionCNPJ">
                      <div className="accordion-body">
                        <p>O <strong>CNPJ (Cadastro Nacional da Pessoa Jurídica)</strong> é um número de identificação único atribuído pela Receita Federal a todas as empresas brasileiras.</p>
                        <ul>
                          <li><strong>Formato:</strong> XX.XXX.XXX/XXXX-XX (14 dígitos)</li>
                          <li><strong>Finalidade:</strong> Identificar empresas para fins tributários e legais</li>
                          <li><strong>Obrigatoriedade:</strong> Necessário para abertura de conta bancária, emissão de notas fiscais, etc.</li>
                          <li><strong>Validade:</strong> Permanente enquanto a empresa estiver ativa</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingConsulta">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseConsulta" aria-expanded="false" aria-controls="collapseConsulta">
                        Informações disponíveis na consulta
                      </button>
                    </h2>
                    <div id="collapseConsulta" className="accordion-collapse collapse" aria-labelledby="headingConsulta" data-bs-parent="#accordionCNPJ">
                      <div className="accordion-body">
                        <p>Ao consultar um CNPJ na Receita Federal, você terá acesso a:</p>
                        <ul>
                          <li><strong>Razão Social:</strong> Nome oficial da empresa</li>
                          <li><strong>Nome Fantasia:</strong> Nome comercial (se houver)</li>
                          <li><strong>Situação Cadastral:</strong> Ativa, Suspensa, Inapta, Baixada</li>
                          <li><strong>Endereço:</strong> Localização da sede da empresa</li>
                          <li><strong>CNAE:</strong> Atividade econômica principal e secundárias</li>
                          <li><strong>Capital Social:</strong> Valor do capital da empresa</li>
                          <li><strong>Quadro Societário:</strong> Sócios e administradores</li>
                          <li><strong>Data de abertura:</strong> Início das atividades</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSituacao">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSituacao" aria-expanded="false" aria-controls="collapseSituacao">
                        Situações Cadastrais
                      </button>
                    </h2>
                    <div id="collapseSituacao" className="accordion-collapse collapse" aria-labelledby="headingSituacao" data-bs-parent="#accordionCNPJ">
                      <div className="accordion-body">
                        <h6>Principais situações cadastrais:</h6>
                        <ul>
                          <li><strong>Ativa:</strong> Empresa regular e em funcionamento</li>
                          <li><strong>Suspensa:</strong> Atividades temporáriamente suspensas</li>
                          <li><strong>Inapta:</strong> Empresa não cumpriu obrigações fiscais</li>
                          <li><strong>Baixada:</strong> Empresa encerrou suas atividades</li>
                          <li><strong>Nula:</strong> Inscrição cancelada por irregularidades</li>
                        </ul>
                        
                        <div className="alert alert-warning mt-3">
                          <strong>Importante:</strong> Sempre verifique a situação cadastral antes de realizar negócios com uma empresa.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-success mt-4" role="alert">
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="far fa-shield-check fa-2x text-success"></i>
                    </div>
                    <div>
                      <h5 className="alert-heading">Consulta Oficial e Segura</h5>
                      <p className="mb-0">
                        Todas as consultas são realizadas diretamente no site oficial da Receita Federal, 
                        garantindo a veracidade e atualização das informações. Não cobramos nenhuma taxa adicional 
                        por este serviço, que é gratuito e público.
                      </p>
                      <div className="mt-3">
                        <Link href="/contato" passHref>
                          <a className="btn btn-success">
                            <i className="far fa-handshake me-2"></i>
                            Precisa de ajuda com regularização?
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConsultaCNPJ;
