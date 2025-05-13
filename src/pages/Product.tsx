import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, Share2, TruckIcon, RefreshCcw, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import ProductLineSection from '../components/ProductLineSection';
import RelatedProducts from '../components/RelatedProducts';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
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
    "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
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
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
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
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
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
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    isNew: true
  },
  {
    id: 7,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
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
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  {
    id: 9,
    name: "Gold Plated Serving Fork",
    price: 55,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  {
    id: 10,
    name: "Marble Cutting Board",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
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
  const { toast } = useToast();
  
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
          {/* Product Images */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="md:w-1/5 flex md:flex-col gap-2 pt-2 md:pt-0">
                {product.images.map((img, index) => (
                  <motion.button 
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square border ${mainImage === img ? 'border-brand-green' : 'border-gray-200'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="md:w-4/5">
                <motion.div 
                  className="aspect-square md:aspect-[4/5] w-full bg-[#f8f8f8] rounded-sm p-4"
                  layoutId={`product-image-${id}`}
                >
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
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
            
            {/* Material and Size */}
            <motion.div 
              className="mb-6 border-t border-gray-200 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-2">
                <span className="font-medium text-sm">Materials:</span> {product.materials.join(', ')}
              </div>
              <div className="mb-4">
                <span className="font-medium text-sm">Size:</span> {product.diameter}
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
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-green' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="w-8 h-8 rounded-full"
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
                  Add to bag — {product.price} AED
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
                  className="flex-1 h-11 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors rounded-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart size={16} />
                  <span>Add to wish list</span>
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
