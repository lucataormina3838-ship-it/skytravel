export interface Apartment {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  location: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  created_at: string;
}

export interface Pack {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  price_per_person: number;
  duration_days: number;
  max_persons: number;
  includes_fr: string[];
  includes_en: string[];
  highlights_fr: string[];
  highlights_en: string[];
  images: string[];
  category: 'boat' | 'quad' | 'forest' | 'combo';
  featured: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_type: 'apartment' | 'pack';
  item_id: string;
  item_title: string;
  start_date: string;
  end_date: string;
  guests: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_price: number;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  item_id: string;
  item_type: 'apartment' | 'pack';
  blocked_date: string;
}
