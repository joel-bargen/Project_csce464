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

// Form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email_address'];
    $name = $_POST['name'];
    $rating = $_POST['rating'];
    $feedback = $_POST['feedback'];

    // Insert data into database
    $insert_query = "INSERT INTO replies (email_address, 
                                            name,
                                            rating,
                                            feedback) 
                        VALUES ('$email', 
                                '$name',
                                '$rating',
                                '$feedback')";
    if ($db->query($insert_query) === TRUE) {
        echo "Registration successful! <br>
                Return to registration page <a href='feedback.html'>here</a>.";
    } else {
        echo "Error: " . $insert_query . "<br>" . $db->error;
    }
}

$db->close();
?>