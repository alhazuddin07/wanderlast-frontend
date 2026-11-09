export interface Booking {
  _id?: string;
  id?: string;

  userId?: string;
  userName?: string;
  userEmail?: string;
  userImage?: string | null;

  // Legacy bookings stored the user as name/email/image.
  name?: string;
  email?: string;
  image?: string | null;

  destinationId?: string;
  destinationName?: string;
  destination?: string;
  country?: string;
  duration?: string;
  price?: number | string;
  imageUrl?: string;

  departureDate?: string;
  bookingDate?: string;
  status?: string;
}
