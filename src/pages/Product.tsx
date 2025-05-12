
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { Heart, Share2, TruckIcon, RefreshCcw, Minus, Plus } from 'lucide-react';

// Mock product data
const product = {
  id: 1,
  name: "Milano Leather Handbag",
  price: 1290,
  description: "Crafted from fine Italian leather, this handbag embodies luxury and sophistication with its timeless design and meticulous attention to detail. The Milano Leather Handbag features a spacious interior with multiple pockets for organization, a secure zipper closure, and an adjustable shoulder strap.",
  details: [
    "Premium full-grain leather",
    "Handcrafted in Italy",
    "Signature gold-tone hardware",
    "Cotton twill lining",
    "Interior zip pocket and two slip pockets",
    "Adjustable leather shoulder strap",
    "Dimensions: 11.8\"L x 8.7\"H x 4.7\"D"
  ],
  colors: ["Black", "Brown", "Burgundy", "Beige"],
  materials: ["Full-grain leather", "Gold-tone hardware"],
  images: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=774&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=757&auto=format&fit=crop"
  ]
};

// Related products
const relatedProducts = [
  {
    id: 2,
    name: "Cashmere Blend Sweater",
    price: 680,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Statement Gold Earrings",
    price: 450,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=776&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 4,
    name: "Classic Cotton Blazer",
    price: 890,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=774&auto=format&fit=crop",
    isSale: true,
    salePrice: 690
  }
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState('Black');
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
      <div className="container-custom py-12">
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
                <div className="aspect-square md:aspect-[4/5] w-full bg-fashion-gray/20">
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-2/5">
            <h1 className="text-3xl font-serif mb-3">{product.name}</h1>
            <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider mb-3">Color: <span className="font-medium">{selectedColor}</span></h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 border ${selectedColor === color ? 'ring-2 ring-gold-DEFAULT' : 'border-gray-300'}`}
                    style={{ 
                      backgroundColor: color === 'Black' ? '#121212' : 
                                     color === 'Brown' ? '#5D4037' : 
                                     color === 'Burgundy' ? '#800020' : 
                                     color === 'Beige' ? '#F5F5DC' : ''
                    }}
                    aria-label={`Select ${color} color`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider mb-3">Quantity</h3>
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
            <div className="flex gap-4 mb-8">
              <button className="flex-grow py-3 bg-fashion-black text-white uppercase text-sm tracking-wider hover:bg-gold-DEFAULT transition-colors">
                Add to Cart
              </button>
              <button className="w-12 aspect-square border border-gray-300 flex items-center justify-center hover:bg-fashion-black hover:text-white transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-12 aspect-square border border-gray-300 flex items-center justify-center hover:bg-fashion-black hover:text-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            
            {/* Services */}
            <div className="space-y-3 border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-center">
                <TruckIcon size={18} className="mr-3" />
                <span className="text-sm">Free shipping on orders over $250</span>
              </div>
              <div className="flex items-center">
                <RefreshCcw size={18} className="mr-3" />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
            </div>
            
            {/* Product Info Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 px-4 text-sm uppercase tracking-wider ${
                    activeTab === 'description' ? 'border-b-2 border-fashion-black font-medium' : 'text-gray-500'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-3 px-4 text-sm uppercase tracking-wider ${
                    activeTab === 'details' ? 'border-b-2 border-fashion-black font-medium' : 'text-gray-500'
                  }`}
                >
                  Details
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="text-sm leading-relaxed text-fashion-black/80">
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
            columns={3}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
