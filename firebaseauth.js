import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4KuuoGMia_8x8UCwLpfbZtsGVk_cSzD0",
    authDomain: "signup-login-e989d.firebaseapp.com",
    projectId: "signup-login-e989d",
    storageBucket: "signup-login-e989d.appspot.com",
    messagingSenderId: "946476040002",
    appId: "1:946476040002:web:2c5dd5a27aa306f39012db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Show message function
function showMessage(message, divId) {
    let messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Email validation function
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Handle Sign Up
document.getElementById('registersubmit').addEventListener('click', async (event) => {
    event.preventDefault();

    // Get form values
    let email = document.getElementById('register-email').value.trim();
    let firstName = document.getElementById('firstname').value.trim();
    let lastName = document.getElementById('lastname').value.trim();

    // Validate inputs
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'signUpMessage');
        return;
    }
    if (firstName === '' || lastName === '') {
        showMessage('Please enter your First Name and Last Name.', 'signUpMessage');
        return;
    }

    // Store user data in Firestore under "users" collection
    try {
        const userData = {
            email,
            firstName,
            lastName
        };

        // Generate a new document ID for the user in the "users" collection
        const userDocRef = doc(collection(db, "users"));
        await setDoc(userDocRef, userData);

        showMessage('Account Created Successfully', 'signUpMessage');
        showForm('login-form-container'); // Switch to login form

    } catch (error) {
        showMessage(`Unable to create User: ${error.message}`, 'signUpMessage');
    }
});



  // Handle Sign In
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('loginsubmit').addEventListener('click', (event) => {
                event.preventDefault();
                let email = document.getElementById('login-email').value.trim();
                let password = document.getElementById('login-password').value;

                if (!isValidEmail(email) || email.trim() === '' || password.trim() === '') {
                    showMessage('Please enter a valid email and password.', 'signInMessage');
                    return;
                }

                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        // Set session storage on successful login
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('userEmail', email); // Store the email in session storage
                        console.log('Email stored in session storage:', email); // Debug: log stored email
                        
                        // Redirect after successful login
                        showMessage('Login is successful', 'signInMessage');
                        window.location.href = '/dashboard/dashboard.html'; // Redirect after successful login
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(errorCode, errorMessage);
                        showMessage('Incorrect email or password. Please try again.', 'signInMessage');
                    });
            });
        });






















// Handle Forgot Password
document.getElementById('forgotpasswordbutton').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action
    const email = document.getElementById('forgot-email').value.trim(); // Get the email from the input field

    // Validate the email address
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'signInMessage');
        return;
    }

    // Send password reset email        
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("A password reset link has been sent to your email.");
            showForm('login-form-container'); // Optionally, switch back to the login form
        })
        .catch((error) => {
            console.error(error.code);
            console.error(error.message);
            showMessage(`Error: ${error.message}`, 'signInMessage'); // Fixed syntax for template literals
        });
});
