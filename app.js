// Function to sort posts by time intervals
function sortPostsByTime(sortOption) {
    const currentDate = new Date();

    postsData.sort((a, b) => {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);

        if (sortOption === 'latest') {
            return dateB - dateA;
        } else if (sortOption === 'oldest') {
            return dateA - dateB;
        } else if (sortOption === '30days') {
            return currentDate - dateA <= 30 * 24 * 60 * 60 * 1000 ? -1 : 1;
        } else if (sortOption === '1year') {
            return currentDate - dateA <= 365 * 24 * 60 * 60 * 1000 ? -1 : 1;
        }
    });

    displayPosts(); // Re-render posts after sorting
}

// Function to scroll to the first post within a specific time interval
function scrollToTimeCategory(sortOption) {
    const postsSection = document.getElementById('posts-section');
    const categoryElement = postsSection.querySelector(`.${sortOption}-category`);

    if (categoryElement) {
        window.scrollTo({
            top: categoryElement.offsetTop - 50, // Adjust scroll position
            behavior: 'smooth',
        });
    }
}

// Event listener for sort dropdown
document.getElementById('sort-dropdown').addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    sortPostsByTime(selectedOption);
    scrollToTimeCategory(selectedOption);
});
