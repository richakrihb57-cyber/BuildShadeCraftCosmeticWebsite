import { motion } from 'motion/react';
import { TrendingUp, Star, Heart } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const trendingShades = [
  {
    id: 1,
    name: 'Rose Velvet',
    color: '#c15469',
    price: '$28',
    rating: 4.9,
    reviews: 234,
    category: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYWtldXAlMjBhcnRpc3QlMjBsaXBzdGljayUyMHNoYWRlc3xlbnwxfHx8fDE3Nzk3ODE4NzV8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 2,
    name: 'Nude Dream',
    color: '#e8c4bc',
    price: '$28',
    rating: 4.8,
    reviews: 189,
    category: 'Trending',
    image: 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsaXBzdGljayUyMGNvc21ldGljcyUyMHJvc2UlMjBnb2xkfGVufDF8fHx8MTc3OTc4MTg3M3ww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 3,
    name: 'Berry Bliss',
    color: '#a05673',
    price: '$28',
    rating: 5.0,
    reviews: 312,
    category: 'New',
    image: 'https://images.unsplash.com/photo-1617422275558-e5f616302690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYWtldXAlMjBhcnRpc3QlMjBsaXBzdGljayUyMHNoYWRlc3xlbnwxfHx8fDE3Nzk3ODE4NzV8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 4,
    name: 'Coral Kiss',
    color: '#d4756e',
    price: '$28',
    rating: 4.7,
    reviews: 156,
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1593939202577-6bf5b21cb507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBsaXBzdGljayUyMGNvc21ldGljcyUyMHJvc2UlMjBnb2xkfGVufDF8fHx8MTc3OTc4MTg3M3ww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 5,
    name: 'Mauve Magic',
    color: '#b88888',
    price: '$28',
    rating: 4.9,
    reviews: 201,
    category: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1626895872564-b691b6877b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWtldXAlMjBhcnRpc3QlMjBsaXBzdGljayUyMHNoYWRlc3xlbnwxfHx8fDE3Nzk3ODE4NzV8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 6,
    name: 'Pink Paradise',
    color: '#ffc9d4',
    price: '$28',
    rating: 4.8,
    reviews: 178,
    category: 'Limited',
    image: 'https://images.unsplash.com/photo-1587313512268-a3b47aa30166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBsaXBzdGljayUyMGNvc21ldGljcyUyMHJvc2UlMjBnb2xkfGVufDF8fHx8MTc3OTc4MTg3M3ww&ixlib=rb-4.1.0&q=80&w=400'
  }
];

export function TrendingShades() {
  return (
    <section id="trending" className="relative py-20 bg-gradient-to-b from-white to-[#fef9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 border border-[#d4a5a5]/30">
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
            <span className="text-sm">What's Hot</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Trending Shades
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most loved shades by our community and celebrities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingShades.map((shade, index) => (
            <motion.div
              key={shade.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#d4a5a5]/10"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs">
                  {shade.category}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <ImageWithFallback
                  src={shade.image}
                  alt={shade.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: shade.color }}
                  />
                  <h3 className="text-xl">{shade.name}</h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{shade.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({shade.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl" style={{ color: 'var(--rose-gold)' }}>
                    {shade.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
