<?php
/**
 * Gmail SMTP Email Handler
 * Uses Gmail's SMTP server for reliable email delivery
 * 
 * SETUP INSTRUCTIONS:
 * 1. Get a Gmail App Password:
 *    - Go to Google Account → Security → 2-Step Verification → App passwords
 *    - Generate a new app password for "Mail"
 * 2. Replace YOUR_GMAIL_HERE and YOUR_APP_PASSWORD_HERE below
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$requiredFields = ['name', 'phone'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize data
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
$email = !empty($input['email']) ? htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$preference = !empty($input['preference']) ? htmlspecialchars(trim($input['preference']), ENT_QUOTES, 'UTF-8') : 'Morning';

// Email Configuration - UPDATE THESE VALUES
// Email Configuration - UPDATE THESE VALUES
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_username = 'realtyavyukta@gmail.com';  // Your Gmail address
$smtp_password = 'fsrjyaidfcuterec';         // Your App Password (no spaces) // Generate at: https://myaccount.google.com/apppasswords

$toEmails = [
    'realtyavyukta@gmail.com',
    'gopal.singh07@gmail.com',
    'madhvi2707@gmail.com'
];

$companyName = 'Avyukta Realty';
$projectName = 'Ganga Sec90 Gurgaon';
$subject = "New Callback Request - $projectName";

// Log submission
$logFile = __DIR__ . '/submissions.json';
$submissions = [];
if (file_exists($logFile)) {
    $submissions = json_decode(file_get_contents($logFile), true) ?: [];
}

$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'preference' => $preference,
    'project' => $projectName
];
$submissions[] = $logData;
file_put_contents($logFile, json_encode($submissions, JSON_PRETTY_PRINT));

// Create email message
$emailMessage = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; background: white; }
        .field { margin: 15px 0; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; }
        .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
        .value { color: #333; font-size: 16px; }
        .highlight { color: #e74c3c; font-weight: bold; font-size: 18px; }
        .action { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🏠 New Callback Request</h2>
        </div>
        <div class='content'>
            <p><strong>Project:</strong> $projectName</p>
            <p><strong>Received:</strong> " . date('Y-m-d H:i:s') . "</p>
            
            <div class='field'>
                <div class='label'>👤 Client Name:</div>
                <div class='value highlight'>$name</div>
            </div>
            
            <div class='field'>
                <div class='label'>📱 Phone Number:</div>
                <div class='value highlight'>$phone</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'>$email</div>
            </div>
            
            <div class='field'>
                <div class='label'>⏰ Preferred Callback Time:</div>
                <div class='value'>$preference</div>
            </div>
            
            <div class='action'>
                ⚡ <strong>Action Required:</strong> Please contact this client within 2 hours as promised.
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the $companyName website</p>
            <p>&copy; " . date('Y') . " $companyName. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Function to send email via SMTP socket
function sendEmailViaSMTP($to, $subject, $message, $from, $smtp_host, $smtp_port, $smtp_user, $smtp_pass) {
    try {
        // Connect to SMTP server
        $socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);
        if (!$socket) {
            return false;
        }
        
        // Read initial response
        fgets($socket);
        
        // Send EHLO
        fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
        $response = '';
        while($line = fgets($socket)) {
            $response .= $line;
            if(substr($line, 3, 1) == ' ') break;
        }
        
        // Start TLS
        fputs($socket, "STARTTLS\r\n");
        fgets($socket);
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        
        // EHLO again after TLS
        fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
        while($line = fgets($socket)) {
            if(substr($line, 3, 1) == ' ') break;
        }
        
        // AUTH LOGIN
        fputs($socket, "AUTH LOGIN\r\n");
        fgets($socket);
        
        fputs($socket, base64_encode($smtp_user) . "\r\n");
        fgets($socket);
        
        fputs($socket, base64_encode($smtp_pass) . "\r\n");
        $auth_response = fgets($socket);
        
        if (strpos($auth_response, '235') === false) {
            fclose($socket);
            return false;
        }
        
        // Send email
        fputs($socket, "MAIL FROM: <$from>\r\n");
        fgets($socket);
        
        fputs($socket, "RCPT TO: <$to>\r\n");
        fgets($socket);
        
        fputs($socket, "DATA\r\n");
        fgets($socket);
        
        $headers = "From: $from\r\n";
        $headers .= "Reply-To: $from\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Subject: $subject\r\n";
        
        fputs($socket, $headers . "\r\n" . $message . "\r\n.\r\n");
        fgets($socket);
        
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        return true;
    } catch (Exception $e) {
        return false;
    }
}

// Send emails
$successCount = 0;
$errors = [];

if ($smtp_password === 'YOUR_APP_PASSWORD_HERE') {
    // Configuration not set up yet
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your request has been saved. Please configure Gmail SMTP to enable email notifications.',
        'submission_saved' => true,
        'email_sent' => false,
        'note' => 'Configure Gmail App Password in send-callback-gmail-smtp.php'
    ]);
    exit();
}

foreach ($toEmails as $emailAddr) {
    if (sendEmailViaSMTP($emailAddr, $subject, $emailMessage, $smtp_username, $smtp_host, $smtp_port, $smtp_username, $smtp_password)) {
        $successCount++;
    } else {
        $errors[] = $emailAddr;
    }
}

// Response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Your request has been submitted successfully. We will contact you within 2 hours.',
    'submission_saved' => true,
    'emails_sent' => $successCount,
    'emails_failed' => count($errors)
]);
?>

