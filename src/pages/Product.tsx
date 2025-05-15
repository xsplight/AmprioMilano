
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, Share2, TruckIcon, RefreshCcw, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import ProductLineSection from '../components/ProductLineSection';
import RelatedProducts from '../components/RelatedProducts';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '../components/Cart';
import Cart from '../components/Cart';

// Mock product data (в будущем будет заменено на API)
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
    "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    "https://ampriomilano.com/cdn/shop/files/PLAR.MICA04_3efcc2df-8b59-40e7-aa67-0bc005720fb8_400x.png?v=1746463780",
    "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880",
    "https://ampriomilano.com/cdn/shop/files/TS_MAM04_45100a99-1976-42f5-8721-ff4357d9d967_400x.png?v=1746406478"
  ]
};

// Same line products (plate collection)
const sameLine = [
  {
    id: 2,
    name: "Ecume White presentation plate",
    price: 111.04,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    itemNo: "33158",
    diameter: "31.5 cm",
    inStock: 8,
    deliveryTime: "4-5 working days",
    currency: "AED"
  },
  {
    id: 3,
    name: "Ecume White dinner plate \"Shogun\", with small center",
    price: 100.36,
    image: "https://ampriomilano.com/cdn/shop/files/PLAR.MICA04_3efcc2df-8b59-40e7-aa67-0bc005720fb8_400x.png?v=1746463780",
    itemNo: "65016",
    diameter: "29.5 cm",
    inStock: 32,
    deliveryTime: "4-5 working days",
    currency: "AED"
  },
  {
    id: 4,
    name: "Ecume White dinner plate, large",
    price: 98.22,
    image: "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880",
    itemNo: "35970",
    diameter: "29.5 cm",
    inStock: 27,
    deliveryTime: "4-5 working days",
    currency: "AED"
  }
];

// Related products
const relatedProducts = [
  {
    id: 5,
    name: "Crystal Water Glass - Sapphire",
    price: 75,
    image: "https://ampriomilano.com/cdn/shop/files/CTRA.MAM01_0c773653-45c2-4647-a1b0-f4206c2d2134_400x.png?v=1737391500"
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://ampriomilano.com/cdn/shop/files/SER1.MAM01_38535f72-c5c9-4f51-a7b1-a606c5fa947f_400x.png?v=1737391443",
    isNew: true
  },
  {
    id: 7,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://ampriomilano.com/cdn/shop/files/TS_MAM04_45100a99-1976-42f5-8721-ff4357d9d967_400x.png?v=1746406478",
    isSale: true,
    salePrice: 69
  }
];

