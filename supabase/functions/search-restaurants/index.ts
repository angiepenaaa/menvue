const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface YelpBusinessSearchResponse {
  businesses: Array<{
    id: string;
    name: string;
    image_url: string;
    is_closed: boolean;
    url: string;
    review_count: number;
    categories: Array<{
      alias: string;
      title: string;
    }>;
    rating: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    transactions: string[];
    price?: string;
    location: {
      address1: string;
      address2?: string;
      address3?: string;
      city: string;
      zip_code: string;
      country: string;
      state: string;
      display_address: string[];
    };
    phone: string;
    display_phone: string;
    distance: number;
  }>;
  total: number;
  region: {
    center: {
      longitude: number;
      latitude: number;
    };
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow GET requests
    if (req.method !== "GET") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Parse query parameters
    const url = new URL(req.url);
    const location = url.searchParams.get("location");

    if (!location) {
      return new Response(
        JSON.stringify({ error: "Location parameter is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Get Yelp API key from environment
    const yelpApiKey = Deno.env.get("YELP_API_KEY");
    if (!yelpApiKey) {
      console.error("YELP_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Build Yelp API request
    const yelpUrl = new URL("https://api.yelp.com/v3/businesses/search");
    yelpUrl.searchParams.set("location", location);
    yelpUrl.searchParams.set("categories", "restaurants");
    yelpUrl.searchParams.set("limit", "20");
    yelpUrl.searchParams.set("sort_by", "best_match");

    // Make request to Yelp API
    const yelpResponse = await fetch(yelpUrl.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${yelpApiKey}`,
        "Accept": "application/json",
      },
    });

    if (!yelpResponse.ok) {
      console.error(`Yelp API error: ${yelpResponse.status} ${yelpResponse.statusText}`);
      return new Response(
        JSON.stringify({ 
          error: "Failed to fetch restaurants from Yelp API",
          status: yelpResponse.status 
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const yelpData: YelpBusinessSearchResponse = await yelpResponse.json();

    // Return the restaurant data
    return new Response(
      JSON.stringify(yelpData),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error("Error in search-restaurants function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});