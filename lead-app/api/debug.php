<?php
/**
 * Email Debugging Script
 * Visit: https://sec90ganga.com/api/debug.php
 */

header('Content-Type: text/html; charset=UTF-8');

?>
<!DOCTYPE html>
<html>
<head>
    <title>Email Debug - Ganga Sec90</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .test-section {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        .success { color: #10b981; font-weight: bold; }
        .error { color: #ef4444; font-weight: bold; }
        .warning { color: #f59e0b; font-weight: bold; }
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
        }
        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }
        button:hover {
            background: #1d4ed8;
        }
        pre {
            background: #1f2937;
            color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }
        .email-list {
            background: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>🔍 Email Debugging Tool</h1>
    
    <div class="test-section">
        <h2>1. Server Information</h2>
        <p><strong>PHP Version:</strong> <?php echo phpversion(); ?></p>
        <p><strong>Server:</strong> <?php echo $_SERVER['SERVER_NAME'] ?? 'N/A'; ?></p>
        <p><strong>Document Root:</strong> <?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'N/A'; ?></p>
        <p><strong>Current Script:</strong> <?php echo __FILE__; ?></p>
        <p><strong>Server Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
    </div>
    
    <div class="test-section">
        <h2>2. Mail Function Check</h2>
        <?php if (function_exists('mail')): ?>
            <p class="success">✓ PHP mail() function is available</p>
            <p><strong>sendmail_path:</strong> <?php echo ini_get('sendmail_path') ?: 'Not configured'; ?></p>
            <p><strong>SMTP:</strong> <?php echo ini_get('SMTP') ?: 'Not configured'; ?></p>
            <p><strong>smtp_port:</strong> <?php echo ini_get('smtp_port') ?: 'Not configured'; ?></p>
        <?php else: ?>
            <p class="error">✗ PHP mail() function is NOT available</p>
        <?php endif; ?>
    </div>
    
    <div class="test-section">
        <h2>3. API File Check</h2>
        <?php
        $apiFile = __DIR__ . '/send-callback.php';
        if (file_exists($apiFile)) {
            echo '<p class="success">✓ API file exists: ' . basename($apiFile) . '</p>';
            
            // Check file permissions
            $perms = fileperms($apiFile);
            echo '<p><strong>File Permissions:</strong> ' . substr(sprintf('%o', $perms), -4) . '</p>';
            
            // Check if file is readable
            if (is_readable($apiFile)) {
                echo '<p class="success">✓ File is readable</p>';
            } else {
                echo '<p class="error">✗ File is NOT readable</p>';
            }
            
            // Check file size
            echo '<p><strong>File Size:</strong> ' . filesize($apiFile) . ' bytes</p>';
            
            // Check last modified
            echo '<p><strong>Last Modified:</strong> ' . date('Y-m-d H:i:s', filemtime($apiFile)) . '</p>';
        } else {
            echo '<p class="error">✗ API file NOT found: ' . $apiFile . '</p>';
        }
        ?>
    </div>
    
    <div class="test-section">
        <h2>4. Email Recipients Configuration</h2>
        <?php
        // Try to read email configuration from send-callback.php
        if (file_exists($apiFile)) {
            $content = file_get_contents($apiFile);
            if (preg_match('/\$toEmails\s*=\s*\[(.*?)\];/s', $content, $matches)) {
                echo '<div class="email-list">';
                echo '<p><strong>Configured Email Recipients:</strong></p>';
                // Try to extract emails - look for 'email@domain.com' pattern
                if (preg_match_all("/['\"]([^'\"]+@[^'\"]+\.\w+)['\"]/", $matches[1], $emails)) {
                    echo '<ul style="list-style:none; padding:0;">';
                    foreach ($emails[1] as $email) {
                        echo '<li style="padding:8px; margin:4px 0; background:#f0f9ff; border-left:3px solid #2563eb;">📧 ' . htmlspecialchars($email) . '</li>';
                    }
                    echo '</ul>';
                } else {
                    echo '<p style="color:#f59e0b;">⚠️ Could not parse email list automatically</p>';
                    echo '<p>Emails configured in send-callback.php:</p>';
                    echo '<ul style="list-style:none; padding:0;">';
                    echo '<li style="padding:8px; margin:4px 0; background:#f0f9ff; border-left:3px solid #2563eb;">📧 realtyavyukta@gmail.com</li>';
                    echo '<li style="padding:8px; margin:4px 0; background:#f0f9ff; border-left:3px solid #2563eb;">📧 gopal.singh07@gmail.com</li>';
                    echo '<li style="padding:8px; margin:4px 0; background:#f0f9ff; border-left:3px solid #2563eb;">📧 madhvi2707@gmail.com</li>';
                    echo '</ul>';
                }
                echo '</div>';
            } else {
                echo '<p class="warning">⚠ Could not find email configuration</p>';
            }
        }
        ?>
    </div>
    
    <div class="test-section">
        <h2>5. Test Email Sending</h2>
        <button onclick="testEmail()">Test Send Email</button>
        <button onclick="viewLogs()">View Submission Logs</button>
        <div id="emailResult"></div>
    </div>
    
    <div class="test-section">
        <h2>6. Test Form API</h2>
        <button onclick="testAPI()">Test API Endpoint</button>
        <div id="apiResult"></div>
    </div>
    
    <div class="test-section">
        <h2>7. Test Form Submission</h2>
        <form id="testForm" style="max-width:400px;">
            <input type="text" name="name" placeholder="Your Name" value="Test User" style="width:100%; padding:8px; margin:8px 0; border:1px solid #ddd; border-radius:4px;" required><br>
            <input type="tel" name="phone" placeholder="Phone" value="9876543210" style="width:100%; padding:8px; margin:8px 0; border:1px solid #ddd; border-radius:4px;" required><br>
            <input type="email" name="email" placeholder="Email" value="test@example.com" style="width:100%; padding:8px; margin:8px 0; border:1px solid #ddd; border-radius:4px;"><br>
            <button type="submit" style="width:100%;">Submit Test Form</button>
        </form>
        <div id="formResult"></div>
    </div>

<script>
function viewLogs() {
    fetch('/api/callback-log.txt')
        .then(res => res.text())
        .then(text => {
            document.getElementById('emailResult').innerHTML = '<pre>' + (text || 'No logs yet. Submit the form to create logs.') + '</pre>';
        })
        .catch(err => {
            document.getElementById('emailResult').innerHTML = '<p class="error">Could not load log file. It might not exist yet.</p>';
        });
}

function testEmail() {
    const result = document.getElementById('emailResult');
    result.innerHTML = '<p>Testing...</p>';
    
    fetch('/api/send-callback.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'Debug Test User',
            phone: '9876543210',
            email: 'debug@example.com',
            preference: 'Morning'
        })
    })
    .then(res => {
        console.log('Status:', res.status);
        return res.json();
    })
    .then(data => {
        result.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        if (data.success) {
            result.innerHTML += '<p class="success">✓ Form submission successful!</p>';
            result.innerHTML += '<p>Check the callback-log.txt file for details.</p>';
        } else {
            result.innerHTML += '<p class="warning">⚠ Form submission returned false. Check logs.</p>';
        }
    })
    .catch(err => {
        result.innerHTML = '<p class="error">Error: ' + err.message + '</p>';
        result.innerHTML += '<p>Make sure the API endpoint is accessible.</p>';
    });
}

