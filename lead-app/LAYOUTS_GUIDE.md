# Multi-Layout System Guide

## Overview

This Lead Generation Microsite now supports **4 different layouts** optimized for various real estate campaign strategies. Simply change a configuration value to switch between layouts!

## Available Layouts

### 1. Hero CTA Layout (`hero-cta`)
**Best For:** Direct & quick lead capture

**Features:**
- Large hero image with project details
- Quick facts list (Location, Price Range, Possession Date)
- Primary CTA: "Get Details on WhatsApp"
- Secondary CTA: "Download Brochure" (with lead gate form)
- Simple, clean design focused on conversion

**Use Case:** General property launches where you want immediate engagement

---

### 2. Story Flow Layout (`story-flow`)
**Best For:** Luxury launches with storytelling and exclusivity

**Features:**
- **Countdown Timer** to launch date
- Visual story cards (lifestyle images)
- **Locked Content** requiring form submission to unlock pricing
- Progressive disclosure of information
- Creates urgency and exclusivity

**Use Case:** High-end properties, pre-launches, creating FOMO (Fear of Missing Out)

---

### 3. Comparison Info Layout (`comparison-info`)
**Best For:** Info-heavy buyers who need details

**Features:**
- Simple header with project name and tagline
- Location highlight section
- Full amenities and highlights grid
- Complete location information
- **Sticky CTA bar** at bottom (always visible)
- Comprehensive information display

**Use Case:** Buyers who research thoroughly before engaging, mid-to-high ticket properties

---

### 4. Lead Magnet Layout (`lead-magnet`)
**Best For:** High-ticket properties, qualified lead generation

**Features:**
- **Gatekeeper form** - all content locked initially
- Blurred hero image with "unlock" overlay
- Simple form (Name + Mobile) to unlock ALL details
- After submission: Full access to brochure, floor plans, pricing
- Secondary CTA: "Book Site Visit"

**Use Case:** Ultra-luxury properties, exclusive launches where you want high-intent leads only

---

## How to Switch Layouts

### Option 1: Configuration File (Recommended)

Edit `src/config/project.ts`:

```typescript
// Change this value to switch layouts
export const ACTIVE_LAYOUT: LayoutType = 'hero-cta' // Options: 'hero-cta' | 'story-flow' | 'comparison-info' | 'lead-magnet'
```

**Example:**
```typescript
export const ACTIVE_LAYOUT: LayoutType = 'story-flow' // Now using Story Flow layout!
```

### Option 2: Dynamic URL Parameter (Advanced)

You can also switch layouts dynamically using URL parameters:

```javascript
// In App.tsx, modify to read from URL:
const urlParams = new URLSearchParams(window.location.search)
const layoutParam = urlParams.get('layout') as LayoutType
const ACTIVE_LAYOUT = layoutParam || PROJECT_CONFIG.ACTIVE_LAYOUT
```

Then access different layouts via URLs:
- `?layout=hero-cta`
- `?layout=story-flow`
- `?layout=comparison-info`
- `?layout=lead-magnet`

---

## Customizing Layouts

### Countdown Timer (Story Flow)

Edit the countdown configuration in `src/config/project.ts`:

```typescript
export const COUNTDOWN_CONFIG = {
  enabled: true,
  targetDate: new Date('2025-12-31T23:59:59'), // Set your launch date
  title: 'Coming Soon',
  subtitle: 'Launch starts in',
}
```

### Layout-Specific Settings

Each layout has its own configuration in `LAYOUT_CONFIG`:

```typescript
export const LAYOUT_CONFIG = {
  'hero-cta': {
    name: 'Hero CTA',
    showCountdown: false,
    showLockedContent: false,
    showFullDetails: true,
    ctaPrimary: 'Get Details on WhatsApp',
    ctaSecondary: 'Download Brochure',
  },
  // ... other layouts
}
```

You can customize:
- `ctaPrimary` - Primary button text
- `ctaSecondary` - Secondary button text (null to hide)
- `showCountdown` - Display countdown timer
- `showLockedContent` - Enable content locking
- `showFullDetails` - Show all project information

---

## Component Reference

### New Components

#### `CountdownTimer`
```tsx
import CountdownTimer from './components/common/CountdownTimer'

<CountdownTimer
  targetDate={new Date('2025-12-31')}
  title="Coming Soon"
  subtitle="Launch starts in"
/>
```

