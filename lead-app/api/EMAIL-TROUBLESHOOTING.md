# 📧 Email Troubleshooting Guide
## Ganga Sec90 - Callback Form Email Issues

---

## 🔍 **Quick Diagnosis**

### Step 1: Test Email Functionality
Visit: **https://sec90ganga.com/api/test-email.php**

This will:
- ✓ Check if PHP mail() is available
- ✓ Send a test email to verify delivery
- ✓ Show server configuration details

### Step 2: Check Form Submissions
Visit: **https://sec90ganga.com/api/view-submissions.php**

This shows:
- All form submissions (even if emails failed)
- Total submission count
- Contact details of all leads

### Step 3: Run Full Debug
Visit: **https://sec90ganga.com/api/debug.php**

This provides:
- Complete server configuration
- Email recipients list
- API file status
- Live form testing

---

## 🚨 **Common Problems & Solutions**

### Problem 1: PHP mail() Not Working
**Symptoms:** Forms submit but no emails arrive

**Solution:** Most shared hosting providers disable PHP mail() for security. Use Gmail SMTP instead.

**Steps:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate an "App Password" for Mail
3. Open `api/send-callback-gmail-smtp.php`
4. Replace `YOUR_APP_PASSWORD_HERE` with your app password
5. Update your frontend to use this endpoint

**Update frontend (src/App.tsx line 59):**
```javascript
const apiPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') + '/api/send-callback-gmail-smtp.php'
```

---

### Problem 2: Emails Going to Spam
**Symptoms:** Emails are sent but land in spam folder

**Solutions:**

#### Option A: Check Spam Folders
- Gmail → Spam folder
- Mark as "Not Spam" to train the filter

#### Option B: Use Proper "From" Address
Edit `api/send-callback.php` line 120:
```php
// Instead of:
"From: Avyukta Realty <realtyavyukta@gmail.com>",

// Use domain email:
"From: Avyukta Realty <noreply@sec90ganga.com>",
```

#### Option C: Add SPF Record
Add this to your domain's DNS:
```
Type: TXT
Name: @
Value: v=spf1 a mx ~all
```

---

### Problem 3: Form Path Issues
**Symptoms:** Form submits but shows "404" or "Network Error"

**Check:** Is your API accessible?
- Test: https://sec90ganga.com/api/send-callback.php
- Should show: "Method not allowed" (this is correct!)

**Fix:** Ensure `api/` folder is uploaded to server in correct location.

---

### Problem 4: Multiple Recipients Not Working
**Symptoms:** Only some recipients receive emails

**Current recipients (line 45-49 in send-callback.php):**
```php
$toEmails = [
    'realtyavyukta@gmail.com',
    'gopal.singh07@gmail.com',
    'madhvi2707@gmail.com'
];
```

**Check:**
1. All emails are spelled correctly
2. No extra spaces
3. Emails are not being blocked by spam filters

---

## ✅ **Recommended Solution: Gmail SMTP**

### Why Gmail SMTP?
- ✓ Highest deliverability rate
- ✓ Emails won't go to spam
- ✓ Works on all servers
- ✓ Free for reasonable usage
- ✓ Professional appearance

### Setup Instructions:

#### 1. Generate Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and generate password
3. Copy the 16-character password

#### 2. Configure SMTP Script
Open `api/send-callback-gmail-smtp.php` and update:
```php
$smtp_username = 'realtyavyukta@gmail.com';  // Your Gmail
$smtp_password = 'xxxx xxxx xxxx xxxx';      // Your App Password (from step 1)
```

#### 3. Update Frontend
In `src/App.tsx`, line 59, change:
```javascript
const apiPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') + '/api/send-callback-gmail-smtp.php'
```

#### 4. Rebuild and Deploy
```bash
npm run build
# Upload dist/ folder to server
```

---

## 🔐 **Security Notes**

### Never Commit Passwords
If using Gmail SMTP, add to `.gitignore`:
```
api/send-callback-gmail-smtp.php
```

### Environment Variables (Advanced)
Create `api/config.php`:
```php
<?php
return [
    'smtp_username' => getenv('SMTP_USER'),
    'smtp_password' => getenv('SMTP_PASS'),
];
```

---

## 📊 **Monitoring & Logs**

### Check Submission Logs
File: `api/submissions.json`
- Contains all form submissions with timestamps
- JSON format for easy export/analysis

### Check Text Logs
File: `api/callback-log.txt`
- Simple text log of all submissions
- Includes email delivery status

### Export Leads
Download `api/submissions.json` to import into your CRM.

---

## 🆘 **Still Not Working?**

### Contact Your Hosting Provider
Ask them:
1. "Is PHP mail() function enabled?"
2. "What SMTP settings should I use?"
3. "Are there any email sending restrictions?"

### Alternative Email Services
If all else fails, consider:
- **SendGrid** (100 emails/day free)
- **Mailgun** (5,000 emails/month free)
- **AWS SES** (62,000 emails/month free)

### Quick Fallback
As a temporary solution, submissions are always saved to:
- `api/submissions.json` - Structured data
- `api/callback-log.txt` - Text log

Check these files daily for new leads until email is fixed.

---

## 📞 **Current Configuration**

**Recipient Emails:**
- realtyavyukta@gmail.com
- gopal.singh07@gmail.com
- madhvi2707@gmail.com

**Project:** Ganga Sec90 Gurgaon
**Company:** Avyukta Realty

**API Endpoints:**
- Main: `/api/send-callback.php` (PHP mail)
- SMTP: `/api/send-callback-smtp.php` (PHP mail with logging)
- Gmail: `/api/send-callback-gmail-smtp.php` (Gmail SMTP)

---

## 📝 **Testing Checklist**

- [ ] Visit test-email.php and send test email
- [ ] Check spam folder for test email
- [ ] Submit test form on website
- [ ] Check view-submissions.php for entry
- [ ] Verify email received by all recipients
- [ ] Test from mobile device
- [ ] Verify WhatsApp fallback works

---

**Last Updated:** <?php echo date('Y-m-d'); ?>

**Need Help?** Check debug.php for real-time diagnostics.

