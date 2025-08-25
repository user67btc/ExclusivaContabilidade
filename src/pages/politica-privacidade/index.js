import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  // Data de última atualização da política
  const lastUpdated = "02 de agosto de 2025";

  return (
    <Layout>
      <Head>
        <title>Política de Privacidade | Exclusiva Contabilidade</title>
        <meta name="description" content="Conheça nossa política de privacidade e como tratamos os seus dados pessoais na Exclusiva Contabilidade." />
        <link rel="canonical" href="https://exclusivacontabilidade.com.br/politica-privacidade/" />
      </Head>

      {/* Page Title */}
      <section className="page-title">
        <div className="container">
          <h1>Política de Privacidade</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Política de Privacidade</li>
          </ul>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="privacy-content">
                <div className="last-updated">
                  <p>Última atualização: {lastUpdated}</p>
                </div>

                <div className="privacy-introduction">
                  <p>A Exclusiva Assessoria Contábil Ltda, pessoa jurídica de direito privado, com sede na Rua Antônio Maria Coelho, 3721 - Sala 2, Campo Grande - MS, inscrita no CNPJ sob o nº XX.XXX.XXX/0001-XX, tem compromisso com a privacidade e a segurança das informações dos usuários de seu site e de seus clientes.</p>
                  
                  <p>Esta Política de Privacidade destina-se a informá-lo sobre como coletamos, usamos, compartilhamos e protegemos informações pessoais, bem como as escolhas que você pode fazer sobre como utilizamos essas informações.</p>
                </div>

                <div className="privacy-section">
                  <h2>1. Informações que coletamos</h2>
                  <p>Podemos coletar os seguintes tipos de informações:</p>
                  
                  <h3>1.1. Informações fornecidas diretamente por você</h3>
                  <ul>
                    <li>Dados de identificação: nome completo, RG, CPF, data de nascimento.</li>
                    <li>Dados de contato: endereço, e-mail, telefone.</li>
                    <li>Dados profissionais: profissão, empresa, cargo.</li>
                    <li>Dados financeiros: informações bancárias, faturamento.</li>
                    <li>Dados fiscais: declarações fiscais, impostos, contribuições.</li>
                    <li>Conteúdo das mensagens enviadas através de nossos formulários de contato.</li>
                  </ul>

                  <h3>1.2. Informações coletadas automaticamente</h3>
                  <ul>
                    <li>Dados de acesso: endereço IP, data e hora do acesso, páginas visitadas.</li>
                    <li>Dados do dispositivo: tipo de navegador, sistema operacional, identificadores de dispositivo.</li>
                    <li>Cookies e tecnologias semelhantes: podemos utilizar cookies para melhorar sua experiência em nosso site.</li>
                  </ul>
                </div>

                <div className="privacy-section">
                  <h2>2. Como utilizamos suas informações</h2>
                  <p>Utilizamos as informações coletadas para os seguintes fins:</p>
                  <ul>
                    <li>Prestação de serviços contábeis, fiscais e trabalhistas contratados.</li>
                    <li>Comunicação com você sobre serviços, atualizações e respostas às suas solicitações.</li>
                    <li>Cumprimento de obrigações legais e regulatórias.</li>
                    <li>Envio de comunicações de marketing, caso você tenha optado por recebê-las.</li>
                    <li>Melhoria dos nossos serviços e do website.</li>
                    <li>Proteção dos nossos direitos e prevenção de atividades fraudulentas.</li>
                  </ul>
                </div>

                <div className="privacy-section">
                  <h2>3. Base legal para o tratamento de dados</h2>
                  <p>O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais:</p>
                  <ul>
                    <li><strong>Execução de contrato:</strong> quando necessário para a prestação dos serviços contratados.</li>
                    <li><strong>Consentimento:</strong> quando você autoriza expressamente o uso de suas informações.</li>
                    <li><strong>Interesse legítimo:</strong> quando o uso dos dados é necessário para nossos interesses legítimos, desde que não prejudique seus direitos e liberdades.</li>
                    <li><strong>Obrigação legal:</strong> quando o tratamento é necessário para cumprir uma obrigação legal ou regulatória.</li>
                  </ul>
                </div>

                <div className="privacy-section">
                  <h2>4. Compartilhamento de informações</h2>
                  <p>Podemos compartilhar suas informações nas seguintes circunstâncias:</p>
                  <ul>
                    <li><strong>Parceiros e prestadores de serviços:</strong> empresas que nos auxiliam na prestação de serviços, como sistemas contábeis, serviços de hospedagem de dados e marketing.</li>
                    <li><strong>Órgãos governamentais e autoridades:</strong> quando exigido por lei, regulamento ou processo legal, ou para proteger nossos direitos.</li>
                    <li><strong>Transações corporativas:</strong> em caso de fusão, aquisição ou venda de ativos, seus dados podem ser transferidos como parte da transação.</li>
                  </ul>
                  <p>Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing sem o seu consentimento explícito.</p>
                </div>

                <div className="privacy-section">
                  <h2>5. Segurança das informações</h2>
                  <p>Implementamos medidas de segurança técnicas, administrativas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda, uso indevido, alteração ou destruição. Algumas destas medidas incluem:</p>
                  <ul>
                    <li>Criptografia de dados sensíveis.</li>
                    <li>Acesso restrito a informações pessoais.</li>
                    <li>Monitoramento de sistemas para detectar vulnerabilidades.</li>
                    <li>Treinamento de funcionários sobre práticas de segurança de dados.</li>
                  </ul>
                  <p>No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro, e não podemos garantir a segurança absoluta dos seus dados.</p>
                </div>

                <div className="privacy-section">
                  <h2>6. Seus direitos</h2>
                  <p>De acordo com a Lei Geral de Proteção de Dados Pessoais (LGPD), você tem os seguintes direitos em relação aos seus dados pessoais:</p>
                  <ul>
                    <li><strong>Acesso:</strong> direito de solicitar o acesso aos seus dados pessoais que processamos.</li>
                    <li><strong>Correção:</strong> direito de solicitar a retificação de dados incorretos ou incompletos.</li>
                    <li><strong>Eliminação:</strong> direito de solicitar a exclusão de seus dados, em determinadas circunstâncias.</li>
                    <li><strong>Portabilidade:</strong> direito de receber seus dados em formato estruturado e transferi-los para outro controlador.</li>
                    <li><strong>Revogação do consentimento:</strong> direito de retirar o consentimento a qualquer momento.</li>
                    <li><strong>Oposição:</strong> direito de se opor ao processamento de seus dados em determinadas circunstâncias.</li>
                    <li><strong>Informação:</strong> direito de ser informado sobre como seus dados são utilizados.</li>
                  </ul>
                  <p>Para exercer seus direitos, entre em contato conosco através dos canais indicados no final desta política.</p>
                </div>

                <div className="privacy-section">
                  <h2>7. Cookies e tecnologias semelhantes</h2>
                  <p>Nosso site utiliza cookies e tecnologias semelhantes para melhorar sua experiência de navegação, personalizar conteúdo e anúncios, fornecer recursos de mídia social e analisar o tráfego do site.</p>
                  
                  <h3>Tipos de cookies que utilizamos:</h3>
                  <ul>
                    <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site.</li>
                    <li><strong>Cookies analíticos:</strong> ajudam-nos a entender como os visitantes interagem com o site.</li>
                    <li><strong>Cookies de funcionalidade:</strong> permitem lembrar escolhas que você faz para melhorar sua experiência.</li>
                    <li><strong>Cookies de marketing:</strong> utilizados para rastrear visitantes em sites e coletar informações para fornecer anúncios personalizados.</li>
                  </ul>
                  
                  <p>Você pode gerenciar as preferências de cookies através das configurações do seu navegador. No entanto, a desativação de certos cookies pode afetar a funcionalidade do site.</p>
                </div>

                <div className="privacy-section">
                  <h2>8. Retenção de dados</h2>
                  <p>Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, contábeis ou de relatórios. Para determinar o período de retenção apropriado, consideramos:</p>
                  <ul>
                    <li>A quantidade, natureza e sensibilidade dos dados pessoais.</li>
                    <li>O risco potencial de dano pelo uso não autorizado ou divulgação.</li>
                    <li>Os propósitos para os quais processamos os dados.</li>
                    <li>Se podemos atingir esses propósitos por outros meios.</li>
                    <li>Requisitos legais aplicáveis.</li>
                  </ul>
                </div>

                <div className="privacy-section">
                  <h2>9. Crianças e adolescentes</h2>
                  <p>Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de crianças e adolescentes. Se tomarmos conhecimento de que coletamos dados pessoais de um menor de 18 anos sem verificação de consentimento parental, tomaremos medidas para remover essas informações de nossos servidores.</p>
                </div>

                <div className="privacy-section">
                  <h2>10. Alterações nesta política</h2>
                  <p>Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas práticas de informação. Se fizermos alterações materiais, notificaremos você por meio de um aviso visível em nosso site ou por e-mail. Recomendamos que você revise esta política periodicamente para estar ciente de como estamos protegendo suas informações.</p>
                </div>

                <div className="privacy-section">
                  <h2>11. Contato</h2>
                  <p>Se você tiver dúvidas, comentários ou solicitações relacionadas a esta Política de Privacidade ou ao processamento de seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):</p>
                  <div className="contact-info">
                    <p><strong>E-mail:</strong> dpo@exclusivacontabilidade.com.br</p>
                    <p><strong>Telefone:</strong> (67) 3206-9014</p>
                    <p><strong>Endereço:</strong> Rua Antônio Maria Coelho, 3721 - Sala 2, Campo Grande - MS, CEP: 79021-170</p>
                  </div>
                </div>

                <div className="privacy-acceptance">
                  <p>Ao utilizar nosso site ou fornecer seus dados pessoais, você confirma que leu e compreendeu esta Política de Privacidade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h2>Ainda tem dúvidas?</h2>
              <p>Entre em contato com nossa equipe para esclarecimentos sobre nossa política de privacidade ou tratamento de dados.</p>
              <Link href="/contato" className="btn btn-primary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
