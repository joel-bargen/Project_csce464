<?php
// Database connection
$dbLocation = 'localhost';
$dbUsername = 'root';
$dbPassword = 'root';
$dbName = 'websitefeedback';

$db = mysqli_connect($dbLocation, 
                     $dbUsername, 
                     $dbPassword, 
                     $dbName);

// Function to retrieve feedback data for a specific user
function getUserFeedback($conn, $email) {
    $email = $conn->real_escape_string($email);
    $sql = "SELECT name, email_address, rating, feedback, created_at FROM replies WHERE email_address = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $feedbackData = array();
        while ($row = $result->fetch_assoc()) {
            $feedbackData[] = $row;
        }
        return $feedbackData;
    } else {
        return null; // No feedback found for the user
    }
}

// Function to generate CSV content from feedback data
function generateCSV($feedbackData) {
    $output = fopen("php://output", "w");
    fputcsv($output, array('Name', 'Email', 'Rating', 'Feedback', 'Created At'));

    foreach ($feedbackData as $feedback) {
        fputcsv($output, $feedback);
    }

    fclose($output);
}

// Form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve email from POST data
    $email = $_POST['email_download'];

    // Retrieve feedback data for the user
    $feedbackData = getUserFeedback($db, $email);

    if ($feedbackData !== null) {
        // Set appropriate headers for CSV download
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="feedback.csv"');

        // Generate CSV content from feedback data
        generateCSV($feedbackData);
    } else {
        echo "No feedback found for the user.";
    }
}

// Close database connection
mysqli_close($db);
?>
