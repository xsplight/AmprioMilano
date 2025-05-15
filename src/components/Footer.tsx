
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white pt-16 pb-6">
      <div className="container-custom">
        {/* Footer top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
                alt="Amprio Milano" 
                className="h-16 brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-white/90 leading-relaxed">
              Luxury tableware and home decor delivering timeless elegance and contemporary design since 2008.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors" aria-label="Follow on Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors" aria-label="Follow on Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors" aria-label="Follow on LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Collections column */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-6 text-base">Collections</h3>
            <ul className="space-y-3">
              <li><Link to="/collections/tableware" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Tableware</Link></li>
              <li><Link to="/collections/kitchenware" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Kitchenware</Link></li>
              <li><Link to="/collections/accessories" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Accessories</Link></li>
              <li><Link to="/collections/decor" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Decor</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Information column */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-6 text-base">Information</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info Column (replacing Newsletter) */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-6 text-base">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>T: <a href="tel:+97152177347" className="hover:text-gold-DEFAULT transition-colors">+971 52 177 3471</a></li>
              <li>E: <a href="mailto:info@amprio.ae" className="hover:text-gold-DEFAULT transition-colors">info@amprio.ae</a></li>
              <li className="pt-1">@ampriomilano</li>
              <li className="pt-2">Office:</li>
              <li>1802 Ontario Tower, Business Bay, Dubai UAE</li>
            </ul>
            <div className="flex mt-6 space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors">
                <img src="/lovable-uploads/e27b5ed6-867b-45e1-b186-7600041beb58.png" alt="Social icons" className="h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/70">
            © {currentYear} Amprio Milano. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
