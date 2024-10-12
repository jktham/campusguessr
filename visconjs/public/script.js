// public/script.js
const panoramaContainer = document.getElementById('panorama-container');
const panorama = document.getElementById('panorama');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
let isScrollingLeft = false;
let isScrollingRight = false;
let scrollSpeed = 2; // Slower scroll speed

// Fetch list of images from Node.js server
fetch('/images')
    .then(response => response.json())
    .then(images => {
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            panorama.src = `/imgs/${images[randomIndex]}`;
        }
    });

// Function to scroll the container left
function scrollLeft() {
    if (isScrollingLeft) {
        panoramaContainer.scrollLeft -= scrollSpeed;
        requestAnimationFrame(scrollLeft); // Keep scrolling while mouse is down
    }
}

// Function to scroll the container right
function scrollRight() {
    if (isScrollingRight) {
        panoramaContainer.scrollLeft += scrollSpeed;
        requestAnimationFrame(scrollRight); // Keep scrolling while mouse is down
    }
}

// Handle mousedown, mouseup, and mouseleave events for left arrow (for desktop)
leftArrow.addEventListener('mousedown', () => {
    isScrollingLeft = true;
    scrollLeft();
});

leftArrow.addEventListener('mouseup', () => {
    isScrollingLeft = false;
});

leftArrow.addEventListener('mouseleave', () => {
    isScrollingLeft = false; // Stop scrolling if mouse leaves the button
});

// Handle mousedown, mouseup, and mouseleave events for right arrow (for desktop)
rightArrow.addEventListener('mousedown', () => {
    isScrollingRight = true;
    scrollRight();
});

rightArrow.addEventListener('mouseup', () => {
    isScrollingRight = false;
});

rightArrow.addEventListener('mouseleave', () => {
    isScrollingRight = false; // Stop scrolling if mouse leaves the button
});

// Handle touch events for left arrow (for mobile)
leftArrow.addEventListener('touchstart', () => {
    isScrollingLeft = true;
    scrollLeft();
});

leftArrow.addEventListener('touchend', () => {
    isScrollingLeft = false;
});

leftArrow.addEventListener('touchcancel', () => {
    isScrollingLeft = false;
});

// Handle touch events for right arrow (for mobile)
rightArrow.addEventListener('touchstart', () => {
    isScrollingRight = true;
    scrollRight();
});

rightArrow.addEventListener('touchend', () => {
    isScrollingRight = false;
});

rightArrow.addEventListener('touchcancel', () => {
    isScrollingRight = false;
});
