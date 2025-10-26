# 🚀 Deployment Guide - Root Directory Setup

## ✅ Changes Made

All URLs have been updated to work at the **root domain** (`https://sec90ganga.com/`) instead of the subdirectory (`https://sec90ganga.com/lead-app/`).

### Files Updated:
- ✓ `src/App.tsx` - API path now uses absolute `/api/send-callback.php`
- ✓ `index.html` - All canonical and meta URLs updated to root
- ✓ `public/sitemap.xml` - All URLs point to root domain
- ✓ `src/chrome-style.html` - Canonical URL updated
- ✓ `api/SETUP.md` - Documentation URLs updated
- ✓ All diagnostic tool references updated

---

## 📦 Deployment Steps

### Option 1: Deploy to Root (Recommended)

Upload the contents of the `dist/` folder to your web root:

```bash
# Your server structure should look like:
/public_html/                 (or /var/www/html/)
├── index.html               ← from dist/index.html
├── robots.txt               ← from dist/robots.txt
├── sitemap.xml              ← from dist/sitemap.xml
├── api/                     ← from dist/api/
│   ├── send-callback.php
│   ├── test-email.php
│   ├── debug.php
│   └── ...
└── assets/                  ← from dist/assets/
    ├── index-*.js
    ├── index-*.css
    ├── newlaunch.jpeg
    └── ...
```

**Via FTP/SFTP:**
1. Connect to your server
2. Navigate to `/public_html/` (or your web root)
3. Upload **all contents** from `dist/` folder
4. Done!

**Via cPanel File Manager:**
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html/`
4. Upload `dist/` contents or extract ZIP
5. Done!

**Via Command Line (SSH):**
```bash
# From your local machine
npm run build
cd dist
zip -r deploy.zip .

# Upload to server
scp deploy.zip user@sec90ganga.com:/path/to/public_html/

# On server
cd /path/to/public_html/
unzip deploy.zip
rm deploy.zip
```

---

### Option 2: Keep in Subdirectory (Not Recommended)

If you still want to use `/lead-app/` subdirectory, you'll need to:

1. **Revert the changes:**
   ```bash
   git checkout src/App.tsx index.html public/sitemap.xml
   ```

2. **Set Vite base path:**
   Edit `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/lead-app/',
     plugins: [react(), copyApiPlugin()],
   })
   ```

3. **Update all URLs back to include `/lead-app/`**

---

## 🧪 Testing After Deployment

### 1. Test Main Site
Visit: `https://sec90ganga.com/`
- ✓ Page loads correctly
- ✓ All images display
- ✓ Styles applied properly

### 2. Test API Endpoints
Visit: `https://sec90ganga.com/api/debug.php`
- ✓ Should show debug interface
- ✓ Check email configuration
- ✓ Test form submission

### 3. Test Email Functionality
Visit: `https://sec90ganga.com/api/test-email.php`
- ✓ Send test email
- ✓ Verify delivery
- ✓ Check spam folder

### 4. Test Form Submission
1. Go to: `https://sec90ganga.com/#contact`
2. Fill out callback form
3. Submit
4. Check: `https://sec90ganga.com/api/view-submissions.php`
5. Verify email received

### 5. Test WhatsApp Links
- ✓ Click WhatsApp buttons
- ✓ Verify correct message
- ✓ Test from mobile device

---

## 🔧 Post-Deployment Configuration

### 1. Check File Permissions
```bash
# On server
chmod 755 api/
chmod 644 api/*.php
chmod 666 api/callback-log.txt
chmod 666 api/submissions.json
```

### 2. Verify .htaccess (if using Apache)
Create/update `.htaccess` in root:
```apache
# Enable PHP
AddHandler application/x-httpd-php .php

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|webp|css|js)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

### 3. Configure Email (Important!)
If emails aren't working:

**Quick Fix - Use Gmail SMTP:**
1. Visit: https://myaccount.google.com/apppasswords
2. Generate app password for "Mail"
3. Edit `api/send-callback-gmail-smtp.php`:
   ```php
   $smtp_password = 'your-app-password-here';
   ```
4. Update `src/App.tsx` line 59:
   ```javascript
   const apiPath = '/api/send-callback-gmail-smtp.php'
   ```
5. Rebuild and redeploy:
   ```bash
   npm run build
   # Upload dist/ contents
   ```

---

## 📊 Monitoring & Analytics

### View Leads Dashboard
`https://sec90ganga.com/api/view-submissions.php`

