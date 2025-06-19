import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Phone, ExternalLink, Loader2 } from 'lucide-react';
import { yelpBusinessDetails, yelpBusinessReviews } from '../utils/yelpApi';
import { menuItems } from '../data/menuItems';

const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [business, setBusiness] = React.useState<any>(null);
  const [reviews, setReviews] = React.useState<any>(null);
  const [localMenuItem, setLocalMenuItem] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBusinessData = async () => {
      if (!itemId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // First check if this is a local menu item
        const localItem = menuItems.find(item => item.id === itemId);
        
        if (localItem) {
          setLocalMenuItem(localItem);
          setLoading(false);
          return;
        }
        
        // If not a local menu item, fetch from Yelp API
        const [businessData, reviewsData] = await Promise.all([
          yelpBusinessDetails(itemId),
          yelpBusinessReviews(itemId)
        ]);
        
        setBusiness(businessData);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching business data:', err);
        setError('Failed to load restaurant details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [itemId]);

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const getOpenStatus = () => {
    if (!business?.hours || business.hours.length === 0) {
      return { text: 'Hours not available', isOpen: null };
    }
    
    const todayHours = business.hours[0];
    if (todayHours.is_open_now) {
      return { text: 'Open now', isOpen: true };
    } else {
      return { text: 'Closed', isOpen: false };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading restaurant details...</span>
        </div>
      </div>
    );
  }

  if (error || (!business && !localMenuItem)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {error || 'Restaurant not found'}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // If this is a local menu item, render a simplified view
  if (localMenuItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div>
          <div className="flex items-center bg-white p-4 pb-2 justify-between border-b">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-800 size-12 flex items-center justify-center"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-gray-800 text-lg font-bold flex-1 text-center pr-12">
              Menu Item Details
            </h2>
          </div>

          {/* Hero Section */}
          <div className="relative h-64">
            <img
              src={localMenuItem.image || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'}
              alt={localMenuItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-white text-2xl font-bold mb-2">{localMenuItem.name}</h1>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>{localMenuItem.rating || '4.5'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>${localMenuItem.price}</span>
                </div>
                {localMenuItem.calories && (
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600">
                    {localMenuItem.calories} cal
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {localMenuItem.description || 'A delicious menu item prepared with fresh ingredients.'}
                  </p>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${localMenuItem.price}</span>
                    </div>
                    {localMenuItem.calories && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calories:</span>
                        <span className="font-medium">{localMenuItem.calories}</span>
                      </div>
                    )}
                    {localMenuItem.category && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{localMenuItem.category}</span>
                      </div>
                    )}
                    {localMenuItem.restaurant && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Restaurant:</span>
                        <span className="font-medium">{localMenuItem.restaurant}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Nutritional Info */}
            {(localMenuItem.protein || localMenuItem.carbs || localMenuItem.fat) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Nutritional Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  {localMenuItem.protein && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{localMenuItem.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  )}
                  {localMenuItem.carbs && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{localMenuItem.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                  )}
                  {localMenuItem.fat && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{localMenuItem.fat}g</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="container mx-auto max-w-4xl">
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const openStatus = getOpenStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between border-b">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 size-12 flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-gray-800 text-lg font-bold flex-1 text-center pr-12">
            Restaurant Details
          </h2>
        </div>

        {/* Hero Section */}
        <div className="relative h-64">
          <img
            src={business.image_url || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-white text-2xl font-bold mb-2">{business.name}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span>{business.rating}</span>
                <span className="text-gray-300">({business.review_count} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{business.price || '$'}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                openStatus.isOpen === true ? 'bg-green-600' : 
                openStatus.isOpen === false ? 'bg-red-600' : 'bg-gray-600'
              }`}>
                {openStatus.text}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {business.categories?.map((category: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{business.location?.display_address?.join(', ')}</span>
                  </div>
                  {business.display_phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <a 
                        href={`tel:${business.phone}`}
                        className="text-sm hover:text-emerald-600 transition-colors"
                      >
                        {formatPhoneNumber(business.display_phone)}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <ExternalLink size={16} />
                    <a 
                      href={business.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-emerald-600 transition-colors"
                    >
                      View on Yelp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          {business.hours && business.hours.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock size={20} />
                Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.hours[0]?.open?.map((hours: any, index: number) => {
                  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                  const startTime = hours.start ? `${hours.start.slice(0, 2)}:${hours.start.slice(2)}` : '';
                  const endTime = hours.end ? `${hours.end.slice(0, 2)}:${hours.end.slice(2)}` : '';
                  
                  return (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{days[hours.day]}</span>
                      <span className="text-gray-800">{startTime} - {endTime}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Photos */}
          {business.photos && business.photos.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {business.photos.slice(0, 6).map((photo: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={photo}
                      alt={`${business.name} photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews && reviews.reviews && reviews.reviews.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Reviews</h3>
              <div className="space-y-6">
                {reviews.reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.user.image_url || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'}
                        alt={review.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-800">{review.user.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.time_created).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors text-center"
                >
                  Call Restaurant
                </a>
              )}
              <a
                href={business.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
              >
                View on Yelp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;