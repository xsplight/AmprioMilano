
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: "Milano Leather Handbag",
    price: 1290,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=870&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=870&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 2,
    name: "Cashmere Blend Sweater",
    price: 680,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1543076659-9380cdf10613?q=80&w=764&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Statement Gold Earrings",
    price: 450,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=776&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1635767798638-3665a293d406?q=80&w=776&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 4,
    name: "Classic Cotton Blazer",
    price: 890,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=774&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=774&auto=format&fit=crop",
    isSale: true,
    salePrice: 690
  }
];

const newArrivals = [
  {
    id: 5,
    name: "Designer Silk Scarf",
    price: 320,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=871&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 6,
    name: "Premium Leather Belt",
    price: 260,
    image: "https://images.unsplash.com/photo-1624222247344-550fb8052c89?q=80&w=1170&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 7,
    name: "Milano Dress Shoes",
    price: 790,
    image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=1190&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 8,
    name: "Italian Wool Coat",
    price: 1450,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=774&auto=format&fit=crop",
    isNew: true
  }
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Featured products section */}
      <ProductGrid 
        products={featuredProducts} 
        title="Featured Products" 
        subtitle="Handpicked Selection"
      />
      
      {/* Brand story banner */}
      <section className="py-16 bg-fashion-black text-fashion-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop" 
                alt="Amprio Milano craftsmanship" 
                className="w-full h-auto" 
              />
            </div>
            <div className="max-w-lg">
              <h2 className="text-gold-DEFAULT uppercase text-sm tracking-widest mb-2">Our Heritage</h2>
              <h3 className="text-4xl font-serif mb-6">Craftsmanship That Defines Elegance</h3>
              <p className="text-fashion-white/80 leading-relaxed mb-8">
                At Amprio Milano, we believe in the art of luxury. Each piece is meticulously crafted by skilled artisans using the finest materials sourced from across Italy. Our dedication to quality and timeless design has made us a symbol of excellence in the fashion world.
              </p>
              <Link to="/about" className="group inline-flex items-center text-gold-DEFAULT">
                <span className="mr-2 uppercase text-sm tracking-wider border-b border-gold-DEFAULT pb-1">Discover Our Story</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* New arrivals section */}
      <ProductGrid 
        products={newArrivals} 
        title="New Arrivals" 
        subtitle="Latest Collection"
      />
      
      {/* Collections grid */}
      <section className="py-16 bg-fashion-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Browse Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Women Collection */}
            <div className="relative group overflow-hidden h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=686&auto=format&fit=crop" 
                alt="Women's Collection" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-8 w-full text-white">
                  <h3 className="text-2xl font-serif mb-4">Women</h3>
                  <Link 
                    to="/collections/women" 
                    className="inline-block border-b border-white pb-1 uppercase text-sm tracking-wider hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Men Collection */}
            <div className="relative group overflow-hidden h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1170&auto=format&fit=crop" 
                alt="Men's Collection" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-8 w-full text-white">
                  <h3 className="text-2xl font-serif mb-4">Men</h3>
                  <Link 
                    to="/collections/men" 
                    className="inline-block border-b border-white pb-1 uppercase text-sm tracking-wider hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Accessories Collection */}
            <div className="relative group overflow-hidden h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1612902456551-333ac5afa26e?q=80&w=688&auto=format&fit=crop" 
                alt="Accessories Collection" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-8 w-full text-white">
                  <h3 className="text-2xl font-serif mb-4">Accessories</h3>
                  <Link 
                    to="/collections/accessories" 
                    className="inline-block border-b border-white pb-1 uppercase text-sm tracking-wider hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="py-16 bg-fashion-gray/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our World</h2>
            <p className="text-fashion-black/70 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter and be the first to know about new collections, exclusive offers and fashion insights.
            </p>
            <form className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border border-fashion-black/20 py-3 px-4 flex-grow focus:outline-none focus:border-gold-DEFAULT"
              />
              <button 
                type="submit" 
                className="bg-fashion-black text-white py-3 px-6 uppercase text-sm tracking-wider hover:bg-gold-DEFAULT transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
