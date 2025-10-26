<?php
/**
 * Callback Form Email Handler
 * Handles form submissions and sends email notifications
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
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

// Sanitize and extract data
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
$email = !empty($input['email']) ? htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$preference = !empty($input['preference']) ? htmlspecialchars(trim($input['preference']), ENT_QUOTES, 'UTF-8') : 'Morning';

// Configuration - Add multiple email recipients
$toEmails = [
    'realtyavyukta@gmail.com',
    'gopal.singh07@gmail.com',
    'madhvi2707@gmail.com'  // Add your second email here
];
$companyName = 'Avyukta Realty';
$projectName = 'Ganga Sec90 Gurgaon';
$subject = "New Callback Request - $projectName";

// Prepare email content
$emailMessage = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin: 15px 0; padding: 10px; background-color: white; border-left: 4px solid #3498db; }
        .field-label { font-weight: bold; color: #2c3e50; margin-bottom: 5px; }
        .field-value { color: #555; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
        .highlight { color: #e74c3c; font-weight: bold; }
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
                <div class='field-label'>👤 Client Name:</div>
                <div class='field-value highlight'>$name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>📱 Phone Number:</div>
                <div class='field-value'>$phone</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>📧 Email:</div>
                <div class='field-value'>$email</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>⏰ Preferred Callback Time:</div>
                <div class='field-value'>$preference</div>
            </div>
            
            <hr style='margin: 20px 0; border: none; border-top: 2px solid #ddd;'>
            
            <p style='background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>
                ⚡ <strong>Action Required:</strong> Please contact this client within 2 hours as promised.
            </p>
        </div>
        <div class='footer'>
            <p>This email was sent from the $companyName website</p>
            <p>&copy; " . date('Y') . " $companyName. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Set email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    "From: Avyukta Realty <realtyavyukta@gmail.com>",
    "Reply-To: realtyavyukta@gmail.com",
    "X-Mailer: PHP/" . phpversion()
];

// Save submission to JSON file FIRST (before email attempt)
$jsonFile = __DIR__ . '/submissions.json';
$submissions = [];
if (file_exists($jsonFile)) {
    $content = @file_get_contents($jsonFile);
    $submissions = $content ? json_decode($content, true) : [];
    if (!is_array($submissions)) {
        $submissions = [];
    }
}

// Add new submission
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'preference' => $preference,
    'project' => $projectName
];
$submissions[] = $logData;

// Save to JSON file
@file_put_contents($jsonFile, json_encode($submissions, JSON_PRETTY_PRINT));

// Also log to text file
$logFile = __DIR__ . '/callback-log.txt';
$timestamp = date('Y-m-d H:i:s');
$logEntry = "$timestamp - Callback request from $name ($phone) [$email]";

// Attempt to send email to all recipients
$mailSuccess = false;
$successCount = 0;
$errors = [];

// Check if mail function exists
if (!function_exists('mail')) {
    $logEntry .= " - ERROR: mail() function not available";
    @file_put_contents($logFile, $logEntry . "\n", FILE_APPEND);
    
    // Still return success to user (graceful fallback)
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your request has been submitted successfully. We will contact you within 2 hours.',
        'debug' => 'mail() function not available on server'
    ]);
    exit();
}

foreach ($toEmails as $emailAddr) {
    $headers_array = $headers;
    $headers_array[] = "To: $emailAddr";
    
    $result = @mail($emailAddr, $subject, $emailMessage, implode("\r\n", $headers_array));
    
    if ($result) {
        $successCount++;
        $mailSuccess = true;
    } else {
        $errors[] = $emailAddr;
    }
}

// Always log the submission
$sentTo = "$successCount of " . count($toEmails);
$logEntry .= " - Sent to: $sentTo";
if (!empty($errors)) {
    $logEntry .= " - Failed: " . implode(', ', $errors);
}
@file_put_contents($logFile, $logEntry . "\n", FILE_APPEND);

// Return success even if email fails (graceful degradation)
if ($mailSuccess || $successCount > 0) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your request has been submitted successfully. We will contact you within 2 hours.'
    ]);
} else {
    // If all emails failed, still return success but log it
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your request has been submitted. Our team will contact you soon via WhatsApp.'
    ]);
}
?>

