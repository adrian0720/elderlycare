// Password visibility toggle
  const toggleLoginPassword = document.getElementById('toggle-login-password');
  const toggleRegisterPassword = document.getElementById('toggle-password');

  toggleLoginPassword.addEventListener('click', function() {
    const passwordField = document.getElementById('login-password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    toggleLoginPassword.src = passwordField.type === 'password' ? 'hide.jpg' : 'unhide.jpg';
  });

  toggleRegisterPassword.addEventListener('click', function() {
    const passwordField = document.getElementById('register-password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    toggleRegisterPassword.src = passwordField.type === 'password' ? 'hide.jpg' : 'unhide.jpg';
  });

  // Initialize to login form
  showForm('login-form-container');

  // Select the toggle checkbox and the body element
const toggleCheckbox = document.getElementById('toggle-checkbox');
const body = document.body;

// Function to switch themes
const toggleTheme = () => {
    if (toggleCheckbox.checked) {
        body.classList.add('dark-mode'); // Add dark mode class
        body.classList.remove('light-mode'); // Remove light mode class
    } else {
        body.classList.remove('dark-mode'); // Remove dark mode class
        body.classList.add('light-mode'); // Add light mode class
    }
};

// Event listener for checkbox change
toggleCheckbox.addEventListener('change', toggleTheme);

// Optional: Load the theme based on saved preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    toggleCheckbox.checked = true; // Set the checkbox to checked
    body.classList.add('dark-mode'); // Apply dark mode class
} else {
    body.classList.add('light-mode'); // Apply light mode class
}

// Save the theme in local storage when toggled
toggleCheckbox.addEventListener('change', () => {
    if (toggleCheckbox.checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


