/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'exclusivacontabilidade.com.br'],
    unoptimized: true
  },
  trailingSlash: true,
  // Configuração para export estático
  experimental: {
    missingSuspenseWithCSRBailout: false,
    esmExternals: false
  },
  // Ignorar páginas admin no build para evitar erros
  exportPathMap: async function (defaultPathMap) {
    const pathMap = { ...defaultPathMap };
    // Remover páginas admin que causam problemas no build
    delete pathMap['/admin'];
    delete pathMap['/admin/analytics'];
    delete pathMap['/admin/arquivos'];
    delete pathMap['/admin/configuracoes-email'];
    delete pathMap['/admin/configuracoes-seo'];
    delete pathMap['/admin/seguranca'];
    delete pathMap['/admin/usuarios'];
    return pathMap;
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
