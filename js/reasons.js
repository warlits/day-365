let index = 0;

const cardTop = document.getElementById('cardTop');
const cardText = document.getElementById('cardText');
const count = document.getElementById('count');
const nextBtn = document.getElementById('nextBtn');

function renderCount() {
    count.textContent = (index + 1) + ' / ' + reasonsData.length;
}

function next() {
    // 1. i-trigger yung "peel away" animation ng kasalukuyang card
    cardTop.classList.add('peel');

    // 2. hintayin matapos yung animation (450ms, kapareho ng nasa reasons.css)
    //    bago palitan yung laman at i-reset yung posisyon
    setTimeout(() => {
        index = (index + 1) % reasonsData.length;
        cardText.textContent = reasonsData[index];
        renderCount();

        // i-reset agad sa gitna nang walang animation (kung hindi, "lilipad
        // pabalik" ito galing sa dulo, na mali ang peg)
        cardTop.classList.add('no-transition');
        cardTop.classList.remove('peel');
        void cardTop.offsetWidth; // pinipilit i-apply agad ng browser yung reset
        cardTop.classList.remove('no-transition');
    }, 450);
}

cardTop.addEventListener('click', next);
nextBtn.addEventListener('click', next);

// unang lalabas pagbukas ng page
cardText.textContent = reasonsData[index];
renderCount();