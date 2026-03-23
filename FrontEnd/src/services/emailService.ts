import emailjs from '@emailjs/browser';
import type { LeadFormData } from '@/types';

// Initialize EmailJS with public key
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Send lead notification email via EmailJS
 */
export const sendLeadEmail = async (data: LeadFormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: import.meta.env.VITE_CONTACT_EMAIL || 'ilsogroup@gmail.com',
      from_name: data.name || 'New Lead',
      phone: data.phone,
      system_type: data.systemType || 'Not specified',
      message: data.message || 'No message',
      language: data.language,
      timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Tbilisi' }),
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

    if (response.status === 200) {
      return true;
    }

    console.error('EmailJS response error:', response);
    return false;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * Validate EmailJS configuration
 */
export const isEmailServiceConfigured = (): boolean => {
  return Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);
};

/**
 * Get email service status
 */
export const getEmailServiceStatus = (): {
  configured: boolean;
  missingKeys: string[];
} => {
  const missingKeys: string[] = [];

  if (!PUBLIC_KEY) missingKeys.push('VITE_EMAILJS_PUBLIC_KEY');
  if (!SERVICE_ID) missingKeys.push('VITE_EMAILJS_SERVICE_ID');
  if (!TEMPLATE_ID) missingKeys.push('VITE_EMAILJS_TEMPLATE_ID');

  return {
    configured: missingKeys.length === 0,
    missingKeys,
  };
};
