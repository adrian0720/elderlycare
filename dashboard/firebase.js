// Toggle the display of form sections
function toggleCategory(formId) {
    const form = document.getElementById(formId);
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}


// Logout Button Event Listener
document.getElementById('logoutBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action of the link

    // Show the modal
    const modal = document.getElementById('logoutModal');
    modal.style.display = "block";

    // Close the modal when the close button is clicked
    document.querySelector('.close-btn').onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks outside of the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Confirm logout button
    document.getElementById('confirmLogoutBtn').onclick = function () {
        // Clear session storage to log out the user
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail'); // If you're storing other session data, clear it too

        // Optionally show a message or alert for confirmation
        alert("You have successfully logged out!");

        // Redirect the user to the login page after logout
        window.location.href = '/elderlycare/index.html'; // Adjust the path to your login page
    };

    // Cancel button
    document.getElementById('cancelLogoutBtn').onclick = function () {
        modal.style.display = "none";
    };
});

// Block access to dashboard if the user is not logged in
document.addEventListener('DOMContentLoaded', function () {
    if (!sessionStorage.getItem('isLoggedIn')) {
        // User is not logged in, redirect to the login page
        window.location.href = '/index.html'; // Adjust the path to your login page
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, setDoc, doc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Get elements
const feedbackBtn = document.getElementById('feedbackBtn');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.querySelector('.close-btn');
const feedbackForm = document.getElementById('feedbackForm');
const errorMessage = document.getElementById('errorMessage');

// Show popup when clicking the Feedback button
feedbackBtn.addEventListener('click', () => {
    popupForm.style.display = 'flex';
    errorMessage.style.display = 'none'; // Hide error message on popup open
});

// Hide popup when clicking the close button
closeBtn.addEventListener('click', () => {
    popupForm.style.display = 'none';
});

// Hide popup when clicking outside the form
window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.style.display = 'none';
    }
});
// Handle form submission
// Star rating variable
let selectedRating = 0;

document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll("#starRating .star");

    stars.forEach((star) => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.getAttribute("data-value"));

            // Update the selected stars
            stars.forEach((s, index) => {
                s.classList.toggle("selected", index < selectedRating);
            });
        });

        star.addEventListener("mouseover", () => {
            stars.forEach((s, index) => {
                s.classList.toggle("selected", index < star.getAttribute("data-value"));
            });
        });

        star.addEventListener("mouseout", () => {
            stars.forEach((s, index) => {
                s.classList.toggle("selected", index < selectedRating);
            });
        });
    });
});

// Get the email from sessionStorage
let userEmail; // Declare userEmail in a broader scope
document.addEventListener("DOMContentLoaded", () => {
    // Get the email from sessionStorage
    userEmail = sessionStorage.getItem('userEmail');

    // Check if the email exists in sessionStorage and populate the email input and display
    if (userEmail) {
        // Populate the email field in the form automatically
        document.getElementById('email').value = userEmail;

        // Populate the email display in the additional-info section
        document.getElementById('emailDisplay').textContent = userEmail; // Ensure the span has an ID of 'emailDisplay'
    } else {
        console.log("No user email found in session storage.");
        // Optionally, handle cases where the userEmail is missing (e.g., redirect to login)
    }
});


// Feedback form submission
feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get input values
    const feedback = document.getElementById('feedback').value;

    try {
        // Add feedback to Firestore with rating, using userEmail directly
        await setDoc(doc(collection(db, 'feedback')), {
            email: userEmail, // Use email from sessionStorage
            feedback: feedback,
            rating: selectedRating, // Include selected rating
            timestamp: serverTimestamp()
        });

        alert('Feedback submitted successfully!');
        feedbackForm.reset(); // Clear the form
        selectedRating = 0; // Reset selected rating
        stars.forEach((star) => star.classList.remove("selected")); // Deselect all stars
        popupForm.style.display = 'none'; // Close the popup

        // Hide the error message if previously displayed
        errorMessage.style.display = 'none';

    } catch (error) {
        console.error('Error adding feedback: ', error);
       
    }
});


















