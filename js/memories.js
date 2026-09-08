import { sortedMemories } from "./data/memories-data.js";

function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    const template = document.getElementById("memoryCardTemplate");

    sortedMemories.forEach((memory, index) => {
        const card = template.content.cloneNode(true);

        const img = card.querySelector(".memory-card__image");
        const title = card.querySelector(".memory-card__title");
        const button = card.querySelector(".memory-card");

        img.src = memory.image;
        img.alt = memory.title;
        title.textContent = memory.title;
        button.dataset.index = index;

        grid.appendChild(card);
    });
}

function initModal() {
    const grid = document.getElementById("galleryGrid");
    const modal = document.getElementById("memoryModal");
    const backdrop = document.getElementById("modalBackdrop");
    const closeBtn = document.getElementById("modalClose");
    const randomBtn = document.getElementById("randomMemoryBtn");

    const modalImage = modal.querySelector(".memory-modal__image");
    const modalTitle = modal.querySelector(".memory-modal__title");
    const modalDate = modal.querySelector(".memory-modal__date");
    const modalDescription = modal.querySelector(".memory-modal__description");

    function openModal(memory) {
        modalImage.src = memory.image;
        modalImage.alt = memory.title;
        modalTitle.textContent = memory.title;
        modalDate.textContent = memory.date;
        modalDescription.textContent = memory.description;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    function openRandomMemory() {
        const randomIndex = Math.floor(Math.random() * sortedMemories.length);
        openModal(sortedMemories[randomIndex]);
    }

    grid.addEventListener("click", (event) => {
        const card = event.target.closest(".memory-card");
        if (!card) return;
        openModal(sortedMemories[card.dataset.index]);
    });

    grid.addEventListener("keydown", (event) => {
        const card = event.target.closest(".memory-card");
        if (!card) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(sortedMemories[card.dataset.index]);
        }
    });

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    randomBtn.addEventListener("click", openRandomMemory);
}

function initBackToTop() {
    const galleryPage = document.querySelector(
        '.page[data-page="gallery"]'
    );

    const btn = galleryPage.querySelector("#backToTopBtn");

    const buttonsWrapper = galleryPage.querySelector(
        ".floating-buttons"
    );

    const nextPageBtn = galleryPage.querySelector(
        ".next-page-btn"
    );

    const scrollContainer = galleryPage.querySelector(
        ".page-scroll"
    );

    const SCROLL_THRESHOLD = 100;

    function toggleVisibility() {

        console.log("SCROLL:", scrollContainer.scrollTop);

        if (scrollContainer.scrollTop > SCROLL_THRESHOLD) {

            btn.classList.add("is-visible");
            buttonsWrapper.classList.add("is-visible");
            nextPageBtn.classList.add("is-visible");

        } else {

            btn.classList.remove("is-visible");
            buttonsWrapper.classList.remove("is-visible");
            nextPageBtn.classList.remove("is-visible");

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

window.addEventListener('DOMContentLoaded', () => {
    const memories = document.querySelector('.memories');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            memories.classList.add('is-active');
        });
    });

    setTimeout(() => {
        memories.classList.remove('is-active');
    }, 2500)
})




export function initMemories() {
    renderGallery();
    initModal();
    initBackToTop();
}

document.addEventListener("DOMContentLoaded", initMemories);