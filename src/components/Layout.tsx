
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
      {/* Announcement Bar */}
      <div className="bg-[#2e7d32] text-white py-1 px-4 text-sm">
        <div className="container-custom flex justify-between items-center">
          <div>FAST SHIPPING IN UAE <a href="#" className="underline ml-1">learn more</a></div>
          <div>+971 52 177 3471</div>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-white'
        }`}
      >
        <div className="container-custom flex flex-col items-center py-4">
          {/* Logo */}
          <Link to="/" className="mb-4">
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-[#4CAF50]">
                AMPRIO MILANO
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-500">
                GOURMET TABLEWARE & DECOR
              </div>
            </div>
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
              <ul className="flex justify-center space-x-8">
                <li>
                  <Link 
                    to="/" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    New In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tableware" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/tableware' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    Tableware
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/interior" 
                    className={`uppercase text-sm tracking-wide ${location.pathname.includes('/interior') ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    Interior Accents
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/outdoor" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/outdoor' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/collections' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/horeca" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/horeca' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    HoReCa
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`uppercase text-sm tracking-wide ${location.pathname === '/about' ? 'text-[#4CAF50] font-medium' : 'text-gray-700 hover:text-[#4CAF50]'}`}
                  >
                    About
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
              <button aria-label="Cart" className="flex items-center">
                <ShoppingBag size={20} />
                <span className="ml-1">— 0</span>
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
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    New In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tableware" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/tableware' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    Tableware
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/interior" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname.includes('/interior') ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    Interior Accents
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/outdoor" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/outdoor' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/collections' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/horeca" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/horeca' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    HoReCa
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`block uppercase text-sm tracking-wide ${location.pathname === '/about' ? 'text-[#4CAF50] font-medium' : 'text-gray-700'}`}
                  >
                    About
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
    </>
  );
};

export default Layout;
