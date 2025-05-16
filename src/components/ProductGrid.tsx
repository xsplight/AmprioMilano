
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCart } from './Cart';
import { ImageOff } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  itemNo?: string;
  diameter?: string;
  inStock?: number;
  deliveryTime?: string;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  layout?: 'grid' | 'list';
}

const ProductGrid = ({ 
  products,
  title,
  subtitle,
  columns = 4,
  layout = 'grid'
}: ProductGridProps) => {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  if (layout === 'list') {
    return (
      <section className="py-8">
        <div className="container-custom">
          {/* Optional section header */}
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {subtitle && <p className="uppercase tracking-wider text-sm text-brand-green mb-2">{subtitle}</p>}
              {title && <h2 className="text-2xl md:text-3xl font-serif">{title}</h2>}
            </div>
          )}
          
          {/* Product list */}
          <div className="space-y-8">
            {products.map((product) => (
              <div key={product.id} className="product-line-item animate-hover-scale">
                <div className="product-line-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-auto" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 aspect-square">
                      <div className="text-center">
                        <ImageOff className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm text-gray-500">No image available</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="product-line-details">
                  <h3 className="line-item-title">{product.name}</h3>
                  {product.itemNo && (
                    <p className="text-sm text-gray-500">Item no. {product.itemNo}</p>
                  )}
                  {product.diameter && (
                    <p className="text-sm text-gray-500">Ø {product.diameter}</p>
                  )}
                  <div className="flex items-center my-2">
                    {product.isSale && product.salePrice ? (
                      <>
                        <span className="text-[#E53935] font-medium mr-2">{product.salePrice} AED</span>
                        <span className="text-gray-400 line-through">{product.price} AED</span>
                      </>
                    ) : (
                      <span className="font-medium">{product.price} AED</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Optional section header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && <p className="uppercase tracking-wider text-sm text-brand-green mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-serif">{title}</h2>}
          </div>
        )}
        
        {/* Product grid */}
        <div className={`grid ${getGridClass()} gap-x-6 gap-y-10`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              image={product.image || ''} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
