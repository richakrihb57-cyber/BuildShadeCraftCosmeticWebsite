import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Sparkles, Save, ShoppingCart, RotateCcw, Heart, History, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';

type Finish = 'Matte' | 'Glossy' | 'Satin' | 'Velvet';

interface SavedShade {
  id: string;
  name: string;
  red: number;
  green: number;
  blue: number;
  intensity: number;
  finish: Finish;
  timestamp: number;
}

export function LipstickMixer() {
  const { addToCart } = useCart();
  const [red, setRed] = useState(180);
  const [green, setGreen] = useState(80);
  const [blue, setBlue] = useState(100);
  const [intensity, setIntensity] = useState(80);
  const [finish, setFinish] = useState<Finish>('Glossy');
  const [shadeName, setShadeName] = useState('');
  const [savedShades, setSavedShades] = useState<SavedShade[]>([]);
  const [history, setHistory] = useState<Array<{red: number; green: number; blue: number; intensity: number; finish: Finish}>>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const lipstickColor = useMemo(() => `rgb(${red}, ${green}, ${blue})`, [red, green, blue]);
  const adjustedColor = useMemo(() => `rgba(${red}, ${green}, ${blue}, ${intensity / 100})`, [red, green, blue, intensity]);
  const hexColor = useMemo(() => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  }, [red, green, blue]);

  const updateColor = (type: 'red' | 'green' | 'blue' | 'intensity', value: number) => {
    setHistory(prev => [...prev.slice(-9), { red, green, blue, intensity, finish }]);
    if (type === 'red') setRed(value);
    else if (type === 'green') setGreen(value);
    else if (type === 'blue') setBlue(value);
    else setIntensity(value);
  };

  const resetMixer = () => {
    setRed(180);
    setGreen(80);
    setBlue(100);
    setIntensity(80);
    setFinish('Glossy');
    setShadeName('');
    toast.success('Mixer reset to default');
  };

  const saveShade = () => {
    if (!shadeName.trim()) {
      toast.error('Please name your shade first');
      return;
    }

    const newShade: SavedShade = {
      id: Date.now().toString(),
      name: shadeName,
      red,
      green,
      blue,
      intensity,
      finish,
      timestamp: Date.now()
    };

    setSavedShades(prev => [newShade, ...prev]);
    toast.success(`"${shadeName}" saved to favorites!`);
    setShadeName('');
  };

  const loadShade = (shade: SavedShade) => {
    setRed(shade.red);
    setGreen(shade.green);
    setBlue(shade.blue);
    setIntensity(shade.intensity);
    setFinish(shade.finish);
    setShadeName(shade.name);
    toast.success(`Loaded "${shade.name}"`);
  };

  const copyColorCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`${type} copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const buyNow = () => {
    if (!shadeName.trim()) {
      toast.error('Please name your shade first');
      return;
    }

    addToCart({
      id: `custom-${Date.now()}`,
      name: shadeName,
      price: 2199,
      color: hexColor,
      finish: finish.toLowerCase(),
      isCustom: true
    });

    setShadeName('');
  };

  const finishStyles = {
    Matte: 'saturate-110',
    Glossy: 'saturate-125 brightness-105',
    Satin: 'saturate-115 brightness-102',
    Velvet: 'saturate-120'
  };

  const finishes: Finish[] = ['Matte', 'Glossy', 'Satin', 'Velvet'];

  return (
    <section id="mixer" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fef9f7] to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 border border-[#d4a5a5]/30">
            <Palette className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
            <span className="text-sm">Interactive Studio</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Mix Your Perfect Shade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Blend custom pigments in real-time and create a lipstick shade that's uniquely yours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-[#d4a5a5]/20"
          >
            <h3 className="text-2xl mb-6">Color Mixer</h3>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Color Mixer</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetMixer}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm">Red Pigment</label>
                  <span className="text-sm px-3 py-1 bg-red-50 rounded-full">{red}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={red}
                  onChange={(e) => updateColor('red', Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(0, ${green}, ${blue}) 0%, rgb(255, ${green}, ${blue}) 100%)`
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm">Pink Pigment</label>
                  <span className="text-sm px-3 py-1 bg-green-50 rounded-full">{green}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={green}
                  onChange={(e) => updateColor('green', Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(${red}, 0, ${blue}) 0%, rgb(${red}, 255, ${blue}) 100%)`
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm">Mauve Pigment</label>
                  <span className="text-sm px-3 py-1 bg-blue-50 rounded-full">{blue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={blue}
                  onChange={(e) => updateColor('blue', Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(${red}, ${green}, 0) 0%, rgb(${red}, ${green}, 255) 100%)`
                  }}
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm">Shade Intensity</label>
                  <span className="text-sm px-3 py-1 bg-purple-50 rounded-full">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={intensity}
                  onChange={(e) => updateColor('intensity', Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-gray-200 to-purple-600"
                />
              </div>

              <div className="pt-4">
                <label className="text-sm mb-3 block">Finish Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {finishes.map((f) => (
                    <motion.button
                      key={f}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFinish(f)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        finish === f
                          ? 'border-[#d4a5a5] bg-[#fef5f3]'
                          : 'border-border bg-white hover:border-[#d4a5a5]/50'
                      }`}
                    >
                      {f}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#d4a5a5]/20">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5" style={{ color: 'var(--rose-gold)' }} />
                <h3 className="text-2xl">Your Custom Shade</h3>
              </div>

              <div className="relative mb-8">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative will-change-transform"
                  >
                    <motion.div
                      className={`w-32 h-64 rounded-full ${finishStyles[finish]} shadow-2xl transition-all duration-300`}
                      style={{
                        background: `linear-gradient(135deg, ${lipstickColor} 0%, ${adjustedColor} 100%)`,
                        boxShadow: `0 20px 60px ${lipstickColor}40`
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                <div className="mt-6 p-4 bg-[#fef5f3] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">HEX</span>
                    <button
                      onClick={() => copyColorCode(hexColor, 'HEX')}
                      className="flex items-center gap-2 text-sm px-3 py-1 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <code>{hexColor}</code>
                      {copiedCode === hexColor ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">RGB</span>
                    <button
                      onClick={() => copyColorCode(lipstickColor, 'RGB')}
                      className="flex items-center gap-2 text-sm px-3 py-1 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <code>{lipstickColor}</code>
                      {copiedCode === lipstickColor ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Finish</span>
                    <span className="text-sm px-3 py-1 bg-white rounded-lg">{finish}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block">Name Your Shade</label>
                  <input
                    type="text"
                    value={shadeName}
                    onChange={(e) => setShadeName(e.target.value)}
                    placeholder="e.g., Rose Sunset, Velvet Dream..."
                    className="w-full px-4 py-3 bg-[#faf6f5] rounded-xl border border-border focus:border-[#d4a5a5] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveShade}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl border-2 border-[#d4a5a5] hover:bg-[#fef5f3] transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={buyNow}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-6 bg-gradient-to-br from-[#fef5f3] to-white rounded-2xl border border-[#d4a5a5]/20"
            >
              <h4 className="mb-3">AI Shade Suggestions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your selection, these shades complement your skin tone
              </p>
              <div className="flex gap-3">
                {[
                  { r: 193, g: 84, b: 105 },
                  { r: 165, g: 105, b: 115 },
                  { r: 210, g: 125, b: 140 }
                ].map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setRed(color.r);
                      setGreen(color.g);
                      setBlue(color.b);
                    }}
                    className="flex-1 h-16 rounded-xl border-2 border-white shadow-md hover:scale-105 transition-transform"
                    style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Saved Shades */}
            {savedShades.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-white rounded-2xl border border-[#d4a5a5]/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <h4>Saved Favorites</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedShades.slice(0, 5).map(shade => (
                    <button
                      key={shade.id}
                      onClick={() => loadShade(shade)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#fef5f3] transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-white shadow-md flex-shrink-0"
                        style={{ backgroundColor: `rgb(${shade.red}, ${shade.green}, ${shade.blue})` }}
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm">{shade.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{shade.finish}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
