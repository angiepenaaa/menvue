import { supabase } from '../lib/supabase';

interface DoorDashStore {
  id: string;
  name: string;
  description: string;
  phone_number: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  business_id: string;
  is_active: boolean;
}

interface DoorDashDeliveryQuote {
  external_delivery_id: string;
  fee: number;
  currency: string;
  estimated_pickup_time: string;
  estimated_dropoff_time: string;
}

class DoorDashService {
  private async callEdgeFunction(action: string, params: any): Promise<any> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to use DoorDash services');
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/doordash`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...params }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'DoorDash API request failed');
    }

    return response.json();
  }

  // Get delivery quote for a restaurant
  async getDeliveryQuote(
    storeId: string,
    pickupAddress: string,
    dropoffAddress: string
  ): Promise<DoorDashDeliveryQuote> {
    return this.callEdgeFunction('getDeliveryQuote', {
      storeId,
      pickupAddress,
      dropoffAddress,
    });
  }

  // Create a delivery
  async createDelivery(quoteId: string, orderDetails: any): Promise<any> {
    return this.callEdgeFunction('createDelivery', {
      quoteId,
      orderDetails,
    });
  }

  // Get delivery status
  async getDeliveryStatus(deliveryId: string): Promise<any> {
    return this.callEdgeFunction('getDeliveryStatus', {
      deliveryId,
    });
  }

  // Cancel delivery
  async cancelDelivery(deliveryId: string): Promise<any> {
    return this.callEdgeFunction('cancelDelivery', {
      deliveryId,
    });
  }

  // Search for nearby stores (if available in your DoorDash plan)
  async searchStores(lat: number, lng: number, radius: number = 5000): Promise<DoorDashStore[]> {
    return this.callEdgeFunction('searchStores', {
      lat,
      lng,
      radius,
    });
  }
}

export const doorDashService = new DoorDashService();
export type { DoorDashStore, DoorDashDeliveryQuote };