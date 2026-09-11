import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../contexts/CartContext';

type FilterType = 'all' | 'matte' | 'glossy' | 'satin' | 'velvet';

const products = [
  {
    id: 1,
    name: 'Rose Velvet',
    price: 2199,
    originalPrice: 2799,
    finish: 'velvet',
    color: '#c15469',
    rating: 4.9,
    reviews: 234,
    bestseller: true,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'
  },
  {
    id: 2,
    name: 'Nude Dream',
    price: 2199,
    finish: 'matte',
    color: '#e8c4bc',
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?w=400'
  },
  {
    id: 3,
    name: 'Berry Bliss',
    price: 2199,
    finish: 'glossy',
    color: '#a05673',
    rating: 5.0,
    reviews: 312,
    new: true,
    image: 'https://images.unsplash.com/photo-1617422275558-e5f616302690?w=400'
  },
  {
    id: 4,
    name: 'Coral Kiss',
    price: 2199,
    finish: 'satin',
    color: '#d4756e',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1593939202577-6bf5b21cb507?w=400'
  },
  {
    id: 5,
    name: 'Mauve Magic',
    price: 2199,
    finish: 'velvet',
    color: '#b88888',
    rating: 4.9,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1626895872564-b691b6877b83?w=400'
  },
  {
    id: 6,
    name: 'Pink Paradise',
    price: 2199,
    finish: 'glossy',
    color: '#ffc9d4',
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1587313512268-a3b47aa30166?w=400'
  },
  {
    id: 7,
    name: 'Cherry Blossom',
    price: 2199,
    finish: 'matte',
    color: '#d97b8c',
    rating: 4.6,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400'
  },
  {
    id: 8,
    name: 'Sunset Glow',
    price: 2199,
    finish: 'satin',
    color: '#e89b7e',
    rating: 4.7,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1631214499500-2e34edcaccfe?w=400'
  }
];

export function ShopSection() {
  const { addToCart } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = selectedFilter === 'all'
    ? products
    : products.filter(p => p.finish === selectedFilter);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      color: product.color,
      finish: product.finish,
      image: product.image
    });
  };

  return (
    <section id="shop" className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef5f3] rounded-full mb-4 border border-[#d4a5a5]/30">
            <ShoppingCart className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
            <span className="text-sm">Shop Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Our Signature Shades
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium lipsticks crafted with clean ingredients
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-3">
            {(['all', 'matte', 'glossy', 'satin', 'velvet'] as FilterType[]).map(filter => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full capitalize transition-all ${
                  selectedFilter === filter
                    ? 'text-white'
                    : 'bg-white border border-[#d4a5a5]/30 hover:border-[#d4a5a5]'
                }`}
                style={
                  selectedFilter === filter
                    ? { background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }
                    : {}
                }
              >
                {filter === 'all' ? 'All Shades' : filter}
              </motion.button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#d4a5a5]/30 hover:border-[#d4a5a5] transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">More Filters</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#d4a5a5]/10 hover:border-[#d4a5a5]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.bestseller && (
                  <span className="px-3 py-1 bg-[#b76e79] text-white text-xs rounded-full">
                    Bestseller
                  </span>
                )}
                {product.new && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                    New
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    Sale
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    wishlist.includes(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600'
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="text-xs px-2 py-1 bg-[#fef5f3] rounded-full capitalize">
                    {product.finish}
                  </span>
                </div>

                <h3 className="text-lg mb-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" style={{ color: 'var(--rose-gold)' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-lg text-white"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 min-h-[56px] bg-white rounded-full border-2 border-[#d4a5a5] hover:bg-[#fef5f3] transition-all shadow-sm hover:shadow-md"
          >
            Load More Products
          </motion.button>
        </div>
      </div>
    </section>
  );
}
