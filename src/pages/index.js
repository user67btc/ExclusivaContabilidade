import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Sectors from '../components/sections/Sectors';
import FAQ from '../components/sections/FAQ';
import ContactCTA from '../components/sections/ContactCTA';
import SEOHead from '../components/SEOHead';

export default function Home() {
  // Dados estruturados específicos para a página inicial
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Exclusiva Contabilidade - Soluções Contábeis em Campo Grande',
      description: 'Assessoria contábil especializada para empresas, prestadores de serviços, comércio e produtores rurais em Campo Grande - MS.',
      url: 'https://exclusivacontabilidade.com.br/',
      logo: 'https://exclusivacontabilidade.com.br/images/logo.png',
      image: 'https://exclusivacontabilidade.com.br/images/escritorio-exclusiva.jpg',
      priceRange: '$$',
      telephone: '+5567999846350',
      email: 'contato@exclusivacontabilidade.com.br',
      address: {
        '@type': 'PostalAddress',
        'streetAddress': 'Rua Marquês de Pombal, nº 112',
        'addressLocality': 'Campo Grande',
        'addressRegion': 'MS',
        'postalCode': '79002-160',
        'addressCountry': 'BR'
      },
      openingHours: 'Mo,Tu,We,Th,Fr 08:00-18:00',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '18:00'
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços Contábeis',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Contabilidade Empresarial'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Departamento Fiscal'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Departamento Pessoal'
            }
          }
        ]
      }
    }
  ];
  
  return (
    <Layout>
      <SEOHead 
        title="Exclusiva Assessoria Contábil em Campo Grande | Contabilidade Especializada"
        description="Contabilidade especializada em Campo Grande-MS. Assessoria fiscal, departamento pessoal e consultoria tributária. +500 empresas atendidas."
        keywords={[
          'contabilidade campo grande ms',
          'contador campo grande',
          'assessoria contábil',
          'consultoria tributária',
          'departamento pessoal',
          'abertura empresa',
          'simples nacional',
          'mei campo grande'
        ]}
        canonical="https://exclusivacontabilidade.com.br/"
        jsonLd={schemaData}
      />
      
      <Hero />
      <Services />
      <Sectors />
      <FAQ previewMode={true} />
      <ContactCTA />
    </Layout>
  );
}
