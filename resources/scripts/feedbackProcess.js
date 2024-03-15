//Displays the feedback as well as name and email submitted by user

function displayInfo() {
    var feedbackFormObj = document.getElementById("feedback");
    var fullName = feedbackFormObj.fullName.value;
    var email = feedbackFormObj.email.value;
    var rating_value = document.querySelector('input[name="rating"]:checked').value;
    var openFeedback = document.getElementById("feedbackOpen").value;
    var text;

    var allGood = true;

    if (!validateName(fullName)) {
        alert("Error: Invalid name.");
        allGood = false;
    }

    if (!validateEmail(email)) {
        alert("Error: Invalid email.");
        allGood = false;
    }

    if (rating_value == null) {
        alert("Error: None of the ratings were selected.");
        allGood = false;
    }

    if(allGood) {
        text = "Thanks for your feedback! What was submitted is shown below.\n\n";
        text += "Name:  " + fullName + "\n";
        text += "Email: " + email + "\n";
        text += "Rating: " + rating_value + "\n\n";
        if (openFeedback == null) {

        } else {
            text += "Feedback:\n" + openFeedback;
        }

        alert(text);
    } else {
        alert("There was an error collecting your feedback, please email me directly to let me know something broke!")
    }

}

function validateName(name)
{
    var p = name.search(/^[-'\w\s]+$/);
    if (p == 0)
        return true;
    else
        return false;
}

function validateEmail(address)
{
    var p = address.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (p == 0)
        return true;
    else
        return false;
}