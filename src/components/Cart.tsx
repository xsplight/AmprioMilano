
import { useState, useEffect } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  itemNo?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Milano Dinner Plate - Versailles",
      price: 120,
      quantity: 1,
      image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
      itemNo: "33158"
    },
    {
      id: 2,
      name: "Crystal Water Glass - Sapphire",
      price: 75,
      quantity: 2,
      image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
      itemNo: "45678"
    }
  ]);
  
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Delay setting the cart visible to allow for the animation
    if (isOpen) {
      setIsCartVisible(true);
    } else {
      setTimeout(() => {
        setIsCartVisible(false);
      }, 300);
    }
  }, [isOpen]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          // Show toast notification when quantity changes
          toast({
            title: `${item.name}`,
            description: `Quantity updated to ${newQuantity}`,
            duration: 2000,
          });
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (itemToRemove) {
      setCartItems(items => items.filter(item => item.id !== id));
      
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} has been removed from your cart`,
        duration: 2000,
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = deliveryMethod === 'delivery' ? 20 : 0;
  const total = subtotal + shipping;

  // Function to add a new item to cart (to be called from other components)
  const addToCart = (product: CartItem) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity of existing item
        return items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        // Add new item to cart
        return [...items, product];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/30 transition-opacity z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <motion.div 
        className={`cart-slide bg-white shadow-2xl`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="border-b border-gray-200 py-4 px-6 flex justify-between items-center">
            <h2 className="text-xl font-serif">Your Shopping Bag</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-brand-green transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X size={22} />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-auto py-4 px-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <motion.div 
                  className="mb-4 text-gray-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ShoppingBag size={64} />
                </motion.div>
                <motion.h3 
                  className="text-lg font-medium mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your bag is empty
                </motion.h3>
                <motion.p 
                  className="text-gray-500 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Looks like you haven't added anything to your bag yet.
                </motion.p>
                <motion.button 
                  onClick={onClose}
                  className="fashion-btn"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="flex gap-4 pb-4 border-b border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-20 h-20 bg-gray-50 flex-shrink-0 p-2 rounded">
                        <motion.img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Item no. {item.itemNo}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-200 rounded-sm">
                            <button 
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center font-medium">
                              {item.quantity}
                            </span>
                            <button 
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.price} AED</p>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-[#E53935] flex items-center mt-1 hover:underline"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
          
          {/* Cart footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 py-4 px-6 bg-gray-50">
              {/* Estimated Delivery Time */}
              <div className="mb-4 py-2 bg-gray-100 px-3 rounded-sm flex items-center text-sm">
                <Clock size={16} className="text-brand-green mr-2" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>
              
              {/* Delivery options */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-3">Delivery Method</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex-1 border p-3 text-sm rounded-sm transition-all ${
                      deliveryMethod === 'delivery' 
                        ? 'border-brand-green text-brand-green bg-brand-green/5' 
                        : 'border-gray-200'
                    }`}
                  >
                    Home Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex-1 border p-3 text-sm rounded-sm transition-all ${
                      deliveryMethod === 'pickup' 
                        ? 'border-brand-green text-brand-green bg-brand-green/5' 
                        : 'border-gray-200'
                    }`}
                  >
                    Showroom Pickup
                  </button>
                </div>
              </div>
              
              {/* Summary */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{subtotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping > 0 ? `${shipping.toFixed(2)} AED` : 'Free'}</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span className="text-lg">{total.toFixed(2)} AED</span>
                </div>
              </div>
              
              {/* Checkout button */}
              <motion.button 
                className="w-full py-3 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors group rounded-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
