const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let page = 1;
let totalPages = 0;

//Unsplash API
const count = 30;
const apiKey = 'MlgAA905b1qqyYhzEjmFm8h1DUehjQXS703pUV9qy20';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=${count}&query=motivational-quotes&client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
   if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
   } 
}

//Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.results.length;
    photosArray.results.forEach(photo => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded); 

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });  
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        let response = await fetch(apiUrl);
        photosArray = await response.json();
        totalPages = photosArray.total_pages;
        displayPhotos();
    } catch (error) {
        //Catch error here
        console.log('Whoops! Error found: ', error);
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        //If final page not generated request next page contents, else reset to first page
        if(page < totalPages){
            apiUrl = `https://api.unsplash.com/search/photos?page=${++page}&per_page=${count}&query=motivational-quotes&client_id=${apiKey}&count=${count}`;
        } else {
            page = 1;
            apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=${count}&query=motivational-quotes&client_id=${apiKey}&count=${count}`;
        }
    
        getPhotos();
    }
})

//On load
getPhotos();