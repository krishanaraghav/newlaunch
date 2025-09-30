# 🚀 Quick Reference Card

## Switch Layouts (Copy & Paste)

### Hero CTA Layout
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'hero-cta'
```
**✅ Use for:** Standard launches, quick conversions  
**📸 Features:** Hero image, quick facts, dual CTAs

---

### Story Flow Layout
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'story-flow'

export const COUNTDOWN_CONFIG = {
  enabled: true,
  targetDate: new Date('2025-12-31T23:59:59'), // ← Change date!
  title: 'Coming Soon',
  subtitle: 'Launch starts in',
}
```
**✅ Use for:** Pre-launch, luxury properties  
**📸 Features:** Countdown timer, locked pricing, urgency

---

### Comparison Info Layout
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'comparison-info'
```
**✅ Use for:** Detail-oriented buyers  
**📸 Features:** Full amenities, sticky CTA bar, comprehensive info

---

### Lead Magnet Layout
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'lead-magnet'
```
**✅ Use for:** Ultra-luxury, qualified leads only  
**📸 Features:** Gatekeeper form, all content locked

---

## Customize Project Details

```typescript
// src/config/project.ts

export const PROJECT_CONFIG = {
  companyName: 'Your Company Name',           // ← Change
  projectName: 'Your Project Name',           // ← Change
  location: 'Sector 90, Gurugram',           // ← Change
  tagline: 'Your Gateway to Luxury Living',   // ← Change
  description: 'Your project description...',  // ← Change
  
  highlights: [
    'Highlight 1',                            // ← Edit
    'Highlight 2',
    'Highlight 3',
    // Add more...
  ],
  
  amenities: [
    'Swimming Pool',                          // ← Edit
    'Gymnasium',
    'Clubhouse',
    // Add more...
  ],
  
  contact: {
    email: 'your@email.com',                  // ← Change (FormSubmit.co)
    ccEmails: ['cc@email.com'],              // ← Optional CC
    phone: '9876543210',                      // ← Change
    whatsapp: '9876543210',                   // ← Change
  },
}
```

---

## Customize Colors

```scss
// src/styles/main.scss

:root {
  --primary: #0b1f4e;        // ← Main brand color
  --accent-blue: #2563eb;    // ← Button/CTA color
  --accent-gold: #f59e0b;    // ← Highlight color
  --accent-cyan: #0ea5e9;    // ← Secondary accent
}
```

---

## Run Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deploy Checklist

- [ ] Update `PROJECT_CONFIG` with your details
- [ ] Set correct `contact.email` for leads
- [ ] Add your `contact.whatsapp` number
- [ ] Choose appropriate `ACTIVE_LAYOUT`
- [ ] Update countdown date (if using Story Flow)
- [ ] Customize colors (optional)
- [ ] Test on mobile device
- [ ] Run `npm run build`
- [ ] Upload `dist/` folder to hosting

---

## File Locations

| What | Where |
|------|-------|
| Switch layout | `src/config/project.ts` → `ACTIVE_LAYOUT` |
| Project details | `src/config/project.ts` → `PROJECT_CONFIG` |
| Countdown settings | `src/config/project.ts` → `COUNTDOWN_CONFIG` |
| Color theme | `src/styles/main.scss` → `:root` variables |
| Layout styles | `src/styles/layouts.scss` |
| Layout components | `src/components/layouts/` |

---

## Layout Decision Tree

```
Need immediate conversions?
  └─→ Hero CTA

Pre-launch campaign?
  └─→ Story Flow (with countdown)

Buyers need lots of info?
  └─→ Comparison Info

Ultra-luxury/exclusive property?
  └─→ Lead Magnet (gatekeeper)
```

---

## Common Customizations

### Change WhatsApp Message
```typescript
// src/utils/whatsapp.ts
export const defaultWhatsAppMessage = () =>
  `Hello, I'm interested in ${PROJECT_CONFIG.projectName}. Please share details.`
```

### Add More Quick Facts (Hero CTA)
```tsx
// src/components/layouts/HeroCTALayout.tsx
<li>
  <i className="fas fa-home" aria-hidden="true" />
  <span>
    <strong>Units:</strong> 500+ Premium Apartments
  </span>
</li>
```

### Customize Form Fields
```tsx
// Add email field
<div className="form-field">
  <label htmlFor="email">Email</label>
  <input type="email" id="email" name="email" required />
</div>
```

---

## Support Links

- **Full Guide:** [LAYOUTS_GUIDE.md](./LAYOUTS_GUIDE.md)
- **Implementation:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Main Docs:** [README.md](./README.md)

---

## Emergency Fixes

### Layout not changing?
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

### Build failing?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Countdown not showing?
Check `COUNTDOWN_CONFIG.targetDate` is in the future and `ACTIVE_LAYOUT` is `'story-flow'`

---

**That's it! Change one line → Save → Refresh → New layout! 🎉**

