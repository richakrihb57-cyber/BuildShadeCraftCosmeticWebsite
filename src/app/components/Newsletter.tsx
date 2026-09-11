import { motion } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#b76e79] via-[#d4a5a5] to-[#e8c4c4]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm text-white">Exclusive Offers</span>
          </div>

          <h2 className="text-4xl md:text-5xl mb-4 text-white" style={{ fontFamily: 'serif' }}>
            Get 20% Off Your First Order
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive beauty tips, new shade releases, and special offers
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 min-h-[56px] rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:border-white focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 min-h-[56px] bg-white text-foreground rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Subscribe</span>
                <span className="sm:hidden">Join</span>
              </motion.button>
            </div>
            <p className="text-sm text-white/70 mt-4 text-center sm:text-left">
              No spam, unsubscribe anytime
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
