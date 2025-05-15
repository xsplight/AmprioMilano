
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  itemNo?: string;
  diameter?: string;
  inStock?: number;
  deliveryTime?: string;
  currency?: string;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  hoverImage,
  isNew = false,
  isSale = false,
  salePrice,
  itemNo,
  diameter,
  inStock,
  deliveryTime,
  currency = "AED",
  category
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultImage = "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234";
  
  // HoReCa category icon
  const renderCategoryIcon = () => {
    if (!category) return null;
    
    let icon = null;
    
    switch(category) {
      case 'restaurant':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
            <path d="M6 7v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            <path d="M3 7h18"/>
            <path d="M9 14v2"/>
            <path d="M15 14v2"/>
          </svg>
        );
        break;
      case 'hotel':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
            <path d="M5 12h14"/>
            <path d="M9 12v5"/>
            <path d="M15 12v5"/>
            <path d="M3 21h18"/>
          </svg>
        );
        break;
      case 'beach':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 22a20.3 20.3 0 0 1 20 0"/>
            <path d="M12 6a4 4 0 0 0-4 7h8a4 4 0 0 0-4-7z"/>
            <path d="M12 3v3"/>
            <path d="m6.82 7.3 2.12 2.13"/>
            <path d="m15.06 9.43 2.12-2.13"/>
          </svg>
        );
        break;
      case 'yacht':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="m20 20-5-18h-4c0 3-2 5-5 5v3a7 7 0 0 0 7 7h9.5"/>
            <path d="M12 11h0"/>
          </svg>
        );
        break;
      default:
        return null;
    }
    
    return (
      <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full" title={`Recommended for ${category}`}>
        {icon}
      </div>
    );
  };
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        <div className="aspect-square w-full">
          <img
            src={isHovered && hoverImage ? hoverImage : (image || defaultImage)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Product badges */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-brand-green text-white text-xs py-1 px-2 uppercase tracking-wide">
              New
            </span>
          )}
          {isSale && (
            <span className="bg-[#E53935] text-white text-xs py-1 px-2 uppercase tracking-wide">
              Sale
            </span>
          )}
        </div>
        
        {/* Category icon for HoReCa products */}
        {renderCategoryIcon()}
      </Link>

      {/* Product info */}
      <div className="mt-4 text-center">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-sm font-medium hover:text-brand-green transition-colors">{name}</h3>
        </Link>
        {itemNo && (
          <p className="text-xs text-gray-500 mt-1">Item no. {itemNo}</p>
        )}
        {diameter && (
          <p className="text-xs text-gray-500 mt-1">Ø {diameter}</p>
        )}
        <div className="mt-1">
          {isSale && salePrice ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#E53935] font-medium">{salePrice} {currency}</span>
              <span className="text-gray-400 line-through">{price} {currency}</span>
            </div>
          ) : (
            <span className="text-gray-800">{price} {currency}</span>
          )}
        </div>
        {inStock && (
          <p className="text-xs text-brand-green mt-2">In stock ({inStock})</p>
        )}
        {deliveryTime && (
          <p className="text-xs text-gray-500">Delivery: {deliveryTime}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
