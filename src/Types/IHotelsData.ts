export interface IHotelsData {
  id: string;
  listing_url: string;
  scrape_id: string;
  last_scraped: string;
  name: string;
  summary: string;
  space: string;
  description: string;
  experiences_offered: string;
  neighborhood_overview: string;
  notes: string | null;
  transit: string;
  access: string;
  interaction: string | null;
  house_rules: string | null;
  thumbnail_url: string;
  medium_url: string;
  picture_url: {
    thumbnail: true;
    filename: string;
    format: string;
    width: number;
    mimetype: string;
    id: string;
    last_synchronized: string;
    color_summary: string[];
    height: number;
    url: string;
  };
  xl_picture_url: string;
  host_id: string;
  host_url: string;
  host_name: string;
  host_since: string;
  host_location: string;
  host_about: string | null;
  host_response_time: string | null;
  host_response_rate: string | null;
  host_acceptance_rate: string | null;
  host_thumbnail_url: string;
  host_picture_url: string;
  host_neighbourhood: string | null;
  host_listings_count: number;
  host_total_listings_count: number;
  host_verifications: string[];
  street: string;
  neighbourhood: string | null;
  neighbourhood_cleansed: string;
  neighbourhood_group_cleansed: string | null;
  city: string;
  state: string;
  zipcode: string;
  market: string;
  smart_location: string;
  country_code: string;
  country: string;
  latitude: string;
  longitude: string;
  property_type: string;
  room_type: string;
  accommodates: number;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  bed_type: string;
  amenities: string[];
  square_feet: string | null;
  price: number;
  weekly_price: string | null;
  monthly_price: string | null;
  security_deposit: string | null;
  cleaning_fee: string | null;
  guests_included: number;
  extra_people: number;
  minimum_nights: number;
  maximum_nights: number;
  calendar_updated: string;
  has_availability: string | null;
  availability_30: number;
  availability_60: number;
  availability_90: number;
  availability_365: number;
  calendar_last_scraped: string;
  number_of_reviews: 3;
  first_review: string;
  last_review: string;
  review_scores_rating: number;
  review_scores_accuracy: number;
  review_scores_cleanliness: 9;
  review_scores_checkin: number;
  review_scores_communication: 9;
  review_scores_location: 9;
  review_scores_value: 9;
  license: string | null;
  jurisdiction_names: string;
  cancellation_policy: string;
  calculated_host_listings_count: number;
  reviews_per_month: number;
  geolocation: {
    lon: number;
    lat: number;
  };
  features: string[];
}
