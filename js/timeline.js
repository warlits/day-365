import { timelineData } from "../js/data/timeline-data.js";

function createMonthTile(month) {
    const template = document.getElementById("month-tile-template");
    const fragment = template.content.cloneNode(true);

    const article = fragment.querySelector(".month-tile");
    const header = fragment.querySelector(".month-tile__header");
    const preview = fragment.querySelector(".month-tile__preview");
    const number = fragment.querySelector(".month-tile__number");
    const title = fragment.querySelector(".month-tile__title");
    const date = fragment.querySelector(".month-tile__date");
    const panel = fragment.querySelector(".month-tile__panel");
    const image = fragment.querySelector(".month-tile__image");
    const description = fragment.querySelector(".month-tile__description");

    article.dataset.monthId = month.id;

    preview.src = month.image;
    preview.alt = `${month.title} preview`;
    preview.style.setProperty("--rotation", month.rotation);
    image.src = month.image;
    image.alt = month.title;

    number.textContent = month.number;
    title.textContent = month.title;
    date.textContent = month.dateLabel;
    description.textContent = month.description;

    header.addEventListener("click", () => toggleTile(header, panel));

    return fragment;
}

let openTile = null;

function toggleTile(header, panel) {
    const isOpen = header.getAttribute("aria-expanded") === "true";

    if (openTile && openTile.header !== header) {
        openTile.header.setAttribute("aria-expanded", "false");
        openTile.panel.classList.remove("is-open");
    }

    const willOpen = !isOpen;
    header.setAttribute("aria-expanded", String(willOpen));
    panel.classList.toggle("is-open", willOpen);
    openTile = willOpen ? { header, panel } : null;
}

export function initTimeline() {
    const list = document.getElementById("monthTileList");
    const fragment = document.createDocumentFragment();

    timelineData.forEach((month) => {
        fragment.appendChild(createMonthTile(month));
    });

    list.appendChild(fragment);
}


function initBackToTop() {
    const timelinePage = document.querySelector('.page[data-page="timeline"]');
    const btn = timelinePage.querySelector("#backToTopBtn");
    const scrollContainer = timelinePage.querySelector(".page-scroll");

    const SCROLL_THRESHOLD = 100;

    function toggleVisibility() {
        if (scrollContainer.scrollTop > SCROLL_THRESHOLD) {
            btn.classList.add("visible");
        }
        else {
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


initBackToTop();
initTimeline();