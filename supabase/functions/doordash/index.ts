import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createDoorDashJWTGenerator } from '../../../lib/generateDoorDashToken.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface DoorDashCredentials {
  developer_id: string
  key_id: string
  signing_secret: string
}

interface DoorDashEnvironment {
  baseUrl: string
  environment: 'sandbox' | 'production'
}

interface DeliveryQuoteRequest {
  storeId: string
  pickupAddress: string
  dropoffAddress: string
}

interface CreateDeliveryRequest {
  quoteId: string
  orderDetails: {
    pickup_address: string
    restaurant_name: string
    restaurant_phone: string
    dropoff_address: string
    customer_phone: string
    delivery_instructions?: string
    order_value: number
    items: any[]
    pickup_time: string
  }
}

class DoorDashService {
  private credentials: DoorDashCredentials
  private environment: DoorDashEnvironment
  private jwtGenerator: any

  constructor() {
    this.credentials = {
      developer_id: Deno.env.get('DOORDASH_DEVELOPER_ID') || '',
      key_id: Deno.env.get('DOORDASH_KEY_ID') || '',
      signing_secret: Deno.env.get('DOORDASH_SIGNING_SECRET') || ''
    }
    
    const envType = (Deno.env.get('DOORDASH_ENVIRONMENT') || 'sandbox') as 'sandbox' | 'production'
    this.environment = {
      environment: envType,
      baseUrl: 'https://openapi.doordash.com' // Same URL for both sandbox and production
    }
    
    this.jwtGenerator = createDoorDashJWTGenerator(
      this.credentials.developer_id,
      this.credentials.key_id,
      this.credentials.signing_secret
    )
  }

  private validateCredentials(): void {
    if (!this.jwtGenerator.validateCredentials()) {
      throw new Error('DoorDash credentials are not properly configured. Please check DOORDASH_DEVELOPER_ID, DOORDASH_KEY_ID, and DOORDASH_SIGNING_SECRET environment variables.')
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    this.validateCredentials()
    
    const token = await this.jwtGenerator.generateToken(5) // 5 minute expiration
    
    const response = await fetch(`${this.environment.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MenVue/1.0',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `DoorDash API Error: ${response.status}`
      
      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.message || errorData.error || errorMessage
        
        // Add helpful context for common errors
        if (response.status === 401) {
          errorMessage += ' - Check your DoorDash credentials and JWT token'
        } else if (response.status === 403) {
          errorMessage += ' - Access denied. Verify your DoorDash account permissions'
        } else if (response.status === 400) {
          errorMessage += ' - Invalid request parameters'
        }
      } catch {
        errorMessage = `${errorMessage} - ${errorText}`
      }
      
      throw new Error(errorMessage)
    }

    return response.json()
  }

  async getDeliveryQuote(
    storeId: string,
    pickupAddress: string,
    dropoffAddress: string
  ): Promise<any> {
    const endpoint = '/drive/v2/quotes'
    
    // Validate required fields
    if (!pickupAddress || !dropoffAddress) {
      throw new Error('Pickup and dropoff addresses are required')
    }
    
    const body = {
      external_delivery_id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pickup_address: pickupAddress,
      pickup_business_name: 'Restaurant Partner',
      pickup_phone_number: '+1234567890',
      pickup_instructions: 'Please pick up the order from the counter',
      dropoff_address: dropoffAddress,
      dropoff_phone_number: '+1234567890',
      dropoff_instructions: 'Please deliver to the front door',
      order_value: 2500, // $25.00 in cents
      pickup_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
    }

    console.log(`[${this.environment.environment.toUpperCase()}] Getting delivery quote:`, body)
    
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async createDelivery(quoteId: string, orderDetails: any): Promise<any> {
    const endpoint = '/drive/v2/deliveries'
    
    // Validate required fields
    if (!orderDetails.pickup_address || !orderDetails.dropoff_address) {
      throw new Error('Pickup and dropoff addresses are required')
    }
    
    if (!orderDetails.order_value || orderDetails.order_value < 100) {
      throw new Error('Order value must be at least $1.00 (100 cents)')
    }
    
    const body = {
      external_delivery_id: `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pickup_address: orderDetails.pickup_address,
      pickup_business_name: orderDetails.restaurant_name,
      pickup_phone_number: orderDetails.restaurant_phone,
      pickup_instructions: orderDetails.pickup_instructions || 'Please pick up the order from the counter',
      dropoff_address: orderDetails.dropoff_address,
      dropoff_phone_number: orderDetails.customer_phone,
      dropoff_instructions: orderDetails.delivery_instructions || 'Please deliver to the front door',
      order_value: orderDetails.order_value,
      items: orderDetails.items,
      pickup_time: orderDetails.pickup_time,
    }

    console.log(`[${this.environment.environment.toUpperCase()}] Creating delivery:`, body)
    
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async getDeliveryStatus(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}`
    console.log(`[${this.environment.environment.toUpperCase()}] Getting delivery status for:`, deliveryId)
    return this.makeRequest(endpoint)
  }

  async cancelDelivery(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}/cancel`
    console.log(`[${this.environment.environment.toUpperCase()}] Cancelling delivery:`, deliveryId)
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        cancellation_reason: 'Customer requested cancellation'
      }),
    })
  }

  async searchStores(lat: number, lng: number, radius: number = 5000): Promise<any[]> {
    const endpoint = `/consumer/v1/store_search`
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
    })

    console.log(`[${this.environment.environment.toUpperCase()}] Searching stores:`, {
      lat, lng, radius
    })
    
    try {
      return this.makeRequest(`${endpoint}?${params}`)
    } catch (error) {
      console.warn('Store search not available:', error)
      return []
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate environment variables
    const requiredEnvVars = ['DOORDASH_DEVELOPER_ID', 'DOORDASH_KEY_ID', 'DOORDASH_SIGNING_SECRET']
    const missingVars = requiredEnvVars.filter(varName => !Deno.env.get(varName))
    
    if (missingVars.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: `Missing required environment variables: ${missingVars.join(', ')}`,
          required_variables: requiredEnvVars,
          environment: Deno.env.get('DOORDASH_ENVIRONMENT') || 'sandbox'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action, ...params } = await req.json()
    const doorDashService = new DoorDashService()

    console.log(`Processing DoorDash action: ${action}`)
    
    let result

    switch (action) {
      case 'getDeliveryQuote':
        const { storeId, pickupAddress, dropoffAddress } = params as DeliveryQuoteRequest
        result = await doorDashService.getDeliveryQuote(storeId, pickupAddress, dropoffAddress)
        break

      case 'createDelivery':
        const { quoteId, orderDetails } = params as CreateDeliveryRequest
        result = await doorDashService.createDelivery(quoteId, orderDetails)
        break

      case 'getDeliveryStatus':
        const { deliveryId } = params
        result = await doorDashService.getDeliveryStatus(deliveryId)
        break

      case 'cancelDelivery':
        const { deliveryId: cancelDeliveryId } = params
        result = await doorDashService.cancelDelivery(cancelDeliveryId)
        break

      case 'searchStores':
        const { lat, lng, radius } = params
        result = await doorDashService.searchStores(lat, lng, radius)
        break

      default:
        console.error(`Invalid action received: ${action}`)
        return new Response(
          JSON.stringify({ 
            error: 'Invalid action',
            valid_actions: ['getDeliveryQuote', 'createDelivery', 'getDeliveryStatus', 'cancelDelivery', 'searchStores']
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    console.log(`Action ${action} completed successfully`)
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('DoorDash Edge Function Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString(),
        environment: Deno.env.get('DOORDASH_ENVIRONMENT') || 'sandbox'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})