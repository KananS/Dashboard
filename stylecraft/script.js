document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const height = document.getElementById('height').value;
    const physique = document.getElementById('physique').value;
    const skinTone = document.getElementById('skinTone').value;

    // Store the selections in local storage
    localStorage.setItem('height', height);
    localStorage.setItem('physique', physique);
    localStorage.setItem('skinTone', skinTone);

    // Show the results
    displayResults();
});

function displayResults() {
    const height = localStorage.getItem('height');
    const physique = localStorage.getItem('physique');
    const skinTone = localStorage.getItem('skinTone');

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear any previous results

    if (height && physique && skinTone) {
        const imagePath = `../images/outfits/${height}/${physique}/${skinTone}`;
        
        // Assuming there are multiple images, dynamically load them
        for (let i = 1; i <= 3; i++) { // Adjust the number based on available images
            const img = document.createElement('img');
            img.src = `${imagePath}/outfit${i}.jpg`;
            img.alt = `Outfit Recommendation ${i}`;
            img.style.display = 'block';
            img.style.margin = '10px auto';
            resultsContainer.appendChild(img);
        }
    } else {
        resultsContainer.innerHTML = '<p>No recommendations found. Please go back and make your selections again.</p>';
    }
}

// Display results if returning to the page
document.addEventListener('DOMContentLoaded', displayResults);
