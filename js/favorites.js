import { favorites } from "./data/favorites-data.js";

function renderFavorites() {

    const container = document.getElementById("favoritesGrid");
    const template = document.getElementById(
        "favoritePolaroidTemplate"
    );

    favorites.forEach((favorite) => {
        const card = template.content.cloneNode(true);
        const polaroid = card.querySelector(
            ".favorite-polaroid"
        );
        const image = card.querySelector(
            ".favorite-polaroid__image"
        );
        const video = card.querySelector(
            ".favorite-polaroid__video"
        );
        const playButton = card.querySelector(
            ".favorite-polaroid__play"
        );
        
        const title = card.querySelector(
            ".favorite-polaroid__title"
        );

        const description = card.querySelector(
            ".favorite-polaroid__description"
        );

        /* Individual scrapbook rotation */
        polaroid.style.setProperty(
            "--rotation",
            favorite.rotation || "0deg"
        );

        /* Text */

        
        title.textContent = favorite.title;
        description.textContent = favorite.description;


        /* IMAGE */
        if (favorite.type === "image") {
            image.src = favorite.src;
            image.alt = favorite.title;

            video.remove();
            playButton.remove();
        }


        /* VIDEO */
        if (favorite.type === "video") {
            video.src = favorite.src;
            image.remove();
            playButton.addEventListener("click", () => {
                video.play();
                playButton.classList.add("is-hidden");
            });
            video.addEventListener("ended", () => {
                playButton.classList.remove("is-hidden");
            });
        }
        container.appendChild(card);
    });
}

export function initFavorites() {
    renderFavorites();
}
document.addEventListener(
    "DOMContentLoaded",
    initFavorites
);