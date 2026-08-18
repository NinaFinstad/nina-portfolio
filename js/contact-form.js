const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");
const errorMessage = document.getElementById("form-error");
const submitButton = contactForm.querySelector(".form-submit");
const originalButtonText = submitButton.textContent;

let statusTimer;

function hideStatusMessages() {
    clearTimeout(statusTimer);
    successMessage.hidden = true;
    errorMessage.hidden = true;
}

contactForm.addEventListener("input", hideStatusMessages);

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    hideStatusMessages();

    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    try {
        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            contactForm.reset();
            successMessage.hidden = false;

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            statusTimer = setTimeout(function () {
                successMessage.hidden = true;
            }, 8000);
        } else {
            errorMessage.hidden = false;
        }
    } catch (error) {
        errorMessage.hidden = false;
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});