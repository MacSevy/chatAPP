// Get all carousel items
const carouselItems = document.querySelectorAll('.carousel-item');

// Initialize the index to 0 (starting with the first item)
let currentIndex = 0;

// Function to show the current item
function showItem(index) {
    carouselItems.forEach((item, i) => {
        if (i === index) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Function to go to the next item
function nextItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
}

// Function to go to the previous item
function prevItem() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentIndex);
}

// Show the initial item
showItem(currentIndex);

// Add event listeners for next and previous buttons
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

nextButton.addEventListener('click', nextItem);
prevButton.addEventListener('click', prevItem);
