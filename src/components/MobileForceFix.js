import { useEffect } from 'react';

const MobileForceFix = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const applyMobileStyles = () => {
      // Check if it's mobile
      if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.id = 'mobile-force-fix';
        
        // Remove existing style if present
        const existing = document.getElementById('mobile-force-fix');
        if (existing) existing.remove();
        
        style.textContent = `
          /* MOBILE FORCE FIX - INLINE STYLES */
          @media (max-width: 768px) {
            /* Container fixes */
            #__next {
              padding: 0 !important;
              margin: 0 !important;
              overflow-x: hidden !important;
            }
            
            .container, .container-fluid {
              padding-left: 15px !important;
              padding-right: 15px !important;
              max-width: 100% !important;
            }
            
            /* Hero section mobile - UPDATED TO MATCH CSS */
            .hero-section {
              position: relative !important;
              top: 0 !important;
              padding-top: 108px !important;
              padding-bottom: 60px !important;
              padding-left: 20px !important;
              padding-right: 20px !important;
              margin: 0 !important;
              margin-top: 0 !important;
              min-height: calc(100vh - 88px) !important;
              background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%) !important;
              color: #ffffff !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              box-sizing: border-box !important;
              z-index: 1 !important;
            }
            
            .hero-section h1, .hero-title-modern {
              font-size: 28px !important;
              line-height: 1.3 !important;
              margin-bottom: 16px !important;
              color: #ffffff !important;
            }
            
            .hero-section p, .hero-subtitle-modern {
              font-size: 16px !important;
              line-height: 1.5 !important;
              margin-bottom: 24px !important;
              color: rgba(255, 255, 255, 0.9) !important;
            }
            
            /* Statistics mobile */
            .hero-social-proof-enhanced {
              flex-direction: column !important;
              gap: 20px !important;
              padding: 20px !important;
              margin-top: 30px !important;
            }
            
            .proof-item-enhanced {
              text-align: center !important;
              padding: 15px !important;
              background: rgba(255, 255, 255, 0.1) !important;
              border-radius: 12px !important;
              backdrop-filter: blur(10px) !important;
              margin-bottom: 15px !important;
            }
            
            .proof-number {
              font-size: 32px !important;
              font-weight: 800 !important;
              color: #ffffff !important;
              margin-bottom: 8px !important;
              display: block !important;
            }
            
            .proof-label {
              font-size: 14px !important;
              color: rgba(255, 255, 255, 0.8) !important;
              font-weight: 500 !important;
            }
            
            /* Sectors section mobile */
            .sectors-section {
              padding: 40px 20px !important;
              background: #f8fafc !important;
            }
            
            .sectors-grid {
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 20px !important;
              max-width: 100% !important;
              padding: 0 !important;
            }
            
            .sector-card {
              background: #ffffff !important;
              color: #1a202c !important;
              text-shadow: none !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 16px !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
              padding: 0 !important;
              margin-bottom: 20px !important;
              overflow: hidden !important;
              min-height: auto !important;
            }
            
            .sector-card-content {
              background: #ffffff !important;
              color: #1a202c !important;
              text-shadow: none !important;
              padding: 24px !important;
            }
            
            .sector-card h3 {
              color: #1a202c !important;
              font-weight: 700 !important;
              text-shadow: none !important;
              font-size: 20px !important;
              line-height: 1.3 !important;
              margin-bottom: 12px !important;
            }
            
            .sector-card p, .sector-description-contrast {
              color: #4a5568 !important;
              font-weight: 400 !important;
              text-shadow: none !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
              margin-bottom: 16px !important;
            }
            
            .sector-card ul, .sector-features {
              margin: 16px 0 !important;
              padding-left: 0 !important;
              list-style: none !important;
            }
            
            .sector-card li, .sector-features li {
              color: #4a5568 !important;
              text-shadow: none !important;
              font-weight: 400 !important;
              font-size: 13px !important;
              line-height: 1.4 !important;
              padding: 4px 0 4px 20px !important;
              position: relative !important;
            }
            
            .sector-card li:before, .sector-features li:before {
              content: "✓" !important;
              position: absolute !important;
              left: 0 !important;
              color: #1e40af !important;
              font-weight: 600 !important;
            }
            
            /* Buttons */
            .sector-card .btn-primary, .sector-card .cta-button {
              background: #1e40af !important;
              color: #ffffff !important;
              border: none !important;
              padding: 10px 20px !important;
              border-radius: 8px !important;
              font-weight: 600 !important;
              text-decoration: none !important;
              font-size: 14px !important;
              margin-top: 16px !important;
              display: inline-block !important;
              transition: all 0.3s ease !important;
            }
            
            /* Header mobile - UPDATED TO MATCH CSS */
            header, .navbar, .site-header {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              width: 100vw !important;
              height: 88px !important;
              min-height: 88px !important;
              max-height: 88px !important;
              padding: 20px !important;
              margin: 0 !important;
              background: #ffffff !important;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
              z-index: 10000 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              box-sizing: border-box !important;
            }
            
            .navbar-brand {
              font-size: 18px !important;
              font-weight: 700 !important;
              color: #1a202c !important;
            }
            
            .navbar-nav {
              background: #ffffff !important;
              border-radius: 12px !important;
              padding: 20px !important;
              margin-top: 10px !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
            }
            
            .nav-link {
              color: #1a202c !important;
              font-weight: 500 !important;
              padding: 12px 16px !important;
              border-radius: 8px !important;
              margin-bottom: 4px !important;
            }
            
            /* WhatsApp button */
            .whatsapp-float, .whatsapp-button {
              position: fixed !important;
              bottom: 20px !important;
              right: 20px !important;
              z-index: 9999 !important;
              width: 60px !important;
              height: 60px !important;
              border-radius: 50% !important;
              background: #25d366 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important;
            }
            
            /* Global fixes */
            * {
              box-sizing: border-box !important;
            }
            
            img {
              max-width: 100% !important;
              height: auto !important;
            }
            
            .sector-card *, .service-card *, .content-section * {
              text-shadow: none !important;
            }
          }
        `;
        
        document.head.appendChild(style);
        console.log('Mobile force fix applied');
      }
    };

    // Apply styles immediately
    applyMobileStyles();
    
    // Reapply on resize
    window.addEventListener('resize', applyMobileStyles);
    
    return () => {
      window.removeEventListener('resize', applyMobileStyles);
      const existing = document.getElementById('mobile-force-fix');
      if (existing) existing.remove();
    };
  }, []);

  return null;
};

export default MobileForceFix;
