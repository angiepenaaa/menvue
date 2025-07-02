import React, { useState } from 'react';
import { Truck, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { doorDashService } from '../utils/doordashApi';
import { useCart } from '../context/CartContext';

interface DoorDashOrderButtonProps {
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone?: string;
  className?: string;
}

const DoorDashOrderButton: React.FC<DoorDashOrderButtonProps> = ({
  restaurantName,
  restaurantAddress,
  restaurantPhone = "+1234567890",
  className = ""
}) => {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDoorDashOrder = async () => {
    if (items.length === 0) {
      setStatus('error');
      setMessage('Your cart is empty');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      // For demo purposes, using a default delivery address
      // In a real app, you'd get this from user's profile or address input
      const deliveryAddress = "123 Main St, Brandon, FL 33511";

      // Get delivery quote
      const quote = await doorDashService.getDeliveryQuote(
        `store_${Date.now()}`, // Generate unique store ID for demo
        restaurantAddress,
        deliveryAddress
      );

      // Prepare order details
      const orderDetails = {
        pickup_address: restaurantAddress,
        restaurant_name: restaurantName,
        restaurant_phone: restaurantPhone,
        dropoff_address: deliveryAddress,
        customer_phone: "+1234567890", // In real app, get from user profile
        delivery_instructions: "Please deliver to the front door",
        order_value: Math.round(subtotal * 100), // Convert to cents
        items: items.map(item => ({
          name: item.name,
          description: item.description || 'Menu item',
          quantity: item.quantity,
          external_id: item.id,
        })),
        pickup_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      };

      // Create delivery
      const delivery = await doorDashService.createDelivery(
        quote.quote_id || quote.external_delivery_id,
        orderDetails
      );

      setStatus('success');
      setMessage(`✅ DoorDash delivery created! Track your order for updates.`);
      
      // You might want to redirect to an order tracking page here
      console.log('Delivery created:', delivery);

    } catch (error) {
      console.error('DoorDash order error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? `❌ ${error.message}` : '❌ Failed to create delivery');
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 size={18} className="animate-spin" />
          Creating Delivery...
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <CheckCircle size={18} />
          Delivery Created!
        </>
      );
    }

    if (status === 'error') {
      return (
        <>
          <AlertCircle size={18} />
          Try Again
        </>
      );
    }

    return (
      <>
        <Truck size={18} />
        Order via DoorDash
      </>
    );
  };

  const getButtonColor = () => {
    if (status === 'success') return 'bg-green-600 hover:bg-green-700';
    if (status === 'error') return 'bg-red-600 hover:bg-red-700';
    return 'bg-red-600 hover:bg-red-700'; // DoorDash brand color
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleDoorDashOrder}
        disabled={loading || status === 'success'}
        className={`flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${getButtonColor()} ${className}`}
      >
        {getButtonContent()}
      </button>
      
      {message && (
        <p className={`text-sm ${
          status === 'success' ? 'text-green-600' : 
          status === 'error' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default DoorDashOrderButton;