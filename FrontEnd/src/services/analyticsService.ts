/**
 * Analytics Service
 * Handles Google Analytics and Facebook Pixel tracking
 */

// Event types
type EventCategory = 'contact' | 'lead' | 'navigation' | 'engagement';

interface TrackEventParams {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Track custom event
 */
export const trackEvent = ({ category, action, label, value }: TrackEventParams): void => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', action, {
      category,
      label,
      value,
    });
  }
};

/**
 * Track page view
 */
export const trackPageView = (pagePath: string, pageTitle: string): void => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track lead submission
 */
export const trackLeadSubmission = (systemType?: string): void => {
  trackEvent({
    category: 'lead',
    action: 'form_submission',
    label: systemType || 'general',
  });

  // Facebook Pixel Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: systemType || 'general',
    });
  }
};

/**
 * Track WhatsApp click
 */
export const trackWhatsAppClick = (location: string): void => {
  trackEvent({
    category: 'contact',
    action: 'whatsapp_click',
    label: location,
  });
};

/**
 * Track Messenger click
 */
export const trackMessengerClick = (location: string): void => {
  trackEvent({
    category: 'contact',
    action: 'messenger_click',
    label: location,
  });
};

/**
 * Track phone call
 */
export const trackPhoneCall = (location: string): void => {
  trackEvent({
    category: 'contact',
    action: 'phone_call',
    label: location,
  });

  // Facebook Pixel Contact event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact');
  }
};

/**
 * Track language change
 */
export const trackLanguageChange = (language: string): void => {
  trackEvent({
    category: 'engagement',
    action: 'language_change',
    label: language,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number): void => {
  trackEvent({
    category: 'engagement',
    action: 'scroll_depth',
    value: percentage,
  });
};

// Add type declarations for analytics globals
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
