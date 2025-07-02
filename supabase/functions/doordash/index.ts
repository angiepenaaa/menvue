import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

// JWT implementation for Deno
async function createJWT(payload: any, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const encoder = new TextEncoder()
  
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  const data = `${headerB64}.${payloadB64}`
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  return `${data}.${signatureB64}`
}

class DoorDashService {
  private credentials: DoorDashCredentials
  private baseUrl: string

  constructor() {
    this.credentials = {
      developer_id: Deno.env.get('DOORDASH_DEVELOPER_ID') || '',
      key_id: Deno.env.get('DOORDASH_KEY_ID') || '',
      signing_secret: Deno.env.get('DOORDASH_SIGNING_SECRET') || ''
    }
    this.baseUrl = 'https://openapi.doordash.com'
  }

  private async generateToken(): Promise<string> {
    const payload = {
      aud: 'doordash',
      iss: this.credentials.developer_id,
      kid: this.credentials.key_id,
      exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes
    }

    return await createJWT(payload, this.credentials.signing_secret)
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.generateToken()
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`DoorDash API Error: ${response.status} - ${errorData}`)
    }

    return response.json()
  }

  async getDeliveryQuote(
    storeId: string,
    pickupAddress: string,
    dropoffAddress: string
  ): Promise<any> {
    const endpoint = '/drive/v2/quotes'
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
    }

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async createDelivery(quoteId: string, orderDetails: any): Promise<any> {
    const endpoint = '/drive/v2/deliveries'
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
    }

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async getDeliveryStatus(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}`
    return this.makeRequest(endpoint)
  }

  async cancelDelivery(deliveryId: string): Promise<any> {
    const endpoint = `/drive/v2/deliveries/${deliveryId}/cancel`
    return this.makeRequest(endpoint, {
      method: 'PUT',
    })
  }

  async searchStores(lat: number, lng: number, radius: number = 5000): Promise<any[]> {
    const endpoint = `/consumer/v1/store_search`
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
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
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('DoorDash API Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})