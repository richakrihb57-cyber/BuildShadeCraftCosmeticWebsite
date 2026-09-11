import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (activeTab === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', password: '' });
      onClose();
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[90vh] max-h-[800px] bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Overlay */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
                      >
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl mb-2" style={{ fontFamily: 'serif' }}>
                        {activeTab === 'login' ? 'Welcome Back!' : 'Account Created!'}
                      </h3>
                      <p className="text-muted-foreground">
                        {activeTab === 'login' ? 'Signing you in...' : 'Let\'s get started!'}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid lg:grid-cols-2 h-full">
                {/* Left Side - Form */}
                <div className="flex flex-col justify-center p-8 lg:p-16 bg-gradient-to-br from-[#f5ebe8] via-[#faf6f5] to-[#f5e6e8]">
                  <div className="max-w-md mx-auto w-full">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-8">
                        <Sparkles className="w-8 h-8" style={{ color: 'var(--rose-gold)' }} />
                        <h1 className="text-3xl tracking-wider" style={{ fontFamily: 'serif' }}>
                          ShadeCraft
                        </h1>
                      </div>

                      <h2 className="text-4xl mb-3" style={{ fontFamily: 'serif' }}>
                        {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        {activeTab === 'login'
                          ? 'Sign in to access your custom shades'
                          : 'Start creating your signature lipstick shades'}
                      </p>

                      {/* Tab Switcher */}
                      <div className="flex gap-2 mb-8 p-1 bg-white/60 rounded-2xl">
                        <button
                          onClick={() => setActiveTab('login')}
                          className={`flex-1 py-3 px-6 rounded-xl transition-all ${
                            activeTab === 'login'
                              ? 'bg-white shadow-md'
                              : 'hover:bg-white/50'
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => setActiveTab('signup')}
                          className={`flex-1 py-3 px-6 rounded-xl transition-all ${
                            activeTab === 'signup'
                              ? 'bg-white shadow-md'
                              : 'hover:bg-white/50'
                          }`}
                        >
                          Sign Up
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                          {activeTab === 'signup' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <label className="block text-sm mb-2">Full Name</label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  placeholder="Enter your name"
                                  className={`w-full pl-12 pr-4 py-4 bg-white rounded-2xl border transition-colors focus:outline-none ${
                                    errors.name
                                      ? 'border-red-400 focus:border-red-500'
                                      : 'border-[#d4a5a5]/20 focus:border-[#d4a5a5]'
                                  }`}
                                  required={activeTab === 'signup'}
                                />
                              </div>
                              {errors.name && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-500 mt-2 flex items-center gap-1"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                  {errors.name}
                                </motion.p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div>
                          <label className="block text-sm mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="you@example.com"
                              className={`w-full pl-12 pr-4 py-4 bg-white rounded-2xl border transition-colors focus:outline-none ${
                                errors.email
                                  ? 'border-red-400 focus:border-red-500'
                                  : 'border-[#d4a5a5]/20 focus:border-[#d4a5a5]'
                              }`}
                              required
                            />
                          </div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-500 mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm mb-2">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              placeholder="••••••••"
                              className={`w-full pl-12 pr-12 py-4 bg-white rounded-2xl border transition-colors focus:outline-none ${
                                errors.password
                                  ? 'border-red-400 focus:border-red-500'
                                  : 'border-[#d4a5a5]/20 focus:border-[#d4a5a5]'
                              }`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-500 mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.password}
                            </motion.p>
                          )}
                        </div>

                        {activeTab === 'login' && (
                          <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="rounded" />
                              <span>Remember me</span>
                            </label>
                            <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--rose-gold)' }}>
                              Forgot password?
                            </a>
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: isLoading ? 1 : 0.98 }}
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                        >
                          {isLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              Processing...
                            </>
                          ) : (
                            activeTab === 'login' ? 'Sign In' : 'Create Account'
                          )}
                        </motion.button>

                        <div className="relative py-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#d4a5a5]/20" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gradient-to-br from-[#f5ebe8] via-[#faf6f5] to-[#f5e6e8]">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="py-3 px-4 bg-white rounded-xl border border-[#d4a5a5]/20 hover:border-[#d4a5a5]/40 transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Google
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="py-3 px-4 bg-white rounded-xl border border-[#d4a5a5]/20 hover:border-[#d4a5a5]/40 transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            GitHub
                          </motion.button>
                        </div>
                      </form>

                      {activeTab === 'signup' && (
                        <p className="text-xs text-muted-foreground mt-6 text-center">
                          By signing up, you agree to our{' '}
                          <a href="#" className="underline hover:opacity-70">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="underline hover:opacity-70">Privacy Policy</a>
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-[#d4a5a5] to-[#e8c4c4]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b76e79]/20 to-transparent" />

                  {/* Architectural/Prism Effect */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffc9d4]/20 rounded-full blur-3xl" />

                    {/* Glass Prism Effect */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm rounded-3xl rotate-12 shadow-2xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-white/20 to-transparent backdrop-blur-sm rounded-3xl -rotate-12 shadow-xl" />

                    {/* Shadows and Light */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="relative w-full h-full flex items-center justify-center p-16">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                          className="relative w-full max-w-md aspect-square"
                        >
                          {/* Lipstick tubes arranged in circle */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-16 h-32 rounded-full shadow-2xl"
                              style={{
                                background: `linear-gradient(135deg, ${
                                  ['#c15469', '#e8c4bc', '#a05673', '#d4756e', '#b88888', '#ffc9d4'][i]
                                } 0%, rgba(255,255,255,0.3) 100%)`,
                                top: '50%',
                                left: '50%',
                                transform: `
                                  translate(-50%, -50%)
                                  rotate(${i * 60}deg)
                                  translateY(-120px)
                                  rotate(${-i * 60}deg)
                                `
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-2xl mb-4" style={{ fontFamily: 'serif' }}>
                        "Every shade tells a story."
                      </p>
                      <p className="text-white/80">
                        Join 10,000+ beauty enthusiasts creating their signature look
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
