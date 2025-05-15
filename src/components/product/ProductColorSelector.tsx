
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductColorSelectorProps {
  colors: string[];
  onColorChange?: (color: string) => void;
  initialColor?: string;
}

const ProductColorSelector = ({ 
  colors, 
  onColorChange,
  initialColor = 'Blue' 
}: ProductColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const getColorCode = (colorName: string) => {
    switch(colorName) {
      case 'Blue': return '#3b5998';
      case 'Green': return '#4d7a6a';
      case 'Gold': return '#D4AF37';
      case 'White': return '#FFFFFF';
      default: return '#CCCCCC';
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-medium mb-3">Color: <span className="text-brand-green">{selectedColor}</span></h3>
      <div className="flex gap-3">
        {colors.map(color => (
          <motion.button
            key={color}
            onClick={() => handleColorChange(color)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-green' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: getColorCode(color) }}
              aria-label={`Select ${color} color`}
            ></span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductColorSelector;
