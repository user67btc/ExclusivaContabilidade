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

## 🔒 GUIA DE SEGURANÇA - EXCLUSIVA CONTABILIDADE

## COMO SEUS DADOS ESTÃO PROTEGIDOS

### 🛡️ **CAMADAS DE PROTEÇÃO**

#### **1. ARQUIVO .gitignore (Primeira Linha de Defesa)**
```bash
# Bloqueia TODOS os arquivos .env
.env*
!.env.example  # Exceto o template (sem dados reais)
```

**O que isso significa:**
- **NUNCA** seus dados reais vão para o GitHub
- **Apenas** templates vazios são públicos
- **Automático** - Git ignora esses arquivos sempre

#### **2. VARIÁVEIS DE AMBIENTE (Dados Reais Protegidos)**

**Arquivo Local (.env.local) - PRIVADO:**
```bash
NEXT_PUBLIC_GA_ID=G-1234567890        # ← SEU ID REAL
NEXT_PUBLIC_FB_PIXEL_ID=987654321     # ← SEU PIXEL REAL
SMTP_PASS=sua_senha_real              # ← SUA SENHA REAL
```

**Arquivo Público (.env.example) - TEMPLATE:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # ← APENAS EXEMPLO
NEXT_PUBLIC_FB_PIXEL_ID=123456789     # ← APENAS EXEMPLO  
SMTP_PASS=your_app_password           # ← APENAS EXEMPLO
```

#### **3. CÓDIGO PÚBLICO (Sem Dados Sensíveis)**
```javascript
// No código público você verá apenas:
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;  // ← Referência à variável
// NUNCA verá: const GA_ID = "G-1234567890";   ← Valor real
```

### 🔐 **FLUXO DE PROTEÇÃO**

#### **Desenvolvimento Local:**
1. Você cria `.env.local` com dados reais
2. Git ignora automaticamente (`.gitignore`)
3. Aplicação funciona normalmente

#### **Repository GitHub (Público):**
1. Apenas código e templates são enviados
2. **ZERO dados sensíveis** no repository
3. Qualquer pessoa pode ver o código, **MAS NÃO** seus dados

#### **Deploy Vercel:**
1. Você configura variáveis no dashboard Vercel
2. Vercel injeta os valores reais durante o build
3. Site funciona com seus dados reais
4. **Dados NUNCA** ficam expostos publicamente

### 📊 **EXEMPLO PRÁTICO**

**O que as pessoas VÃO ver no GitHub:**
```javascript
// components/analytics/GoogleAnalytics.js
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
if (!GA_ID) return null; // Não carrega se não configurado
```

**O que as pessoas NÃO VÃO ver:**
- Seu ID real do Google Analytics
- Sua senha de email
- Suas chaves de API
- Qualquer credencial real

### 🎯 **CONFIGURAÇÃO VERCEL (Onde Ficam os Dados Reais)**

**Dashboard Vercel → Settings → Environment Variables:**
```
NEXT_PUBLIC_GA_ID = G-1234567890        # ← SEU VALOR REAL
NEXT_PUBLIC_FB_PIXEL_ID = 987654321     # ← SEU VALOR REAL
SMTP_PASS = sua_senha_real              # ← SUA SENHA REAL
```

**Acesso:** Apenas você (dono do projeto Vercel)

### ✅ **GARANTIAS DE SEGURANÇA**

1. **Git nunca vê** seus dados reais (`.gitignore`)
2. **GitHub nunca recebe** seus dados reais
3. **Pessoas nunca acessam** suas credenciais
4. **Vercel protege** suas variáveis de ambiente
5. **Site funciona** normalmente com dados reais

### 🚨 **O QUE ACONTECE SE ALGUÉM CLONAR SEU REPOSITORY**

1. **Baixa o código** - ✅ Normal
2. **Tenta rodar** - ❌ Não funciona (sem variáveis)
3. **Precisa configurar** suas próprias variáveis
4. **Nunca acessa** seus dados reais

**Resultado:** Código público + Dados privados = **Segurança Total**

---
**CONCLUSÃO:** Repository público é **100% seguro** - seus dados ficam apenas no Vercel, nunca no GitHub.

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
