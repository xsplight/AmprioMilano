
import { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

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

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = deliveryMethod === 'delivery' ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div 
      className={`cart-slide ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex flex-col h-full">
        {/* Cart header */}
        <div className="border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-serif">Your Shopping Bag</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-brand-green transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-grow overflow-auto py-4 px-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="mb-4 text-gray-400">
                <ShoppingBag size={64} />
              </div>
              <h3 className="text-lg font-medium mb-2">Your bag is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your bag yet.</p>
              <button 
                onClick={onClose}
                className="fashion-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Item no. {item.itemNo}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-300">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price} AED</p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-[#E53935] flex items-center mt-1"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 py-4 px-6">
            {/* Delivery options */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3">Delivery Method</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`flex-1 border p-3 text-sm ${
                    deliveryMethod === 'delivery' 
                      ? 'border-brand-green text-brand-green' 
                      : 'border-gray-300'
                  }`}
                >
                  Home Delivery
                </button>
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`flex-1 border p-3 text-sm ${
                    deliveryMethod === 'pickup' 
                      ? 'border-brand-green text-brand-green' 
                      : 'border-gray-300'
                  }`}
                >
                  Showroom Pickup
                </button>
              </div>
            </div>
            
            {/* Summary */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping > 0 ? `${shipping.toFixed(2)} AED` : 'Free'}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>{total.toFixed(2)} AED</span>
              </div>
            </div>
            
            {/* Checkout button */}
            <button className="w-full py-3 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors group">
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
