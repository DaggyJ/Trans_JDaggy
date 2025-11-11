document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const messageField = document.getElementById("message");
  const feedback = document.getElementById("form-feedback");
  const submitBtn = form.querySelector("button[type='submit']");

  const phoneRegex = /^\+[0-9]{7,15}$/; // country code + 7–15 digits

  // Step-by-step Enter key navigation
  function handleEnterNavigation(currentField, nextField, validateFn, errorMsg) {
    currentField.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!validateFn(currentField.value.trim())) {
          feedback.textContent = errorMsg;
          feedback.style.color = "red";
        } else {
          feedback.textContent = "";
          nextField.focus();
        }
      }
    });
  }

  handleEnterNavigation(nameField, emailField, val => val.length >= 2, "Please enter your full name.");
  handleEnterNavigation(emailField, phoneField, val => val.includes("@") && !val.startsWith("@") && !val.endsWith("@"), "Please enter a valid email address.");
  handleEnterNavigation(phoneField, messageField, val => phoneRegex.test(val), "Phone must start with + and have 7–15 digits.");

  // Form submission via AJAX
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const phone = phoneField.value.trim();
    const message = messageField.value.trim();
    const wordCount = message.split(/\s+/).filter(Boolean).length;

    if (name.length < 2) {
      feedback.textContent = "Please enter your full name.";
      feedback.style.color = "red";
      nameField.focus();
      return;
    }

    if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.style.color = "red";
      emailField.focus();
      return;
    }

    if (!phoneRegex.test(phone)) {
      feedback.textContent = "Phone must start with + and have 7–15 digits.";
      feedback.style.color = "red";
      phoneField.focus();
      return;
    }

    if (wordCount < 15) {
      feedback.textContent = "Your prayer request must be at least 15 words.";
      feedback.style.color = "red";
      messageField.focus();
      return;
    }

    fetch("https://formspree.io/f/mjkpzzdk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        _replyto: email,
        phone: phone,
        message: message
      })
    })
    .then(res => {
      if (res.ok) {
        feedback.textContent = "Your prayer request has been sent!";
        feedback.style.color = "green";
        form.reset();
        nameField.focus();

        // Change submit button color on success
        submitBtn.classList.add("submitted");
        submitBtn.disabled = true; // optional: prevent multiple clicks
      } else {
        feedback.textContent = "Failed to send. Try again later.";
        feedback.style.color = "red";
      }
    })
    .catch(err => {
      feedback.textContent = "Error sending request.";
      feedback.style.color = "red";
      console.error(err);
    });
  });
});
