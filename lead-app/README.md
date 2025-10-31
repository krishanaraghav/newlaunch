# Emaar Serenity Hills - Lead Generation Website

A premium lead generation website for **Emaar Serenity Hills Sector 86 Gurgaon**, built with React + Vite.

## 🏢 Project Information

**Project:** Emaar Serenity Hills  
**Developer:** Emaar India  
**Location:** Sector 86, New Gurgaon  
**Configuration:** 2, 3, 4 BHK & 4 BHK + S  
**Price:** Starting at ₹2.70 Cr  
**Size:** 1700 - 2900 Sq.ft  
**Towers:** 7 Towers | G+37 Floors  
**Area:** 25 Acres  

## ✨ Features

- Dubai Style Luxury Living
- 100,000 Sq.Ft Grand Clubhouse
- 4 Mins from Dwarka Expressway
- 20 Mins from IGI Airport
- 5-Tier Security System
- Premium Gold-themed UI
- SEO Optimized
- Mobile Responsive
- Lead Capture Forms
- WhatsApp Integration
- Email Notifications via Gmail SMTP

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
lead-app/
├── src/
│   ├── components/      # React components
│   ├── config/          # Project configuration
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # SCSS stylesheets
│   ├── utils/           # Utility functions
│   └── assets/          # Images and static files
├── api/                 # PHP backend for email
├── public/              # Public static files
└── dist/                # Production build output
```

## 🎨 Customization

### Update Project Details
Edit `src/config/project.ts` to change:
- Company name
- Project name
- Location
- Configuration & pricing
- Highlights & amenities
- Contact information

### Update Images
Replace images in `src/assets/` folder. See `IMAGE_UPDATE_NOTES.md` for detailed instructions.

### Update Colors
Modify color variables in `src/styles/main.scss`:
```scss
:root {
  --primary: #1a1a2e;
  --accent-gold: #d4af37;
  // ... other colors
}
```

## 📧 Email Configuration

Email notifications are sent via Gmail SMTP. Configure in `api/send-callback-gmail-smtp.php`:

```php
$smtp_username = 'your-email@gmail.com';
$smtp_password = 'your-app-password';
$toEmails = ['recipient1@gmail.com', 'recipient2@gmail.com'];
```

**Note:** Use Gmail App Password, not your regular password.

## 🔧 Tech Stack

- **Frontend:** React 19, TypeScript, SCSS
- **Build Tool:** Vite 7
- **Backend:** PHP (for email handling)
- **Styling:** Custom SCSS with CSS Variables
- **Icons:** Font Awesome 6

## 📱 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO optimized meta tags
- ✅ WhatsApp integration
- ✅ Lead capture forms
- ✅ Email notifications
- ✅ QR code generation
- ✅ Modal popup
- ✅ Floating WhatsApp button
- ✅ Promo banner
- ✅ Intersection observer animations

## 📄 Important Files

- `EMAAR_UPDATE_SUMMARY.md` - Complete update documentation
- `IMAGE_UPDATE_NOTES.md` - Image replacement guide
- `src/config/project.ts` - Project configuration
- `api/send-callback-gmail-smtp.php` - Email handler

## 🌐 Deployment

1. Build the project: `npm run build`
2. Upload `dist/` folder contents to your web server
3. Ensure PHP is enabled on your server
4. Configure Gmail SMTP in `api/send-callback-gmail-smtp.php`
5. Update domain URLs in `index.html` meta tags

## 📞 Support

For questions or issues, contact the development team.

## 📝 License

Proprietary - All rights reserved by Avyukta Realty
