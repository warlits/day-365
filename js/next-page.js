const pageOrder = ["home", "us", "timeline", "gallery", "favorites", "songs", "reasons", "firsts", "openLetter", "future"];

let currentPageIndex = 0;

const pageWrapper = document.getElementById("pageWrapper");
const menuItems = document.querySelectorAll(".menu-list li");


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


/* function updateSlidePosition() {
    pageWrapper.style.transform =
        `translateX(-${currentPageIndex * 100}vw)`;
} */

function updateSlidePosition() {
    pageWrapper.scrollTo({
        left: currentPageIndex * window.innerWidth,
        behavior: "smooth"
    });
}

function updateActiveMenuItem() {

    const currentPageName = pageOrder[currentPageIndex];

    menuItems.forEach((item) => {

        const isActive =
            item.dataset.page === currentPageName;

        item.classList.toggle("active", isActive);

    });

}


// MENU CLICKS
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        goToPage(item.dataset.page);
    });
});


// NEXT BUTTONS
document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", goToNextPage);
});


// PREVIOUS BUTTONS
document.querySelectorAll("[data-prev]").forEach((btn) => {
    btn.addEventListener("click", goToPrevPage);
});


/* =====================================
   TRACK SWIPE / HORIZONTAL SCROLL
===================================== */

pageWrapper.addEventListener("scrollend", () => {
    const pageWidth = pageWrapper.clientWidth;

    const newIndex = Math.round(
        pageWrapper.scrollLeft / pageWidth
    );

    if (newIndex !== currentPageIndex) {
        currentPageIndex = newIndex;
        updateActiveMenuItem();
    }
});
