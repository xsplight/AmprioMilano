
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
  currency = "AED"
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultImage = "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234";
  
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
