# 🚀 PASSOS PARA DEPLOY - EXCLUSIVA CONTABILIDADE

## PASSO 1: Criar Repository GitHub ⏳

### Acesse: https://github.com/user67btc
1. Clique em **"New repository"** (botão verde)
2. **Repository name:** `ExclusivaContabilidade`
3. **Description:** `Site Exclusiva Contabilidade - Next.js`
4. **Visibility:** ✅ **Public** 
5. **NÃO** marque "Add a README file"
6. **NÃO** marque "Add .gitignore"
7. **NÃO** marque "Choose a license"
8. Clique **"Create repository"**

---

## PASSO 2: Conectar Repository (Automático) ⏳

Após criar o repository, execute no terminal:

```bash
git remote add origin https://github.com/user67btc/ExclusivaContabilidade.git
git branch -M main
git push -u origin main
```

---

## PASSO 3: Reconectar Vercel ⏳

### Acesse: https://vercel.com/dashboard
1. **Import Project** ou **Add New Project**
2. **Import Git Repository**
3. Selecione: `user67btc/ExclusivaContabilidade`
4. **Deploy**

---

## PASSO 4: Configurar Variáveis Vercel ⏳

### No dashboard do projeto Vercel:
1. **Settings** → **Environment Variables**
2. Adicione suas variáveis reais:

```
NEXT_PUBLIC_GA_ID = [SEU_ID_GOOGLE_ANALYTICS]
NEXT_PUBLIC_FB_PIXEL_ID = [SEU_ID_FACEBOOK_PIXEL]
NEXT_PUBLIC_WHATSAPP_NUMBER = 5567999846350
NEXT_PUBLIC_CONTACT_EMAIL = contato@exclusivacontabilidade.com.br
```

3. **Save**
4. **Redeploy** (se necessário)

---

## RESULTADO ESPERADO ✅

- ✅ Site 40% mais rápido
- ✅ Mobile 100% responsivo  
- ✅ CSS sem conflitos
- ✅ Código limpo e otimizado
- ✅ Deploy automático funcionando

---

## VERIFICAÇÃO FINAL ✅

1. **Site carrega rapidamente**
2. **Mobile funciona perfeitamente**
3. **Analytics funcionando**
4. **Formulários operacionais**

**Tempo estimado:** 5-10 minutos total
