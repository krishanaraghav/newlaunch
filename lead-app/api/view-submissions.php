<?php
/**
 * View All Form Submissions
 * Visit: https://sec90ganga.com/api/view-submissions.php
 */

header('Content-Type: text/html; charset=UTF-8');

$jsonFile = __DIR__ . '/submissions.json';
$textFile = __DIR__ . '/callback-log.txt';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Form Submissions - Ganga Sec90</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f7fa;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .header p {
            opacity: 0.9;
            font-size: 14px;
        }
        .stats {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
        }
        .stat-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
        }
        .stat-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .actions {
            background: white;
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
            margin-right: 10px;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #1e40af;
        }
        .btn-secondary {
            background: #10b981;
        }
        .btn-secondary:hover {
            background: #059669;
        }
        table {
            width: 100%;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        thead {
            background: #f8fafc;
        }
        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #e2e8f0;
        }
        td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            color: #334155;
        }
        tr:hover {
            background: #f8fafc;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .badge-success {
            background: #d1fae5;
            color: #065f46;
        }
        .badge-warning {
            background: #fef3c7;
            color: #92400e;
        }
        .empty {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .empty-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        .empty h2 {
            color: #64748b;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .empty p {
            color: #94a3b8;
        }
        .phone-link {
            color: #2563eb;
            text-decoration: none;
        }
        .phone-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 Form Submissions - All Leads</h1>
            <p>Track all callback requests from your website</p>
        </div>

        <?php
        $submissions = [];
        if (file_exists($jsonFile)) {
            $submissions = json_decode(file_get_contents($jsonFile), true) ?: [];
        }

        $count = count($submissions);
        ?>

        <div class="stats">
            <div class="stat-item">
                <div class="stat-number"><?php echo $count; ?></div>
                <div class="stat-label">Total Submissions</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">
                    <?php
                    $uniquePhones = array_unique(array_column($submissions, 'phone'));
                    echo count($uniquePhones);
                    ?>
                </div>
                <div class="stat-label">Unique Phones</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">
                    <?php
                    $withEmails = array_filter($submissions, fn($s) => $s['email'] !== 'Not provided');
                    echo count($withEmails);
                    ?>
                </div>
                <div class="stat-label">With Email</div>
            </div>
        </div>

        <div class="actions">
            <a href="javascript:location.reload()" class="btn">🔄 Refresh</a>
            <a href="debug.php" class="btn btn-secondary">🔧 Debug Tool</a>
        </div>

        <?php if ($count === 0): ?>
            <div class="empty">
                <div class="empty-icon">📭</div>
                <h2>No Submissions Yet</h2>
                <p>Form submissions will appear here once users start filling out your contact form.</p>
            </div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Preference</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Show newest first
                    $submissions = array_reverse($submissions);
                    
                    foreach ($submissions as $submission):
                        $date = $submission['timestamp'];
                        $name = htmlspecialchars($submission['name']);
                        $phone = htmlspecialchars($submission['phone']);
                        $email = htmlspecialchars($submission['email']);
                        $pref = htmlspecialchars($submission['preference']);
                    ?>
                    <tr>
                        <td><span style="font-size: 13px; color: #64748b;"><?php echo $date; ?></span></td>
                        <td><strong><?php echo $name; ?></strong></td>
                        <td>
                            <a href="tel:<?php echo $phone; ?>" class="phone-link">
                                <?php echo $phone; ?>
                            </a>
                        </td>
                        <td>
                            <?php if ($email !== 'Not provided'): ?>
                                <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a>
                            <?php else: ?>
                                <span style="color: #94a3b8;">Not provided</span>
                            <?php endif; ?>
                        </td>
                        <td><span class="badge badge-warning"><?php echo $pref; ?></span></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</body>
</html>

