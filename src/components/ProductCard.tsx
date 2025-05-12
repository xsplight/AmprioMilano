
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  hoverImage,
  isNew = false,
  isSale = false,
  salePrice
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] w-full bg-fashion-gray">
          <img
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Quick actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white flex items-center justify-center rounded-full hover:bg-gold-DEFAULT hover:text-white transition-colors">
                <Eye size={18} />
              </button>
              <button className="w-10 h-10 bg-white flex items-center justify-center rounded-full hover:bg-gold-DEFAULT hover:text-white transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-fashion-black text-white text-xs py-1 px-2 uppercase tracking-wide">
              New
            </span>
          )}
          {isSale && (
            <span className="bg-[#9E2B25] text-white text-xs py-1 px-2 uppercase tracking-wide">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="mt-4 text-center">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-sm uppercase tracking-wide hover:text-gold-DEFAULT transition-colors">{name}</h3>
        </Link>
        <div className="mt-1">
          {isSale && salePrice ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#9E2B25] font-medium">${salePrice.toFixed(2)}</span>
              <span className="text-gray-400 line-through">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
