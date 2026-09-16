document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("pickup-date");

  if (form) {
    form.addEventListener("submit", function (event) {
      // 1. ALWAYS prevent the page from redirecting to a 404 page
      event.preventDefault();

      // 2. Clear old error messages
      clearErrors();

      let isValid = true;

      // 3. Email Validation Check
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      }

      // 4. Future Date Validation Check
      if (dateInput) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!dateInput.value || selectedDate < today) {
          showError(dateInput, "Please select a pickup date in the future.");
          isValid = false;
        }
      }

      // 5. If valid, process submission/storage
      if (isValid) {
        alert("Pre-order request submitted successfully!");
      }
    });
  }

  function showError(inputElement, message) {
    const errorContainer = document.createElement("span");
    errorContainer.className = "error-message";
    errorContainer.style.color = "#d9534f";
    errorContainer.style.fontSize = "0.85rem";
    errorContainer.style.display = "block";
    errorContainer.style.marginTop = "0.25rem";
    errorContainer.style.fontWeight = "bold";
    errorContainer.innerText = message;

    if (inputElement && inputElement.parentNode) {
      inputElement.parentNode.appendChild(errorContainer);
    }
  }

  function clearErrors() {
    const existingErrors = document.querySelectorAll(".error-message");
    existingErrors.forEach((error) => error.remove());
  }
});
