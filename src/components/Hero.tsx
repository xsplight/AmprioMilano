
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910',
    title: 'Fall/Winter Collection',
    subtitle: 'LUXURY REIMAGINED',
    cta: 'Explore Collection',
    link: '/collections/winter'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1920&auto=format&fit=crop',
    title: 'Exclusive Designs',
    subtitle: 'CRAFTED WITH PASSION',
    cta: 'Shop Now',
    link: '/shop'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1920&auto=format&fit=crop',
    title: 'Artisan Accessories',
    subtitle: 'HANDMADE EXCELLENCE',
    cta: 'Discover More',
    link: '/collections/accessories'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container-custom">
              <div className="max-w-lg text-white animate-fade-in">
                <h2 className="uppercase text-sm tracking-[0.2em] mb-2 font-medium">{slide.subtitle}</h2>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6">{slide.title}</h1>
                <Link to={slide.link} className="group inline-flex items-center">
                  <span className="mr-2 uppercase text-sm tracking-wider border-b border-white pb-1 transition-all group-hover:border-gold-DEFAULT">{slide.cta}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-custom">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1 transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
