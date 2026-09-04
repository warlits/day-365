import { memories } from "./data/memories-data.js";

function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    const template = document.getElementById("memoryCardTemplate");

    memories.forEach((memory, index) => {
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
        const randomIndex = Math.floor(Math.random() * memories.length);
        openModal(memories[randomIndex]);
    }

    grid.addEventListener("click", (event) => {
        const card = event.target.closest(".memory-card");
        if (!card) return;
        openModal(memories[card.dataset.index]);
    });

    grid.addEventListener("keydown", (event) => {
        const card = event.target.closest(".memory-card");
        if (!card) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(memories[card.dataset.index]);
        }
    });

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    randomBtn.addEventListener("click", openRandomMemory);
}

function initBackToTop() {
    const btn = document.getElementById("backToTopBtn");
    const buttonsWrapper = document.querySelector(".floating-buttons");
    const SCROLL_THRESHOLD = 100;

    function toggleVisibility() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            btn.classList.add("is-visible");
            buttonsWrapper.classList.add("is-visible");
        } else {
            btn.classList.remove("is-visible");
            buttonsWrapper.classList.remove("is-visible");
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener("scroll", toggleVisibility);
    btn.addEventListener("click", scrollToTop);
}

export function initMemories() {
    renderGallery();
    initModal();
    initBackToTop();
}

document.addEventListener("DOMContentLoaded", initMemories);