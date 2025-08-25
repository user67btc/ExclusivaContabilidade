/**
 * Script de otimização de imagens para o site Exclusiva Contabilidade
 * Este script usa Sharp para otimizar todas as imagens no diretório public/images
 * Reduz o tamanho dos arquivos mantendo uma boa qualidade visual
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Configurar opções de linha de comando
program
  .option('-q, --quality <number>', 'Qualidade da imagem (1-100)', 80)
  .option('-w, --webp', 'Converter para WebP', false)
  .option('-r, --resize <number>', 'Redimensionar largura máxima', null)
  .option('-d, --directory <path>', 'Diretório de imagens', 'public/images')
  .parse(process.argv);

const options = program.opts();

// Função para percorrer diretórios recursivamente
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else if (isImageFile(file)) {
      await optimizeImage(filePath);
    }
  }
}

// Verificar se é um arquivo de imagem baseado na extensão
function isImageFile(filename) {
  const extensions = ['.jpg', '.jpeg', '.png', '.gif'];
  return extensions.some(ext => filename.toLowerCase().endsWith(ext));
}

// Função para otimizar uma imagem
async function optimizeImage(filePath) {
  const fileInfo = path.parse(filePath);
  const outputPath = options.webp
    ? `${fileInfo.dir}/${fileInfo.name}.webp`
    : `${fileInfo.dir}/${fileInfo.name}_optimized${fileInfo.ext}`;
  
  try {
    // Ler o tamanho original
    const originalSize = fs.statSync(filePath).size;
    
    // Iniciar processamento com sharp
    let processor = sharp(filePath);
    
    // Redimensionar se solicitado
    if (options.resize) {
      processor = processor.resize({
        width: parseInt(options.resize),
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Otimização por formato
    if (options.webp) {
      // Converter para WebP
      await processor
        .webp({ quality: parseInt(options.quality) })
        .toFile(outputPath);
    } else if (filePath.toLowerCase().endsWith('.png')) {
      // Otimizar PNG
      await processor
        .png({ quality: parseInt(options.quality), compressionLevel: 9 })
        .toFile(outputPath);
    } else if (['.jpg', '.jpeg'].some(ext => filePath.toLowerCase().endsWith(ext))) {
      // Otimizar JPEG
      await processor
        .jpeg({ quality: parseInt(options.quality), progressive: true })
        .toFile(outputPath);
    } else {
      // Outros formatos
      await processor.toFile(outputPath);
    }
    
    // Tamanho após otimização
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = originalSize - optimizedSize;
    const savingsPercentage = (savings / originalSize * 100).toFixed(2);
    
    console.log(`✅ Otimizado: ${filePath}`);
    console.log(`   Tamanho original: ${formatBytes(originalSize)}`);
    console.log(`   Tamanho otimizado: ${formatBytes(optimizedSize)}`);
    console.log(`   Economia: ${formatBytes(savings)} (${savingsPercentage}%)`);
    
    // Substituir o arquivo original se não for WebP
    if (!options.webp) {
      fs.unlinkSync(filePath);
      fs.renameSync(outputPath, filePath);
      console.log(`   Arquivo original substituído.`);
    }
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${filePath}: ${error.message}`);
  }
}

// Função para formatar bytes em KB, MB, etc.
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Função principal
async function run() {
  const directory = path.resolve(options.directory);
  
  if (!fs.existsSync(directory)) {
    console.error(`❌ Diretório não encontrado: ${directory}`);
    process.exit(1);
  }
  
  console.log(`🚀 Iniciando otimização de imagens em: ${directory}`);
  console.log(`💬 Opções: qualidade=${options.quality}${options.resize ? ', redimensionar=' + options.resize : ''}${options.webp ? ', converter para WebP' : ''}`);
  console.log('\n');
  
  // Processar todas as imagens no diretório
  await processDirectory(directory);
  
  console.log('\n✨ Otimização de imagens concluída!');
}

// Executar o script
run().catch(err => {
  console.error('❌ Erro durante a otimização:', err);
  process.exit(1);
});
