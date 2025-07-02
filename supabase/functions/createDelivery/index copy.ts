import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { generateDoorDashToken } from "../lib/generateDoorDashToken.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const token = await generateDoorDashToken();

  const deliveryData = {
    external_delivery_id: `test_order_${Date.now()}`,
    pickup_address: "123 Taco St, Gainesville, FL",
    pickup_phone_number: "555-123-4567",
    pickup_business_name: "Taco Fiesta",
    dropoff_address: "789 Student Lane, Gainesville, FL",
    dropoff_phone_number: "555-987-6543",
    dropoff_contact_given_name: "Angie",
    dropoff_contact_family_name: "Pena",
    order_value: 1599
  };

  const response = await fetch("https://openapi.doordash.com/drive/v2/deliveries", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(deliveryData)
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: data.message || "Delivery failed" }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
});