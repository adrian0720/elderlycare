// Get the modal
const editModal = document.getElementById("editModal");

// Get the button that opens the modal
const editButton = document.getElementById("editButton");

// Get each close button by ID
const closeModalBottom = document.getElementById("closeModalBottom");

// Open the modal when the edit button is clicked
editButton.onclick = function() {
    editModal.style.display = "block";
}

// Close the modal when either close button is clicked
closeModalTop.onclick = function() {
    editModal.style.display = "none";
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
}



 


        // Get the email from sessionStorage
const userEmail = sessionStorage.getItem('userEmail');

// Function to fetch user data from Firestore
async function fetchUserData(email) {
    try {
        const userRef = db.collection('users').doc(email); // Adjust the path if necessary
        const doc = await userRef.get();

        if (!doc.exists) {
            console.error('No such user found!');
            return null; // No user data found
        }

        return doc.data(); // Return the user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null; // Return null on error
    }
}

// Check if the email exists in sessionStorage
if (userEmail) 
    // Update the email display in the dashboard
    document.getElementById('displayEmail').textContent = userEmail;

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
        console.error('Error storing medical history: ', error);
        alert("An error occurred while storing the information.");
    }
});



// Sidebar menu functionality
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

// Sidebar toggle functionality
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

// Initial sidebar state based on window width
if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    // Make sure searchButtonIcon and searchForm are defined before this
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

// Handle window resize events
window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

// Search form and button functionality
const searchForm = document.querySelector('#content nav form'); // Moved up for clarity
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault(); // Prevent default form submission
        searchForm.classList.toggle('show');

        // Toggle search button icon
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});









