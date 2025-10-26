<?php
/**
 * Simple Email Test Script
 * Visit: https://sec90ganga.com/lead-app/api/test-email.php
 */

header('Content-Type: text/html; charset=UTF-8');

$testEmail = 'realtyavyukta@gmail.com'; // Change this to test email
$testSent = false;
$testResult = '';

if (isset($_POST['send_test'])) {
    $to = $_POST['test_email'];
    $subject = "Test Email from Ganga Sec90 Website - " . date('H:i:s');
    $message = "
    <html>
    <head><style>body{font-family:Arial;padding:20px;}</style></head>
    <body>
        <h2 style='color:#2563eb;'>✓ Email Test Successful!</h2>
        <p>If you're reading this, your email configuration is working.</p>
        <p><strong>Sent at:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>From:</strong> " . $_SERVER['SERVER_NAME'] . "</p>
        <hr>
        <p style='color:#666;font-size:12px;'>This is an automated test email from your website's contact form.</p>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ganga Sec90 <noreply@sec90ganga.com>',
        'Reply-To: realtyavyukta@gmail.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $testSent = @mail($to, $subject, $message, implode("\r\n", $headers));
    
    if ($testSent) {
        $testResult = '<div class="alert success">✓ Test email sent successfully to ' . htmlspecialchars($to) . '! Check your inbox (and spam folder).</div>';
    } else {
        $testResult = '<div class="alert error">✗ Failed to send test email. PHP mail() function may not be configured on this server.</div>';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Email Test - Ganga Sec90</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            margin-bottom: 20px;
        }
        h1 {
            color: #1a202c;
            margin-bottom: 10px;
            font-size: 32px;
        }
        .subtitle {
            color: #718096;
            margin-bottom: 30px;
        }
        .test-section {
            background: #f7fafc;
            padding: 30px;
            border-radius: 12px;
            margin: 20px 0;
        }
        .form-group {
            margin: 20px 0;
        }
        label {
            display: block;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 8px;
        }
        input[type="email"] {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input[type="email"]:focus {
            outline: none;
            border-color: #667eea;
        }
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .alert {
            padding: 16px 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 500;
        }
        .alert.success {
            background: #d1fae5;
            color: #065f46;
            border-left: 4px solid #10b981;
        }
        .alert.error {
            background: #fee2e2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }
        .alert.warning {
            background: #fef3c7;
            color: #92400e;
            border-left: 4px solid #f59e0b;
        }
        .info-box {
            background: #e0e7ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
            margin: 20px 0;
        }
        .info-box h3 {
            color: #3730a3;
            margin-bottom: 10px;
        }
        .info-box p {
            color: #4338ca;
            line-height: 1.6;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .status-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
        }
        .status-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .status-value {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
        }
        .status-value.good { color: #10b981; }
        .status-value.bad { color: #ef4444; }
        code {
            background: #1a202c;
            color: #68d391;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        .links {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .link-btn {
            display: inline-block;
            padding: 10px 20px;
            background: #f7fafc;
            color: #2d3748;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s;
        }
        .link-btn:hover {
            background: #e2e8f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>📧 Email Testing Tool</h1>
            <p class="subtitle">Test if your server can send emails properly</p>
            
            <?php echo $testResult; ?>
            
            <div class="test-section">
                <h2 style="margin-bottom: 20px; color: #2d3748;">Server Status</h2>
                
                <div class="status-grid">
                    <div class="status-item">
                        <div class="status-label">PHP Version</div>
                        <div class="status-value"><?php echo phpversion(); ?></div>
                    </div>
                    <div class="status-item">
                        <div class="status-label">Mail Function</div>
                        <div class="status-value <?php echo function_exists('mail') ? 'good' : 'bad'; ?>">
                            <?php echo function_exists('mail') ? '✓ Available' : '✗ Not Available'; ?>
                        </div>
                    </div>
                    <div class="status-item">
                        <div class="status-label">Server</div>
                        <div class="status-value" style="font-size: 14px;"><?php echo $_SERVER['SERVER_NAME']; ?></div>
                    </div>
                </div>
                
                <?php if (!function_exists('mail')): ?>
                    <div class="alert error">
                        <strong>⚠ Warning:</strong> PHP mail() function is not available on this server. 
                        You'll need to use SMTP instead (Gmail, SendGrid, etc.)
                    </div>
                <?php endif; ?>
            </div>
            
            <div class="test-section">
                <h2 style="margin-bottom: 20px; color: #2d3748;">Send Test Email</h2>
                
                <form method="POST" action="">
                    <div class="form-group">
                        <label for="test_email">Recipient Email Address:</label>
                        <input 
                            type="email" 
                            id="test_email" 
                            name="test_email" 
                            value="<?php echo $testEmail; ?>" 
                            required 
                            placeholder="your@email.com"
                        >
                    </div>
                    <button type="submit" name="send_test">📨 Send Test Email</button>
                </form>
            </div>
            
            <div class="info-box">
                <h3>🔧 Common Issues & Solutions</h3>
                <p><strong>1. Emails not arriving?</strong> Check your spam/junk folder first!</p>
                <p><strong>2. PHP mail() not working?</strong> Most shared hosting providers disable it. Use SMTP instead.</p>
                <p><strong>3. Need reliable delivery?</strong> Set up Gmail SMTP (see send-callback-gmail-smtp.php)</p>
                <p><strong>4. Still not working?</strong> Contact your hosting provider to enable email functionality.</p>
            </div>
            
            <div class="links">
                <a href="debug.php" class="link-btn">🔍 Full Debug Tool</a>
                <a href="view-submissions.php" class="link-btn">📋 View Submissions</a>
                <a href="view-logs.php" class="link-btn">📝 View Logs</a>
            </div>
        </div>
    </div>
</body>
</html>