// Recently viewed products
const recentlyViewed = [
  {
    id: 8,
    name: "Fine Silver Dessert Spoon",
    price: 45,
    image: "https://ampriomilano.com/cdn/shop/files/SER1.MAM01_38535f72-c5c9-4f51-a7b1-a606c5fa947f_400x.png?v=1737391443"
  },
  {
    id: 9,
    name: "Gold Plated Serving Fork",
    price: 55,
    image: "https://ampriomilano.com/cdn/shop/files/CTRA.MAM01_0c773653-45c2-4647-a1b0-f4206c2d2134_400x.png?v=1737391500"
  },
  {
    id: 10,
    name: "Premium Ceramic Serving Bowl",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880"
  }
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    // Add item to cart with current quantity
    addToCart({
      id: Number(id) || product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    
    // Show success animation
    setAddedToCart(true);
    
    // Reset after animation
    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
    
    // Show toast
    toast({
      title: "Added to bag",
      description: `${product.name} × ${quantity} added to your shopping bag`,
      duration: 3000,
    });
    
    // Open cart drawer
    setTimeout(() => {
      setIsCartOpen(true);
    }, 800);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${product.name} removed from your wishlist` : `${product.name} added to your wishlist`,
      duration: 3000,
    });
  };

  return (
    <Layout>
      {/* Cart component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Back button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-green transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Link>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images - Changed layout to vertical with images below */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4">
              {/* Main Image - removed border and overflow */}
              <div className="w-full">
                <motion.div 
                  className="aspect-square md:aspect-[4/5] w-full"
                  layoutId={`product-image-${id}`}
                >
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
              
              {/* Thumbnails below main image */}
              <div className="w-full flex gap-2 justify-center">
                {product.images.map((img, index) => (
                  <motion.button 
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square w-24 ${mainImage === img ? 'ring-2 ring-brand-green' : 'hover:opacity-80'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Product Details */}
          <div className="lg:w-2/5">
            <motion.div {...fadeIn}>
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
            </motion.div>
            
            {/* Availability and delivery info */}
            <motion.div 
              className="mb-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center mb-2 text-sm">
                <span className="text-brand-green mr-2">✓</span>
                <span>{product.inStock} in stock, delivery time approx. {product.deliveryTime}</span>
              </div>
              <div className="text-sm text-gray-500">
                Otherwise approx. 2 months delivery time
              </div>
            </motion.div>
            
            {/* Material and Size - Improved icons */}
            <motion.div 
              className="mb-6 border-t border-gray-200 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                    <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 19H14.01M14.5 19C14.5 19.2761 14.2761 19.5 14 19.5C13.7239 19.5 13.5 19.2761 13.5 19C13.5 18.7239 13.7239 18.5 14 18.5C14.2761 18.5 14.5 18.7239 14.5 19Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 15L15.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 15L13.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 15L16.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-sm">Materials:</span> {product.materials.join(', ')}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="4"/>
                    <line x1="21.17" x2="12" y1="8" y2="8"/>
                    <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
                    <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-sm">Size:</span> {product.diameter}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                    <path d="m16 6 4 14"/>
                    <path d="M12 6v14"/>
                    <path d="M8 8v12"/>
                    <path d="M4 4v16"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-sm">SKU:</span> {product.sku}
                </div>
              </div>
            </motion.div>
            
            {/* Color Selection */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-medium mb-3">Color: <span className="text-brand-green">{selectedColor}</span></h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-green' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="w-10 h-10 rounded-full"
                      style={{ 
                        backgroundColor: color === 'Blue' ? '#3b5998' : 
                                      color === 'Green' ? '#4d7a6a' : 
                                      color === 'Gold' ? '#D4AF37' : 
                                      color === 'White' ? '#FFFFFF' : ''
                      }}
                      aria-label={`Select ${color} color`}
                    ></span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Quantity Selector */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex">
                <motion.button 
                  onClick={handleDecrement}
                  className="border border-r-0 border-gray-300 w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-l-sm"
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus size={18} />
                </motion.button>
                <div className="border-y border-gray-300 h-12 w-16 flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <motion.button 
                  onClick={handleIncrement}
                  className="border border-l-0 border-gray-300 w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-r-sm"
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus size={18} />
                </motion.button>
              </div>
            </motion.div>
            
            {/* Add to Cart & Wishlist */}
            <motion.div 
              className="flex flex-col gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className="relative w-full h-12 bg-brand-green text-white uppercase text-sm tracking-wider hover:bg-brand-lightGreen transition-colors rounded-sm overflow-hidden"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={addedToCart}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: addedToCart ? 0 : 1 }}
                >
                  Add to bag — {product.price * quantity} AED
                </motion.div>
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: addedToCart ? 1 : 0,
                    y: addedToCart ? 0 : 20
                  }}
                >
                  <Check className="mr-2" size={18} /> Added to bag
                </motion.div>
              </motion.button>
              
              <div className="flex gap-4">
                <motion.button 
                  className={`flex-1 h-11 border ${isWishlisted ? 'bg-pink-50 border-pink-200' : 'border-gray-300'} flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors rounded-sm`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleToggleWishlist}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-pink-500 text-pink-500' : ''} />
                  <span>{isWishlisted ? 'Added to wishlist' : 'Add to wishlist'}</span>
                </motion.button>
                <motion.button 
                  className="flex-1 h-11 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors rounded-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>
            
            {/* Sharing options */}
            <motion.div 
              className="flex gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button className="text-sm text-gray-600 hover:text-brand-green transition-colors">
                WhatsApp
              </button>
              <button className="text-sm text-gray-600 hover:text-brand-green transition-colors">
                Email
              </button>
            </motion.div>
            
            {/* Services */}
            <motion.div 
              className="space-y-3 border-t border-b border-gray-200 py-6 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center">
                <TruckIcon size={18} className="mr-3 text-brand-green" />
                <span className="text-sm">Fast shipping in UAE</span>
              </div>
              <div className="flex items-center">
                <RefreshCcw size={18} className="mr-3 text-brand-green" />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
            </motion.div>
            
            {/* Product Info Tabs */}
            <motion.div 
              className="border-b border-gray-200 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 px-4 text-sm transition-colors ${
                    activeTab === 'description' ? 'border-b-2 border-brand-green font-medium' : 'text-gray-500'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-3 px-4 text-sm transition-colors ${
                    activeTab === 'details' ? 'border-b-2 border-brand-green font-medium' : 'text-gray-500'
                  }`}
                >
                  Details
                </button>
              </div>
            </motion.div>
            
            {/* Tab Content */}
            <motion.div 
              className="text-sm leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              key={activeTab}
            >
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
            </motion.div>
          </div>
        </div>
        
        {/* All products in this line - Section */}
        <ProductLineSection products={sameLine} title="All products of this line" />
        
        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts} 
          title="You May Also Like" 
          subtitle="Related Products" 
        />
        
        {/* Recently Viewed Products */}
        <RelatedProducts 
          products={recentlyViewed} 
          title="Recently Viewed" 
          subtitle="Your History" 
        />
      </div>
    </Layout>
  );
};

export default Product;