function testAPI() {
    const result = document.getElementById('apiResult');
    result.innerHTML = '<p>Testing API...</p>';
    
    fetch('/api/send-callback.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'API Test',
            phone: '1234567890',
            email: 'test@example.com',
            preference: 'Afternoon'
        })
    })
    .then(res => {
        console.log('Response status:', res.status);
        return res.json();
    })
    .then(data => {
        if (data.success) {
            result.innerHTML = '<p class="success">✓ API responded successfully</p>';
            result.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        } else {
            result.innerHTML = '<p class="error">✗ API Error</p>';
            result.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        }
    })
    .catch(err => {
        result.innerHTML = '<p class="error">✗ Network Error: ' + err.message + '</p>';
        result.innerHTML += '<p>Check that /api/send-callback.php exists on your server.</p>';
    });
}

document.getElementById('testForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        preference: 'Morning'
    };
    
    const resultDiv = document.getElementById('formResult');
    resultDiv.innerHTML = '<p>Submitting...</p>';
    
    try {
        const response = await fetch('/api/send-callback.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        resultDiv.innerHTML = '<pre style="background:#f5f5f5; padding:15px; border-radius:6px;">' + JSON.stringify(result, null, 2) + '</pre>';
        
        if (result.success) {
            resultDiv.innerHTML += '<p class="success">✓ Form submitted successfully!</p>';
            resultDiv.innerHTML += '<p>Check callback-log.txt to see the submission details.</p>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
        resultDiv.innerHTML += '<p>Make sure you are accessing this from your server.</p>';
    }
});
</script>

</body>
</html>

