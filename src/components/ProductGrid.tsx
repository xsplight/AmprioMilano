
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ 
  products,
  title,
  subtitle,
  columns = 4
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

  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Optional section header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && <p className="uppercase tracking-wider text-sm text-gold-DEFAULT mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-serif">{title}</h2>}
          </div>
        )}
        
        {/* Product grid */}
        <div className={`grid ${getGridClass()} gap-x-6 gap-y-10`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
