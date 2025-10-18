// Form Validation and Authentication
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.luxury-input');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });

        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            loginUser();
        }

        loginForm.classList.add('was-validated');
    });

    function validateField(field) {
        const errorElement = field.nextElementSibling;
        
        // Reset
        field.classList.remove('is-invalid', 'is-valid');
        errorElement.style.display = 'none';

        // Required validation
        if (field.validity.valueMissing) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'This field is required';
            errorElement.style.display = 'block';
            return false;
        }

        // Email validation
        if (field.type === 'email' && field.validity.typeMismatch) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.style.display = 'block';
            return false;
        }

        // Password validation
        if (field.type === 'password' && field.validity.tooShort) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'Password must be at least 6 characters';
            errorElement.style.display = 'block';
            return false;
        }

        // Username validation
        if (field.id === 'username' && field.value.length < 3) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'Username must be at least 3 characters';
            errorElement.style.display = 'block';
            return false;
        }

        // Valid
        field.classList.add('is-valid');
        return true;
    }

    function loginUser() {
        const userData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            loginTime: new Date().toISOString(),
            isLoggedIn: true
        };

        // Save to localStorage
        localStorage.setItem('veloraUser', JSON.stringify(userData));
        
        // Show success and redirect
        showLoginSuccess();
    }

    function showLoginSuccess() {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Welcome! Redirecting...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Add success animation
        loginForm.classList.add('animate__animated', 'animate__pulse');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}); 