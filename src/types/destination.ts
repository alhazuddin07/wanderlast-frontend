export interface Destination {
  _id?: string;
  id?: string;
  destination?: string;
  name?: string;
  country?: string;
  category?: string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number | string;
  reviewsCount?: number | string;
  highlights?: string[];
}
