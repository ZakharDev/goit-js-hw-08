// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

console.log(galleryItems);
const galleryLightBox = document.querySelector('.gallery');
const itemGallery = createGalletyItem(galleryItems);

galleryLightBox.insertAdjacentHTML('beforeend', itemGallery);
galleryLightBox.addEventListener('click', onPictureClick);

function createGalletyItem(galleryItems) {
    return galleryItems.map(({ original, preview, description }) => {
        return `
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
            </a>
        `;
    }).join('');
};

function onPictureClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    let lightbox = new SimpleLightbox('.gallery a', { 
        preloading: false,
        alertError: false
     });
    console.log(lightbox);
}
