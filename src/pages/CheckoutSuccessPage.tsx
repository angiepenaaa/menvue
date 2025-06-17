import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  useEffect(() => {
    // You could trigger any post-purchase actions here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 rounded-full p-3">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank you for your purchase!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your payment has been processed successfully. You now have access to all menVue features.
        </p>

        <Link
          to="/"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;