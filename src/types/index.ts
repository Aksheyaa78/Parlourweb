export type ServiceCategory = 'all' | 'hair' | 'skin' | 'nails' | 'bridal' | 'spa';

export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'nails' | 'bridal' | 'spa';
  durationMinutes: number;
  price: number;
  description: string;
  includes: string[];
  image?: string;
  popular?: boolean;
  tag?: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experienceYears: number;
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  instagram: string;
}

export interface AppointmentBooking {
  id: string;
  serviceIds: string[];
  serviceNames: string[];
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  beveragePreference: string;
  notes?: string;
  totalPrice: number;
  totalDurationMinutes: number;
  createdAt: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export interface BridalPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  features: string[];
  recommendedMonthsBefore: string;
  idealFor: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  city: string;
  treatment: string;
  stylist: string;
  rating: number;
  quote: string;
  date: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  treatment: string;
  duration: string;
  stylistName: string;
  details: string;
  beforeLabel: string;
  afterLabel: string;
}
