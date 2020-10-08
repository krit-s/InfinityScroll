const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];




//Unplash API
const count = 30;
const apiKey = 'zkYcBnargJmhepPFYd5xRTQMjEgZCMIkgTYedlbHG8k';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded.
function imageLoaded(){
    imagesLoaded++;
    
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


//Helper function to set attributes on DOM Elements
function setAttributes(item, attributes) {
    for (const key in attributes) {
        item.setAttribute(key, attributes[key]);
    }
}

//Creating Elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //For each photo run this function
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash.
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


//fetch photos from Unsplash API

async function getPhotoFromApi() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Error here
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotoFromApi();
    }
});

//On load
getPhotoFromApi();