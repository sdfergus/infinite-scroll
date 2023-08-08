const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'MlgAA905b1qqyYhzEjmFm8h1DUehjQXS703pUV9qy20';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const apiUrl = `https://api.unsplash.com/search/photos?per_page=${count}&query=motivational-quotes&client_id=${apiKey}&count=${count}`;

//Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
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

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });  
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray.results);
        displayPhotos();
    } catch (error) {
        //Catch error here
        console.log('Whoops! Error found: ', error);
    }
}

//On load
getPhotos();