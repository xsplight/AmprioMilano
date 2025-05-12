
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronRight } from 'lucide-react';

// Mock data - would be replaced with Shopify Storefront API data
const collections = [
  {
    id: 1,
    title: "Versailles Collection",
    handle: "versailles",
    description: "Inspired by the opulence of French royalty, our Versailles collection brings elegance to your table.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910",
    productCount: 24
  },
  {
    id: 2,
    title: "Ecume White",
    handle: "ecume-white",
    description: "Clean, minimal designs in pristine white porcelain for the modern home.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    productCount: 18
  },
  {
    id: 3,
    title: "Ortigia Outdoor",
    handle: "ortigia-outdoor",
    description: "Durable, stylish tableware designed for al fresco dining and outdoor entertaining.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910",
    productCount: 12
  },
  {
    id: 4,
    title: "Crystal Stemware",
    handle: "crystal-stemware",
    description: "Exquisitely crafted crystal glasses for every occasion and beverage.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    productCount: 15
  }
];

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">Collections</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Our Collections</h1>
        <p className="text-gray-600 mb-12 max-w-3xl">Discover our carefully curated collections, each telling a unique story through exquisite craftsmanship and timeless design.</p>

        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-[3/2] bg-gray-100 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          // Collections grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link 
                key={collection.id} 
                to={`/collection/${collection.handle}`} 
                className="group block border border-gray-200 fade-in-element"
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-serif mb-2">{collection.title}</h2>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{collection.productCount} products</span>
                    <div className="flex items-center text-brand-green group-hover:translate-x-1 transition-transform">
                      <span className="mr-1 text-sm font-medium">View collection</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Collections;
