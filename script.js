document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeatPassword');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d+$/;

    function showError(input, errorElementId, message) {
        if (input) input.classList.add('input-error');
        const errorSpan = document.getElementById(errorElementId);
        errorSpan.textContent = message;
    }

    function clearError(input, errorElementId) {
        if (input) input.classList.remove('input-error');
        const errorSpan = document.getElementById(errorElementId);
        errorSpan.textContent = '';
    }


    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'nameError', 'Name is required.');
            return false;
        }
        clearError(nameInput, 'nameError');
        return true;
    }

    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'usernameError', 'Username is required.');
            return false;
        }
        clearError(usernameInput, 'usernameError');
        return true;
    }

    function validatePassword() {
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'passwordError', 'Password is required.');
            return false;
        }
        clearError(passwordInput, 'passwordError');
        if (repeatPasswordInput.value.trim() !== '') {
            validateRepeatPassword();
        }
        return true;
    }

    function validateRepeatPassword() {
        if (repeatPasswordInput.value.trim() === '') {
            showError(repeatPasswordInput, 'repeatPasswordError', 'Please repeat your password.');
            return false;
        }
        if (repeatPasswordInput.value !== passwordInput.value) {
            showError(repeatPasswordInput, 'repeatPasswordError', 'Passwords do not match.');
            return false;
        }
        clearError(repeatPasswordInput, 'repeatPasswordError');
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'emailError', 'Email is required.');
            return false;
        }
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'emailError', 'Please enter a valid email address (e.g., nameUser@domain.com).');
            return false;
        }
        clearError(emailInput, 'emailError');
        return true;
    }

    function validateTelephone() {
        const phoneValue = telephoneInput.value.trim();
        if (phoneValue === '') {
            showError(telephoneInput, 'telephoneError', 'Telephone is required.');
            return false;
        }
        if (!phoneRegex.test(phoneValue)) {
            showError(telephoneInput, 'telephoneError', 'Telephone should contain only numbers (+ at the start is allowed).');
            return false;
        }
        clearError(telephoneInput, 'telephoneError');
        return true;
    }

    function validateGender() {
        const isChecked = Array.from(genderRadios).some(radio => radio.checked);
        if (!isChecked) {
            showError(null, 'genderError', 'Please select a gender.');
            return false;
        }
        clearError(null, 'genderError');
        return true;
    }

    nameInput.addEventListener('blur', validateName);
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);
    repeatPasswordInput.addEventListener('blur', validateRepeatPassword);
    emailInput.addEventListener('blur', validateEmail);
    telephoneInput.addEventListener('blur', validateTelephone);
    
    genderRadios.forEach(radio => {
        radio.addEventListener('change', validateGender);
    });


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isRepeatValid = validateRepeatPassword();
        const isEmailValid = validateEmail();
        const isTelephoneValid = validateTelephone();
        const isGenderValid = validateGender();

        if (isNameValid && isUsernameValid && isPasswordValid && 
            isRepeatValid && isEmailValid && isTelephoneValid && isGenderValid) {
            
            alert('Form submitted successfully!');
        }
    });
    form.addEventListener('reset', () => {
        const errors = document.querySelectorAll('.error-hint');
        errors.forEach(error => error.textContent = '');
        
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    });
});