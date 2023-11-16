document.addEventListener('DOMContentLoaded', () => {
    const breweryList = document.getElementById('brewery-list');
    const breweryName = document.getElementById('brewery-name');
    const breweryDetails = document.getElementById('brewery-details');
    const breweryUrl = document.getElementById('brewery-url');
    const newReviewForm = document.getElementById('new-brewery-review');

    function createBreweryItem(brewery) {
        const breweryItem = document.createElement('div');
        breweryItem.innerHTML = `<h3 class="brewery-item" data-brewery-id="${brewery.id}" data-brewery-url="${brewery.website_url}">${brewery.name}</h3>`;
        breweryList.appendChild(breweryItem);
        breweryItem.addEventListener('click', () => {
            updateBreweryDisplay(brewery);
        });

        breweryItem.addEventListener('mouseenter', () => {
            breweryItem.style.color = 'brown'
        })

        breweryItem.addEventListener('mouseleave', () => {
            breweryItem.style.color = ''
        })
    }
    
    function fetchBreweries(url, startIndex, endIndex) {
        return fetch(url)
            .then(r => r.json())
            .then(breweries => {
                for (let i = startIndex; i < Math.min(endIndex, breweries.length); i++) {
                    const brewery = breweries[i];
                    createBreweryItem(brewery);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function updateBreweryDisplay(brewery) {
        breweryName.textContent = brewery.name;
        breweryDetails.innerHTML = `Type: <strong>${brewery.brewery_type}</strong>, City: <strong>${brewery.city}</strong>, State: <strong>${brewery.state}</strong>`;
        breweryUrl.href = brewery.website_url
        breweryUrl.textContent = brewery.website_url
        const reviewSection = document.getElementById('brewery-reviews');
        reviewSection.innerHTML = renderReviews(brewery.reviews);
    }
    
    function renderReviews(reviews) {
        if (!reviews || reviews.length === 0) {
            return '<p>Let us know what you think!</p>';
        }
        return reviews.map(review => `<div class="review">${review}</div>`).join('');
    }

    fetchBreweries('https://api.openbrewerydb.org/v1/breweries', 0, 3)
        .then(() => fetchBreweries('https://api.openbrewerydb.org/v1/breweries', 12, 22));

    newReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newReview = e.target['brewery-review-input'].value;
        const reviewSection = document.getElementById('brewery-reviews');
        const p = document.createElement('p');
        p.textContent = newReview;
        reviewSection.append(p);
    });
});

console.log()