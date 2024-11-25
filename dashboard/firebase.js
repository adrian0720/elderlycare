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
        window.location.href = 'index.html'; // Adjust the path to your login page
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
import { getFirestore, setDoc, doc, collection, serverTimestamp, query, where, getDocs,getDoc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
const database = getDatabase(app);


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
            stars.forEach   ((s, index) => {
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

        alert('Thankyou for giving feedback, we appreciate your concern!');
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



// Function to get user details by document ID
async function getUserInfoByDocumentId(docId) {
    try {
        console.log("Attempting to fetch user data with document ID:", docId);

        // Reference the document using the document ID
        const docRef = doc(db, "users", docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log("User data fetched:", data);  // For debugging

            // Populate form fields with user data
            document.getElementById("emailDisplay").value = data.email || '';
            document.getElementById("firstName").value = data.firstName || '';
            document.getElementById("lastName").value = data.lastName || '';
            document.getElementById("age").value = data.age || '';
            document.getElementById("height").value = data.height || '';
            document.getElementById("weight").value = data.weight || '';
            document.getElementById("sex").value = data.sex || '';
            document.getElementById("condition").value = data.condition || '';
            document.getElementById("contact").value = data.contact || '';
            document.getElementById("guardian").value = data.guardian || '';
            document.getElementById("relationship").value = data.relationship || '';

            // Make email field readonly (non-editable)
            document.getElementById("emailDisplay").setAttribute("readonly", true);
            
            document.getElementById("documentId").innerText = docSnapshot.id; // Display document ID

            // Clear any error messages if data was fetched successfully
            document.getElementById("signInMessage").innerText = "";
        } else {
            // Show message if no document exists for this ID
            document.getElementById("signInMessage").innerText = "No document found for this ID.";
            console.warn("No document found with ID:", docId);
        }
    } catch (error) {
        console.error("Error getting document data: ", error);
        document.getElementById("signInMessage").innerText = `Error retrieving document data: ${error.message}`;
    }
}

// Function to get document ID by email and check email in Realtime Database
async function getDocumentIdByEmail(email) {
    try {
        console.log("Attempting to query document with email:", email);

        // Query the 'users' collection in Firestore for a document with the specified email
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Assuming each email is unique
            console.log("Document ID fetched from Firestore:", doc.id);

            // Display the document ID
            document.getElementById("documentId").innerText = doc.id;

            // Fetch and populate user information
            await getUserInfoByDocumentId(doc.id);

            // Optional: Check if the email matches in Realtime Database (if needed)
            checkEmailInRealtimeDatabase(doc.id, email);
        } else {
            document.getElementById("signInMessage").innerText = "No document found for this email in Firestore.";
            console.warn("No document found with email:", email);
        }
    } catch (error) {
        console.error("Error getting document ID from Firestore:", error);
        document.getElementById("signInMessage").innerText = `Error retrieving document ID: ${error.message}`;
    }
}


// Function to initialize email display and document query on page load
function initializeDashboard() {
    const emailToDisplay = sessionStorage.getItem("userEmail");

    if (emailToDisplay) {
        document.getElementById("emailDisplay").value = emailToDisplay;
        getDocumentIdByEmail(emailToDisplay);
    } else {
        document.getElementById("signInMessage").innerText = "User not logged in.";
        console.log("No email found in session storage. Redirect to login or prompt for login.");
    }
}

// Execute the initialization on page load
document.addEventListener("DOMContentLoaded", initializeDashboard);

// Helper function to get document ID from URL (if applicable)
function getDocIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('docId');
}

// Fetch user details by document ID from URL (if available)
const docId = getDocIdFromUrl();
if (docId) {
    getUserInfoByDocumentId(docId);
}

// Edit functionality
document.getElementById("editButton").addEventListener("click", () => {
    document.querySelectorAll("#patientForm input").forEach(input => {
        // Disable the email input during the edit process
        if (input.id !== "emailDisplay") {
            input.disabled = false;
        }
    });
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("cancelButton").style.display = "block";
    document.getElementById("editButton").style.display = "none";
});

// Save functionality
document.getElementById("saveButton").addEventListener("click", async () => {
    // Collecting the updated data from the form
    const email = document.getElementById("emailDisplay").value;  // Email is not editable
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const sex = document.getElementById("sex").value;
    const condition = document.getElementById("condition").value;
    const contact = document.getElementById("contact").value;
    const guardian = document.getElementById("guardian").value;
    const relationship = document.getElementById("relationship").value;

    // Validation Checks
    if (!/^\d{1,2}(\.\d{1,2})?$/.test(height)) {  // Check for height (e.g., 5, 5.5)
        alert("Height must be in feet (e.g., 5 or 5.5).");
        return;
    }

    if (!/^\d+$/.test(weight) || parseInt(weight) <= 0) {  // Check for weight (positive number)
        alert("Weight must be a valid number in pounds.");
        return;
    }

    if (!/^09\d{9}$/.test(contact)) {  // Check for contact number starting with "09" and followed by 9 digits
        alert("Contact number must start with '09' and be 11 digits long.");
        return;
    }

    // Create updated data object
    const updatedData = {
        email,  // Email is not editable
        firstName,
        lastName,
        age,
        height,
        weight,
        sex,
        condition,
        contact,
        guardian,
        relationship,
    };

    // Get the document ID from the UI
    const docId = document.getElementById("documentId").innerText;

    // Check if document ID is available
    if (!docId) {
        alert("Document ID is missing.");
        return;  // Exit if there's no document ID
    }

    try {
        // Get a reference to the Firestore document you want to update
        const docRef = doc(db, "users", docId);

        // Use updateDoc to update the fields
        await updateDoc(docRef, updatedData);

        alert("Details updated successfully.");

        // Disable form fields and show the edit button after successful save
        document.querySelectorAll("#patientForm input").forEach(input => input.disabled = true);
        document.getElementById("editButton").style.display = "block";
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
    } catch (error) {
        console.error("Error updating document:", error);
        alert(`Failed to update details: ${error.message}`);
    }
});
























































// Get the email from sessionStorage and display it
document.addEventListener("DOMContentLoaded", () => {
    const userEmail = sessionStorage.getItem('healthEmail');

    // Check if userEmail exists in sessionStorage and populate the display
    if (userEmail) {
        document.getElementById('email').value = userEmail;
        document.getElementById('emailhealth').textContent = userEmail;
    } else {
        console.log("No user email found in session storage.");
    }
});




// Constants for abnormal thresholds
const HEART_RATE_LOW = 60;
const HEART_RATE_HIGH = 100;
const SPO2_LOW = 90;
const SPO2_HIGH = 100;

// Variables to track the last stored values
let lastStoredHeartRate = null;
let lastStoredSpo2 = null;

// Function to check if the email in sessionStorage matches the email in Realtime Database
async function checkEmailInRealtimeDatabase() {
    const db = getDatabase();
    const firestore = getFirestore();
    const userEmail = sessionStorage.getItem('healthEmail');

    if (!userEmail) {
        console.log("No user email found in session storage.");
        document.getElementById("signInMessage").innerText = "No email found.";
        return;
    }

    console.log(`Checking email from sessionStorage: '${userEmail}'`);

    const healthDataEmailRef = ref(db, "sensorReading/email/Value");

    // Set up a listener for changes to the email value
    onValue(healthDataEmailRef, async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Email data from Realtime Database:", data);

            if (data === userEmail) {
                console.log("Email found and matched in Realtime Database.");

                const heartRateRef = ref(db, "sensorReading/heartRate/value");
                const spo2Ref = ref(db, "sensorReading/oximeter/value");

                const heartRateSnapshot = await get(heartRateRef);
                const spo2Snapshot = await get(spo2Ref);

                const heartRate = heartRateSnapshot.exists() ? parseInt(heartRateSnapshot.val(), 10) : null;
                const spo2 = spo2Snapshot.exists() ? parseInt(spo2Snapshot.val(), 10) : null;

                // Update UI with health data
                document.getElementById("heart-rate").innerText = heartRate !== null ? heartRate : '--';
                document.getElementById("oxygen-level").innerText = spo2 !== null ? spo2 : '--';

                // Check for abnormal values
                const isHeartRateAbnormal = heartRate !== null && (heartRate < HEART_RATE_LOW || heartRate > HEART_RATE_HIGH);
                const isSpo2Abnormal = spo2 !== null && (spo2 < SPO2_LOW || spo2 > SPO2_HIGH);

                if (isHeartRateAbnormal || isSpo2Abnormal) {
                    console.log("Abnormal readings detected.");

                    // Check if the values have changed
                    if (heartRate === lastStoredHeartRate && spo2 === lastStoredSpo2) {
                        console.log("Values are the same as the last stored readings. Skipping storage.");
                        return;
                    }

                    // Update the last stored values
                    lastStoredHeartRate = heartRate;
                    lastStoredSpo2 = spo2;

                    try {
                        const emailDocRef = doc(firestore, "AbnoRatesOx", userEmail);
                        const readingsCollectionRef = collection(emailDocRef, "Readings");

                        // Format the time correctly
                        const formattedTime = new Intl.DateTimeFormat('en-US', {
                            timeZone: 'Asia/Manila',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }).format(new Date());

                        const newReading = {
                            heartRate: heartRate !== null ? heartRate.toString() : "N/A",
                            oxygen: spo2 !== null ? spo2.toString() : "N/A",
                            time: formattedTime,
                            email: userEmail,
                        };

                        // Add a new document to the "Readings" subcollection
                        await addDoc(readingsCollectionRef, newReading);
                        console.log("Abnormal reading stored in Firestore:", newReading);

                    } catch (error) {
                        console.error("Error storing data in Firestore:", error);
                    }
                } else {
                    console.log("Readings are within normal ranges. No storage needed.");
                }
            } else {
                console.log("Email does not match in Realtime Database.");
                document.getElementById("signInMessage").innerText = "";
            }
        } else {
            console.log("No email found in Realtime Database.");
            document.getElementById("signInMessage").innerText = "";
        }
    });
}



