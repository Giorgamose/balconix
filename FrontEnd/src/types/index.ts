// Lead form data
export interface LeadFormData {
  phone: string;
  name?: string;
  systemType?: SystemType;
  message?: string;
  language: string;
}

// System types for products
export type SystemType = 'sliding' | 'folding' | 'frameless';

// Product information
export interface Product {
  id: SystemType;
  name: string;
  description: string;
  features: string[];
  image: string;
  priceRange?: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}

// Gallery image
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: 'sliding' | 'folding' | 'frameless' | 'all';
  isBefore?: boolean;
  isAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
}

// Contact information
export interface ContactInfo {
  phone1: string;
  phone2: string;
  email: string;
  whatsapp: string;
  facebookPageId: string;
  address: string;
}

// Navigation item
export interface NavItem {
  key: string;
  href: string;
  label: string;
}

// How it works step
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Trust item (statistics)
export interface TrustItem {
  value: string;
  label: string;
  icon?: string;
}

// Form state
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

// Language type
export type Language = 'ka' | 'ru' | 'en' | 'az';

// SEO meta data
export interface MetaData {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
