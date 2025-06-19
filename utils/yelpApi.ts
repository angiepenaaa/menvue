const YELP_API_KEY = process.env.YELP_API_KEY;

// Add usage example for 'options' with fetch
// Example: fetch('https://api.yelp.com/v3/businesses/search?location=NYC', options)
// Or remove 'options' if not needed

const options = {
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
};

// Example usage:
fetch('https://api.yelp.com/v3/businesses/search?location=NYC', options)
  .then(response => response.json())
  .then(data => console.log(data));