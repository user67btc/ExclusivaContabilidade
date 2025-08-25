import React from 'react';

/**
 * Componente para adicionar dados estruturados JSON-LD do Schema.org às páginas
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.type - Tipo do Schema (Organization, LocalBusiness, etc.)
 * @param {Object} props.data - Dados específicos do Schema
 * @returns {JSX.Element} - Script JSON-LD com dados estruturados
 */
const SchemaOrg = ({ type, data }) => {
  // Dados padrão da organização
  const defaultOrgData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'Exclusiva Contabilidade',
    description: 'Soluções contábeis personalizadas para empresas, profissionais e produtores rurais em Campo Grande - MS',
    url: 'https://exclusivacontabilidade.com.br',
    logo: 'https://exclusivacontabilidade.com.br/images/logo.png',
    image: 'https://exclusivacontabilidade.com.br/images/sharing-image.jpg',
    telephone: '+5567999846350',
    email: 'contato@exclusivacontabilidade.com.br',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo, 123',
      addressLocality: 'Campo Grande',
      addressRegion: 'MS',
      postalCode: '79000-000',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-20.4435',
      longitude: '-54.6478'
    },
    openingHours: 'Mo,Tu,We,Th,Fr 08:00-18:00',
    sameAs: [
      'https://www.facebook.com/exclusivacontabilidade',
      'https://www.instagram.com/exclusivacontabilidade/',
      'https://www.linkedin.com/company/exclusiva-contabilidade/'
    ]
  };

  // Combine os dados padrão com os dados específicos passados como prop
  const schemaData = { ...defaultOrgData, ...data };

  // Se for passado um tipo diferente, sobrescreve o tipo padrão
  if (type) {
    schemaData['@type'] = type;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaOrg;
