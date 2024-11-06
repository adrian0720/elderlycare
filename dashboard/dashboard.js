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


// Bar graph functionality
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.bar');

    bars.forEach((bar) => {
        const barHeight = bar.getAttribute('data-height');
        bar.style.height = `calc(${barHeight}% - 20px)`; // Set height based on data attribute
    });
});

// Logout functionality
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action of the link
    // Redirect to the logout page
    window.location.href = '/website/index.html'; // Adjust the path as needed
});

function toggleCategory(formId) {
    const form = document.getElementById(formId);
    form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
}


// Select the elements
const informationSection = document.getElementById('Information');
const contentSection = document.getElementById('content');
const infoLink = document.querySelector('a[href="#information"]');

// Hide the information section initially
informationSection.style.display = 'none';

// Function to show the information section and hide the content section
function toggleInformation() {
    // Check if the information section is currently displayed
    if (informationSection.style.display === 'none') {
        // Show the information section and hide the content section
        informationSection.style.display = 'block';
        contentSection.style.display = 'none';
    } else {
        // If it's already displayed, just keep it displayed
        contentSection.style.display = 'none'; // Hide content if needed
    }
}

// Add click event listener to the information link
infoLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    toggleInformation(); // Call the toggle function
});