#### `LockedContent`
```tsx
import LockedContent from './components/common/LockedContent'

<LockedContent
  isLocked={!unlocked}
  onUnlock={handleUnlock}
  unlockText="Unlock Pricing"
>
  {/* Your locked content here */}
</LockedContent>
```

---

## Styling Customization

Layout-specific styles are in `src/styles/layouts.scss`. Each layout has its own scoped styles:

```scss
.layout-hero-cta {
  // Hero CTA specific styles
}

.layout-story-flow {
  // Story Flow specific styles
}

.layout-comparison-info {
  // Comparison Info specific styles
}

.layout-lead-magnet {
  // Lead Magnet specific styles
}
```

### Color Customization

Edit CSS variables in `src/styles/main.scss`:

```scss
:root {
  --primary: #0b1f4e;        // Primary brand color
  --accent-blue: #2563eb;    // Accent color for buttons
  --accent-gold: #f59e0b;    // Highlight color
  // ... more variables
}
```

---

## Quick Start Examples

### Example 1: Pre-Launch with Countdown
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'story-flow'

export const COUNTDOWN_CONFIG = {
  enabled: true,
  targetDate: new Date('2025-10-15T10:00:00'),
  title: 'Grand Launch',
  subtitle: 'Exclusive pricing unlocks in',
}
```

### Example 2: Lead Magnet for Luxury Property
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'lead-magnet'

export const PROJECT_CONFIG = {
  projectName: 'Luxe Residences',
  tagline: 'Ultra-Luxury Living Redefined',
  // ... other config
}
```

### Example 3: Info-Rich for Research Buyers
```typescript
// src/config/project.ts
export const ACTIVE_LAYOUT: LayoutType = 'comparison-info'

export const PROJECT_CONFIG = {
  highlights: [
    // Add detailed highlights
  ],
  amenities: [
    // Add comprehensive amenities list
  ],
  // ... detailed information
}
```

---

## Testing Different Layouts

1. **Change the layout** in `src/config/project.ts`
2. **Save the file**
3. **Refresh your browser** (Vite will auto-reload)
4. **Test the form submission** and CTAs
5. **Check mobile responsiveness**

---

## Layout Comparison Table

| Feature | Hero CTA | Story Flow | Comparison Info | Lead Magnet |
|---------|----------|------------|-----------------|-------------|
| Countdown Timer | ❌ | ✅ | ❌ | ❌ |
| Locked Content | ❌ | ✅ (Partial) | ❌ | ✅ (Full) |
| Full Details Upfront | ✅ | ❌ | ✅ | ❌ |
| Lead Gate | Optional | Required (unlock) | Optional | Required |
| Best For | Quick leads | Pre-launch | Info buyers | Qualified leads |
| Conversion Focus | Immediate | Urgency | Education | Exclusivity |

---

## Best Practices

### Layout Selection Strategy

1. **Hero CTA** - Use for:
   - Standard property launches
   - Mid-range properties
   - Broad audience campaigns
   - Quick turnaround campaigns

2. **Story Flow** - Use for:
   - Pre-launch teasers
   - Luxury/premium properties
   - Creating buzz and urgency
   - Limited inventory launches

3. **Comparison Info** - Use for:
   - Detail-oriented buyers
   - Established projects with full amenities
   - Corporate housing/investment buyers
   - Properties with strong location advantages

4. **Lead Magnet** - Use for:
   - Ultra-luxury properties (₹5Cr+)
   - Exclusive/invitation-only launches
   - High-value lead qualification
   - Limited unit availability

### Optimization Tips

- **Test multiple layouts** with A/B testing
- **Monitor conversion rates** for each layout
- **Match layout** to your target audience
- **Keep forms simple** - Name + Phone is often enough
- **Use countdown timers** strategically (only if there's real urgency)
- **Locked content works** for high-value properties

---

## Troubleshooting

### Layout not changing?
- Clear browser cache
- Check `ACTIVE_LAYOUT` value in `project.ts`
- Ensure dev server is running (`npm run dev`)

### Countdown not showing?
- Verify `COUNTDOWN_CONFIG.enabled = true`
- Check that `targetDate` is in the future
- Ensure you're using `story-flow` layout

### Forms not submitting?
- Check browser console for errors
- Verify `FormSubmit.co` email in `project.ts`
- Test WhatsApp link format

---

## Support & Customization

For additional customization or support:
1. Review component files in `src/components/layouts/`
2. Check styling in `src/styles/layouts.scss`
3. Refer to main documentation in `README.md`

---

## License & Credits

Built for real estate lead generation campaigns. Customize and deploy as needed for your projects.

