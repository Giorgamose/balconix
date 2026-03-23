# 🔧 Development Guide

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier
  - ESLint

### Initial Setup

```bash
# Clone and navigate
cd Balconix/FrontEnd

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

## 📁 Directory Structure

```
FrontEnd/
├── public/
│   ├── images/
│   │   ├── projects/       # Gallery images
│   │   ├── team/           # Team photos
│   │   ├── icons/          # Custom icons
│   │   └── logo/           # Logo variations
│   ├── videos/             # Background videos
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Loader/
│   │   │
│   │   ├── layout/         # Layout components
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── Container/
│   │   │
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero/
│   │   │   ├── TrustBlock/
│   │   │   ├── Products/
│   │   │   ├── Gallery/
│   │   │   ├── HowItWorks/
│   │   │   ├── Testimonials/
│   │   │   └── FinalCTA/
│   │   │
│   │   └── forms/          # Form components
│   │       ├── QuickLeadForm/
│   │       └── CallbackForm/
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useLanguage.ts
│   │   ├── useScrollPosition.ts
│   │   └── useContactActions.ts
│   │
│   ├── i18n/               # Internationalization
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── ka.json     # Georgian
│   │       ├── ru.json     # Russian
│   │       ├── en.json     # English
│   │       └── az.json     # Azerbaijani
│   │
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   └── NotFound/
│   │
│   ├── services/           # External services
│   │   ├── emailService.ts
│   │   └── analyticsService.ts
│   │
│   ├── styles/             # Global styles
│   │   └── globals.css
│   │
│   ├── types/              # TypeScript types
│   │   ├── index.ts
│   │   └── i18n.d.ts
│   │
│   ├── utils/              # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── validators.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── docs/                   # Component documentation
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🧩 Component Architecture

### Naming Conventions

- **Components:** PascalCase (`HeroSection.tsx`)
- **Hooks:** camelCase with `use` prefix (`useLanguage.ts`)
- **Utils:** camelCase (`formatPhoneNumber.ts`)
- **Types:** PascalCase with `I` prefix for interfaces (`ILead.ts`)

### Component Template

```tsx
// ComponentName/index.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ComponentNameProps {
  // props
}

export const ComponentName: FC<ComponentNameProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=""
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
```

## 🌐 Internationalization (i18n)

### Adding Translations

1. Add key-value pairs to each locale file in `src/i18n/locales/`
2. Use nested structure for organization:

```json
{
  "hero": {
    "title": "Quality Balcony Glazing",
    "subtitle": "Transform your space"
  }
}
```

3. Access in components:

```tsx
const { t } = useTranslation();
return <h1>{t('hero.title')}</h1>;
```

### Language Switching

```tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ka')}>GE</button>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('az')}>AZ</button>
    </div>
  );
};
```

## 📧 Email Integration (EmailJS)

### Setup

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail recommended)
3. Create email template
4. Get credentials and add to `.env`

### Usage

```tsx
import { sendEmail } from '@/services/emailService';

const handleSubmit = async (data: LeadFormData) => {
  try {
    await sendEmail(data);
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

## 📱 Contact Integration

### WhatsApp

```tsx
const openWhatsApp = (message: string) => {
  const phone = '995577072753';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

### Facebook Messenger

```tsx
const openMessenger = () => {
  const pageId = '100042339892071';
  window.open(`https://m.me/${pageId}`, '_blank');
};
```

### Phone Call

```tsx
const makeCall = () => {
  window.location.href = 'tel:+995577072753';
};
```

## 🎨 Styling Guidelines

### Tailwind Classes Organization

```tsx
// Order: layout → sizing → spacing → typography → colors → effects
<div className="flex items-center w-full px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
```

### Custom Colors (tailwind.config.js)

```js
colors: {
  brand: {
    primary: '#2563EB',
    dark: '#1E40AF',
    light: '#DBEAFE',
  }
}
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Lint
npm run lint
```

## 📝 Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### Commit Messages

Follow conventional commits:

```
feat: add language switcher component
fix: resolve mobile menu toggle issue
docs: update README with setup instructions
style: format code with prettier
refactor: extract common button styles
```

## 🔍 Code Quality

### Pre-commit Hooks

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

### VS Code Settings

Recommended `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [react-i18next](https://react.i18next.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
