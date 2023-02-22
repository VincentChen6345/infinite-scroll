//unsplash API
let count = 5;
const apiKey = `h6UaORH0_SEZwwIhZw1ai9GVQVj1CfdK3KA2FpgHe24`;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
//getElemetById returns a single DOM element who ID matches your query. getElementsByClassName returns an HTML Collection. You have to iterate through each element in the array to apply your styles.
// check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  console.log(imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;

    console.log("ready=", ready);
    count = 30;
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
};
//get photos from unsplash api
let photosArray = [];

//helper function to set attributes on DOM elements

const setAttributes = (element, attributesObject) => {
  for (const key in attributesObject) {
    //for in loop loops through objects
    element.setAttribute(key, attributesObject[key]);
  }
};
//create elements for links & photos, add to dom
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //create <a> to link to unsplash
    const item = document.createElement("a");

    // if target="_blank" is set with anchor element, the linked document will open in a new tab
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
      class: "unsplash-photo",
    });
    //EventListener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer element.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
};

// check to see if scrolling near bottom of page, load more photos
//window is the parent of the document and the grandparent of the body
//window.scrollY is the distance from top of page user has scrolled
//window.innerHeight is the total height of browser window
//document.body.offsetHeight is the height of everything in the body including what is not in view

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    // console.log("window.innerHeight", window.innerHeight);
    // console.log("window.scrollY", window.scrollY);
    // console.log("document.body.offsetHeight", document.body.offsetHeight);
    getPhotos();
  }
});
//on load
getPhotos();
