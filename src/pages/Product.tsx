
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductLineSection from '../components/ProductLineSection';
import RelatedProducts from '../components/RelatedProducts';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '../components/Cart';
import Cart from '../components/Cart';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductAttributes from '../components/product/ProductAttributes';
import ProductColorSelector from '../components/product/ProductColorSelector';
import ProductQuantitySelector from '../components/product/ProductQuantitySelector';
import ProductActions from '../components/product/ProductActions';
import ProductServices from '../components/product/ProductServices';
import ProductTabs from '../components/product/ProductTabs';
import ProductBreadcrumb from '../components/product/ProductBreadcrumb';
import BackButton from '../components/product/BackButton';

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
    description: "Elegant white presentation plate perfect for fine dining establishments and home use. Features a subtle rim design.",
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
    description: "Unique dinner plate with special center depression perfect for sauces. Japanese-inspired Shogun design.",
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
    description: "Oversized dinner plate with broad rim for elegant food presentation. Perfect for main courses.",
    currency: "AED"
  }
];

// Related products
const relatedProducts = [
  {
    id: 5,
    name: "Crystal Water Glass - Sapphire",
    price: 75,
    image: "https://ampriomilano.com/cdn/shop/files/CTRA.MAM01_0c773653-45c2-4647-a1b0-f4206c2d2134_400x.png?v=1737391500",
    description: "Exquisite crystal water glass with subtle blue tint. Perfect for elegant table settings."
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://ampriomilano.com/cdn/shop/files/SER1.MAM01_38535f72-c5c9-4f51-a7b1-a606c5fa947f_400x.png?v=1737391443",
    isNew: true,
    description: "New addition to our collection. Fine porcelain teacup with delicate azure pattern."
  },
  {
    id: 7,
    name: "Gold Rim Wine Glass",
    price: 89,
    image: "https://ampriomilano.com/cdn/shop/files/TS_MAM04_45100a99-1976-42f5-8721-ff4357d9d967_400x.png?v=1746406478",
    isSale: true,
    salePrice: 69,
    description: "Luxury wine glass with 24k gold-plated rim. Currently on sale for a limited time."
  }
];

// Recently viewed products
const recentlyViewed = [
  {
    id: 8,
    name: "Fine Silver Dessert Spoon",
    price: 45,
    image: "https://ampriomilano.com/cdn/shop/files/SER1.MAM01_38535f72-c5c9-4f51-a7b1-a606c5fa947f_400x.png?v=1737391443",
    description: "Sterling silver dessert spoon with classical design. Perfect for fine dining."
  },
  {
    id: 9,
    name: "Gold Plated Serving Fork",
    price: 55,
    image: "https://ampriomilano.com/cdn/shop/files/CTRA.MAM01_0c773653-45c2-4647-a1b0-f4206c2d2134_400x.png?v=1737391500",
    description: "Elegant gold-plated serving fork for special occasions and dinner parties."
  },
  {
    id: 10,
    name: "Premium Ceramic Serving Bowl",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880",
    description: "Large ceramic serving bowl with hand-painted design. Perfect centerpiece for any table."
  }
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
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

  return (
    <Layout>
      {/* Cart component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Breadcrumb */}
      <ProductBreadcrumb productName={product.name} />
      
      <div className="container-custom pt-4 pb-8">
        {/* Back button */}
        <BackButton />
        
        <div className="flex flex-col lg:flex-row gap-12 mt-2">
          {/* Product Images */}
          <ProductImageGallery 
            images={product.images} 
            productName={product.name}
            id={id}
          />
          
          {/* Product Details */}
          <div className="lg:w-2/5">
            {/* Basic product info */}
            <ProductInfo 
              name={product.name}
              itemNo={product.itemNo}
              diameter={product.diameter}
              price={product.price}
              inStock={product.inStock}
              deliveryTime={product.deliveryTime}
            />
            
            {/* Material and Size Icons */}
            <ProductAttributes 
              materials={product.materials}
              diameter={product.diameter}
              sku={product.sku}
            />
            
            {/* Color Selection */}
            <ProductColorSelector 
              colors={product.colors} 
              onColorChange={setSelectedColor}
              initialColor={selectedColor}
            />
            
            {/* Quantity Selector */}
            <ProductQuantitySelector 
              initialQuantity={quantity} 
              onQuantityChange={setQuantity}
            />
            
            {/* Add to Cart & Wishlist */}
            <ProductActions 
              onAddToCart={handleAddToCart}
              price={product.price}
              quantity={quantity}
              productName={product.name}
              isAddingToCart={addedToCart}
            />
            
            {/* Services */}
            <ProductServices />
            
            {/* Product Info Tabs */}
            <ProductTabs 
              description={product.description}
              details={product.details}
            />
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
