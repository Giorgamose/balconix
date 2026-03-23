# Components Documentation

## Overview

This document provides detailed documentation for all React components in the Balconix website.

## Component Structure

Components are organized in the following categories:

- **common/** - Reusable UI components
- **layout/** - Layout and navigation components
- **sections/** - Page sections
- **forms/** - Form-related components

---

## Common Components

### Button

Reusable button component with multiple variants.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'whatsapp' \| 'messenger' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| fullWidth | `boolean` | `false` | Whether button takes full width |
| isLoading | `boolean` | `false` | Shows loading spinner |
| leftIcon | `ReactNode` | - | Icon on the left |
| rightIcon | `ReactNode` | - | Icon on the right |

**Usage:**
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>

<Button variant="whatsapp" leftIcon={<WhatsAppIcon />}>
  Chat on WhatsApp
</Button>
```

### Loader

Loading spinner component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| color | `'primary' \| 'white'` | `'primary'` | Spinner color |
| fullScreen | `boolean` | `false` | Full screen overlay |

---

## Layout Components

### Navbar

Sticky navigation with language switcher and CTA.

**Features:**
- Transparent on scroll top, solid on scroll
- Mobile hamburger menu
- Language switcher dropdown
- Request callback CTA

### Footer

Site footer with company info, links, and social icons.

**Sections:**
- Company info & tagline
- Quick navigation links
- Contact information
- Social media links

### FloatingButtons

Expandable floating action buttons for quick contact.

**Buttons:**
- WhatsApp
- Facebook Messenger
- Phone call (mobile)

---

## Section Components

### Hero

Full-screen hero section with CTAs.

**Features:**
- Background image/video support
- Localized headline
- Multiple CTA buttons
- Scroll indicator animation

### TrustBlock

Statistics and trust indicators.

**Stats:**
- Completed projects count
- Affordable pricing badge
- Free measurement
- Warranty info

### Products

Product type cards showcase.

**Product Types:**
- Sliding system
- Folding system
- Frameless glazing

### Gallery

Project gallery with lightbox.

**Features:**
- Grid layout
- Click to expand
- Category filtering (planned)
- Before/after slider (planned)

### HowItWorks

Step-by-step process visualization.

**Steps:**
1. Measurement
2. Production
3. Installation
4. Complete

### QuickContact

Minimal lead capture form.

**Fields:**
- Phone number (required)

**Actions:**
- Form validation
- EmailJS submission
- Success/error states

### Testimonials

Customer review cards.

**Features:**
- Star rating display
- Customer quote
- Name and location

### FinalCTA

Final call-to-action section.

**Features:**
- Strong headline
- Multiple contact options
- Contrasting background

---

## Custom Hooks

### useContactActions

Contact action handlers with analytics.

**Returns:**
- `handleWhatsApp(location)` - Open WhatsApp
- `handleMessenger(location)` - Open Messenger
- `handleCall(location, phone)` - Make phone call
- `handleCallPrimary(location)` - Call primary number
- `handleCallSecondary(location)` - Call secondary number

### useScrollPosition

Track scroll position and direction.

**Returns:**
- `x`, `y` - Current scroll position
- `direction` - Scroll direction ('up' | 'down')
- `isAtTop` - Whether at page top
- `isAtBottom` - Whether at page bottom
- `scrollPercentage` - Percentage scrolled

### useLanguage

Language management hook.

**Returns:**
- `currentLanguage` - Current language code
- `languageNames` - Display names for languages
- `availableLanguages` - Array of available languages
- `changeLanguage(lang)` - Change language function
- `isCurrentLanguage(lang)` - Check if language is current

---

## Adding New Components

1. Create folder in appropriate category
2. Create `index.tsx` with component
3. Export from category index if needed
4. Add translations if component has text
5. Document in this file
