const chapterInputs = document.querySelectorAll(".chapter-item-input");
const chapterAddButtons = document.querySelectorAll(".chapter-add-button");
const chapterPreviewList = document.getElementById("chapterPreviewList");
const chapterDate = document.getElementById("chapterDate");
const chapterCard = document.getElementById("chapterCard");
const saveChapterButton = document.getElementById("saveChapterButton");

const chapterCategories = {
    places: {
        title: "Places We'll Go",
        items: []
    },
    things: {
        title: "Things We'll Do",
        items: []
    },
    dreams: {
        title: "Dreams We'll Chase",
        items: []
    }
};

/* ==========================================================================
   DATE
   ========================================================================== */

function setChapterDate() {
    const today = new Date();

    chapterDate.textContent = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}

/* ==========================================================================
   ADD ITEM
   ========================================================================== */

function addChapterItem(category) {
    const input = document.querySelector(
        `.chapter-item-input[data-category="${category}"]`
    );

    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    chapterCategories[category].items.push({
        text: text,
        completed: false
    });

    input.value = "";

    renderChapterItems();
    renderChapterPreview();
}

/* ==========================================================================
   RENDER EDITABLE LISTS
   ========================================================================== */

function renderChapterItems() {
    Object.keys(chapterCategories).forEach((category) => {
        const container = document.querySelector(
            `.chapter-items[data-list="${category}"]`
        );

        const items = chapterCategories[category].items;

        container.innerHTML = "";

        items.forEach((item, index) => {
            const itemElement = document.createElement("div");

            itemElement.className = "chapter-item";

            if (item.completed) {
                itemElement.classList.add("completed");
            }

            itemElement.innerHTML = `
                <input
                    class="chapter-item__check"
                    type="checkbox"
                    ${item.completed ? "checked" : ""}
                    data-category="${category}"
                    data-index="${index}"
                >

                <span class="chapter-item__text">
                    ${item.text}
                </span>

                <button
                    class="chapter-item__delete"
                    type="button"
                    data-category="${category}"
                    data-index="${index}"
                    aria-label="Delete item"
                >
                    <i class="ti ti-x"></i>
                </button>
            `;

            container.appendChild(itemElement);
        });
    });

    addChapterItemListeners();
}

/* ==========================================================================
   ITEM LISTENERS
   ========================================================================== */

function addChapterItemListeners() {
    const checkboxes = document.querySelectorAll(
        ".chapter-item__check"
    );

    const deleteButtons = document.querySelectorAll(
        ".chapter-item__delete"
    );

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const category = checkbox.dataset.category;
            const index = Number(checkbox.dataset.index);

            chapterCategories[category].items[index].completed =
                checkbox.checked;

            renderChapterItems();
            renderChapterPreview();
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const index = Number(button.dataset.index);

            chapterCategories[category].items.splice(index, 1);

            renderChapterItems();
            renderChapterPreview();
        });
    });
}

/* ==========================================================================
   RENDER PREVIEW
   ========================================================================== */

function renderChapterPreview() {
    chapterPreviewList.innerHTML = "";

    const hasItems = Object.values(chapterCategories).some(
        (category) => category.items.length > 0
    );

    if (!hasItems) {
        chapterPreviewList.innerHTML = `
            <p class="chapter-list__empty">
                Our next chapter is still waiting to be written.
            </p>
        `;

        return;
    }

    Object.entries(chapterCategories).forEach(
        ([category, categoryData]) => {
            if (!categoryData.items.length) {
                return;
            }

            const categoryElement = document.createElement("div");

            categoryElement.className = "chapter-preview-category";

            const title = document.createElement("p");

            title.className = "chapter-preview-category__title";

            title.textContent = categoryData.title;

            categoryElement.appendChild(title);

            categoryData.items.forEach((item) => {
                const itemElement = document.createElement("div");

                itemElement.className = "chapter-preview-item";

                if (item.completed) {
                    itemElement.classList.add("completed");
                }

                const check = document.createElement("span");
                check.className = "chapter-preview-item__check";

                const text = document.createElement("span");
                text.textContent = item.text;

                itemElement.append(check, text);

                categoryElement.appendChild(itemElement);
            });

            chapterPreviewList.appendChild(categoryElement);
        }
    );
}

/* ==========================================================================
   SAVE AS IMAGE
   ========================================================================== */
async function saveChapter() {
    if (saveChapterButton.disabled) return;

    saveChapterButton.disabled = true;

    const originalHTML = saveChapterButton.innerHTML;

    saveChapterButton.innerHTML = `
        <i class="ti ti-loader-2"></i>
        Creating Our Chapter...
    `;

    try {
        await document.fonts.ready;

        chapterCard.classList.add("exporting");

        await new Promise((resolve) =>
            requestAnimationFrame(() =>
                requestAnimationFrame(resolve)
            )
        );

        const canvas = await html2canvas(chapterCard, {
            scale: 3,
            backgroundColor: null,
            useCORS: true,
            logging: false
        });

        chapterCard.classList.remove("exporting");

        const imageURL = canvas.toDataURL("image/png");

        const now = new Date();

        const date = now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit"
        }).replace(/\//g, "-");

        const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).replace(":", "-");

        const downloadLink = document.createElement("a");

        downloadLink.href = imageURL;

        downloadLink.download =
            `Our_Next_Chapter_on_${date}_${time}.png`;

        document.body.appendChild(downloadLink);

        downloadLink.click();

        downloadLink.remove();

    } catch (error) {

        chapterCard.classList.remove("exporting");

        console.error("Chapter export failed:", error);

        alert("Something went wrong while creating your chapter. Please try again.");

    } finally {

        chapterCard.classList.remove("exporting");

        saveChapterButton.disabled = false;

        saveChapterButton.innerHTML = originalHTML;

    }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */

chapterAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addChapterItem(button.dataset.category);
    });
});

chapterInputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            addChapterItem(input.dataset.category);
        }
    });
});

saveChapterButton.addEventListener("click", saveChapter);

/* ==========================================================================
   INITIALIZE
   ========================================================================== */

setChapterDate();
renderChapterItems();
renderChapterPreview();