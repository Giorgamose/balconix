# 🏠 Balconix - Premium Balcony Glazing Solutions

> **Powered by ILSO GROUP**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)

## 📋 Overview

Balconix is a high-converting, multilingual lead-generation website for a balcony glazing company targeting the Georgian market. The website focuses on maximizing user contact through phone calls, WhatsApp, and Facebook Messenger.

**Tagline:** *ხარისხი ყოველთვის!* (Quality Always!)

## 🌍 Target Markets

| Market | Language | Priority |
|--------|----------|----------|
| 🇬🇪 Georgia | Georgian (Default) | Primary |
| 🇷🇺 Russia | Russian | Secondary |
| 🇦🇿 Azerbaijan | Azerbaijani | Secondary |
| 🇬🇧 International | English | Secondary |

## 🎯 Business Goals

- **Primary:** Maximize lead generation through instant contact methods
- **Secondary:** Build trust through project showcases
- **Positioning:** Mid-range + budget-friendly quality solutions

## ✨ Features

### Core Functionality
- 📱 **Mobile-First Design** - Optimized for smartphone users
- 🌐 **Multilingual Support** - 4 languages with easy switching
- 💬 **Instant Contact** - WhatsApp, Messenger, Phone integration
- 📸 **Project Gallery** - Before/After comparisons
- ⚡ **Fast Loading** - Optimized performance

### Lead Generation
- Floating contact buttons (WhatsApp, Messenger, Call)
- Minimal lead capture form (phone only required)
- Click-to-call functionality
- Pre-filled WhatsApp messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **react-i18next** - Internationalization
- **EmailJS** - Frontend email sending

### Tools & Services
- **EmailJS** - Contact form submissions
- **WhatsApp API** - Direct messaging
- **Facebook Messenger** - Chat integration

## 📁 Project Structure

```
Balconix/
├── FrontEnd/
│   ├── public/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   └── icons/
│   │   └── videos/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── forms/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   │   └── locales/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   └── utils/
│   └── docs/
├── Pictures/           # Source images (to be processed)
├── docs/               # Project documentation
└── .github/            # GitHub workflows & AI instructions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend
cd FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create `.env` file in FrontEnd:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_WHATSAPP_NUMBER=995577072753
VITE_FACEBOOK_PAGE_ID=100042339892071
VITE_CONTACT_EMAIL=ilsogroup@gmail.com
VITE_PHONE_PRIMARY=+995 577 07 27 53
VITE_PHONE_SECONDARY=+995 595 13 58 58
```

## 📞 Contact Information

- **Phone 1:** +995 577 07 27 53
- **Phone 2:** +995 595 13 58 58
- **Email:** ilsogroup@gmail.com
- **Facebook:** [ILSO GROUP](https://www.facebook.com/profile.php?id=100042339892071)

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563EB` | CTAs, Accents |
| Dark Blue | `#1E40AF` | Hover states |
| White | `#FFFFFF` | Backgrounds |
| Light Gray | `#F3F4F6` | Section backgrounds |
| Dark Gray | `#1F2937` | Text |
| Success Green | `#10B981` | Success states |

## 📄 License

© 2026 ILSO GROUP. All rights reserved.

---

**Built with ❤️ for the Georgian market**