// Call the function once to set up the real-time listener
checkEmailInRealtimeDatabase();
// Set an interval to check every half-second
setInterval(checkEmailInRealtimeDatabase, 500);





















async function loadAbnormalReadings() {
    const firestore = getFirestore();
    const userEmail = sessionStorage.getItem('healthEmail');

    if (!userEmail) {
        console.log("No user email found in session storage.");
        document.querySelector(".abnormal-readings").innerHTML = "<p>No user email found.</p>";
        return;
    }

    console.log(`Loading abnormal readings for: ${userEmail}`);

    try {
        // Reference to the user's document and the "Readings" subcollection
        const emailDocRef = doc(firestore, "AbnoRatesOx", userEmail);
        const readingsCollectionRef = collection(emailDocRef, "Readings");

        // Get all readings
        const querySnapshot = await getDocs(readingsCollectionRef);

        const tableBody = document.querySelector(".readings-table tbody");
        tableBody.innerHTML = ""; // Clear any existing rows

        if (querySnapshot.empty) {
            console.log("No readings found.");
            tableBody.innerHTML = "<tr><td colspan='4'>No abnormal readings found.</td></tr>";
            return;
        }

        // Iterate through each document in the "Readings" subcollection
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create a single row with heart rate, oxygen level, and time
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><strong>Heart Rate & Oxygen</strong></td>
                <td><h4>${data.heartRate ? `${data.heartRate} bpm` : "N/A"} | ${data.oxygen ? `${data.oxygen}%` : "N/A"}</h4></td>
                <td>${data.time}</td>
                <td>
                    ${
                        data.heartRate && (data.heartRate < 60 || data.heartRate > 100)
                            ? "Abnormal heart rate detected."
                            : ""
                    }
                    ${
                        data.oxygen && (data.oxygen < 90 || data.oxygen > 100)
                            ? " Abnormal oxygen level detected."
                            : ""
                    }
                </td>
            `;
            tableBody.appendChild(row);
        });

        console.log("Abnormal readings loaded successfully.");

    } catch (error) {
        console.error("Error loading abnormal readings:", error);
        document.querySelector(".abnormal-readings").innerHTML = "<p>Error loading abnormal readings.</p>";
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadAbnormalReadings);
