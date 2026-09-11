import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, Wallet, Lock, MapPin, User, Mail, Phone, ArrowLeft, CheckCircle, Building2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onOrderComplete: (orderId: string) => void;
  onCancel: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'wallet' | 'netbanking';

export function CheckoutPage({ onOrderComplete, onCancel }: CheckoutPageProps) {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    upiApp: 'phonepe',
    walletProvider: 'paytm',
    bankName: ''
  });

  const shipping = cartTotal >= 2000 ? 0 : 199; // Free shipping above ₹2000
  const gst = cartTotal * 0.18; // 18% GST
  const total = cartTotal + shipping + gst;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = `SC${Date.now().toString().slice(-8)}`;
    clearCart();
    setIsProcessing(false);
    onOrderComplete(orderId);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-[#fef9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-foreground' : 'text-green-600'}`}>
                  {step === 'payment' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] text-white flex items-center justify-center">
                      1
                    </div>
                  )}
                  <span>Shipping</span>
                </div>
                <div className="flex-1 h-px bg-border" />
                <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'payment'
                      ? 'bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] text-white'
                      : 'bg-muted'
                  }`}>
                    2
                  </div>
                  <span>Payment</span>
                </div>
              </div>

              {step === 'shipping' ? (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <h2 className="text-2xl mb-6" style={{ fontFamily: 'serif' }}>
                    Shipping Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={shippingInfo.fullName}
                          onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <textarea
                        required
                        value={shippingInfo.address}
                        onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">State</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={e => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={e => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    Continue to Payment
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl" style={{ fontFamily: 'serif' }}>
                      Payment Method
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Edit Shipping
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { id: 'upi' as PaymentMethod, icon: Smartphone, label: 'UPI' },
                      { id: 'card' as PaymentMethod, icon: CreditCard, label: 'Card' },
                      { id: 'wallet' as PaymentMethod, icon: Wallet, label: 'Wallet' },
                      { id: 'netbanking' as PaymentMethod, icon: Building2, label: 'Net Banking' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-[#d4a5a5] bg-[#fef5f3]'
                            : 'border-border hover:border-[#d4a5a5]/50'
                        }`}
                      >
                        <method.icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Select UPI App</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {[
                            { id: 'phonepe', name: 'PhonePe', color: '#5f259f' },
                            { id: 'googlepay', name: 'Google Pay', color: '#1a73e8' },
                            { id: 'paytm', name: 'Paytm', color: '#00baf2' }
                          ].map(app => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => setPaymentInfo({...paymentInfo, upiApp: app.id})}
                              className={`p-3 rounded-xl border-2 transition-all text-sm ${
                                paymentInfo.upiApp === app.id
                                  ? 'border-[#d4a5a5] bg-[#fef5f3]'
                                  : 'border-border'
                              }`}
                            >
                              {app.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">UPI ID</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.upiId}
                          onChange={e => setPaymentInfo({...paymentInfo, upiId: e.target.value})}
                          className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                          placeholder="yourname@upi"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          You'll be redirected to your UPI app to complete payment
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Card Number</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardNumber}
                          onChange={e => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardName}
                          onChange={e => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.expiryDate}
                            onChange={e => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.cvv}
                            onChange={e => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div>
                      <label className="block text-sm mb-2">Select Wallet</label>
                      <select
                        value={paymentInfo.walletProvider}
                        onChange={e => setPaymentInfo({...paymentInfo, walletProvider: e.target.value})}
                        className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                      >
                        <option value="paytm">Paytm Wallet</option>
                        <option value="phonepe">PhonePe Wallet</option>
                        <option value="amazonpay">Amazon Pay</option>
                        <option value="mobikwik">Mobikwik</option>
                      </select>
                      <p className="text-xs text-muted-foreground mt-2">
                        You'll be redirected to complete payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label className="block text-sm mb-2">Select Your Bank</label>
                      <select
                        value={paymentInfo.bankName}
                        onChange={e => setPaymentInfo({...paymentInfo, bankName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-[#d4a5a5]/20 focus:border-[#d4a5a5] focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="other">Other Banks</option>
                      </select>
                      <p className="text-xs text-muted-foreground mt-2">
                        You'll be redirected to your bank's secure payment page
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl border border-green-200">
                    <Lock className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ₹{total.toLocaleString('en-IN')}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-[#d4a5a5]/10 sticky top-24"
            >
              <h3 className="text-xl mb-4" style={{ fontFamily: 'serif' }}>
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.finish}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--rose-gold)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-lg">Total</span>
                  <span className="text-lg" style={{ color: 'var(--rose-gold)' }}>
                    ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    🎉 You're getting free shipping!
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
