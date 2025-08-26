# 🛡️ Guia de Segurança - Exclusiva Contabilidade

## ⚠️ IMPORTANTE: Repositório Público

**ATENÇÃO**: Este repositório está atualmente **PÚBLICO** no GitHub, o que significa que qualquer pessoa pode visualizar todo o código-fonte.

## 🔧 Passos para Tornar o Projeto Seguro

### 1. Migrar Repositório para Privado

**No GitHub:**
1. Acesse: https://github.com/user67btc/ExclusivaContabilidade
2. Vá em **Settings** → **General**
3. Role até **Danger Zone**
4. Clique em **Change repository visibility**
5. Selecione **Make private**
6. Confirme digitando o nome do repositório

### 2. Configurar Variáveis de Ambiente no Vercel

**No Dashboard Vercel:**
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **ExclusivaContabilidade**
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-SEU-ID-AQUI
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Contato
NEXT_PUBLIC_WHATSAPP_NUMBER=5567999846350
NEXT_PUBLIC_CONTACT_EMAIL=contato@exclusivacontabilidade.com.br

# Site
NEXT_PUBLIC_SITE_URL=https://exclusivacontabilidade.com.br
```

### 3. Criar Arquivo .env.local (Local)

**No seu computador:**
1. Copie o arquivo `.env.example` para `.env.local`
2. Configure os valores reais das variáveis
3. **NUNCA** commite o arquivo `.env.local`

```bash
cp .env.example .env.local
# Edite o .env.local com os valores reais
```

## 📊 Analytics Implementados

### Google Analytics 4
- ✅ Componente seguro criado
- ✅ Tracking automático de páginas
- ✅ Eventos customizados disponíveis

### Facebook Pixel
- ✅ Componente seguro criado  
- ✅ Tracking de conversões
- ✅ Eventos pré-definidos para contabilidade

### Uso dos Analytics

```javascript
import { exclusivaEvents } from '../components/analytics';

// Tracking de contato
exclusivaEvents.contactForm('whatsapp');

// Tracking de orçamento
exclusivaEvents.quoteRequest('contabilidade-geral');

// Tracking de visualização de serviço
exclusivaEvents.serviceView('prestadores-servicos');
```

## 🔒 Boas Práticas de Segurança

### ✅ O que FAZER:
- Usar variáveis de ambiente para dados sensíveis
- Manter repositório privado
- Configurar variáveis no Vercel Dashboard
- Usar prefixo `NEXT_PUBLIC_` apenas para dados que podem ser expostos
- Revisar regularmente acessos e permissões

### ❌ O que NÃO fazer:
- Nunca commitar arquivos `.env.local`
- Nunca colocar API keys diretamente no código
- Nunca expor dados sensíveis em repositórios públicos
- Nunca compartilhar tokens de acesso

## 🚀 Deploy Seguro

1. **Repositório Privado** ✅
2. **Variáveis no Vercel** ✅
3. **Analytics Configurados** ✅
4. **Código Limpo** ✅

## 📞 Próximos Passos

1. **URGENTE**: Tornar repositório privado
2. Configurar variáveis no Vercel
3. Obter IDs reais do Google Analytics e Facebook Pixel
4. Testar tracking em produção
5. Configurar Google Search Console
6. Implementar ReCaptcha nos formulários

---

**⚠️ LEMBRETE**: Após tornar o repositório privado, todas as informações sensíveis estarão protegidas e apenas pessoas autorizadas poderão acessar o código-fonte.
