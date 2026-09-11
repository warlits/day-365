import { favorites } from "./data/favorites-data.js";

function renderFavorites() {
    const container = document.getElementById("favoritesGrid");
    const template = document.getElementById("favoritePolaroidTemplate");

    favorites.forEach((favorite) => {
        const card = template.content.cloneNode(true);
        const polaroid = card.querySelector(".favorite-polaroid");
        const image = card.querySelector(".favorite-polaroid__image");
        const video = card.querySelector(".favorite-polaroid__video");
        const playButton = card.querySelector(".favorite-polaroid__play");
        const title = card.querySelector(".favorite-polaroid__title");
        const description = card.querySelector(".favorite-polaroid__description");

        /* Individual scrapbook rotation */
        polaroid.style.setProperty(
            "--rotation",
            favorite.rotation || "0deg"
        );

        /* Text */
        title.textContent = favorite.title;
        description.textContent = favorite.description;

        /* Image */
        if (favorite.type === "image") {
            image.src = favorite.src;
            image.alt = favorite.title;
            video.remove();
            playButton.remove();
        }

        /* Video */
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

function initBackToTop() {
    const favoritesPage = document.querySelector(
        '.page[data-page="favorites"]'
    );
    const btn = favoritesPage.querySelector("#backToTopBtn");
    const scrollContainer = favoritesPage.querySelector(".page-scroll");

    const SCROLL_THRESHOLD = 100;

    function toggleVisibility() {
        if (scrollContainer.scrollTop > SCROLL_THRESHOLD) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    }

    function scrollToTop() {
        scrollContainer.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    scrollContainer.addEventListener("scroll", toggleVisibility);
    btn.addEventListener("click", scrollToTop);
}

export function initFavorites() {
    renderFavorites();
    initBackToTop();
}

document.addEventListener("DOMContentLoaded", initFavorites);