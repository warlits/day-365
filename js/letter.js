const letterEnvelope = document.getElementById("letterEnvelope");
const letterCard = document.getElementById("letterCard");

function openLetter() {
    letterEnvelope.classList.add("hidden");

    letterCard.classList.remove("hidden");
    letterCard.classList.add("fadein");
}

function closeLetter() {
    letterCard.classList.add("hidden");
    letterCard.classList.remove("fadein");

    letterEnvelope.classList.remove("hidden");
}

letterEnvelope.addEventListener("click", openLetter);

letterCard.addEventListener("click", closeLetter);

/* Keyboard accessibility */

letterEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLetter();
    }
});

letterCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        closeLetter();
    }
});