
import React from 'react';

interface ProductImagePlaceholderProps {
  className?: string;
}

const ProductImagePlaceholder: React.FC<ProductImagePlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
      <div className="text-center p-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="mx-auto text-gray-400 mb-2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
        <p className="text-gray-500 text-sm">No image</p>
      </div>
    </div>
  );
};

export default ProductImagePlaceholder;
