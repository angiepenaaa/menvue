import { create } from "https://deno.land/x/djwt@v2.8/mod.ts";

export function generateDoorDashToken(): string {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    aud: "doordash",
    iss: Deno.env.get("DOORDASH_DEVELOPER_ID"),
    kid: Deno.env.get("DOORDASH_KEY_ID"),
    exp: Math.floor(Date.now() / 1000) + 300,
  };
  const secret = Deno.env.get("DOORDASH_SECRET")!;
  return create(header, payload, secret);
}
