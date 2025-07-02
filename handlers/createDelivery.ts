// DoorDash Drive API Handler
// This file contains the backend logic for creating deliveries

import { createDoorDashJWTGenerator } from '../lib/generateDoorDashToken';

interface DoorDashCredentials {
  developerId: string;
  keyId: string;
  signingSecret: string;
  environment: 'sandbox' | 'production';
}

interface DeliveryQuoteRequest {
  external_delivery_id: string;
  pickup_address: string;
  pickup_business_name: string;
  pickup_phone_number: string;
  pickup_instructions?: string;
  dropoff_address: string;
  dropoff_phone_number: string;
  dropoff_instructions?: string;
  order_value: number; // in cents
  items?: Array<{
    name: string;
    description?: string;
    quantity: number;
    external_id?: string;
  }>;
  pickup_time?: string; // ISO 8601 format
}

interface DeliveryQuoteResponse {
  external_delivery_id: string;
  fee: number;
  currency: string;
  estimated_pickup_time: string;
  estimated_dropoff_time: string;
  duration: number;
  quote_id: string;
}

interface CreateDeliveryRequest extends DeliveryQuoteRequest {
  quote_id?: string;
}

interface CreateDeliveryResponse {
  external_delivery_id: string;
  delivery_id: string;
  delivery_status: string;
  fee: number;
  currency: string;
  pickup_time: string;
  dropoff_time: string;
  tracking_url?: string;
}

export class DoorDashDeliveryHandler {
  private credentials: DoorDashCredentials;
  private baseUrl: string;
  private jwtGenerator: any;

  constructor(credentials: DoorDashCredentials) {
    this.credentials = credentials;
    this.baseUrl = credentials.environment === 'sandbox' 
      ? 'https://openapi.doordash.com' 
      : 'https://openapi.doordash.com';
    
    this.jwtGenerator = createDoorDashJWTGenerator(
      credentials.developerId,
      credentials.keyId,
      credentials.signingSecret
    );
  }

  private async makeAuthenticatedRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    if (!this.jwtGenerator.validateCredentials()) {
      throw new Error('DoorDash credentials are not properly configured');
    }

    const token = await this.jwtGenerator.generateToken(5); // 5 minute expiration
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MenVue/1.0',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `DoorDash API Error: ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = `${errorMessage} - ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Step 1: Get a delivery quote
  async getDeliveryQuote(request: DeliveryQuoteRequest): Promise<DeliveryQuoteResponse> {
    const endpoint = '/drive/v2/quotes';
    
    // Validate required fields
    if (!request.pickup_address || !request.dropoff_address) {
      throw new Error('Pickup and dropoff addresses are required');
    }

    if (!request.order_value || request.order_value < 100) {
      throw new Error('Order value must be at least $1.00 (100 cents)');
    }

    const body = {
      external_delivery_id: request.external_delivery_id,
      pickup_address: request.pickup_address,
      pickup_business_name: request.pickup_business_name,
      pickup_phone_number: request.pickup_phone_number,
      pickup_instructions: request.pickup_instructions || 'Please pick up the order',
      dropoff_address: request.dropoff_address,
      dropoff_phone_number: request.dropoff_phone_number,
      dropoff_instructions: request.dropoff_instructions || 'Please deliver to the door',
      order_value: request.order_value,
      items: request.items || [],
      pickup_time: request.pickup_time || new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Step 2: Create a delivery using the quote
  async createDelivery(request: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const endpoint = '/drive/v2/deliveries';
    
    const body = {
      external_delivery_id: request.external_delivery_id,
      pickup_address: request.pickup_address,
      pickup_business_name: request.pickup_business_name,
      pickup_phone_number: request.pickup_phone_number,
      pickup_instructions: request.pickup_instructions || 'Please pick up the order',
      dropoff_address: request.dropoff_address,
      dropoff_phone_number: request.dropoff_phone_number,
      dropoff_instructions: request.dropoff_instructions || 'Please deliver to the door',
      order_value: request.order_value,
      items: request.items || [],
      pickup_time: request.pickup_time || new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Get delivery status
  async getDeliveryStatus(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}`;
    return this.makeAuthenticatedRequest(endpoint);
  }

  // Cancel a delivery
  async cancelDelivery(deliveryId: string, reason?: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}/cancel`;
    
    const body = reason ? { cancellation_reason: reason } : {};
    
    return this.makeAuthenticatedRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // Update delivery (if supported)
  async updateDelivery(deliveryId: string, updates: Partial<CreateDeliveryRequest>): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}`;
    
    return this.makeAuthenticatedRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }
}

// Factory function for creating delivery handler
export function createDeliveryHandler(): DoorDashDeliveryHandler {
  const credentials: DoorDashCredentials = {
    developerId: process.env.DOORDASH_DEVELOPER_ID || '',
    keyId: process.env.DOORDASH_KEY_ID || '',
    signingSecret: process.env.DOORDASH_SIGNING_SECRET || '',
    environment: (process.env.DOORDASH_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  };

  if (!credentials.developerId || !credentials.keyId || !credentials.signingSecret) {
    throw new Error('DoorDash credentials are missing. Please check your environment variables.');
  }

  return new DoorDashDeliveryHandler(credentials);
}

// Example usage function for testing
export async function testDeliveryCreation(): Promise<void> {
  try {
    const handler = createDeliveryHandler();
    
    // Step 1: Get a quote
    const quoteRequest: DeliveryQuoteRequest = {
      external_delivery_id: `test_delivery_${Date.now()}`,
      pickup_address: '123 Restaurant St, Brandon, FL 33511',
      pickup_business_name: 'Test Restaurant',
      pickup_phone_number: '+1234567890',
      pickup_instructions: 'Please pick up the order from the counter',
      dropoff_address: '456 Customer Ave, Brandon, FL 33511',
      dropoff_phone_number: '+1987654321',
      dropoff_instructions: 'Please deliver to the front door',
      order_value: 2500, // $25.00
      items: [
        {
          name: 'Mediterranean Quinoa Bowl',
          description: 'Healthy quinoa bowl with vegetables',
          quantity: 1,
          external_id: 'item_001',
        },
      ],
    };

    console.log('Getting delivery quote...');
    const quote = await handler.getDeliveryQuote(quoteRequest);
    console.log('Quote received:', quote);

    // Step 2: Create the delivery
    console.log('Creating delivery...');
    const delivery = await handler.createDelivery({
      ...quoteRequest,
      quote_id: quote.quote_id,
    });
    console.log('Delivery created:', delivery);

    // Step 3: Check status
    console.log('Checking delivery status...');
    const status = await handler.getDeliveryStatus(delivery.delivery_id);
    console.log('Delivery status:', status);

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}