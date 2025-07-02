// JWT Token Generator for DoorDash Drive API
// This should only be used on the backend/edge functions for security

interface JWTHeader {
  alg: string;
  typ: string;
}

interface JWTPayload {
  aud: string;
  iss: string;
  kid: string;
  exp: number;
  iat?: number;
}

export class DoorDashJWTGenerator {
  private developerId: string;
  private keyId: string;
  private signingSecret: string;

  constructor(developerId: string, keyId: string, signingSecret: string) {
    this.developerId = developerId;
    this.keyId = keyId;
    this.signingSecret = signingSecret;
  }

  private base64UrlEncode(data: string): string {
    return btoa(data)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async sign(data: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    const signatureArray = new Uint8Array(signature);
    const signatureString = String.fromCharCode(...signatureArray);
    
    return this.base64UrlEncode(signatureString);
  }

  async generateToken(expirationMinutes: number = 5): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    
    const header: JWTHeader = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload: JWTPayload = {
      aud: 'doordash',
      iss: this.developerId,
      kid: this.keyId,
      exp: now + (expirationMinutes * 60),
      iat: now
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = await this.sign(data, this.signingSecret);
    
    return `${data}.${signature}`;
  }

  // Validate that credentials are properly configured
  validateCredentials(): boolean {
    return !!(this.developerId && this.keyId && this.signingSecret);
  }
}

// Factory function for creating JWT generator
export function createDoorDashJWTGenerator(
  developerId: string,
  keyId: string,
  signingSecret: string
): DoorDashJWTGenerator {
  return new DoorDashJWTGenerator(developerId, keyId, signingSecret);
}