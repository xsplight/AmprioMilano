
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import SortDropdown from '../components/filters/SortDropdown';
import { Filter, X } from 'lucide-react';

// Mock products data - would be replaced with Shopify Storefront API data
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
  },
  {
    id: 5,
    name: "Crystal Water Glass - Sapphire",
    price: 75,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 18,
    itemNo: "45678",
    diameter: "10 cm"
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 24,
    itemNo: "78912",
    diameter: "8 cm",
    isNew: true
  },
  {
    id: 7,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 16,
    itemNo: "36925",
    diameter: "9 cm",
    isSale: true,
    salePrice: 69
  },
  {
    id: 8,
    name: "Silver Dessert Spoon",
    price: 45,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    inStock: 36,
    itemNo: "48265",
    length: "15 cm"
  }
];

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  // Simulate fetching products data
  useEffect(() => {
    // This would be replaced with actual Shopify Storefront API call
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProducts(mockProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    // This would trigger re-fetching or sorting of products
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
            <span className="text-gray-800">All Products</span>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">All Products</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our complete collection of premium tableware and home decor items,
            crafted with exquisite attention to detail and design.
          </p>
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
              <p className="text-sm text-gray-500">
                {isLoading ? 'Loading products...' : `${products.length} products`}
              </p>
              <SortDropdown 
                options={sortOptions}
                value={sortOption}
                onChange={handleSortChange}
              />
            </div>
            
            {/* Products */}
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-square bg-gray-100 mb-4"></div>
                    <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={products} columns={4} />
            )}
            
            {/* Empty state */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or browse our collections.</p>
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
    </Layout>
  );
};

export default AllProducts;
