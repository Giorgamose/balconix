import { CONTACT, SOCIAL_LINKS } from './constants';

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Georgian numbers
  if (cleaned.startsWith('995')) {
    const number = cleaned.slice(3);
    return `+995 ${number.slice(0, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7)}`;
  }
  
  return phone;
};

/**
 * Validate Georgian phone number
 */
export const isValidGeorgianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Georgian mobile: starts with 5, total 9 digits (without country code)
  // With country code: 995 + 9 digits = 12 digits
  if (cleaned.startsWith('995')) {
    return cleaned.length === 12 && cleaned[3] === '5';
  }
  
  // Without country code
  if (cleaned.startsWith('5')) {
    return cleaned.length === 9;
  }
  
  return false;
};

/**
 * Open WhatsApp with pre-filled message
 */
export const openWhatsApp = (message: string = ''): void => {
  const encodedMessage = encodeURIComponent(message);
  const url = `${SOCIAL_LINKS.whatsapp}${message ? `?text=${encodedMessage}` : ''}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Open Facebook Messenger
 */
export const openMessenger = (): void => {
  window.open(SOCIAL_LINKS.messenger, '_blank', 'noopener,noreferrer');
};

/**
 * Make phone call
 */
export const makeCall = (phone: string = CONTACT.PHONE_PRIMARY): void => {
  const cleaned = phone.replace(/\s/g, '');
  window.location.href = `tel:${cleaned}`;
};

/**
 * Open email client
 */
export const sendEmail = (
  subject: string = '',
  body: string = ''
): void => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  window.location.href = `mailto:${CONTACT.EMAIL}${queryString ? `?${queryString}` : ''}`;
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement, threshold: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -threshold &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get current device type
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clamp number between min and max
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date, locale: string = 'ka-GE'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get contrast color (black or white) for background
 */
export const getContrastColor = (hexColor: string): 'black' | 'white' => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
};
