import jwt from 'jsonwebtoken';

interface DoorDashCredentials {
  developer_id: string;
  key_id: string;
  signing_secret: string;
}

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
  private credentials: DoorDashCredentials;
  private baseUrl: string;

  constructor() {
    this.credentials = {
      developer_id: "416969ad-68be-44d4-a944-81c477988a73",
      key_id: "9cd6165a-69df-4ad1-ac11-bc5bc49d3263",
      signing_secret: "cZ6GNWNcfjVAqIZUsf6ad9HT9ZjxEMXJKjmlYm68jpY"
    };
    this.baseUrl = 'https://openapi.doordash.com';
  }

  private generateToken(): string {
    const payload = {
      aud: 'doordash',
      iss: this.credentials.developer_id,
      kid: this.credentials.key_id,
      exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes
    };

    return jwt.sign(payload, this.credentials.signing_secret, { algorithm: 'HS256' });
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = this.generateToken();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`DoorDash API Error: ${response.status} - ${errorData}`);
    }

    return response.json();
  }

  // Get delivery quote for a restaurant
  async getDeliveryQuote(
    storeId: string,
    pickupAddress: string,
    dropoffAddress: string
  ): Promise<DoorDashDeliveryQuote> {
    const endpoint = '/drive/v2/quotes';
    const body = {
      external_delivery_id: `delivery_${Date.now()}`,
      pickup_address: pickupAddress,
      pickup_business_name: "Restaurant",
      pickup_phone_number: "+1234567890",
      pickup_instructions: "Please pick up the order",
      dropoff_address: dropoffAddress,
      dropoff_phone_number: "+1234567890",
      dropoff_instructions: "Please deliver to the door",
      order_value: 2500, // $25.00 in cents
    };

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Create a delivery
  async createDelivery(quoteId: string, orderDetails: any): Promise<any> {
    const endpoint = '/drive/v2/deliveries';
    const body = {
      external_delivery_id: quoteId,
      pickup_address: orderDetails.pickup_address,
      pickup_business_name: orderDetails.restaurant_name,
      pickup_phone_number: orderDetails.restaurant_phone,
      pickup_instructions: "Please pick up the order",
      dropoff_address: orderDetails.dropoff_address,
      dropoff_phone_number: orderDetails.customer_phone,
      dropoff_instructions: orderDetails.delivery_instructions || "Please deliver to the door",
      order_value: orderDetails.order_value,
      items: orderDetails.items,
      pickup_time: orderDetails.pickup_time,
    };

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Get delivery status
  async getDeliveryStatus(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}`;
    return this.makeRequest(endpoint);
  }

  // Cancel delivery
  async cancelDelivery(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}/cancel`;
    return this.makeRequest(endpoint, {
      method: 'PUT',
    });
  }

  // Search for nearby stores (if available in your DoorDash plan)
  async searchStores(lat: number, lng: number, radius: number = 5000): Promise<DoorDashStore[]> {
    const endpoint = `/consumer/v1/store_search`;
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
    });

    try {
      return this.makeRequest(`${endpoint}?${params}`);
    } catch (error) {
      console.warn('Store search not available:', error);
      return [];
    }
  }
}

export const doorDashService = new DoorDashService();
export type { DoorDashStore, DoorDashDeliveryQuote };