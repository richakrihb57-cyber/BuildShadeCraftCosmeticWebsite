import { Palette, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#fef5f3] border-t border-[#d4a5a5]/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-8 h-8" style={{ color: 'var(--rose-gold)' }} />
              <span className="text-2xl tracking-wider" style={{ fontFamily: 'serif' }}>ShadeCraft</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Create your signature lipstick shade with AI-powered customization.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#fef5f3] flex items-center justify-center hover:bg-[#f5e6e8] hover:scale-110 transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#fef5f3] flex items-center justify-center hover:bg-[#f5e6e8] hover:scale-110 transition-all"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#fef5f3] flex items-center justify-center hover:bg-[#f5e6e8] hover:scale-110 transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#fef5f3] flex items-center justify-center hover:bg-[#f5e6e8] hover:scale-110 transition-all"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Shop</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Trending Shades</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Custom Lipstick</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Best Sellers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Learn</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Beauty Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shade Finder</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">How to Mix</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#d4a5a5]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 ShadeCraft. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Shipping</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
