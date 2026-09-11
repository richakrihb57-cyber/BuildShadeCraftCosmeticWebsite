import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Beauty Influencer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    text: "ShadeCraft changed my beauty routine! I finally found the perfect nude shade that matches my skin tone. The customization is incredible!"
  },
  {
    name: 'Emily Chen',
    role: 'Makeup Artist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    text: "As a professional makeup artist, I'm blown away by the quality and precision. The AI color matching is spot-on every time."
  },
  {
    name: 'Jessica Martinez',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    rating: 5,
    text: "The virtual try-on feature is a game-changer! I love being able to experiment with different shades before committing."
  }
];

export function Testimonials() {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Loved by Beauty Enthusiasts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who found their perfect shade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group bg-gradient-to-br from-[#fef5f3] to-white p-8 rounded-2xl border border-[#d4a5a5]/10 hover:border-[#d4a5a5]/30 hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 mb-6 opacity-30" style={{ color: 'var(--rose-gold)' }} />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#d4a5a5]/20">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
