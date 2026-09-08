const pageOrder = [
    "home",
    "us",
    "timeline",
    "gallery",
    "favorites",
    "songs",
    "reasons",
    "firsts",
    "openLetter",
    "future"
];

let currentPageIndex = 0;

const pageWrapper = document.getElementById("pageWrapper");
const menuItems = document.querySelectorAll(".menu-list li");
const pages = document.querySelectorAll(".page");


function goToPage(pageName) {

    const index = pageOrder.indexOf(pageName);

    if (index === -1) return;

    currentPageIndex = index;

    updateSlidePosition();
    updateActiveMenuItem();

}


function goToNextPage() {

    if (currentPageIndex < pageOrder.length - 1) {

        currentPageIndex++;

        updateSlidePosition();
        updateActiveMenuItem();

    }

}


function goToPrevPage() {

    if (currentPageIndex > 0) {

        currentPageIndex--;

        updateSlidePosition();
        updateActiveMenuItem();

    }

}


function updateSlidePosition() {

    pageWrapper.scrollTo({
        left: currentPageIndex * window.innerWidth,
        behavior: "smooth"
    });

}


function updateActivePage() {

    const currentPageName = pageOrder[currentPageIndex];

    pages.forEach((page) => {

        page.classList.toggle(
            "active",
            page.dataset.page === currentPageName
        );

    });

}


function updateActiveMenuItem() {

    const currentPageName = pageOrder[currentPageIndex];

    menuItems.forEach((item) => {

        item.classList.toggle(
            "active",
            item.dataset.page === currentPageName
        );

    });

}


/* MENU CLICKS */

menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        goToPage(item.dataset.page);

    });

});


/* NEXT BUTTONS */

/* NEXT BUTTONS */

document.querySelectorAll("[data-next]").forEach((btn) => {

    btn.addEventListener("click", () => {

        // Move to the next page
        goToNextPage();


        // Play a song only if this button has data-play-song
        if (btn.dataset.playSong !== undefined) {

            document.dispatchEvent(
                new CustomEvent("songs:play", {
                    detail: {
                        index: Number(btn.dataset.playSong)
                    }
                })
            );

        }

    });

});


/* PREVIOUS BUTTONS */

document.querySelectorAll("[data-prev]").forEach((btn) => {

    btn.addEventListener("click", goToPrevPage);

});


/* INITIAL PAGE */

document.addEventListener("DOMContentLoaded", () => {

    updateActivePage();
    updateActiveMenuItem();

});


/* ACTIVATE PAGE AFTER SCROLLING */

pageWrapper.addEventListener("scrollend", () => {

    const pageWidth = pageWrapper.clientWidth;

    currentPageIndex = Math.round(
        pageWrapper.scrollLeft / pageWidth
    );

    updateActiveMenuItem();
    updateActivePage();

});