// Handle the form submission
document.getElementById('medicalHistoryForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const recordDate = document.getElementById('recordDate').value; // Get the date
    const recordDescription = document.getElementById('recordDescription').value; // Get the record description
    const userEmail = sessionStorage.getItem('userEmail'); // Get the user email

    // Prepare the data to store in Firestore
    const dataToStore = {
        email: userEmail, // Use email from sessionStorage
        datestamp: recordDate, // Store the date
        description: recordDescription, // Store the record description
        timestamp: new Date() // Optional: Add a timestamp
    };

    try {
        // Add the data to Firestore in the 'information' collection
        await setDoc(doc(collection(db, 'information')), dataToStore);

        alert("Medical history record has been saved successfully!");

        // Clear the form and close the modal
        document.getElementById('medicalHistoryForm').reset();
        document.getElementById('modalinfo').style.display = 'none';
    } catch (error) {
        // No error messages or alerts here
    }
});

// Open modal on 'Add' button click
document.getElementById('Addinfo').addEventListener('click', () => {
    document.getElementById('modalinfo').style.display = 'block';
});

// Close modal on 'x' click
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalinfo').style.display = 'none';
});

// Close modal if clicked outside of modal content
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modalinfo')) {
        document.getElementById('modalinfo').style.display = 'none';
    }
});

// Function to handle form submission and store data in Firestore
document.getElementById('medicalHistoryForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    // Get form data
    const recordDate = document.getElementById('recordDate').value;
    const recordDescription = document.getElementById('recordDescription').value;
    const email = document.getElementById('emailDisplay').textContent.trim(); // Get email from emailDisplay

    try {
        // Reference to Firestore collection "information"
        const userDocRef = doc(collection(db, 'information'), email); // Use email as document ID

        // Data to be stored
        const medicalHistoryData = {
            date: recordDate,
            description: recordDescription,
            email: email,
            timestamp: new Date()
        };

        // Add the medical history record as a subcollection under the user document
        const medicalHistoryRef = collection(userDocRef, 'medicalHistory');
        await addDoc(medicalHistoryRef, medicalHistoryData); // Add document to subcollection

        alert('Medical history record added successfully!');
        document.getElementById('modalinfo').style.display = 'none'; // Close modal
        document.getElementById('medicalHistoryForm').reset(); // Reset form fields
    } catch (error) {
        // No error messages or alerts here
    }
});




















































async function populateEditForm(email) {
    try {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(collection(db, 'users'), email));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('editFirstName').value = userData.firstName || '';
            document.getElementById('editLastName').value = userData.lastName || '';
            document.getElementById('editAge').value = userData.age || '';
            document.getElementById('editHeight').value = userData.height || '';
            document.getElementById('editWeight').value = userData.weight || '';
            document.getElementById('editSex').value = userData.sex || '';
            document.getElementById('editCondition').value = userData.condition || '';
            document.getElementById('editContact').value = userData.contact || '';
            document.getElementById('editGuardian').value = userData.guardian || '';
            document.getElementById('editRelationship').value = userData.relationship || '';
        } else {
            console.error('No user data found for this email');
        }
    } catch (error) {
        console.error('Error fetching user data: ', error);
    }
}

document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh

    const updatedData = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        age: document.getElementById('editAge').value,
        height: document.getElementById('editHeight').value,
        weight: document.getElementById('editWeight').value,
        sex: document.getElementById('editSex').value,
        condition: document.getElementById('editCondition').value,
        contact: document.getElementById('editContact').value,
        guardian: document.getElementById('editGuardian').value,
        relationship: document.getElementById('editRelationship').value,
    };

    try {
        // Update the user information in Firestore
        await setDoc(doc(collection(db, 'users'), userEmail), updatedData, { merge: true });
        
        alert('Information updated successfully!');
        document.getElementById('editModal').style.display = 'none'; // Close the modal
    } catch (error) {
        console.error('Error updating user information: ', error);
        alert('An error occurred while updating information.');
    }
});

