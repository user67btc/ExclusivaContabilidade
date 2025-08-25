import { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import dynamic from 'next/dynamic';

// Importar QRCode apenas no lado do cliente
const QRCode = dynamic(() => import('qrcode.react'), {
  ssr: false,
});

export default function TwoFactorSetup({ onComplete = () => {}, userEmail }) {
  const { success: showSuccess, error: showError } = useNotification();
  const [step, setStep] = useState(1);
  const [secretKey, setSecretKey] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [backupCodes, setBackupCodes] = useState([]);
  
  // Gerar uma chave secreta para 2FA (32 caracteres)
  const generateSecretKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  // Gerar códigos de backup
  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      let code = '';
      for (let j = 0; j < 8; j++) {
        code += Math.floor(Math.random() * 10);
      }
      codes.push(code);
    }
    return codes;
  };
  
  // Iniciar configuração do 2FA
  const handleStartSetup = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Aqui, em uma implementação real, você faria uma chamada de API
      // para gerar e armazenar a chave secreta no servidor
      
      // Simulação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const key = generateSecretKey();
      setSecretKey(key);
      setStep(2);
    } catch (err) {
      setError('Erro ao iniciar configuração de autenticação em dois fatores.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Verificar código inserido
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setError('Por favor, insira o código de verificação.');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('O código de verificação deve ter 6 dígitos.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Aqui, em uma implementação real, você verificaria o código 
      // enviando-o para o servidor junto com a chave secreta
      
      // Simulação - estamos aceitando qualquer código de 6 dígitos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const codes = generateBackupCodes();
      setBackupCodes(codes);
      setStep(3);
    } catch (err) {
      setError('Código inválido. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Finalizar configuração
  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        enabled: true,
        secretKey,
        backupCodes
      });
    }
  };

  // QR Code URI para aplicativos de autenticação
  const getQRCodeURI = () => {
    if (!secretKey || !userEmail) return '';
    
    const issuer = encodeURIComponent('Exclusiva Contabilidade');
    const account = encodeURIComponent(userEmail);
    const secret = encodeURIComponent(secretKey);
    
    return `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`;
  };

  return (
    <div className="two-factor-setup">
      {error && (
        <div className="alert alert-danger mb-4">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}
      
      {step === 1 && (
        <div className="setup-step step-1">
          <h4>Autenticação em Dois Fatores</h4>
          <p className="text-muted mb-4">
            A autenticação em dois fatores adiciona uma camada extra de segurança à sua conta. 
            Após configurada, você precisará fornecer um código gerado pelo seu aplicativo de 
            autenticação além da senha ao fazer login.
          </p>
          
          <div className="mb-4">
            <h5>Como funciona:</h5>
            <ol>
              <li>Configure um aplicativo de autenticação em seu celular (como Google Authenticator, Microsoft Authenticator ou Authy)</li>
              <li>Escaneie o código QR ou insira a chave secreta no aplicativo</li>
              <li>Insira o código de 6 dígitos gerado pelo aplicativo para verificação</li>
              <li>Salve seus códigos de backup em um local seguro</li>
            </ol>
          </div>
          
          <button
            className="btn btn-primary"
            onClick={handleStartSetup}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Iniciando...
              </>
            ) : (
              <>Iniciar Configuração</>
            )}
          </button>
        </div>
      )}
      
      {step === 2 && (
        <div className="setup-step step-2">
          <h4>Vincule seu Aplicativo de Autenticação</h4>
          
          <div className="qr-code-container my-4 text-center">
            <div className="qr-wrapper">
              {typeof window !== 'undefined' && <QRCode value={getQRCodeURI()} size={180} level="H" renderAs="svg" />}
            </div>
            
            <p className="mt-3 mb-1">Escaneie este código QR com seu aplicativo de autenticação</p>
            
            <div className="manual-key mt-4">
              <p className="text-muted mb-1">Ou insira esta chave manualmente:</p>
              <div className="secret-key">
                {secretKey.match(/.{1,4}/g)?.join(' ')}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleVerifyCode}>
            <div className="mb-4">
              <label htmlFor="verificationCode" className="form-label">Código de Verificação</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="verificationCode"
                  placeholder="Insira o código de 6 dígitos"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                  maxLength={6}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Verificando...
                    </>
                  ) : (
                    <>Verificar</>
                  )}
                </button>
              </div>
              <small className="text-muted">
                Insira o código de 6 dígitos gerado pelo seu aplicativo de autenticação
              </small>
            </div>
          </form>
        </div>
      )}
      
      {step === 3 && (
        <div className="setup-step step-3">
          <h4>Configuração Concluída</h4>
          <div className="alert alert-success mb-4">
            <i className="fas fa-check-circle me-2"></i>
            A autenticação em dois fatores foi ativada com sucesso!
          </div>
          
          <div className="backup-codes mb-4">
            <h5>Códigos de Backup</h5>
            <p className="text-muted mb-3">
              Salve estes códigos em um local seguro. Eles podem ser usados para acessar sua conta caso você 
              perca acesso ao seu aplicativo de autenticação.
            </p>
            
            <div className="codes-grid">
              {backupCodes.map((code, index) => (
                <div key={index} className="code-item">
                  {code}
                </div>
              ))}
            </div>
            
            <div className="mt-3 mb-4">
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  const text = backupCodes.join('\n');
                  navigator.clipboard.writeText(text)
                    .then(() => showSuccess('Códigos copiados para a área de transferência!'))
                    .catch(err => showError('Não foi possível copiar os códigos. Por favor, copie manualmente.'));
                }}
              >
                <i className="fas fa-copy me-1"></i> 
                Copiar Códigos
              </button>
            </div>
          </div>
          
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-primary"
              onClick={handleComplete}
            >
              Concluir
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .two-factor-setup {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .qr-code-container {
          padding: 20px 0;
        }
        
        .qr-wrapper {
          display: inline-block;
          padding: 15px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .manual-key {
          margin-top: 20px;
        }
        
        .secret-key {
          font-family: monospace;
          font-size: 18px;
          letter-spacing: 1px;
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          margin-top: 5px;
          user-select: all;
        }
        
        .codes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        
        .code-item {
          font-family: monospace;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 8px;
          text-align: center;
          letter-spacing: 1px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
