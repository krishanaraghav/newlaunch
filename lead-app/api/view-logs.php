<?php
/**
 * View Form Submission Logs
 * Visit: https://sec90ganga.com/api/view-logs.php
 */

header('Content-Type: text/html; charset=UTF-8');

$logFile = __DIR__ . '/callback-log.txt';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Form Submission Logs - Ganga Sec90</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 20px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .log-content {
            background: #1f2937;
            color: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            overflow-x: auto;
            max-height: 600px;
            overflow-y: auto;
        }
        .empty {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
            color: #666;
        }
        a {
            color: #2563eb;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .stats {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .stats strong {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 Form Submission Logs</h1>
        <p><strong>Log File:</strong> <?php echo $logFile; ?></p>
        <a href="debug.php">← Back to Debug Tool</a>
    </div>

    <?php
    if (file_exists($logFile) && is_readable($logFile)) {
        $logContent = file_get_contents($logFile);
        
        if (empty(trim($logContent))) {
            echo '<div class="empty">📭 No submissions yet. Submit the form to create logs.</div>';
        } else {
            $lines = explode("\n", trim($logContent));
            $count = count(array_filter($lines));
            
            echo '<div class="stats">';
            echo '<strong>Total Submissions:</strong> ' . $count;
            echo ' | ';
            echo '<strong>File Size:</strong> ' . filesize($logFile) . ' bytes';
            echo ' | ';
            echo '<strong>Last Updated:</strong> ' . date('Y-m-d H:i:s', filemtime($logFile));
            echo '</div>';
            
            echo '<div class="log-content">';
            echo htmlspecialchars($logContent);
            echo '</div>';
        }
    } else {
        echo '<div class="empty">⚠️ Log file not found or not readable.</div>';
        echo '<p>Make sure the API has write permissions to create callback-log.txt</p>';
    }
    ?>
    
    <div class="header">
        <p><a href="javascript:location.reload()">🔄 Refresh Logs</a> | <a href="debug.php">Return to Debug</a></p>
    </div>
</body>
</html>

