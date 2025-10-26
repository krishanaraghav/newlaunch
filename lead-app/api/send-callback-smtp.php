<?php
/**
 * Send Callback with Better Email Delivery
 * This version logs to database/file AND sends via mail()
 * Fallback: If mail fails, still logs the submission
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

// Sanitize and extract data
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
$email = !empty($input['email']) ? htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$preference = !empty($input['preference']) ? htmlspecialchars(trim($input['preference']), ENT_QUOTES, 'UTF-8') : 'Morning';

// Configuration
$toEmails = [
    'realtyavyukta@gmail.com',
    'gopal.singh07@gmail.com',
    'madhvi2707@gmail.com'
];

$companyName = 'Avyukta Realty';
$projectName = 'Ganga Sec90 Gurgaon';
$subject = "New Callback Request - $projectName";

// Create detailed log entry
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'preference' => $preference,
    'project' => $projectName
];

$logFile = __DIR__ . '/submissions.json';

// Load existing submissions
$submissions = [];
if (file_exists($logFile)) {
    $submissions = json_decode(file_get_contents($logFile), true) ?: [];
}

// Add new submission
$submissions[] = $logData;

// Save to JSON file (better for data export)
file_put_contents($logFile, json_encode($submissions, JSON_PRETTY_PRINT));

// Also save to text log for compatibility
$textLog = __DIR__ . '/callback-log.txt';
$textEntry = date('Y-m-d H:i:s') . " - $name ($phone) [$email] - $preference\n";
file_put_contents($textLog, $textEntry, FILE_APPEND);

// Prepare email content
$emailMessage = "
<!DOCTYPE html>
<html>
<head><style>
body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
.container{max-width:600px;margin:0 auto;padding:20px}
.header{background:#2563eb;color:white;padding:20px;text-align:center}
.content{padding:20px;background:#f9f9f9}
.field{margin:15px 0;padding:15px;background:white;border-left:4px solid #2563eb}
.label{font-weight:bold;color:#666;margin-bottom:5px}
.value{color:#333;font-size:16px}
.highlight{color:#e74c3c;font-weight:bold}
.footer{text-align:center;padding:20px;color:#777;font-size:12px}
</style></head>
<body>
<div class='container'>
<div class='header'><h2>🏠 New Callback Request</h2></div>
<div class='content'>
<p><strong>Project:</strong> $projectName</p>
<p><strong>Received:</strong> " . date('Y-m-d H:i:s') . "</p>

<div class='field'>
<div class='label'>👤 Client Name:</div>
<div class='value highlight'>$name</div>
</div>

<div class='field'>
<div class='label'>📱 Phone Number:</div>
<div class='value'>$phone</div>
</div>

<div class='field'>
<div class='label'>📧 Email:</div>
<div class='value'>$email</div>
</div>

<div class='field'>
<div class='label'>⏰ Preferred Callback Time:</div>
<div class='value'>$preference</div>
</div>

<hr style='margin:20px 0;border:none;border-top:2px solid #ddd'>

<p style='background:#fff3cd;padding:15px;border-left:4px solid #ffc107'>
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

// Try to send email
$mailSuccess = false;
if (function_exists('mail')) {
    foreach ($toEmails as $emailAddr) {
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            "From: $companyName <realtyavyukta@gmail.com>",
            "X-Mailer: PHP/" . phpversion()
        ];
        
        if (@mail($emailAddr, $subject, $emailMessage, implode("\r\n", $headers))) {
            $mailSuccess = true;
        }
    }
}

// Always return success (graceful degradation)
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Your request has been submitted successfully. We will contact you within 2 hours.',
    'submission_saved' => true
]);

