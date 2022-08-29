/** This function collects the users input values of the contact form 
 * attributes (name, emailaddress, projectsummary) from contact.html.
 * Once the emailjs.send promise has executed, the .then promise is executed
 * console logging either a success or error message, depending on users input.
*/
function sendMail(contactForm) {
    emailjs.send("gmail", "rosie", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value,
    })
    .then(
        function(response) {
            console.log("SUCCESS!", response);
        }, 
        function(error) {
            console.log("ERROR!", error);
        }
    )
};