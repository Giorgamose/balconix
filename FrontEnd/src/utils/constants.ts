// Contact Information
export const CONTACT = {
  PHONE_PRIMARY: '+995 577 07 27 53',
  PHONE_SECONDARY: '+995 595 13 58 58',
  WHATSAPP_NUMBER: '995577072753',
  EMAIL: 'ilsogroup@gmail.com',
  FACEBOOK_PAGE_ID: '100042339892071',
  FACEBOOK_URL: 'https://www.facebook.com/profile.php?id=100042339892071',
} as const;

// Company Information
export const COMPANY = {
  NAME: 'Balconix',
  TAGLINE: 'ხარისხი ყოველთვის!',
  POWERED_BY: 'ILSO GROUP',
  FOUNDED: 2020,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${CONTACT.WHATSAPP_NUMBER}`,
  messenger: `https://m.me/${CONTACT.FACEBOOK_PAGE_ID}`,
  facebook: CONTACT.FACEBOOK_URL,
} as const;

// Navigation Items
export const NAV_ITEMS = [
  { key: 'home', href: '#home' },
  { key: 'products', href: '#products' },
  { key: 'gallery', href: '#gallery' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#quick-contact' },
] as const;

// Product Types
export const PRODUCT_TYPES = ['sliding', 'folding', 'frameless'] as const;

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Image paths
export const IMAGES = {
  logo: '/images/logo/balconix-logo.svg',
  logoWhite: '/images/logo/balconix-logo-white.svg',
  heroBg: '/images/hero/hero-bg.jpg',
  placeholder: '/images/placeholder.jpg',
} as const;

// Testimonials Data (placeholder - to be replaced with real data)
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'გიორგი მ.',
    location: 'თბილისი, საბურთალო',
    text: 'ძალიან კმაყოფილი ვარ სამუშაოთი. პროფესიონალური მიდგომა და ხარისხიანი შემინვა.',
    rating: 5,
  },
  {
    id: '2',
    name: 'ნინო კ.',
    location: 'თბილისი, ვაკე',
    text: 'სწრაფი მომსახურება და შესანიშნავი შედეგი. გირჩევთ ყველას!',
    rating: 5,
  },
  {
    id: '3',
    name: 'დავით ბ.',
    location: 'ბათუმი',
    text: 'ფასი ხარისხს შეესაბამება. აივანი საოცრად გამოიყურება.',
    rating: 5,
  },
] as const;

// How It Works Steps
export const PROCESS_STEPS = [
  { id: 1, key: 'step1', icon: '📏' },
  { id: 2, key: 'step2', icon: '🏭' },
  { id: 3, key: 'step3', icon: '🔧' },
  { id: 4, key: 'step4', icon: '✅' },
] as const;

// Trust Statistics
export const TRUST_STATS = [
  { key: 'projects', icon: '🏠' },
  { key: 'affordable', icon: '💰' },
  { key: 'measurement', icon: '📐' },
  { key: 'warranty', icon: '🛡️' },
] as const;
