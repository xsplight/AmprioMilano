
import { useState } from 'react';
import Layout from '../components/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Please fill out the form below or use our contact details to get in touch.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 p-8 mb-8">
              <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-brand-green mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium mb-1">Our Store</h3>
                    <p className="text-gray-600">
                      Dubai Marina Mall, First Floor<br/>
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-brand-green mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+971 52 177 3471</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-brand-green mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">info@ampriomilano.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-brand-green mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium mb-1">Working Hours</h3>
                    <p className="text-gray-600">
                      Monday to Friday: 10am - 9pm<br/>
                      Saturday & Sunday: 11am - 10pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-video w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.234252009811!2d55.13328307429955!3d25.07693313942383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5400f328ab%3A0xb920aa1bdbef9c86!2sDubai%20Marina%20Mall!5e0!3m2!1sen!2sae!4v1684503037254!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              ></iframe>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                >
                  <option value="">Please select</option>
                  <option value="customer_service">Customer Service</option>
                  <option value="order_inquiry">Order Inquiry</option>
                  <option value="product_info">Product Information</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                ></textarea>
              </div>
              
              {submitSuccess && (
                <div className="bg-green-50 text-green-800 p-3 border border-green-200">
                  Your message has been sent successfully. We'll get back to you shortly.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-green hover:bg-brand-lightGreen text-white py-3 px-8 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
