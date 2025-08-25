#!/usr/bin/env node

/**
 * Script para gerar sitemap.xml e robots.txt
 * Execute: node scripts/generate-sitemap.js
 */

const { saveSitemap } = require('../src/utils/sitemap');

console.log('🚀 Gerando sitemap.xml e robots.txt...');
saveSitemap();
console.log('✅ Arquivos gerados com sucesso!');
