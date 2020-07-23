const API_KEY = "17619649-3f81e35a51e2410035f34f6df";

const fetchImagesBtn = document.querySelector("#searchImages");
const insertRef = document.querySelector("#insertRef");
const cardWrapper = document.querySelector('#cardWrapper');
// const noImagesIndicator = document.querySelector('.noImagesIndicator');

const searchQuery = document.querySelector('.inputField');
const categorySelect = document.querySelector('.categorySelect');
const category = categorySelect.options[categorySelect.selectedIndex]
const numberOfImages = document.querySelector('.numberOfImagesField')

let page = 1;

const getImages = async (numberOfImages, category, searchQuery) => {
    page += 1; 
    const pixabayUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&per_page=${numberOfImages}&page=${page}&category=${category}`;
    const response = await fetch(pixabayUrl);
    const data = await response.json();
    const imageData = data.hits.map(hit => {
        return {
            pageURL: hit.pageURL,
            type: hit.type,
            tags: hit.tags,
            largeImageURL: hit.largeImageURL,
            userImageURL: hit.userImageURL,
            user: hit.user
        }
    })
    return imageData;
}

const addImagesToTheDOM = (images) => {
    const createImageCard = (image) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const cardImage = document.createElement('div')
        cardImage.classList.add('cardImage');
        const imageEl = document.createElement('img');

        const cardText = document.createElement('div')
        cardText.classList.add('cardText');

        const paragraphEl = document.createElement('p');


        imageEl.src = image.largeImageURL;
        cardImage.appendChild(imageEl);

        paragraphEl.innerHTML = `Photo by <a href="${image.pageURL}">${image.user}</a>`
        cardText.appendChild(paragraphEl)

        card.appendChild(cardImage);
        card.appendChild(cardText);
        // Add recent images first
        cardWrapper.insertBefore(card, insertRef);   
    }

    images.forEach(image => {
        createImageCard(image);
    })

}

fetchImagesBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const images = await getImages(numberOfImages.value, "", searchQuery.value);
    addImagesToTheDOM(images)
})

// getImages(pixabayUrl);

// let feedObserverTarget = document.querySelector('span#feed_observer_target')

// const endOfFeedObserver = new IntersectionObserver((entries, endOfFeedObserver) => {
    
//     entries.forEach(entry => {
//         if(!entry.isIntersecting) {
//             return;
//         };
//         const feed = document.querySelector('.feed')
//         const loadingIndicator = document.querySelector('#loading_indicator')
//         loadingIndicator.style.display = 'block';
//         for(let num = 1; num <= 6; num++) {
//             const pEl = document.createElement('p');
//             pEl.innerHTML = 'blackLorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate alias excepturi sit eligendi aspernatur dolorem nesciunt consequatur sequi laboriosam?'
//             setTimeout(() => {
//                 feed.insertBefore(pEl, feedObserverTarget)
//             }, 1000)
//         }
//     })
// }, {
//     root: null,
//     threshold: 1,
//     rootMargin: '0px'
// })

// endOfFeedObserver.observe(feedObserverTarget);

// const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];
