# ⚙️ Setup After Deployment - File Permissions

## 🚨 **Why You See "0 Submissions"**

The PHP script can't write to files because of **permissions**. This is normal and easy to fix!

---

## ✅ **Quick Fix (2 Minutes)**

### **Option 1: Automatic Setup (Easiest)**

1. **Upload your `dist/` folder** to your server
2. **Visit this URL:** `https://sec90ganga.com/api/init-files.php`
3. Click the setup button
4. Done! It will create files with proper permissions

### **Option 2: Manual Setup via cPanel**

1. Login to **cPanel**
2. Open **File Manager**
3. Navigate to `public_html/api/`
4. Create these files (if they don't exist):
   - `submissions.json` (content: `[]`)
   - `callback-log.txt` (content: empty)
5. **Right-click each file** → **Change Permissions**
6. Set to **666** (read/write for all)
7. Done!

### **Option 3: Manual Setup via SSH**

```bash
# Connect to your server via SSH, then:
cd /path/to/public_html/api/

# Create files if they don't exist
touch submissions.json
echo "[]" > submissions.json

touch callback-log.txt

# Set permissions
chmod 755 .
chmod 666 submissions.json
chmod 666 callback-log.txt

# Verify
ls -la
```

---

## 🧪 **Test It Works**

### Step 1: Initialize Files
Visit: **https://sec90ganga.com/api/init-files.php**

You should see: ✓ All files created and writable

### Step 2: Submit Test Form
1. Go to: `https://sec90ganga.com/#contact`
2. Fill out the form
3. Submit

### Step 3: Check Submissions
Visit: **https://sec90ganga.com/api/view-submissions.php**

You should now see: **1 Total Submission** ✓

---

## 📊 **What Files Are Created**

| File | Purpose | Permissions |
|------|---------|-------------|
| `submissions.json` | Stores all form data | 666 (writable) |
| `callback-log.txt` | Simple text log | 666 (writable) |
| `api/` directory | Contains all files | 755 (writable) |

---

## 🔍 **Troubleshooting**

### "Permission Denied" Error
**Solution:** Your hosting provider may have strict permissions. Try:
1. Contact hosting support
2. Ask them to enable write permissions for `api/` folder
3. Or use a different hosting provider

### Files Created But Still "0 Submissions"
**Solution:** Clear your browser cache and test again:
1. Submit a new form
2. Check browser console for errors (F12)
3. Visit: `https://sec90ganga.com/api/debug.php`
4. Check if API is responding

### "File Not Found" Error
**Solution:** Ensure files are in correct location:
```
/public_html/
├── api/
│   ├── send-callback.php      ← Must exist
│   ├── submissions.json       ← Will be created
│   ├── callback-log.txt       ← Will be created
│   └── init-files.php         ← Run this first
```

---

## 📧 **Email Still Not Working?**

Even with submissions saving, emails might not send. That's a **separate issue**.

**Quick Email Fix:**
1. Visit: `https://sec90ganga.com/api/test-email.php`
2. Send a test email
3. If it fails, use Gmail SMTP (see `api/EMAIL-TROUBLESHOOTING.md`)

**Remember:** Submissions are ALWAYS saved, even if email fails!

---

## 🎯 **After Setup Checklist**

- [ ] Run `https://sec90ganga.com/api/init-files.php`
- [ ] See "✓ All files created and writable"
- [ ] Submit test form on website
- [ ] Check `https://sec90ganga.com/api/view-submissions.php`
- [ ] See "1 Total Submission"
- [ ] Test email with `test-email.php`
- [ ] Set up Gmail SMTP if emails fail

---

## 📞 **Quick Reference**

**Setup:** `https://sec90ganga.com/api/init-files.php`  
**View Leads:** `https://sec90ganga.com/api/view-submissions.php`  
**Test Email:** `https://sec90ganga.com/api/test-email.php`  
**Debug:** `https://sec90ganga.com/api/debug.php`

---

**Project:** Ganga Sec90 Gurgaon  
**Company:** Avyukta Realty  
**Status:** ✅ Files updated, ready to deploy!

