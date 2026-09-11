import { ShoppingBag, Heart, User, Palette, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { AuthModal } from './AuthModal';
import { useCart } from '../contexts/CartContext';

interface NavigationProps {
  onCartClick?: () => void;
  onLogoClick?: () => void;
}

export function Navigation({ onCartClick, onLogoClick }: NavigationProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'features', 'mixer', 'virtual-try-on', 'trending', 'shop', 'about'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthDefaultTab(tab);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'mixer', label: 'Lipstick Mixer' },
    { id: 'shop', label: 'Shop' },
    { id: 'trending', label: 'Trending' },
    { id: 'about', label: 'About' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/80'
        } backdrop-blur-md border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => {
                scrollToSection('home');
                onLogoClick?.();
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Palette className="w-8 h-8" style={{ color: 'var(--rose-gold)' }} />
              <span className="text-2xl tracking-wider" style={{ fontFamily: 'serif' }}>ShadeCraft</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative py-2 transition-all ${
                    activeSection === link.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'var(--rose-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button className="hover:opacity-70 transition-opacity" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={onCartClick}
                className="relative hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
              <button
                onClick={() => openAuthModal('login')}
                className="hidden sm:block hover:opacity-70 transition-opacity"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      activeSection === link.id
                        ? 'bg-[#fef5f3]'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => openAuthModal('login')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-muted transition-all flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Sign In / Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authDefaultTab}
      />
    </>
  );
}
