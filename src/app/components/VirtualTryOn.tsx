import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Wand2, X, AlertCircle } from 'lucide-react';

export function VirtualTryOn() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setError(null);
    setUploadProgress(0);

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsProcessing(true);
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress((e.loaded / e.total) * 100);
      }
    };

    reader.onloadend = async () => {
      setSelectedImage(reader.result as string);
      setUploadProgress(100);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
    };

    reader.onerror = () => {
      setError('Failed to upload image');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setError(null);
    setUploadProgress(0);
    setIsProcessing(false);
  };

  return (
    <section id="virtual-try-on" className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef5f3] rounded-full mb-4 border border-[#d4a5a5]/30">
            <Wand2 className="w-4 h-4" style={{ color: 'var(--rose-gold)' }} />
            <span className="text-sm">AI Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'serif' }}>
            Virtual Try-On Studio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how your custom shade looks on you before making a purchase
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#fef5f3] to-white rounded-3xl p-8 border border-[#d4a5a5]/20"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`aspect-[3/4] bg-white rounded-2xl overflow-hidden border-2 border-dashed transition-all ${
                isDragging ? 'border-[#d4a5a5] bg-[#fef5f3]' : 'border-[#d4a5a5]/50'
              } flex items-center justify-center relative`}
            >
              {selectedImage ? (
                <>
                  <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  <button
                    onClick={clearImage}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Clear image"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4"
                        />
                        <p className="text-white mb-2">Analyzing face...</p>
                        <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: '0%' }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="text-center p-8">
                  {isDragging ? (
                    <Upload className="w-16 h-16 mx-auto mb-4 text-[#d4a5a5]" />
                  ) : (
                    <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  )}
                  <p className="text-muted-foreground mb-2">
                    {isDragging ? 'Drop your image here' : 'Drag & drop your photo here'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">or</p>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 rounded-xl text-white inline-flex items-center gap-2 justify-center"
                      style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </motion.button>

                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-6 py-3 bg-white rounded-xl border-2 border-[#d4a5a5] inline-flex items-center gap-2 justify-center hover:bg-[#fef5f3] transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Use Camera
                    </motion.button>

                    <p className="text-xs text-muted-foreground mt-2">
                      Max file size: 5MB • JPG, PNG
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl mb-6">How It Works</h3>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Upload Your Photo', description: 'Take a selfie or upload a photo with good lighting' },
                { step: '02', title: 'AI Face Detection', description: 'Our AI automatically detects your facial features' },
                { step: '03', title: 'Apply Your Shade', description: 'See your custom lipstick shade applied in real-time' },
                { step: '04', title: 'Compare & Decide', description: 'Toggle between before and after to make your decision' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  className="flex gap-4"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)' }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#fef5f3] rounded-2xl border border-[#d4a5a5]/20">
              <div className="flex items-start gap-3">
                <Wand2 className="w-5 h-5 mt-1" style={{ color: 'var(--rose-gold)' }} />
                <div>
                  <h4 className="mb-2">AI Skin Tone Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Our advanced AI analyzes your skin tone and suggests complementary shades that will look stunning on you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
