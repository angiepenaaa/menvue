import React, { useState, useEffect } from 'react';
import { MapPin, Clock, User, Phone, Package, CheckCircle } from 'lucide-react';
import { doorDashService } from '../utils/doordashApi';

interface DeliveryTrackerProps {
  deliveryId: string;
  onClose?: () => void;
}

interface DeliveryStatus {
  status: string;
  pickup_time?: string;
  dropoff_time?: string;
  dasher_name?: string;
  dasher_phone?: string;
  dasher_location?: {
    lat: number;
    lng: number;
  };
  tracking_url?: string;
}

const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ deliveryId, onClose }) => {
  const [delivery, setDelivery] = useState<DeliveryStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryStatus = async () => {
      try {
        const status = await doorDashService.getDeliveryStatus(deliveryId);
        setDelivery(status);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch delivery status');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryStatus();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchDeliveryStatus, 30000);

    return () => clearInterval(interval);
  }, [deliveryId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'created':
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'pickup_arrived':
      case 'picked_up':
        return 'text-orange-600 bg-orange-100';
      case 'dropoff_arrived':
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'created':
        return 'Order Created';
      case 'confirmed':
        return 'Dasher Assigned';
      case 'pickup_arrived':
        return 'Dasher at Restaurant';
      case 'picked_up':
        return 'Order Picked Up';
      case 'dropoff_arrived':
        return 'Dasher Nearby';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <Package size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Track Delivery</h3>
          <p className="text-red-600 text-sm">{error}</p>
          {onClose && (
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!delivery) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Delivery Tracking</h2>
            <p className="text-red-100">Order #{deliveryId.slice(-8)}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(delivery.status)}`}>
            {getStatusText(delivery.status)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Dasher Info */}
        {delivery.dasher_name && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Your Dasher</h3>
              <p className="text-gray-600">{delivery.dasher_name}</p>
            </div>
            {delivery.dasher_phone && (
              <a
                href={`tel:${delivery.dasher_phone}`}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Phone size={18} />
              </a>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Delivery Progress</h3>
          <div className="space-y-3">
            {[
              { status: 'created', label: 'Order Placed', time: delivery.pickup_time },
              { status: 'confirmed', label: 'Dasher Assigned' },
              { status: 'pickup_arrived', label: 'Dasher at Restaurant' },
              { status: 'picked_up', label: 'Order Picked Up' },
              { status: 'dropoff_arrived', label: 'Dasher Nearby' },
              { status: 'delivered', label: 'Delivered', time: delivery.dropoff_time },
            ].map((step, index) => {
              const isCompleted = delivery.status === step.status || 
                (delivery.status === 'delivered' && index < 6);
              const isCurrent = delivery.status === step.status;

              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-current rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-sm text-gray-500">
                        {new Date(step.time).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Times */}
        {(delivery.pickup_time || delivery.dropoff_time) && (
          <div className="grid grid-cols-2 gap-4">
            {delivery.pickup_time && (
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Clock size={20} className="text-orange-600 mx-auto mb-1" />
                <p className="text-sm text-orange-600 font-medium">Pickup Time</p>
                <p className="text-orange-800 font-semibold">
                  {new Date(delivery.pickup_time).toLocaleTimeString()}
                </p>
              </div>
            )}
            {delivery.dropoff_time && (
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <MapPin size={20} className="text-green-600 mx-auto mb-1" />
                <p className="text-sm text-green-600 font-medium">Delivery Time</p>
                <p className="text-green-800 font-semibold">
                  {new Date(delivery.dropoff_time).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tracking URL */}
        {delivery.tracking_url && (
          <div className="text-center">
            <a
              href={delivery.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <MapPin size={18} />
              View Live Map
            </a>
          </div>
        )}

        {/* Close Button */}
        {onClose && (
          <div className="text-center pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close Tracker
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracker;