
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
  itemNo: "33158",
  diameter: "28 cm",
  inStock: 8,
  deliveryTime: "4-5 working days",
  images: [
    "https://images.unsplash.com/photo-1621977300786-8f262903e67c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622428051717-dcd9565a8ce5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621977300786-8f262903e67c?q=80&w=2070&auto=format&fit=crop"
  ]
};

// Same line products (plate collection)
const sameLine = [
  {
    id: 2,
    name: "Ecume White presentation plate",
    price: 111.04,
    image: "https://images.unsplash.com/photo-1622428052287-fd531d664b3e?q=80&w=2070&auto=format&fit=crop",
    itemNo: "33158",
    diameter: "31.5 cm",
    inStock: 8,
    deliveryTime: "4-5 working days",
    currency: "US $"
  },
  {
    id: 3,
    name: "Ecume White dinner plate \"Shogun\", with small center",
    price: 100.36,
    image: "https://images.unsplash.com/photo-1550701035-c0bb32de8aca?q=80&w=2070&auto=format&fit=crop",
    itemNo: "65016",
    diameter: "29.5 cm",
    inStock: 32,
    deliveryTime: "4-5 working days",
    currency: "US $"
  },
  {
    id: 4,
    name: "Ecume White dinner plate, large",
    price: 98.22,
    image: "https://images.unsplash.com/photo-1617902213861-1260401a6fcc?q=80&w=2070&auto=format&fit=crop",
    itemNo: "35970",
    diameter: "29.5 cm",
    inStock: 27,
    deliveryTime: "4-5 working days",
    currency: "US $"
  }
];

// Related products
const relatedProducts = [
  {
    id: 5,
    name: "Crystal Water Glass - Sapphire",
    price: 75,
    image: "https://images.unsplash.com/photo-1622428052287-fd531d664b3e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://images.unsplash.com/photo-1550701035-c0bb32de8aca?q=80&w=2070&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 7,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://images.unsplash.com/photo-1617902213861-1260401a6fcc?q=80&w=2070&auto=format&fit=crop",
    isSale: true,
    salePrice: 69
  }
];

// Recently viewed products
const recentlyViewed = [
  {
    id: 8,
    name: "Silver Dessert Spoon",
    price: 45,
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Gold Plated Serving Fork",
    price: 55,
    image: "https://images.unsplash.com/photo-1622428051717-dcd9565a8ce5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Marble Cutting Board",
    price: 120,
    image: "https://images.unsplash.com/photo-1621977300786-8f262903e67c?q=80&w=2070&auto=format&fit=crop"
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
                <p className="text-sm text-gray-500 mb-2">Item no. {product.itemNo}</p>
                <p className="text-sm text-gray-500 mb-2">Ø {product.diameter}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-medium">{product.price} AED</p>
              </div>
            </div>
            
            {/* Availability and delivery info */}
            <div className="mb-6 pt-4">
              <div className="flex items-center mb-2 text-sm">
                <span className="text-[#4CAF50] mr-2">✓</span>
                <span>{product.inStock} in stock, delivery time approx. {product.deliveryTime}</span>
              </div>
              <div className="text-sm text-gray-500">
                Otherwise approx. 2 months delivery time
              </div>
            </div>
            
            {/* Material and Size */}
            <div className="mb-6 border-t border-gray-200 pt-4">
              <div className="mb-2">
                <span className="font-medium text-sm">Materials:</span> {product.materials.join(', ')}
              </div>
              <div className="mb-4">
                <span className="font-medium text-sm">Size:</span> {product.diameter}
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
              <button className="w-full py-3 bg-[#D4AF37] text-white uppercase text-sm tracking-wider hover:bg-[#c9a52e] transition-colors">
                Add to bag — {product.price} AED
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 py-2 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors">
                  <Heart size={16} />
                  <span>Add to wish list</span>
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
        
        {/* All products in this line - Section */}
        <div className="mt-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-center">
              <h2 className="bg-white px-6 text-xl font-serif text-[#D4AF37]">All products of this line</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {sameLine.map((item) => (
              <div key={item.id} className="border-t border-b border-gray-200 py-6">
                <div className="flex">
                  {/* Product image */}
                  <div className="w-1/3 pr-4">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-full h-auto" />
                    </Link>
                  </div>
                  
                  {/* Product details */}
                  <div className="w-2/3">
                    <Link to={`/product/${item.id}`} className="block mb-1">
                      <h3 className="text-sm font-medium hover:text-[#4CAF50]">"{item.name}"</h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-1">Item no. {item.itemNo}</p>
                    <p className="text-xs text-gray-500 mb-3">Ø {item.diameter}</p>
                    
                    {/* Availability */}
                    <div className="flex items-center mb-1 text-xs">
                      <span className="text-[#4CAF50] mr-1">✓</span>
                      <span>{item.inStock} in stock, delivery time approx. {item.deliveryTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Otherwise approx. 2 months delivery time</p>
                    
                    {/* Price and actions */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">{item.currency}{item.price}</span>
                      
                      <div className="flex items-center gap-2">
                        <div className="border border-gray-300 w-16">
                          <input type="number" defaultValue="1" min="1" className="w-full h-8 text-center text-sm" />
                        </div>
                        <button className="bg-[#D4AF37] text-white text-xs py-2 px-3 hover:bg-[#c9a52e]">
                          Add to bag
                        </button>
                      </div>
                    </div>
                    
                    {/* Wish list */}
                    <div className="text-right mt-2">
                      <button className="text-xs text-[#D4AF37] flex items-center justify-end gap-1">
                        <span>Add to wish list</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"/><path d="M8 9v7"/><path d="M16 9v7"/><path d="M12 12V9"/><path d="M12 12v7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        
        {/* Recently Viewed Products */}
        <div className="mt-20">
          <ProductGrid
            products={recentlyViewed}
            title="Recently Viewed"
            subtitle="Your History"
            columns={3}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
