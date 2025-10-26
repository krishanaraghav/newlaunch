<?php
/**
 * Initialize API Files with Proper Permissions
 * Run this ONCE after deployment: https://sec90ganga.com/api/init-files.php
 */

header('Content-Type: text/html; charset=UTF-8');

$results = [];
$apiDir = __DIR__;

// Files to create
$files = [
    'submissions.json' => '[]',
    'callback-log.txt' => ''
];

foreach ($files as $filename => $content) {
    $filepath = $apiDir . '/' . $filename;
    
    try {
        // Create file if doesn't exist
        if (!file_exists($filepath)) {
            $created = @file_put_contents($filepath, $content);
            if ($created !== false) {
                @chmod($filepath, 0666); // Make writable
                $results[] = [
                    'file' => $filename,
                    'status' => 'created',
                    'writable' => is_writable($filepath),
                    'message' => '✓ Created and made writable'
                ];
            } else {
                $results[] = [
                    'file' => $filename,
                    'status' => 'error',
                    'writable' => false,
                    'message' => '✗ Could not create file'
                ];
            }
        } else {
            // File exists, check if writable
            $writable = is_writable($filepath);
            if (!$writable) {
                @chmod($filepath, 0666);
                $writable = is_writable($filepath);
            }
            
            $results[] = [
                'file' => $filename,
                'status' => 'exists',
                'writable' => $writable,
                'message' => $writable ? '✓ Exists and writable' : '⚠ Exists but not writable'
            ];
        }
    } catch (Exception $e) {
        $results[] = [
            'file' => $filename,
            'status' => 'error',
            'writable' => false,
            'message' => '✗ Error: ' . $e->getMessage()
        ];
    }
}

// Check directory permissions
$dirWritable = is_writable($apiDir);
if (!$dirWritable) {
    @chmod($apiDir, 0755);
    $dirWritable = is_writable($apiDir);
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Initialize API Files - Ganga Sec90</title>
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
        .result-box {
            background: #f7fafc;
            padding: 20px;
            border-radius: 12px;
            margin: 15px 0;
            border-left: 4px solid #cbd5e0;
        }
        .result-box.success {
            background: #d1fae5;
            border-left-color: #10b981;
        }
        .result-box.warning {
            background: #fef3c7;
            border-left-color: #f59e0b;
        }
        .result-box.error {
            background: #fee2e2;
            border-left-color: #ef4444;
        }
        .file-name {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 8px;
            color: #2d3748;
        }
        .file-status {
            font-size: 14px;
            color: #4a5568;
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
            text-align: center;
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
        .alert.warning {
            background: #fef3c7;
            color: #92400e;
            border-left: 4px solid #f59e0b;
        }
        .alert.error {
            background: #fee2e2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 10px 10px 10px 0;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        code {
            background: #1a202c;
            color: #68d391;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        .manual-steps {
            background: #e0e7ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
            margin: 20px 0;
        }
        .manual-steps h3 {
            color: #3730a3;
            margin-bottom: 10px;
        }
        .manual-steps ol {
            margin-left: 20px;
            color: #4338ca;
        }
        .manual-steps li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔧 API Files Initialization</h1>
            <p class="subtitle">Setting up required files for form submissions</p>
            
            <div class="status-grid">
                <div class="status-item">
                    <div class="status-label">API Directory</div>
                    <div class="status-value <?php echo $dirWritable ? 'good' : 'bad'; ?>">
                        <?php echo $dirWritable ? '✓ Writable' : '✗ Not Writable'; ?>
                    </div>
                </div>
                <div class="status-item">
                    <div class="status-label">Files Created</div>
                    <div class="status-value good">
                        <?php echo count(array_filter($results, fn($r) => $r['status'] !== 'error')); ?>
                    </div>
                </div>
                <div class="status-item">
                    <div class="status-label">Errors</div>
                    <div class="status-value <?php echo count(array_filter($results, fn($r) => $r['status'] === 'error')) > 0 ? 'bad' : 'good'; ?>">
                        <?php echo count(array_filter($results, fn($r) => $r['status'] === 'error')); ?>
                    </div>
                </div>
            </div>
            
            <h2 style="margin: 30px 0 20px 0; color: #2d3748;">File Status</h2>
            
            <?php foreach ($results as $result): ?>
                <div class="result-box <?php 
                    echo $result['writable'] ? 'success' : 
                        ($result['status'] === 'error' ? 'error' : 'warning'); 
                ?>">
                    <div class="file-name"><?php echo htmlspecialchars($result['file']); ?></div>
                    <div class="file-status">
                        <?php echo htmlspecialchars($result['message']); ?>
                        <br>
                        <small>Writable: <?php echo $result['writable'] ? 'Yes ✓' : 'No ✗'; ?></small>
                    </div>
                </div>
            <?php endforeach; ?>
            
            <?php 
            $allWritable = $dirWritable && count(array_filter($results, fn($r) => !$r['writable'])) === 0;
            if ($allWritable): 
            ?>
                <div class="alert success">
                    <strong>✓ Success!</strong> All files are created and writable. Your form submissions will now be saved properly.
                </div>
                
                <a href="view-submissions.php" class="btn">📋 View Submissions</a>
                <a href="debug.php" class="btn">🔍 Test Form</a>
                <a href="test-email.php" class="btn">📧 Test Email</a>
                
            <?php else: ?>
                <div class="alert warning">
                    <strong>⚠ Action Required:</strong> Some files are not writable. You need to fix permissions.
                </div>
                
                <div class="manual-steps">
                    <h3>Manual Setup Steps:</h3>
                    <ol>
                        <li>Connect to your server via SSH or cPanel File Manager</li>
                        <li>Navigate to the <code>api/</code> directory</li>
                        <li>Run these commands (SSH):
                            <br><br>
                            <code>chmod 755 api/</code><br>
                            <code>chmod 666 api/submissions.json</code><br>
                            <code>chmod 666 api/callback-log.txt</code>
                        </li>
                        <li>Or in cPanel: Right-click files → Change Permissions → Set to 666</li>
                        <li>Refresh this page to verify</li>
                    </ol>
                </div>
                
                <a href="javascript:location.reload()" class="btn">🔄 Check Again</a>
            <?php endif; ?>
            
            <div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid #e2e8f0;">
                <h3 style="color: #2d3748; margin-bottom: 15px;">Next Steps:</h3>
                <ol style="margin-left: 20px; color: #4a5568; line-height: 1.8;">
                    <li>Submit a test form on your website</li>
                    <li>Check <a href="view-submissions.php" style="color: #667eea;">view-submissions.php</a> for the entry</li>
                    <li>Test email delivery with <a href="test-email.php" style="color: #667eea;">test-email.php</a></li>
                    <li>If emails don't arrive, set up <a href="send-callback-gmail-smtp.php" style="color: #667eea;">Gmail SMTP</a></li>
                </ol>
            </div>
        </div>
    </div>
</body>
</html>

