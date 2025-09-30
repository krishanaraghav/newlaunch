# 🏢 Lead Generation Microsite Builder

A powerful, plug-and-play microsite builder optimized for **real estate campaigns** - property launches, new projects, and coming soon announcements.

> Built with React + TypeScript + Vite | Inspired by Linktree, optimized for conversions

## ✨ Key Features

### 🎨 **4 Pre-Built Layouts**
- **Hero CTA** - Direct & quick lead capture
- **Story Flow** - Luxury launches with countdown & storytelling
- **Comparison Info** - Info-heavy for research buyers
- **Lead Magnet** - Gatekeeper form for qualified leads

### 📱 **Conversion Boosters**
- ✅ WhatsApp integration (floating button + inline CTAs)
- ✅ Lead capture forms with FormSubmit.co integration
- ✅ Countdown timer for urgency
- ✅ Locked content with unlock gates
- ✅ QR codes for offline-to-online conversion
- ✅ Promo banners & attention nudges
- ✅ Exit intent detection (coming soon)

### 🚀 **Engagement Tools**
- Multi-step forms
- Download brochure with lead gate
- WhatsApp share functionality
- Responsive & mobile-optimized
- Fast loading & SEO friendly

---

## 🎯 Quick Start

### Installation

```bash
# Clone and install
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Switch Between Layouts

Edit `src/config/project.ts`:

```typescript
export const ACTIVE_LAYOUT: LayoutType = 'hero-cta'
// Options: 'hero-cta' | 'story-flow' | 'comparison-info' | 'lead-magnet'
```

### Customize Your Project

Edit project details in `src/config/project.ts`:

```typescript
export const PROJECT_CONFIG = {
  companyName: 'Your Company',
  projectName: 'Your Project Name',
  location: 'Sector 90, Gurugram',
  tagline: 'Your Tagline',
  contact: {
    email: 'your@email.com',
    phone: '9876543210',
    whatsapp: '9876543210',
  },
  // ... more configuration
}
```

---

## 📖 Documentation

- **[Layouts Guide](./LAYOUTS_GUIDE.md)** - Complete guide to all 4 layouts
- **[Template Docs](./TEMPLATE_DOCS.md)** - Blogger template documentation
- **[Configuration](#configuration)** - Below

---

## 🎨 Layout Comparison

| Layout | Best For | Key Features | Lead Quality |
|--------|----------|--------------|--------------|
| **Hero CTA** | Quick conversions | Hero image, quick facts, dual CTAs | Medium |
| **Story Flow** | Pre-launch buzz | Countdown, locked content, urgency | High |
| **Comparison Info** | Detail seekers | Full amenities, sticky CTA bar | Medium-High |
| **Lead Magnet** | Qualified leads | Gatekeeper form, full content lock | Very High |

---

## ⚙️ Configuration

### Countdown Timer (Story Flow Layout)

```typescript
export const COUNTDOWN_CONFIG = {
  enabled: true,
  targetDate: new Date('2025-12-31T23:59:59'),
  title: 'Coming Soon',
  subtitle: 'Launch starts in',
}
```

### Lead Submission

Uses [FormSubmit.co](https://formsubmit.co/) for email delivery:

```typescript
contact: {
  email: 'your@email.com',        // Primary recipient
  ccEmails: ['cc@email.com'],     // CC recipients
  phone: '9876543210',
  whatsapp: '9876543210',
}
```

### Styling

Customize colors in `src/styles/main.scss`:

```scss
:root {
  --primary: #0b1f4e;
  --accent-blue: #2563eb;
  --accent-gold: #f59e0b;
  // ... more variables
}
```

---

## 🏗️ Project Structure

```
lead-app/
├── src/
│   ├── components/
│   │   ├── layouts/           # 4 layout components
│   │   │   ├── HeroCTALayout.tsx
│   │   │   ├── StoryFlowLayout.tsx
│   │   │   ├── ComparisonInfoLayout.tsx
│   │   │   └── LeadMagnetLayout.tsx
│   │   ├── common/            # Shared components
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── LockedContent.tsx
│   │   │   ├── FloatingWhatsapp.tsx
│   │   │   └── PromoBanner.tsx
│   │   ├── sections/          # Content sections
│   │   └── layout/            # Header & Footer
│   ├── config/
│   │   └── project.ts         # 🎯 Main configuration file
│   ├── styles/
│   │   ├── main.scss          # Base styles
│   │   └── layouts.scss       # Layout-specific styles
│   └── utils/
│       ├── lead.ts            # Lead submission logic
│       └── whatsapp.ts        # WhatsApp utilities
├── LAYOUTS_GUIDE.md           # Complete layout documentation
└── README.md                  # This file
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to:
- **Netlify** - Drag & drop `dist/` folder
- **Vercel** - Connect GitHub repo
- **AWS S3** - Upload `dist/` folder
- **Any static hosting** - Upload `dist/` folder

---

## 🎯 Use Cases

### Pre-Launch Campaign
```typescript
ACTIVE_LAYOUT = 'story-flow'
COUNTDOWN_CONFIG.targetDate = new Date('2025-10-15')
```

### Standard Launch
```typescript
ACTIVE_LAYOUT = 'hero-cta'
// Show all details upfront
```

### Luxury Property
```typescript
ACTIVE_LAYOUT = 'lead-magnet'
// Gate all content for qualified leads
```

### Detail-Heavy Project
```typescript
ACTIVE_LAYOUT = 'comparison-info'
// Full amenities and location info
```

---

## 📊 Analytics Integration (Coming Soon)

- Google Analytics 4
- Facebook Pixel
- WhatsApp click tracking
- Form submission tracking
- A/B testing support

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **SCSS** - Styling
- **FormSubmit.co** - Form handling
- **WhatsApp Business API** - Messaging

---

## 📝 License

MIT License - Use freely for your real estate campaigns!

---

## 🤝 Support

For issues, questions, or customization:
1. Check [LAYOUTS_GUIDE.md](./LAYOUTS_GUIDE.md)
2. Review component code in `src/`
3. Open an issue on GitHub

---

**Built for real estate marketers. Optimized for conversions. Ready to deploy.** 🚀
