
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { Heart, Share2, TruckIcon, RefreshCcw, Minus, Plus, ArrowLeft } from 'lucide-react';

// Mock product data
const product = {
  id: 1,
  name: "Milano Dinner Plate - Versailles",
  price: 120,
  description: "Exquisite dinner plate from the Versailles collection featuring elegant blue and white porcelain design with intricate details. Perfect for formal dining settings and special occasions. Each piece is carefully crafted to bring timeless sophistication to your table.",
  details: [
    "Premium porcelain material",
    "Handcrafted with attention to detail",
    "Dishwasher safe",
    "Diameter: 28 cm",
    "Made in Italy",
    "Microwave safe",
    "Part of the Versailles collection"
  ],
  colors: ["Blue", "Green", "Gold", "White"],
  materials: ["Porcelain"],
  sku: "PLAIVER01",
  images: [
    "https://images.unsplash.com/photo-1621977300786-8f262903e67c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622428051717-dcd9565a8ce5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621977300786-8f262903e67c?q=80&w=2070&auto=format&fit=crop"
  ]
};

// Related products
const relatedProducts = [
  {
    id: 2,
    name: "Crystal Water Glass - Sapphire",
    price: 75,
    image: "https://images.unsplash.com/photo-1622428052287-fd531d664b3e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://images.unsplash.com/photo-1550701035-c0bb32de8aca?q=80&w=2070&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 4,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://images.unsplash.com/photo-1617902213861-1260401a6fcc?q=80&w=2070&auto=format&fit=crop",
    isSale: true,
    salePrice: 69
  }
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-gold-DEFAULT">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gold-DEFAULT transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-3/5">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="md:w-1/5 flex md:flex-col gap-2 pt-2 md:pt-0">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square border ${mainImage === img ? 'border-gold-DEFAULT' : 'border-gray-200'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="md:w-4/5">
                <div className="aspect-square md:aspect-[4/5] w-full">
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-2/5">
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-serif mb-1">{product.name}</h1>
                <p className="text-sm text-gray-600 mb-3">Baci Milano</p>
                <p className="text-sm text-gray-500 mb-2">{product.sku}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-medium">{product.price} AED</p>
              </div>
            </div>
            
            {/* Material and Size */}
            <div className="mb-6 border-t border-gray-200 pt-4">
              <div className="mb-2">
                <span className="font-medium text-sm">Materials:</span> {product.materials.join(', ')}
              </div>
              <div className="mb-4">
                <span className="font-medium text-sm">Size:</span> DIAM 28 cm
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: <span>{selectedColor}</span></h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 border ${selectedColor === color ? 'ring-2 ring-gold-DEFAULT' : 'border-gray-300'}`}
                    style={{ 
                      backgroundColor: color === 'Blue' ? '#3b5998' : 
                                     color === 'Green' ? '#4CAF50' : 
                                     color === 'Gold' ? '#D4AF37' : 
                                     color === 'White' ? '#FFFFFF' : ''
                    }}
                    aria-label={`Select ${color} color`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex">
                <button 
                  onClick={handleDecrement}
                  className="border border-r-0 border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <div className="border-y border-gray-300 h-10 w-12 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={handleIncrement}
                  className="border border-l-0 border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart & Wishlist */}
            <div className="flex flex-col gap-4 mb-6">
              <button className="w-full py-3 bg-[#4CAF50] text-white uppercase text-sm tracking-wider hover:bg-[#45a049] transition-colors">
                Add to Cart — {product.price} AED
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 py-2 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors">
                  <Heart size={16} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 py-2 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            {/* Sharing options */}
            <div className="flex gap-4 mb-6">
              <button className="text-sm text-gray-600 hover:text-gold-DEFAULT transition-colors">
                WhatsApp
              </button>
              <button className="text-sm text-gray-600 hover:text-gold-DEFAULT transition-colors">
                Email
              </button>
            </div>
            
            {/* Services */}
            <div className="space-y-3 border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex items-center">
                <TruckIcon size={18} className="mr-3 text-[#4CAF50]" />
                <span className="text-sm">Fast shipping in UAE</span>
              </div>
              <div className="flex items-center">
                <RefreshCcw size={18} className="mr-3 text-[#4CAF50]" />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
            </div>
            
            {/* Product Info Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 px-4 text-sm ${
                    activeTab === 'description' ? 'border-b-2 border-[#4CAF50] font-medium' : 'text-gray-500'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-3 px-4 text-sm ${
                    activeTab === 'details' ? 'border-b-2 border-[#4CAF50] font-medium' : 'text-gray-500'
                  }`}
                >
                  Details
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="text-sm leading-relaxed text-gray-700">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              
              {activeTab === 'details' && (
                <ul className="list-disc list-inside space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Related Products"
            columns={3}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
