import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, Palette } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function HeroSection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fef5f3] via-[#fef9f7] to-[#fff0ed]" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-[#ffc9d4] rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#e8c4bc] rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-[#d4a5a5]/30"
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
              <span className="text-sm">Create Your Signature Shade</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight" style={{ fontFamily: 'serif' }}>
              Create Your
              <span className="block mt-2" style={{ color: 'var(--rose-gold)' }}>Signature Lipstick</span>
              <span className="block mt-2">Shade</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Mix, Customize, and Own Your Perfect Color. Experience the luxury of personalized beauty with AI-powered shade matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 min-h-[56px] rounded-full text-white shadow-lg hover:shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                onClick={() => document.getElementById('mixer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2 justify-center">
                  <Palette className="w-5 h-5" />
                  Start Mixing
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-4 min-h-[56px] bg-white rounded-full border-2 border-[#d4a5a5] hover:bg-[#fef5f3] transition-all"
              >
                Try Virtual Studio
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-8 justify-center lg:justify-start">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl" style={{ color: 'var(--rose-gold)' }}>10K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Custom Shades</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl" style={{ color: 'var(--rose-gold)' }}>5K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl" style={{ color: 'var(--rose-gold)' }}>100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Cruelty Free</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffc9d4]/30 to-[#e8c4bc]/30 rounded-full blur-2xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXBzdGljayUyMGNvc21ldGljcyUyMHJvc2UlMjBnb2xkfGVufDF8fHx8MTc3OTc4MTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luxury lipstick collection"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
    </section>
  );
}
