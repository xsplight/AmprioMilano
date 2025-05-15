
import { useState } from 'react';
import Layout from '../components/Layout';
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'track'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
  };
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order tracking
    toast({
      title: "Order tracking",
      description: `Looking up order #${orderNumber}`,
    });
  };
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">My Account</h1>
        
        <div className="max-w-xl mx-auto">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'login' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-600'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'track' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-600'}`}
              onClick={() => setActiveTab('track')}
            >
              Track Order
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-6">Sign In</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-brand-green hover:underline">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green text-white py-3 text-sm uppercase tracking-wider hover:bg-brand-lightGreen transition-colors"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">New Customer?</h3>
                <p className="text-gray-600 mb-4">Create an account to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                  <li>Track your orders</li>
                  <li>Save your shipping addresses</li>
                  <li>Access order history</li>
                  <li>Receive special offers</li>
                </ul>
                <button className="w-full border border-gray-300 py-3 text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">
                  Create Account
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-6">Track Your Order</h2>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">Order Number</label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                    required
                    placeholder="e.g. AM12345678"
                  />
                </div>
                <div>
                  <label htmlFor="orderEmail" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="orderEmail"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                    required
                    placeholder="Email used for the order"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green text-white py-3 text-sm uppercase tracking-wider hover:bg-brand-lightGreen transition-colors"
                >
                  Track Order
                </button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">Need help with your order?</p>
                <a href="/contact" className="text-brand-green hover:underline">Contact Customer Support</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Account;
