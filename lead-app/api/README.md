# 🚀 API Directory - Email Handler for Lead Forms

## 📁 **Files Overview**

| File | Purpose | Use When |
|------|---------|----------|
| `send-callback.php` | **Main API** - Uses PHP mail() | Server has mail() enabled |
| `send-callback-smtp.php` | Enhanced logging version | Need better submission tracking |
| `send-callback-gmail-smtp.php` | **Gmail SMTP** - Most reliable | **Recommended for production** |
| `test-email.php` | Email testing tool | Diagnosing email issues |
| `debug.php` | Complete diagnostic tool | Troubleshooting |
| `view-submissions.php` | View all leads | Checking form submissions |
| `view-logs.php` | View text logs | Simple log viewing |
| `EMAIL-TROUBLESHOOTING.md` | Complete troubleshooting guide | When emails aren't working |

---

## ⚡ **Quick Start**

### If Emails Are NOT Working:

1. **Test Your Email Setup**
   ```
   https://sec90ganga.com/api/test-email.php
   ```

2. **Check If Forms Are Submitting**
   ```
   https://sec90ganga.com/api/view-submissions.php
   ```

3. **Run Full Diagnostics**
   ```
   https://sec90ganga.com/api/debug.php
   ```

---

## 🎯 **Most Common Solution: Switch to Gmail SMTP**

### Why emails fail:
- ❌ Most hosting providers disable PHP `mail()` for security
- ❌ PHP mail() emails often go to spam
- ❌ No authentication = low deliverability

### Why Gmail SMTP works:
- ✅ Uses authenticated SMTP connection
- ✅ Emails come from legitimate Gmail servers
- ✅ High deliverability rate
- ✅ Professional appearance
- ✅ Free for moderate usage

### Setup (5 minutes):

#### Step 1: Get Gmail App Password
1. Visit: https://myaccount.google.com/apppasswords
2. Create app password for "Mail"
3. Copy the 16-character password

#### Step 2: Configure SMTP
Edit `send-callback-gmail-smtp.php` line 56:
```php
$smtp_password = 'your-16-char-app-password';  // Replace this
```

#### Step 3: Update Frontend
Edit `src/App.tsx` line 59:
```javascript
// Change this line:
const apiPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') + '/api/send-callback-gmail-smtp.php'
```

#### Step 4: Rebuild & Deploy
```bash
npm run build
# Upload dist/ folder to your server
```

---

## 📊 **Email Recipients**

Current recipients (configured in all PHP files):
- realtyavyukta@gmail.com
- gopal.singh07@gmail.com
- madhvi2707@gmail.com

To add more, edit the `$toEmails` array in any PHP file around line 45.

---

## 🔍 **Diagnostic Tools**

### 1. test-email.php
- Quick email functionality test
- Sends test email to verify delivery
- Shows server configuration

### 2. debug.php
- Complete server information
- Email configuration check
- API endpoint testing
- Form submission testing

### 3. view-submissions.php
- Beautiful dashboard of all leads
- Shows total submissions
- Unique phone numbers count
- Email addresses collected
- Exportable data

### 4. view-logs.php
- Simple text log viewer
- Shows all submission attempts
- Email delivery status

---

## 📝 **Data Storage**

### submissions.json
Structured lead data:
```json
[
  {
    "timestamp": "2025-01-16 14:30:00",
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "preference": "Morning",
    "project": "Ganga Sec90 Gurgaon"
  }
]
```

### callback-log.txt
Simple text log:
```
2025-01-16 14:30:00 - Callback request from John Doe (9876543210) - Sent to: 3 of 3
```

---

## 🛡️ **Security**

### CORS Settings
All API files allow cross-origin requests:
```php
header('Access-Control-Allow-Origin: *');
```

For production, consider restricting to your domain:
```php
header('Access-Control-Allow-Origin: https://sec90ganga.com');
```

### Input Sanitization
All user inputs are sanitized:
```php
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
```

### Rate Limiting
**Not implemented yet.** Consider adding to prevent spam.

---

## 🔧 **Troubleshooting**

### Emails not arriving?
1. ✓ Check spam folder
2. ✓ Verify PHP mail() is enabled: `test-email.php`
3. ✓ Check server logs
4. ✓ Switch to Gmail SMTP (recommended)

### Form not submitting?
1. ✓ Check browser console for errors
2. ✓ Verify API path is correct
3. ✓ Check CORS headers
4. ✓ Test API directly: `debug.php`

### Getting 404 errors?
1. ✓ Ensure `api/` folder is uploaded
2. ✓ Check file permissions (755 for folder, 644 for files)
3. ✓ Verify .htaccess allows PHP execution

---

## 📞 **Support**

**Read Full Guide:** `EMAIL-TROUBLESHOOTING.md`

**Test Tools:**
- Email Test: `/api/test-email.php`
- Full Debug: `/api/debug.php`
- View Leads: `/api/view-submissions.php`

---

## 🚀 **Deployment Checklist**

- [ ] API folder uploaded to server
- [ ] File permissions set (755/644)
- [ ] Email recipients verified in PHP files
- [ ] Test email sent successfully
- [ ] Spam folder checked
- [ ] Form submission tested
- [ ] All recipients receiving emails
- [ ] Submissions appearing in view-submissions.php

---

**Project:** Ganga Sec90 Gurgaon  
**Company:** Avyukta Realty  
**Last Updated:** 2025-01-16

