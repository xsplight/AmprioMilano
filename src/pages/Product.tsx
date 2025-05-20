import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProductByHandle, getAllProducts } from '../api/shopifyProducts';
import { Helmet } from 'react-helmet';
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

function getRandomItems(arr, count, excludeId) {
  const filtered = arr.filter((item) => item.id !== excludeId);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    Promise.all([
      getProductByHandle(handle),
      getAllProducts()
    ])
      .then(([prod, all]) => {
        setProduct(prod);
        setAllProducts(all);
        // Выбираем первый цвет по умолчанию
        const colorOpt = prod?.options?.find((o) => o.name.toLowerCase() === 'color');
        setSelectedColor(colorOpt?.values?.[0] || '');
        // Инициализируем mainImage
        if (prod && prod.images && prod.images.length > 0) {
          setMainImage(prod.images[0].url);
        }
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const images = product.images.map((img) => img.url);
  const mainVariant = product.variants[0] || {};

  // All products of this line (same collection)
  let sameLine = [];
  if (product.collections && product.collections.length > 0) {
    const collectionHandles = product.collections.map((c) => c.handle);
    sameLine = allProducts.filter(
      (p) =>
        p.handle !== product.handle &&
        p.collections &&
        p.collections.some((c) => collectionHandles.includes(c.handle))
    ).map((p) => ({
      id: p.id,
      name: p.title,
      price: p.variants[0]?.price || 0,
      image: p.images[0]?.url || '',
      itemNo: p.variants[0]?.sku,
      diameter: p.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0],
      inStock: p.variants[0]?.quantityAvailable,
      deliveryTime: '4-5 working days',
      currency: p.variants[0]?.currency || 'AED',
      description: p.description,
      handle: p.handle,
    }));
  }
  // Для отладки
  console.log('sameLine', sameLine, 'product.collections', product.collections, 'allProducts', allProducts);

  // Формируем массив цветов с мини-превью
  const colorOptions = product.variants
    .map((v) => {
      const color = v.selectedOptions?.find((opt) => opt.name.toLowerCase() === 'color')?.value;
      return color ? { color, image: v.image?.url || product.images[0]?.url } : null;
    })
    .filter(Boolean);

  // Related products (random)
  const relatedProducts = getRandomItems(allProducts, 3, product.id).map((p) => ({
    id: p.id,
    name: p.title,
    price: p.variants[0]?.price || 0,
    image: p.images[0]?.url || '',
    isNew: false,
    isSale: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price,
    salePrice: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price ? p.variants[0]?.price : undefined,
    description: p.description,
    handle: p.handle,
  }));

  // Recently viewed (random, можно заменить на localStorage)
  const recentlyViewed = getRandomItems(allProducts, 3, product.id).map((p) => ({
    id: p.id,
    name: p.title,
    price: p.variants[0]?.price || 0,
    image: p.images[0]?.url || '',
    isNew: false,
    isSale: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price,
    salePrice: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price ? p.variants[0]?.price : undefined,
    description: p.description,
    handle: p.handle,
  }));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: mainVariant.price,
      image: images[0],
      quantity: quantity
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    toast({
      title: "Added to bag",
      description: `${product.title} × ${quantity} added to your shopping bag`,
      duration: 3000,
    });
    setTimeout(() => setIsCartOpen(true), 800);
  };

  return (
    <Layout>
      {/* Cart component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Breadcrumb */}
      <ProductBreadcrumb productName={product.title} />
      <div className="container-custom pt-4 pb-8">
        {/* Back button */}
        <BackButton />
        <div className="flex flex-col lg:flex-row gap-12 mt-2">
          {/* Product Images */}
          <ProductImageGallery 
            images={images} 
            productName={product.title}
            id={product.id}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
          {/* Product Details */}
          <div className="lg:w-2/5">
            <ProductInfo 
              name={product.title}
              itemNo={mainVariant.sku}
              diameter={product.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0] || ''}
              price={mainVariant.price}
              inStock={mainVariant.quantityAvailable}
              deliveryTime={'4-5 working days'}
              currency={mainVariant.currency || 'AED'}
            />
            <ProductAttributes 
              materials={product.options.find((o) => o.name.toLowerCase() === 'material')?.values || []}
              diameter={product.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0] || ''}
              sku={mainVariant.sku}
            />
            <ProductColorSelector 
              colorOptions={colorOptions}
              selectedColor={selectedColor}
              onColorChange={(color, image) => {
                setSelectedColor(color);
                if (image) setMainImage(image);
              }}
            />
            <ProductQuantitySelector 
              initialQuantity={quantity} 
              onQuantityChange={setQuantity}
            />
            <ProductActions 
              onAddToCart={handleAddToCart}
              price={mainVariant.price}
              quantity={quantity}
              productName={product.title}
              isAddingToCart={addedToCart}
            />
            <ProductServices />
            <ProductTabs 
              description={product.description}
              details={product.options.map((o) => `${o.name}: ${o.values.join(', ')}`)}
            />
          </div>
        </div>
        {/* All products in this line - Section */}
        {sameLine.length > 0 && (
          <ProductLineSection products={sameLine} title="All products of this line" />
        )}
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
