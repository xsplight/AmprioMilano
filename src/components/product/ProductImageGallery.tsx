
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductImagePlaceholder from './ProductImagePlaceholder';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  id?: string;
}

const ProductImageGallery = ({ images, productName, id }: ProductImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <motion.div 
      className="lg:w-3/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="w-full">
          <motion.div 
            className="aspect-square w-full"
            layoutId={`product-image-${id}`}
          >
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={productName} 
                className="w-full h-full object-contain"
              />
            ) : (
              <ProductImagePlaceholder className="w-full h-full" />
            )}
          </motion.div>
        </div>
        
        {/* Thumbnails below main image */}
        <div className="w-full flex gap-2 justify-center flex-wrap">
          {images.map((img, index) => (
            <motion.button 
              key={index}
              onClick={() => setMainImage(img)}
              className={`aspect-square w-20 ${mainImage === img ? 'ring-2 ring-brand-green' : 'hover:opacity-80'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {img ? (
                <img 
                  src={img} 
                  alt={`${productName} - view ${index + 1}`} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <ProductImagePlaceholder className="w-full h-full" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
