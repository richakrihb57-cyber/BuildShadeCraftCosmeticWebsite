import { motion } from 'motion/react';
import { Sparkles, Leaf, Heart, Award, Users, Lightbulb, MapPin, Globe } from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: 'AI-Powered Innovation',
    description: 'Advanced AI technology analyzes your unique skin tone and preferences to create your perfect shade'
  },
  {
    icon: Leaf,
    title: '100% Clean Beauty',
    description: 'Vegan, cruelty-free formulas made with natural ingredients. No parabens, sulfates, or harmful chemicals'
  },
  {
    icon: Heart,
    title: 'Made in India 🇮🇳',
    description: 'Proudly crafted in India with world-class quality standards. Supporting local artisans and sustainable manufacturing'
  },
  {
    icon: Award,
    title: 'Award-Winning Quality',
    description: 'Recognized by beauty experts across India and globally for our exceptional formulas and innovation'
  }
];


export function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-white via-[#fef9f7] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-[#d4a5a5]/30">
            <Users className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
            <span className="text-sm">Our Story</span>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-full mb-6 border-2 border-orange-200">
            <span className="text-3xl">🇮🇳</span>
            <span className="text-lg" style={{ color: 'var(--rose-gold)' }}>Made in India</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            Redefining Indian Beauty
            <span className="block mt-2" style={{ color: 'var(--rose-gold)' }}>
              Through AI Technology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Founded by <span style={{ color: 'var(--rose-gold)' }}>Richa</span>, ShadeCraft was born from a vision to empower every Indian woman
            with a lipstick shade that's uniquely hers. We combine cutting-edge AI technology with clean,
            sustainable beauty formulated specifically for Indian skin tones to create personalized cosmetics
            that celebrate your individuality.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
              <span>Manufactured in Mumbai, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
              <span>Shipping Pan-India</span>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="relative mb-20 rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#b76e79] to-[#d4a5a5]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 p-12 lg:p-16 text-white">
            <div>
              <Lightbulb className="w-12 h-12 mb-6" />
              <h3 className="text-3xl mb-4" style={{ fontFamily: 'serif' }}>Our Mission</h3>
              <p className="text-white/90 leading-relaxed mb-6">
                To revolutionize the Indian beauty industry by empowering every woman to discover her perfect shade
                through AI-powered, sustainable, and personalized cosmetics that celebrate the beautiful diversity
                of Indian skin tones.
              </p>
              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-white/80 italic">
                  "Every shade tells a story. At ShadeCraft, we're creating technology that understands the unique
                  beauty of Indian women and helps them express it confidently." - Richa, Founder & CEO
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              {[
                { label: 'Custom Shades Created', value: '1L+' },
                { label: 'Happy Indian Customers', value: '50K+' },
                { label: 'Cities Served in India', value: '500+' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-4xl" style={{ fontFamily: 'serif' }}>{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'serif' }}>
              What We Stand For
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-6 bg-white rounded-2xl border border-[#d4a5a5]/10 hover:border-[#d4a5a5]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'linear-gradient(135deg, #fef5f3 0%, #f5e6e8 100%)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--rose-gold)' }} />
                  </div>
                  <h4 className="text-lg mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl mb-4" style={{ fontFamily: 'serif' }}>
            Ready to Create Your Signature Shade?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of beauty enthusiasts who've discovered their perfect lipstick
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('mixer');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 min-h-[56px] rounded-full text-white shadow-lg hover:shadow-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
          >
            Start Creating Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
