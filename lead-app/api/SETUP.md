# PHP Email API Setup Guide

This API handles form submissions and sends email notifications to the business.

## Files

- `send-callback.php` - Main API endpoint for handling callback form submissions

## Setup Instructions

### 1. Deploy the API Files

After building your Vite app, make sure the `api` directory is uploaded to your server along with the built files.

The API should be accessible at: `https://sec90ganga.com/api/send-callback.php`

### 2. Server Requirements

Your server needs:
- PHP 7.4 or higher
- `mail()` function enabled
- Write permissions for log files (optional)

### 3. Configure Email Settings

The current email settings in `send-callback.php`:
- **Recipient**: `realtyavyukta@gmail.com`
- **Company Name**: Avyukta Realty
- **From Address**: `noreply@sec90ganga.com`

### 4. Update if Needed

Edit `send-callback.php` and change:
```php
$toEmail = 'realtyavyukta@gmail.com';  // Change to your email
$companyName = 'Avyukta Realty';       // Your company name
```

### 5. Test the API

You can test the API with curl:
```bash
curl -X POST https://sec90ganga.com/api/send-callback.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"9876543210","email":"test@example.com","preference":"Morning"}'
```

### 6. Troubleshooting

If emails aren't being sent:

1. Check server logs for PHP errors
2. Verify `mail()` function is working
3. Check spam folder for emails
4. Consider using SMTP (PHPMailer) for more reliable delivery

### Alternative: SMTP Configuration

For more reliable email delivery, consider using PHPMailer with SMTP:

```php
// Install PHPMailer: composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## Security Notes

- The API currently allows CORS from any origin (`*`)
- For production, consider restricting CORS to your domain
- Add rate limiting to prevent spam
- Consider adding CAPTCHA to prevent bot submissions
- Add input validation and sanitization (already implemented)

## Logging

Successful submissions are logged to `callback-log.txt` in the same directory.

Ensure the directory has write permissions:
```bash
chmod 755 api/
chmod 644 api/callback-log.txt
```

