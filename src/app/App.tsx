import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LipstickMixer } from './components/LipstickMixer';
import { VirtualTryOn } from './components/VirtualTryOn';
import { TrendingShades } from './components/TrendingShades';
import { Features } from './components/Features';
import { ShopSection } from './components/ShopSection';
import { AboutSection } from './components/AboutSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'sonner';

type Page = 'home' | 'checkout' | 'order-success';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (id: string) => {
    setOrderId(id);
    setCurrentPage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navigation onCartClick={() => setIsCartOpen(true)} onLogoClick={handleBackToHome} />

        {currentPage === 'home' && (
          <main>
            <HeroSection />
            <Features />
            <LipstickMixer />
            <VirtualTryOn />
            <ShopSection />
            <TrendingShades />
            <AboutSection />
            <Newsletter />
          </main>
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onOrderComplete={handleOrderComplete}
            onCancel={handleBackToHome}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccessPage
            orderId={orderId}
            onContinueShopping={handleBackToHome}
          />
        )}

        <Footer />
        <ScrollToTop />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
        <Toaster position="top-right" richColors />
      </div>
    </CartProvider>
  );
}