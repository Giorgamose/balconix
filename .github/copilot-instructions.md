# Copilot Instructions for Balconix Project

## Project Overview

Balconix is a high-converting, multilingual lead-generation website for a balcony glazing company targeting the Georgian market. The website is built with React, TypeScript, TailwindCSS, and Vite.

**Company:** Balconix - Powered by ILSO GROUP  
**Tagline:** ხარისხი ყოველთვის! (Quality Always!)

## Tech Stack

- **React 18** with TypeScript
- **Vite** as build tool
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **react-i18next** for internationalization
- **EmailJS** for frontend email sending

## Key Business Context

### Target Markets
- 🇬🇪 Georgia (Primary) - Georgian language default
- 🇷🇺 Russia - Russian language
- 🇦🇿 Azerbaijan - Azerbaijani language  
- 🇬🇧 International - English language

### Business Goals
- Maximize lead generation through instant contact (WhatsApp, Messenger, Phone)
- Users should be able to contact within 15-30 seconds
- Mobile-first design (majority of users)
- Mid-range + budget-friendly positioning (NOT luxury)

### Contact Information
- Phone 1: +995 577 07 27 53
- Phone 2: +995 595 13 58 58
- Email: ilsogroup@gmail.com
- Facebook: https://www.facebook.com/profile.php?id=100042339892071
- WhatsApp Number: 995577072753

## Code Style Guidelines

### TypeScript
- Use strict TypeScript with no `any` types
- Define interfaces for all props and data structures
- Use type inference where obvious
- Export types from `src/types/` directory

### React Components
- Use functional components with hooks
- Use named exports for components
- Place each component in its own folder with index.tsx
- Co-locate component-specific styles and tests

```tsx
// Good component structure
// src/components/sections/Hero/index.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  backgroundImage?: string;
}

export const Hero: FC<HeroProps> = ({ backgroundImage }) => {
  const { t } = useTranslation();
  // component logic
};

export default Hero;
```

### Styling
- Use TailwindCSS utility classes
- Order classes: layout → sizing → spacing → typography → colors → effects
- Use custom colors defined in tailwind.config.js
- Create component variants using Tailwind's `@apply` when needed

### Internationalization
- All user-facing text MUST use translation keys
- Use nested translation structure
- Always include all 4 languages: ka, ru, en, az
- Georgian (ka) is the default language

```tsx
// Good
const { t } = useTranslation();
<h1>{t('hero.title')}</h1>

// Bad - hardcoded text
<h1>Welcome to Balconix</h1>
```

### Animations
- Use Framer Motion for animations
- Keep animations subtle and fast (200-400ms)
- Use `whileInView` for scroll animations
- Respect `prefers-reduced-motion`

## Project Structure

```
FrontEnd/src/
├── components/
│   ├── common/      # Reusable UI (Button, Card, Modal)
│   ├── layout/      # Layout (Navbar, Footer, Container)
│   ├── sections/    # Page sections (Hero, Gallery, etc.)
│   └── forms/       # Form components
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization
│   └── locales/     # Translation JSON files
├── pages/           # Page components
├── services/        # External services (email, analytics)
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## UX Priorities

1. **Speed to Contact** - Every section should push toward contact
2. **Minimal Forms** - Phone number only required, rest optional
3. **Trust Building** - Show real projects, testimonials
4. **Mobile First** - Design for mobile, enhance for desktop
5. **Clear CTAs** - Large, thumb-friendly buttons

## Contact Integration Patterns

### WhatsApp
```tsx
const openWhatsApp = (message: string = 'გამარჯობა, მაინტერესებს აივნის შემინვა') => {
  const phone = '995577072753';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

### Facebook Messenger
```tsx
const openMessenger = () => {
  window.open('https://m.me/100042339892071', '_blank');
};
```

### Phone Call
```tsx
const makeCall = () => {
  window.location.href = 'tel:+995577072753';
};
```

## Brand Colors

```js
// Primary Blue - Use for CTAs and accents
primary: '#2563EB'
primaryDark: '#1E40AF'
primaryLight: '#DBEAFE'

// Neutrals
white: '#FFFFFF'
lightGray: '#F3F4F6'
darkGray: '#1F2937'
black: '#111827'

// Feedback
success: '#10B981'
error: '#EF4444'
```

## Common Patterns

### Section Container
```tsx
<section className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section content */}
  </div>
</section>
```

### CTA Button
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:bg-brand-dark transition-colors"
>
  {t('cta.getPrice')}
</motion.button>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

## Don't Do

- ❌ Hardcode any user-facing text
- ❌ Use `any` type in TypeScript
- ❌ Create long, complex forms
- ❌ Use "luxury" or "premium" messaging
- ❌ Forget mobile responsiveness
- ❌ Skip loading/error states
- ❌ Ignore accessibility (a11y)

## Do

- ✅ Always use translation keys
- ✅ Type all props and data
- ✅ Keep forms minimal
- ✅ Use "value for money" messaging
- ✅ Test on mobile first
- ✅ Add loading spinners and error handling
- ✅ Include ARIA labels

## Environment Variables

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_WHATSAPP_NUMBER=995577072753
VITE_FACEBOOK_PAGE_ID=100042339892071
VITE_CONTACT_EMAIL=ilsogroup@gmail.com
VITE_PHONE_PRIMARY=+995 577 07 27 53
VITE_PHONE_SECONDARY=+995 595 13 58 58
```

## Testing Checklist

Before completing any feature:
- [ ] Works on mobile (375px width)
- [ ] All text uses translation keys
- [ ] TypeScript has no errors
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Animations are smooth
- [ ] Accessible with keyboard
