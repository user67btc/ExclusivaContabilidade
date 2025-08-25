import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function TermsPage() {
  // Data de última atualização dos termos
  const lastUpdated = "20 de junho de 2023";

  return (
    <Layout>
      <Head>
        <title>Termos de Uso | Exclusiva Contabilidade</title>
        <meta name="description" content="Leia os termos e condições de uso do site e serviços da Exclusiva Contabilidade." />
        <link rel="canonical" href="https://exclusivacontabilidade.com.br/termos-de-uso/" />
      </Head>

      {/* Page Title */}
      <section className="page-title">
        <div className="container">
          <h1>Termos de Uso</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Termos de Uso</li>
          </ul>
        </div>
      </section>

      {/* Terms of Use Content */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="terms-content">
                <div className="last-updated">
                  <p>Última atualização: {lastUpdated}</p>
                </div>

                <div className="terms-introduction">
                  <p>Bem-vindo ao site da Exclusiva Assessoria Contábil Ltda. Os presentes Termos de Uso regulam o acesso e a utilização do site <Link href="/">www.exclusivacontabilidade.com.br</Link>, bem como o uso dos serviços oferecidos por meio dele.</p>
                  
                  <p>Ao acessar ou utilizar nosso site, você concorda em cumprir e estar sujeito a estes termos. Se não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site ou serviços.</p>
                </div>

                <div className="terms-section">
                  <h2>1. Aceitação dos Termos</h2>
                  <p>1.1. Ao acessar ou utilizar o site da Exclusiva Contabilidade, você declara que leu, compreendeu e concorda com estes Termos de Uso e nossa Política de Privacidade.</p>
                  
                  <p>1.2. Se você estiver acessando ou utilizando nosso site em nome de uma empresa ou outra entidade legal, você declara e garante que tem autoridade para vincular essa entidade a estes Termos de Uso.</p>
                  
                  <p>1.3. Reservamo-nos o direito de modificar estes termos a qualquer momento, a nosso critério exclusivo. As alterações entrarão em vigor imediatamente após a publicação dos termos atualizados. Seu uso continuado do site após tais alterações constitui sua aceitação dos novos termos.</p>
                </div>

                <div className="terms-section">
                  <h2>2. Uso do Site</h2>
                  <p>2.1. O site da Exclusiva Contabilidade é destinado a fornecer informações sobre nossos serviços contábeis, fiscais e trabalhistas, bem como conteúdo informativo sobre esses temas.</p>
                  
                  <p>2.2. Você concorda em utilizar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros, nem restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.</p>
                  
                  <p>2.3. Você é responsável por garantir que todas as pessoas que acessam nosso site através de sua conexão de internet estejam cientes destes termos e que os cumpram.</p>
                  
                  <h3>Condutas Proibidas</h3>
                  <p>2.4. Ao usar nosso site, você concorda em não:</p>
                  <ul>
                    <li>Utilizar o site de qualquer forma que possa danificar, desabilitar, sobrecarregar ou comprometer nossos sistemas ou interferir no uso do site por outros usuários;</li>
                    <li>Tentar acessar áreas restritas do site, nossos servidores, ou qualquer outra área onde você não tenha autorização para acessar;</li>
                    <li>Usar qualquer dispositivo, software ou rotina para interferir no funcionamento adequado do site;</li>
                    <li>Introduzir vírus, trojans, worms, bombas lógicas ou outro material malicioso ou tecnologicamente prejudicial;</li>
                    <li>Coletar ou extrair quaisquer informações do site sem nossa autorização prévia por escrito;</li>
                    <li>Usar o site para transmitir ou facilitar o envio de publicidade não solicitada ou não autorizada.</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h2>3. Propriedade Intelectual</h2>
                  <p>3.1. Todo o conteúdo deste site, incluindo, mas não se limitando a textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Exclusiva Assessoria Contábil Ltda ou de seus fornecedores de conteúdo e está protegido pelas leis brasileiras e internacionais de direitos autorais.</p>
                  
                  <p>3.2. Você pode visualizar, baixar e imprimir conteúdo do site para seu uso pessoal e não comercial, desde que:</p>
                  <ul>
                    <li>Não modifique os documentos ou gráficos de qualquer maneira;</li>
                    <li>Não remova quaisquer direitos autorais, marcas comerciais ou outras notificações de propriedade;</li>
                    <li>Não utilize o conteúdo de forma que sugira associação com nossos produtos, serviços ou marca.</li>
                  </ul>
                  
                  <p>3.3. Você não pode usar qualquer parte do conteúdo do nosso site para fins comerciais sem obter uma licença para fazê-lo de nós ou de nossos licenciadores.</p>
                </div>

                <div className="terms-section">
                  <h2>4. Conteúdo e Precisão das Informações</h2>
                  <p>4.1. Embora nos esforcemos para garantir que o conteúdo do nosso site seja preciso e atualizado, não podemos garantir que o mesmo esteja livre de erros ou omissões.</p>
                  
                  <p>4.2. O conteúdo do site é fornecido apenas para informação geral e não constitui aconselhamento contábil, fiscal, jurídico ou profissional. Você não deve confiar exclusivamente nas informações do site para tomar decisões sem consultar um profissional qualificado.</p>
                  
                  <p>4.3. Reservamo-nos o direito de modificar o conteúdo disponível no site a qualquer momento, mas não temos obrigação de atualizar qualquer informação em nosso site.</p>
                </div>

                <div className="terms-section">
                  <h2>5. Links para Terceiros</h2>
                  <p>5.1. Nosso site pode conter links para sites de terceiros que não são de nossa propriedade ou controlados por nós. A Exclusiva Contabilidade não tem controle e não assume responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites de terceiros.</p>
                  
                  <p>5.2. O fornecimento de tais links não implica nosso endosso, aprovação ou recomendação de qualquer site vinculado, nem qualquer associação com seus operadores.</p>
                  
                  <p>5.3. Recomendamos que você leia os termos e políticas de privacidade de qualquer site que visite a partir do nosso site.</p>
                </div>

                <div className="terms-section">
                  <h2>6. Privacidade e Proteção de Dados</h2>
                  <p>6.1. O uso que fazemos de qualquer informação pessoal que coletamos ou que você nos fornece está definido em nossa <Link href="/politica-privacidade">Política de Privacidade</Link>.</p>
                  
                  <p>6.2. Ao usar nosso site, você concorda com o processamento de suas informações conforme estabelecido em nossa Política de Privacidade e garante que todos os dados fornecidos por você são precisos.</p>
                </div>

                <div className="terms-section">
                  <h2>7. Limitação de Responsabilidade</h2>
                  <p>7.1. Na medida máxima permitida pela lei aplicável, a Exclusiva Contabilidade exclui todas as garantias, representações, condições e termos, expressos ou implícitos, relacionados ao nosso site e ao seu uso.</p>
                  
                  <p>7.2. Não seremos responsáveis por qualquer dano indireto, incidental, especial, consequencial ou punitivo, ou qualquer perda de lucros ou receitas, seja incorrida direta ou indiretamente, ou qualquer perda de dados, uso, fundo de comércio ou outras perdas intangíveis, resultantes de:</p>
                  <ul>
                    <li>Seu acesso ou uso, ou incapacidade de acessar ou usar o site;</li>
                    <li>Qualquer conduta ou conteúdo de terceiros no site;</li>
                    <li>Qualquer conteúdo obtido do site; e</li>
                    <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.</li>
                  </ul>
                  
                  <p>7.3. Nada nestes Termos de Uso exclui ou limita nossa responsabilidade por morte ou lesão pessoal decorrente de nossa negligência, fraude ou qualquer outra responsabilidade que não possa ser excluída ou limitada pela lei brasileira.</p>
                </div>

                <div className="terms-section">
                  <h2>8. Indenização</h2>
                  <p>8.1. Você concorda em defender, indenizar e isentar a Exclusiva Contabilidade, seus diretores, funcionários e agentes de e contra quaisquer reclamações, danos, obrigações, perdas, responsabilidades, custos ou dívidas, e despesas (incluindo, mas não se limitando a honorários advocatícios) decorrentes de:</p>
                  <ul>
                    <li>Seu uso e acesso ao site;</li>
                    <li>Sua violação destes Termos de Uso;</li>
                    <li>Sua violação de quaisquer direitos de terceiros, incluindo, mas não se limitando a direitos autorais, de propriedade ou de privacidade.</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h2>9. Rescisão</h2>
                  <p>9.1. Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos de Uso.</p>
                  
                  <p>9.2. Mediante rescisão, seu direito de usar o site cessará imediatamente.</p>
                </div>

                <div className="terms-section">
                  <h2>10. Lei Aplicável</h2>
                  <p>10.1. Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil.</p>
                  
                  <p>10.2. Quaisquer disputas decorrentes ou relacionadas ao uso do site ou a estes Termos de Uso estarão sujeitas à jurisdição exclusiva dos tribunais de Campo Grande, Mato Grosso do Sul.</p>
                </div>

                <div className="terms-section">
                  <h2>11. Disposições Gerais</h2>
                  <p>11.1. Estes Termos de Uso, juntamente com nossa Política de Privacidade, constituem o acordo integral entre você e a Exclusiva Contabilidade em relação ao nosso site e substituem todos os acordos anteriores em relação a esse assunto.</p>
                  
                  <p>11.2. Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível por qualquer tribunal de jurisdição competente, tal invalidade ou inexequibilidade não afetará a validade ou a aplicabilidade das disposições restantes.</p>
                  
                  <p>11.3. Nossa falha em fazer valer qualquer direito ou disposição destes Termos de Uso não será considerada uma renúncia a tais direitos.</p>
                  
                  <p>11.4. Reservamo-nos o direito, a nosso exclusivo critério, de alterar ou substituir qualquer parte destes Termos de Uso a qualquer momento.</p>
                </div>

                <div className="terms-section">
                  <h2>12. Contato</h2>
                  <p>12.1. Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:</p>
                  <div className="contact-info">
                    <p><strong>E-mail:</strong> contato@exclusivacontabilidade.com.br</p>
                    <p><strong>Telefone:</strong> (67) 3206-9014</p>
                    <p><strong>Endereço:</strong> Rua Antônio Maria Coelho, 3721 - Sala 2, Campo Grande - MS, CEP: 79021-170</p>
                  </div>
                </div>

                <div className="terms-acceptance">
                  <p>Ao utilizar nosso site, você confirma que leu, compreendeu e concorda com estes Termos de Uso.</p>
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
              <p>Entre em contato com nossa equipe para esclarecimentos sobre nossos termos de uso.</p>
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
