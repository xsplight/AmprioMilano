
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import Footer from './Footer';
import Cart from './Cart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-green text-white py-2 px-4 text-sm">
        <div className="container-custom flex justify-between items-center">
          <div>FAST SHIPPING IN UAE <a href="/shipping" className="underline ml-1">learn more</a></div>
          <div>+971 52 177 3471</div>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-white'
        }`}
      >
        <div className="container-custom flex flex-col items-center py-6">
          {/* Logo */}
          <Link to="/" className="mb-6">
            <img 
              src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
              alt="Amprio Milano" 
              className="h-24" // Increased from h-20 to h-24
            />
          </Link>

          <div className="w-full flex items-center justify-between">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:block flex-grow">
              <ul className="flex justify-center space-x-10">
                <li>
                  <Link 
                    to="/" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/' ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    New In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/products' ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/collections' || location.pathname.startsWith('/collection/') ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tableware" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/tableware' ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    Tableware
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/interior" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname.includes('/interior') ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    Interior
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/outdoor" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/outdoor' ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`uppercase text-sm tracking-wide font-medium ${location.pathname === '/contact' ? 'text-brand-green' : 'text-gray-700 hover:text-brand-green transition-colors'}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              <Link to="/search" aria-label="Search" className="hover:text-brand-green transition-colors">
                <Search size={22} />
              </Link>
              <Link to="/account" aria-label="Account" className="hover:text-brand-green transition-colors">
                <User size={22} />
              </Link>
              <button 
                aria-label="Cart" 
                className="flex items-center group hover:text-brand-green transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} className="group-hover:animate-cart-bounce" />
                <span className="ml-1 text-base">— 0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container-custom py-4">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    New In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/products' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/collections' || location.pathname.startsWith('/collection/') ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tableware" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/tableware' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Tableware
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/interior" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname.includes('/interior') ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Interior
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/outdoor" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/outdoor' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/contact' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/about' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shipping" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/shipping' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/returns" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/returns' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className={`block uppercase text-sm tracking-wide font-medium ${location.pathname === '/privacy' ? 'text-brand-green' : 'text-gray-700'}`}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />

      {/* Shopping Cart Slide-out */}
      <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Layout;
