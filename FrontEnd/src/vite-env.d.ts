/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_FACEBOOK_PAGE_ID: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_PHONE_PRIMARY: string;
  readonly VITE_PHONE_SECONDARY: string;
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_FB_PIXEL_ID?: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
