
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold">
            AMPRIO<span className="text-gold-DEFAULT">MILANO</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`uppercase text-sm tracking-wide ${location.pathname === '/' ? 'font-medium' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className={`uppercase text-sm tracking-wide ${location.pathname === '/shop' ? 'font-medium' : ''}`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections" 
                  className={`uppercase text-sm tracking-wide ${location.pathname.includes('/collections') ? 'font-medium' : ''}`}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`uppercase text-sm tracking-wide ${location.pathname === '/about' ? 'font-medium' : ''}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`uppercase text-sm tracking-wide ${location.pathname === '/contact' ? 'font-medium' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search">
              <Search size={20} />
            </button>
            <button aria-label="Account">
              <User size={20} />
            </button>
            <button aria-label="Cart">
              <ShoppingBag size={20} />
            </button>
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
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/' ? 'font-medium' : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shop" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/shop' ? 'font-medium' : ''}`}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname.includes('/collections') ? 'font-medium' : ''}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/about' ? 'font-medium' : ''}`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/contact' ? 'font-medium' : ''}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-24 min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
