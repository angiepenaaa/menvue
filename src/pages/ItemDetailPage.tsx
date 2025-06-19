import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Phone, ExternalLink, Loader2, AlertCircle, Camera, Heart, Share2 } from 'lucide-react';
import { yelpBusinessDetails, yelpBusinessReviews } from '../utils/yelpApi';
import { menuItems } from '../data/menuItems';

const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [business, setBusiness] = React.useState<any>(null);
  const [reviews, setReviews] = React.useState<any>(null);
  const [localMenuItem, setLocalMenuItem] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);
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
        
        // If not a local menu item, try to fetch from Yelp API
        try {
          const [businessData, reviewsData] = await Promise.all([
            yelpBusinessDetails(itemId),
            yelpBusinessReviews(itemId)
          ]);
          
          setBusiness(businessData);
          setReviews(reviewsData);
        } catch (apiError) {
          // If Yelp API calls fail, show a more user-friendly message
          console.error('Yelp API error:', apiError);
          setError('Restaurant details are currently unavailable. Please try again later.');
        }
      } catch (err: any) {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: localMenuItem?.name || business?.name || 'Restaurant',
          text: localMenuItem?.description || `Check out ${business?.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
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
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {error || 'Restaurant not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading this restaurant's details. This might be because the restaurant information is not yet available through our enhanced API integration.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn-primary"
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
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 flex-1 text-center px-4">
              Menu Item Details
            </h2>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-80">
          <img
            src={localMenuItem.image || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'}
            alt={localMenuItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-white text-3xl font-bold mb-3 text-balance">{localMenuItem.name}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-current text-yellow-400" />
                <span className="font-medium">{localMenuItem.rating || '4.5'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{localMenuItem.price}</span>
              </div>
              {localMenuItem.calories && (
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-600">
                  {localMenuItem.calories} cal
                </div>
              )}
            </div>
          </div>
          <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
          {/* Basic Info */}
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {localMenuItem.description || 'A delicious menu item prepared with fresh ingredients.'}
                </p>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-lg">{localMenuItem.price}</span>
                  </div>
                  {localMenuItem.calories && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-semibold">{localMenuItem.calories}</span>
                    </div>
                  )}
                  {localMenuItem.category && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{localMenuItem.category}</span>
                    </div>
                  )}
                  {localMenuItem.restaurantId && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Restaurant:</span>
                      <span className="font-semibold">{localMenuItem.restaurantId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nutritional Info */}
          {(localMenuItem.nutrition?.protein || localMenuItem.nutrition?.carbs || localMenuItem.nutrition?.totalFat) && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Nutritional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {localMenuItem.nutrition?.protein && (
                  <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{localMenuItem.nutrition.protein}g</div>
                    <div className="text-sm font-medium text-emerald-700">Protein</div>
                  </div>
                )}
                {localMenuItem.nutrition?.carbs && (
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{localMenuItem.nutrition.carbs}g</div>
                    <div className="text-sm font-medium text-blue-700">Carbs</div>
                  </div>
                )}
                {localMenuItem.nutrition?.totalFat && (
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{localMenuItem.nutrition.totalFat}g</div>
                    <div className="text-sm font-medium text-orange-700">Fat</div>
                  </div>
                )}
                {localMenuItem.nutrition?.fiber && (
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">{localMenuItem.nutrition.fiber}g</div>
                    <div className="text-sm font-medium text-green-700">Fiber</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {localMenuItem.tags && localMenuItem.tags.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {localMenuItem.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="badge badge-emerald"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="container mx-auto max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="btn-primary w-full"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Yelp business details (enhanced UI)
  const openStatus = getOpenStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          <h2 className="text-lg font-bold text-gray-800 flex-1 text-center px-4">
            Restaurant Details
          </h2>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Share2 size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hero Section with Photo Gallery */}
      <div className="relative h-80">
        <img
          src={business.photos?.[activePhotoIndex] || business.image_url || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Photo navigation */}
        {business.photos && business.photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {business.photos.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activePhotoIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white text-3xl font-bold mb-3 text-balance">{business.name}</h1>
          <div className="flex items-center gap-4 text-white flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span className="font-medium">{business.rating}</span>
              <span className="text-gray-300">({business.review_count} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{business.price || '$'}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              openStatus.isOpen === true ? 'bg-green-600' : 
              openStatus.isOpen === false ? 'bg-red-600' : 'bg-gray-600'
            }`}>
              {openStatus.text}
            </div>
          </div>
        </div>
        
        <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Basic Info */}
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {business.categories?.map((category: any, index: number) => (
                  <span
                    key={index}
                    className="badge badge-emerald"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{business.location?.display_address?.join(', ')}</span>
                </div>
                {business.display_phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="flex-shrink-0" />
                    <a 
                      href={`tel:${business.phone}`}
                      className="text-sm hover:text-emerald-600 transition-colors"
                    >
                      {formatPhoneNumber(business.display_phone)}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <ExternalLink size={18} className="flex-shrink-0" />
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
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Clock size={20} />
              Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {business.hours[0]?.open?.map((hours: any, index: number) => {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const startTime = hours.start ? `${hours.start.slice(0, 2)}:${hours.start.slice(2)}` : '';
                const endTime = hours.end ? `${hours.end.slice(0, 2)}:${hours.end.slice(2)}` : '';
                
                return (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{days[hours.day]}</span>
                    <span className="text-gray-600">{startTime} - {endTime}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Photos Gallery */}
        {business.photos && business.photos.length > 0 && (
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Camera size={20} />
              Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {business.photos.slice(0, 8).map((photo: string, index: number) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer hover-lift"
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img
                    src={photo}
                    alt={`${business.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews && reviews.reviews && reviews.reviews.length > 0 && (
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Reviews</h3>
            <div className="space-y-6">
              {reviews.reviews.slice(0, 3).map((review: any) => (
                <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.user.image_url || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
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
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3">
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="btn-primary flex-1 text-center"
              >
                Call Restaurant
              </a>
            )}
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 text-center"
            >
              View on Yelp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;