const YELP_API_KEY = process.env.YELP_API_KEY;

const options = {
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
};