// Function to display error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success status
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

// Function to validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to check required fields
function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Function to check length of input fields
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Function to check if the email is valid
function checkEmail(input) {
    if (!isValidEmail(input.value)) {
        showError(input, 'Email is not valid');
    } else {
        showSuccess(input);
    }
}

// Function to check if passwords match
function checkPasswordsMatch(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
    } else {
        showSuccess(confirmPassword);
    }
}

// Utility function to get the field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Main form validation handler
function validateForm() {
    // Get form elements
    const form = document.getElementById('myForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        checkRequired([username, email, password, password2]);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordsMatch(password, password2);

        // If form is valid, show success message
        const errors = document.querySelectorAll('.error');
        if (errors.length === 0) {
            alert('Form submitted successfully!');
        }
    });
}

// Run validation when DOM is loaded
document.addEventListener('DOMContentLoaded', validateForm);
