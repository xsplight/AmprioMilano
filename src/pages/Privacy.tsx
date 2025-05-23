
import Layout from '../components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ampriomilano.com.
        </p>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-serif mb-4">Personal Information We Collect</h2>
            <p className="mb-4 text-gray-600">
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
            </p>
            
            <p className="mb-4 text-gray-600">
              We collect Device Information using the following technologies:
            </p>
            
            <ul className="list-disc list-inside ml-4 mt-4 space-y-2 text-gray-600">
              <li>
                "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
              </li>
              <li>
                "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
              </li>
              <li>
                "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.
              </li>
            </ul>
            
            <p className="mt-4 text-gray-600">
              Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information."
            </p>
            
            <p className="mt-4 text-gray-600">
              When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">How Do We Use Your Personal Information?</h2>
            <p className="mb-4 text-gray-600">
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
            </p>
            
            <ul className="list-disc list-inside ml-4 mt-4 space-y-2 text-gray-600">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
            
            <p className="mt-4 text-gray-600">
              We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Sharing Your Personal Information</h2>
            <p className="mb-4 text-gray-600">
              We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
            </p>
            
            <p className="text-gray-600">
              Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Your Rights</h2>
            <p className="mb-4 text-gray-600">
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>
            
            <p className="text-gray-600">
              Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Data Retention</h2>
            <p className="text-gray-600">
              When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Changes</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
            <p className="text-gray-600">
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:privacy@ampriomilano.com" className="text-brand-green hover:underline">privacy@ampriomilano.com</a> or by mail using the details provided below:
            </p>
            
            <div className="mt-4 p-4 bg-gray-50 text-gray-600">
              <p>Amprio Milano</p>
              <p>Dubai Marina Mall, First Floor</p>
              <p>Dubai, United Arab Emirates</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
