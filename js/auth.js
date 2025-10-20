// js/auth.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.luxury-input');

    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) authenticateUser();
        loginForm.classList.add('was-validated');
    });

    function validateField(field) {
        const errorElement = field.nextElementSibling;
        field.classList.remove('is-invalid', 'is-valid');
        errorElement.style.display = 'none';

        if (field.validity.valueMissing) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'This field is required';
            errorElement.style.display = 'block';
            return false;
        }

        if (field.type === 'password' && field.value.length < 6) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'Password must be at least 6 characters';
            errorElement.style.display = 'block';
            return false;
        }

        field.classList.add('is-valid');
        return true;
    }

    async function authenticateUser() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('users.json');

            const data = await response.json();
            console.log(data);
            const user = data.users.find(
                u => u.username === username && u.password === password
            );

            if (user) {
                sessionStorage.setItem('isLoggedIn', 'true');
                showLoginSuccess();
            } else {
                showError('Invalid username or password');
            }
        } catch (err) {
            console.error('Error loading user data:', err);
            showError('Login failed. Try again.');
        }
    }

    function showError(message) {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>' + message;
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #e53935, #e35d5b)';
        setTimeout(() => {
            submitBtn.innerHTML = 'Login';
            submitBtn.style.background = '';
        }, 2000);
    }

    function showLoginSuccess() {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Welcome! Redirecting...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

        loginForm.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }
});


// Form Validation and Authentication
// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('loginForm');
//     const inputs = document.querySelectorAll('.luxury-input');

//     // Real-time validation
//     inputs.forEach(input => {
//         input.addEventListener('input', function() {
//             validateField(this);
//         });

//         input.addEventListener('blur', function() {
//             validateField(this);
//         });
//     });

//     // Form submission
//     loginForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         e.stopPropagation();

//         let isValid = true;

//         // Validate all fields
//         inputs.forEach(input => {
//             if (!validateField(input)) {
//                 isValid = false;
//             }
//         });

//         if (isValid) {
//             loginUser();
//         }

//         loginForm.classList.add('was-validated');
//     });

//     function validateField(field) {
//         const errorElement = field.nextElementSibling;
        
//         // Reset
//         field.classList.remove('is-invalid', 'is-valid');
//         errorElement.style.display = 'none';

//         // Required validation
//         if (field.validity.valueMissing) {
//             field.classList.add('is-invalid');
//             errorElement.textContent = 'This field is required';
//             errorElement.style.display = 'block';
//             return false;
//         }

//         // Email validation
//         if (field.type === 'email' && field.validity.typeMismatch) {
//             field.classList.add('is-invalid');
//             errorElement.textContent = 'Please enter a valid email address';
//             errorElement.style.display = 'block';
//             return false;
//         }

//         // Password validation
//         if (field.type === 'password' && field.validity.tooShort) {
//             field.classList.add('is-invalid');
//             errorElement.textContent = 'Password must be at least 6 characters';
//             errorElement.style.display = 'block';
//             return false;
//         }

//         // Username validation
//         if (field.id === 'username' && field.value.length < 3) {
//             field.classList.add('is-invalid');
//             errorElement.textContent = 'Username must be at least 3 characters';
//             errorElement.style.display = 'block';
//             return false;
//         }

//         // Valid
//         field.classList.add('is-valid');
//         return true;
//     }

//     function loginUser() {
//         const userData = {
//             username: document.getElementById('username').value,
//             email: document.getElementById('email').value,
//             loginTime: new Date().toISOString(),
//             isLoggedIn: true
//         };

//         // Save to localStorage
//         localStorage.setItem('veloraUser', JSON.stringify(userData));
        
//         // Show success and redirect
//         showLoginSuccess();
//     }

//     function showLoginSuccess() {
//         const submitBtn = loginForm.querySelector('button[type="submit"]');
//         const originalHTML = submitBtn.innerHTML;
        
//         // Success state
//         submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Welcome! Redirecting...';
//         submitBtn.disabled = true;
//         submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
//         // Add success animation
//         loginForm.classList.add('animate__animated', 'animate__pulse');
        
//         setTimeout(() => {
//             window.location.href = 'index.html';
//         }, 2000);
//     }

// }); 

