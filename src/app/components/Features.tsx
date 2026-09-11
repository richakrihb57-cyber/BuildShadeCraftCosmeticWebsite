import { motion } from 'motion/react';
import { Sparkles, Wand2, Package, Truck, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Color Matching',
    description: 'Advanced AI analyzes your skin tone and suggests perfect complementary shades'
  },
  {
    icon: Wand2,
    title: 'Virtual Try-On',
    description: 'See how any shade looks on you before purchasing with AR technology'
  },
  {
    icon: Package,
    title: 'Custom Packaging',
    description: 'Your unique shade name beautifully printed on premium luxury packaging'
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Your custom lipstick crafted and shipped within 3-5 business days'
  },
  {
    icon: Shield,
    title: 'Clean Beauty',
    description: '100% vegan, cruelty-free, and made with premium natural ingredients'
  },
  {
    icon: Heart,
    title: 'Satisfaction Guarantee',
    description: "Love your shade or we'll help you create a new one for free"
  }
];

export function Features() {
  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-[#fef9f7] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Why Choose ShadeCraft
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group p-8 bg-white rounded-2xl border border-[#d4a5a5]/10 hover:border-[#d4a5a5]/30 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #fef5f3 0%, #f5e6e8 100%)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: 'var(--rose-gold)' }} />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
