# 🎯 Quick Reference Card

## 🚀 Deployment
```bash
npm run build
# Upload dist/ contents to web root (public_html/)
```

## 🔗 Important URLs

### Main Site
- **Homepage:** https://sec90ganga.com/
- **Contact Form:** https://sec90ganga.com/#contact

### Diagnostic Tools (Visit these first!)
- **Email Test:** https://sec90ganga.com/api/test-email.php
- **Full Debug:** https://sec90ganga.com/api/debug.php
- **View Leads:** https://sec90ganga.com/api/view-submissions.php
- **View Logs:** https://sec90ganga.com/api/view-logs.php

### API Endpoints
- **Form Handler:** `/api/send-callback.php`
- **Gmail SMTP:** `/api/send-callback-gmail-smtp.php`

## 📧 Email Not Working? (Quick Fix)

### Step 1: Test
Visit: https://sec90ganga.com/api/test-email.php

### Step 2: Use Gmail SMTP (Recommended)
1. Get password: https://myaccount.google.com/apppasswords
2. Edit: `api/send-callback-gmail-smtp.php` (line 56)
3. Update: `src/App.tsx` (line 59):
   ```javascript
   const apiPath = '/api/send-callback-gmail-smtp.php'
   ```
4. Rebuild: `npm run build`
5. Redeploy: Upload dist/

### Step 3: Check Spam
All recipient emails should check spam folder

## 📊 Email Recipients
- realtyavyukta@gmail.com
- gopal.singh07@gmail.com
- madhvi2707@gmail.com

## 📂 Data Location
- **JSON:** `api/submissions.json` (download for CRM)
- **Text Log:** `api/callback-log.txt`
- **Dashboard:** https://sec90ganga.com/api/view-submissions.php

## 🔧 File Permissions (SSH)
```bash
chmod 755 api/
chmod 644 api/*.php
chmod 666 api/callback-log.txt
chmod 666 api/submissions.json
```

## 📱 Contact Info
- **Phone:** +91-9289329903
- **Email:** realtyavyukta@gmail.com
- **Project:** Ganga Sec90 Gurgaon
- **Company:** Avyukta Realty

## 📚 Full Documentation
- `CHANGES-SUMMARY.md` - What changed
- `DEPLOYMENT-GUIDE.md` - Deployment steps
- `api/EMAIL-TROUBLESHOOTING.md` - Email issues
- `api/README.md` - API documentation
- `api/SETUP.md` - Setup instructions

---

**Status:** ✅ Ready to deploy  
**Changes:** URLs fixed, email diagnostics added, root deployment configured

