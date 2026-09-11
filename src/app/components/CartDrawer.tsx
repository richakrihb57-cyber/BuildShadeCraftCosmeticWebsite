import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-2xl" style={{ fontFamily: 'serif' }}>
                  Shopping Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add some beautiful shades to get started!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl text-white"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    Start Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-[#fef5f3] rounded-2xl"
                    >
                      <div
                        className="w-20 h-20 rounded-xl flex-shrink-0 border-2 border-white shadow-md"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize mb-2">
                          {item.finish}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-md hover:bg-red-50 text-red-500 transition-colors flex items-center justify-center ml-auto"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg" style={{ color: 'var(--rose-gold)' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4 bg-[#fef5f3]">
                <div className="flex items-center justify-between text-lg">
                  <span>Subtotal ({cartCount} items)</span>
                  <span style={{ color: 'var(--rose-gold)' }}>
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {cartTotal >= 2000 ? '🎉 Free shipping applied!' : `Add ₹${(2000 - cartTotal).toLocaleString('en-IN')} for free shipping`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                >
                  Proceed to Checkout
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
