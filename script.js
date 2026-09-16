document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullNameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("pickup-date");

  // 1. LOAD SAVED DATA FROM LOCALSTORAGE ON PAGE LOAD
  loadFormData();

  // 2. LISTEN FOR INPUT CHANGES TO SAVE DATA INSTANTLY
  if (fullNameInput) {
    fullNameInput.addEventListener("input", saveFormData);
  }
  if (emailInput) {
    emailInput.addEventListener("input", saveFormData);
  }
  if (dateInput) {
    dateInput.addEventListener("change", saveFormData);
  }

  // 3. FORM SUBMISSION & VALIDATION
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Always prevent 404 page redirect
      clearErrors();

      let isValid = true;

      // Full Name Check (First and Last Name)
      const fullNameValue = fullNameInput ? fullNameInput.value.trim() : "";
      const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
      if (!nameRegex.test(fullNameValue)) {
        showError(fullNameInput, "Please enter both your first and last name.");
        isValid = false;
      }

      // Email Validation Check
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      }

      // Future Date Check
      if (dateInput) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!dateInput.value || selectedDate < today) {
          showError(dateInput, "Please select a pickup date in the future.");
          isValid = false;
        }
      }

      if (isValid) {
        saveFormData();
        alert("Pre-order request submitted successfully!");
      }
    });
  }

  // HELPER: Save to localStorage
  function saveFormData() {
    if (fullNameInput) localStorage.setItem("bakery_fullName", fullNameInput.value);
    if (emailInput) localStorage.setItem("bakery_email", emailInput.value);
    if (dateInput) localStorage.setItem("bakery_pickupDate", dateInput.value);
  }

  // HELPER: Restore from localStorage
  function loadFormData() {
    const savedName = localStorage.getItem("bakery_fullName");
    const savedEmail = localStorage.getItem("bakery_email");
    const savedDate = localStorage.getItem("bakery_pickupDate");

    if (savedName && fullNameInput) fullNameInput.value = savedName;
    if (savedEmail && emailInput) emailInput.value = savedEmail;
    
    // Restore date only if it's in the future
    if (savedDate && dateInput) {
      const selectedDate = new Date(savedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate >= today) {
        dateInput.value = savedDate;
      } else {
        localStorage.removeItem("bakery_pickupDate");
      }
    }
  }

  // HELPER: Display error message directly under input field
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

  // HELPER: Clear existing error messages
  function clearErrors() {
    const existingErrors = document.querySelectorAll(".error-message");
    existingErrors.forEach((error) => error.remove());
  }
});
