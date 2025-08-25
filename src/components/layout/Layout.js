import Header from './Header';
import Footer from './Footer';
import WhatsappFloat from './WhatsappFloat';
import dynamic from 'next/dynamic';
import ScrollTopButton from '../ui/ScrollTopButton';

// Importação dinâmica do CookieConsent para garantir execução apenas no client-side
const CookieConsent = dynamic(
  () => import('../ui/CookieConsent'),
  { ssr: false }
);

// Importação dinâmica do PerformanceMonitor para garantir execução apenas no client-side
const PerformanceMonitor = dynamic(
  () => import('../utils/PerformanceMonitor'),
  { ssr: false }
);

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <WhatsappFloat />
      <ScrollTopButton />
      <Footer />
      {/* Componentes invisíveis que monitoram o desempenho e gerenciam preferências */}
      <PerformanceMonitor />
      <CookieConsent />
    </>
  );
}
