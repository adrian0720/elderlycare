import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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
const auth = getAuth();
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

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn')) {
        // User is logged in, redirect to the dashboard
        window.location.href = '/dashboard.html'; // Adjust to your actual dashboard path
    }
});

// Handle Sign Up
document.getElementById('registersubmit').addEventListener('click', (event) => {
    event.preventDefault();
    let email = document.getElementById('register-email').value.trim();
    let password = document.getElementById('register-password').value;
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let securityQuestion = document.getElementById('security-question').value;
    let securityAnswer = document.getElementById('security-answer').value;

    // Validate inputs
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'signUpMessage');
        return;
    }
    if (firstName.trim() === '' || lastName.trim() === '') {
        showMessage('Please enter your First Name and Last Name.', 'signUpMessage');
        return;
    }
    if (securityQuestion === '' || securityAnswer.trim() === '') {
        showMessage('Please select a security question and provide an answer.', 'signUpMessage');
        return;
    }

    // Create user with Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user); // Log user information
            const userData = {
                email,
                firstName,
                lastName,
                securityQuestion,
                securityAnswer
            };

            console.log("User data to be stored:", userData); // Log data to be stored

            // Set user data in Firestore
            return setDoc(doc(db, "users", user.uid), userData);
        })
        .then(() => {
            showMessage('Account Created Successfully', 'signUpMessage');
            showForm('login-form-container'); // Switch to login form
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else {
                showMessage(`Unable to create User: ${error.message}`, 'signUpMessage');
            }
        });
});

// Handle Sign In
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
            showMessage('Login is successful', 'signInMessage');
            window.history.replaceState(null, null, '/dashboard.html'); // Replace the history state
            window.location.href = '/dashboard.html'; // Redirect after successful login
        })
        .catch(() => {
            showMessage('Incorrect email or password. Please try again.', 'signInMessage');
        });
});

// Handle Forgot Password
document.getElementById('forgotpasswordbutton').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action
    const email = document.getElementById('forgot-email').value.trim(); // Get the email from the input field

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'signInMessage');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("A password reset link has been sent to your email.");
            showForm('login-form-container'); // Optionally, switch back to the login form
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            showMessage(`Error: ${error.message}`, 'signInMessage');
        });
});


