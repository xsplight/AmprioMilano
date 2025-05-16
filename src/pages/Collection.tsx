
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import SortDropdown from '../components/filters/SortDropdown';
import { Filter, ArrowLeft, X } from 'lucide-react';
import { useCart } from '../components/Cart';

// This would be replaced with real data from Shopify Storefront API
const mockProducts = [
  {
    id: 1,
    name: "Milano Dinner Plate - Versailles",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 8,
    itemNo: "33158",
    diameter: "28 cm"
  },
  {
    id: 2,
    name: "Ecume White presentation plate",
    price: 111.04,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 12,
    itemNo: "33159",
    diameter: "31.5 cm",
    isNew: true
  },
  {
    id: 3,
    name: "Ecume White dinner plate \"Shogun\", with small center",
    price: 100.36,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 32,
    itemNo: "65016",
    diameter: "29.5 cm"
  },
  {
    id: 4,
    name: "Ecume White dinner plate, large",
    price: 98.22,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 27,
    itemNo: "35970",
    diameter: "29.5 cm",
    isSale: true,
    salePrice: 85.99
  }
];

// Add more collections to handle more routes
const mockCollections = {
  "versailles": {
    id: 1,
    title: "Versailles Collection",
    handle: "versailles",
    description: "Inspired by the opulence of French royalty, our Versailles collection brings elegance to your table.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910"
  },
  "ecume-white": {
    id: 2,
    title: "Ecume White",
    handle: "ecume-white",
    description: "Clean, minimal designs in pristine white porcelain for the modern home.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  "ortigia-outdoor": {
    id: 3,
    title: "Ortigia Outdoor",
    handle: "ortigia-outdoor",
    description: "Durable, stylish tableware designed for al fresco dining and outdoor entertaining.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910"
  },
  "crystal-stemware": {
    id: 4,
    title: "Crystal Stemware",
    handle: "crystal-stemware",
    description: "Exquisitely crafted crystal glasses for every occasion and beverage.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  "ortigia": {
    id: 5,
    title: "Ortigia Collection",
    handle: "ortigia",
    description: "Inspired by the beauty of Sicily, our Ortigia collection brings Mediterranean charm to your table.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910"
  },
  "tableware": {
    id: 6,
    title: "Tableware Collection",
    handle: "tableware",
    description: "Elegant dining solutions for every occasion.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  "outdoor": {
    id: 7,
    title: "Outdoor Collection",
    handle: "outdoor",
    description: "Durable and stylish options for outdoor entertaining.",
    image: "https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910"
  },
  "home-decor": {
    id: 8,
    title: "Home Decor Collection",
    handle: "home-decor",
    description: "Accent pieces to elevate your interior.",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  }
};

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const { addToCart } = useCart();

  // Simulate fetching collection data
  useEffect(() => {
    // This would be replaced with actual Shopify Storefront API call
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (handle && mockCollections[handle as keyof typeof mockCollections]) {
          setCollection(mockCollections[handle as keyof typeof mockCollections]);
          setProducts(mockProducts);
        } else {
          // Handle not found case
          console.error("Collection not found:", handle);
        }
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [handle]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    // This would trigger re-fetching or sorting of products
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: product.image,
      quantity: 1
    });
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/collections" className="text-gray-500 hover:text-brand-green transition-colors">Collections</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{collection?.title || 'Loading...'}</span>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        // Loading state
        <div className="container-custom py-8">
          <div className="h-10 w-1/3 bg-gray-200 animate-pulse mb-4"></div>
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : collection ? (
        <div className="container-custom py-8">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/collections" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-green transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to collections
            </Link>
          </div>
          
          {/* Collection header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{collection.title}</h1>
            <p className="text-gray-600 max-w-3xl">{collection.description}</p>
          </div>
          
          {/* Collection image banner */}
          <div className="mb-12 relative overflow-hidden aspect-[3/1] bg-gray-100">
            <img 
              src={collection.image} 
              alt={collection.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters - desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar />
            </div>
            
            {/* Mobile filter button */}
            <div className="flex justify-between items-center sticky top-0 bg-white z-10 py-4 lg:hidden border-b border-gray-200 mb-4">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)} 
                className="flex items-center text-sm"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
              
              <SortDropdown 
                options={sortOptions}
                value={sortOption}
                onChange={handleSortChange}
              />
            </div>
            
            {/* Products grid */}
            <div className="flex-1">
              {/* Desktop sorting */}
              <div className="hidden lg:flex justify-between items-center mb-8">
                <p className="text-sm text-gray-500">{products.length} products</p>
                <SortDropdown 
                  options={sortOptions}
                  value={sortOption}
                  onChange={handleSortChange}
                />
              </div>
              
              {/* Products */}
              <ProductGrid 
                products={products} 
                columns={3}
              />
              
              {/* Empty state */}
              {products.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or browse our other collections.</p>
                  <Link to="/collections" className="fashion-btn">
                    Browse Collections
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile filter sidebar */}
          <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
            isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="font-medium">Filters</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4 h-full overflow-auto pb-32">
              <FilterSidebar />
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-brand-green text-white"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Not found state
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-serif mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the collection you're looking for.</p>
          <Link to="/collections" className="fashion-btn">
            Browse Collections
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Collection;
