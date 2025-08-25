# Exclusiva Contabilidade - Site Institucional

Site institucional da Exclusiva Assessoria Contábil desenvolvido com Next.js.

## Tecnologias Utilizadas

- **Next.js 14.2.30**
- **React 18**
- **CSS Modular e Global**
- **Font Awesome** para ícones
- **Google Analytics, Facebook Pixel e Microsoft Clarity** para analytics

## Estrutura do Projeto

```
ExclusivaNextjs/
├── public/               # Arquivos estáticos
├── src/
│   ├── components/       # Componentes React
│   ├── pages/            # Páginas e API routes
│   ├── services/         # Serviços e funções de utilidade
│   ├── styles/           # Arquivos CSS
│   └── utils/            # Funções utilitárias
├── .env.local            # Variáveis de ambiente locais
├── .env.production       # Variáveis de ambiente produção
├── next.config.js        # Configuração do Next.js
├── netlify.toml          # Configuração para deploy no Netlify
└── vercel.json           # Configuração para deploy no Vercel
```

## Funcionalidades Principais

- **Site Responsivo:** Layout adaptável para todos os dispositivos, desde desktops até smartphones pequenos
- **Otimização SEO:** Meta tags, Open Graph, Twitter Cards e Schema.org para rich snippets
- **Navegação SPA:** Experiência de navegação sem recarregar a página inteira
- **Formulários Interativos:** Formulários com máscaras de input e validação
- **FAQ com Pesquisa:** Seção de perguntas frequentes com filtro e pesquisa
- **Botão Flutuante WhatsApp:** Botão de contato rápido
- **Botão Voltar ao Topo:** Melhoria de usabilidade em páginas longas
- **Painel Administrativo:** Área exclusiva para gestão de conteúdo

## Comandos Úteis

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Verificar problemas de código
npm run lint
```

### Produção

```bash
# Criar build de produção
npm run build

# Iniciar servidor de produção
npm start
```

## Implantação

### Opção 1: Vercel (Recomendado)

1. Conecte seu repositório à Vercel
2. A Vercel detectará automaticamente o projeto Next.js
3. Configure as variáveis de ambiente no painel da Vercel
4. Implante!

### Opção 2: Netlify

1. Conecte seu repositório ao Netlify
2. Configure o comando de build como `npm run build`
3. Configure o diretório de publicação como `.next`
4. Adicione as variáveis de ambiente
5. Implante!

## SEO e Monitoramento

- Sitemap disponível em: `/sitemap.xml`
- Robots.txt disponível em: `/robots.txt`
- Google Analytics, Facebook Pixel e Microsoft Clarity já configurados

## Manutenção

### Atualização de Conteúdo

- Utilize o painel administrativo em `/admin` para atualizar:
  - Artigos do blog
  - Perguntas frequentes
  - Páginas de serviços e setores

### Atualizações Técnicas

- Atualize o Next.js e dependências periodicamente
- Verifique console do navegador para detectar erros JavaScript
- Monitore o desempenho através do Google Analytics e Microsoft Clarity

## Responsáveis

- Design e Desenvolvimento: Equipe Exclusiva Contabilidade
- Suporte: suporte@exclusivacontabilidade.com.br