Shows:
- Total submissions
- Unique phone numbers
- Email collection rate
- Recent leads

### Download Lead Data
Download: `https://sec90ganga.com/api/submissions.json`

Import into:
- Excel/Google Sheets
- CRM systems
- Marketing automation tools

### Check Logs
Text log: `https://sec90ganga.com/api/view-logs.php`

---

## 🎯 URLs Reference

### Main Application
- **Homepage:** `https://sec90ganga.com/`
- **Contact Section:** `https://sec90ganga.com/#contact`
- **Alternate Layout:** `https://sec90ganga.com/chrome-style.html`

### API Endpoints
- **Callback Form:** `https://sec90ganga.com/api/send-callback.php`
- **Gmail SMTP:** `https://sec90ganga.com/api/send-callback-gmail-smtp.php`
- **Test Email:** `https://sec90ganga.com/api/test-email.php`
- **Debug Tool:** `https://sec90ganga.com/api/debug.php`
- **View Leads:** `https://sec90ganga.com/api/view-submissions.php`
- **View Logs:** `https://sec90ganga.com/api/view-logs.php`

### SEO & Social
- **Sitemap:** `https://sec90ganga.com/sitemap.xml`
- **Robots:** `https://sec90ganga.com/robots.txt`

---

## ⚠️ Important Notes

### 1. Old URLs (if previously deployed at /lead-app/)
Set up redirects in `.htaccess`:
```apache
RewriteEngine On
RewriteRule ^lead-app/(.*)$ /$1 [R=301,L]
```

### 2. Update Google Search Console
- Submit new sitemap: `https://sec90ganga.com/sitemap.xml`
- Request reindexing of main page

### 3. Update Social Media Links
Update links on:
- Facebook pages
- Instagram bio
- Google My Business
- Any promotional materials

### 4. Test on Multiple Devices
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Different screen sizes
- Slow internet connections

---

## 🆘 Troubleshooting

### Issue: Site shows 404
**Solution:** Ensure files are in web root, not subdirectory

### Issue: API returns 404
**Solution:** 
- Check `api/` folder exists at root level
- Verify PHP is enabled
- Check file permissions

### Issue: Emails not working
**Solution:**
1. Visit: `https://sec90ganga.com/api/test-email.php`
2. Follow Gmail SMTP setup above
3. Read: `api/EMAIL-TROUBLESHOOTING.md`

### Issue: WhatsApp links not working
**Solution:**
- Test from mobile device (works best)
- Ensure WhatsApp is installed
- Check phone number format in config

### Issue: Images not loading
**Solution:**
- Clear browser cache
- Check `assets/` folder uploaded
- Verify image paths in HTML

---

## ✅ Deployment Checklist

- [ ] Build project: `npm run build`
- [ ] Upload `dist/` contents to web root
- [ ] Test main site loads
- [ ] Test API endpoints
- [ ] Send test email
- [ ] Submit test form
- [ ] Check email received
- [ ] Test WhatsApp links
- [ ] Verify on mobile device
- [ ] Check Google Analytics tracking
- [ ] Submit sitemap to Search Console
- [ ] Set up 301 redirects (if needed)
- [ ] Update social media links
- [ ] Monitor for 24 hours

---

## 📞 Quick Reference

**Project:** Ganga Sec90 Gurgaon  
**Company:** Avyukta Realty  
**Primary URL:** https://sec90ganga.com/  
**API Base:** https://sec90ganga.com/api/  
**Phone:** +91-9289329903  
**Email:** realtyavyukta@gmail.com

**Email Recipients:**
- realtyavyukta@gmail.com
- gopal.singh07@gmail.com
- madhvi2707@gmail.com

---

**Last Updated:** <?php echo date('Y-m-d'); ?>  
**Build Version:** Latest from dist/

