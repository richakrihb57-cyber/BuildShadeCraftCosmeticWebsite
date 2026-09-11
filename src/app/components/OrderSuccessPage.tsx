import { motion } from 'motion/react';
import { CheckCircle, Package, Truck, Home, Download, Mail } from 'lucide-react';

interface OrderSuccessPageProps {
  orderId: string;
  onContinueShopping: () => void;
}

export function OrderSuccessPage({ orderId, onContinueShopping }: OrderSuccessPageProps) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const trackingSteps = [
    { icon: CheckCircle, label: 'Order Confirmed', status: 'completed', date: 'Today' },
    { icon: Package, label: 'Processing', status: 'current', date: 'Tomorrow' },
    { icon: Truck, label: 'Shipped', status: 'pending', date: 'In 2 days' },
    { icon: Home, label: 'Delivered', status: 'pending', date: estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-[#fef9f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-muted-foreground">
            Order ID: <span className="font-mono bg-muted px-2 py-1 rounded">{orderId}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/10 mb-8"
        >
          <h2 className="text-2xl mb-6" style={{ fontFamily: 'serif' }}>
            Order Tracking
          </h2>

          <div className="relative">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={index} className="flex gap-4 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-100'
                          : isCurrent
                          ? 'bg-gradient-to-br from-[#b76e79] to-[#d4a5a5]'
                          : 'bg-muted'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isCompleted
                            ? 'text-green-600'
                            : isCurrent
                            ? 'text-white'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </motion.div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${isCompleted ? 'bg-green-300' : 'bg-border'}`} />
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <h3 className={`mb-1 ${isCurrent ? '' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.date}</p>
                    {isCurrent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-2 text-sm"
                        style={{ color: 'var(--rose-gold)' }}
                      >
                        Your order is being prepared
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-[#fef5f3] rounded-2xl">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-0.5" style={{ color: 'var(--rose-gold)' }} />
              <div>
                <h4 className="mb-1">Confirmation Email Sent</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent order confirmation and tracking details to your email
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/10 mb-8"
        >
          <h2 className="text-2xl mb-6" style={{ fontFamily: 'serif' }}>
            Estimated Delivery
          </h2>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#fef5f3] to-white rounded-2xl border border-[#d4a5a5]/20">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Expected Delivery Date</p>
              <p className="text-2xl" style={{ color: 'var(--rose-gold)' }}>
                {estimatedDelivery.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white rounded-xl border-2 border-[#d4a5a5] hover:bg-[#fef5f3] transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinueShopping}
              className="px-6 py-3 rounded-xl text-white transition-all flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
            >
              <Home className="w-4 h-4" />
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@shadecraft.com" className="hover:underline" style={{ color: 'var(--rose-gold)' }}>
              support@shadecraft.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
