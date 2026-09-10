const usNowPhotoInput = document.getElementById("usNowPhotoInput");
const usNowPhotoPreview = document.getElementById("usNowPhotoPreview");
const snapshotPhoto = document.querySelector(".snapshot-photo");
const usNowNoteInput = document.getElementById("usNowNoteInput");
const usNowNotePreview = document.getElementById("usNowNotePreview");
const usNowDate = document.getElementById("usNowDate");
const snapshotPolaroid = document.getElementById("snapshotPolaroid");
const saveSnapshotButton = document.getElementById("saveSnapshotButton");
const snapshotNoteCount = document.getElementById("snapshotNoteCount");

const MAX_NOTE_LENGTH = 120;
const SNAPSHOT_STORAGE_KEY = "savedUsRightNowSnapshot";

/* ==========================================================================
   CURRENT DATE
   ========================================================================== */

function setSnapshotDate() {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    usNowDate.textContent = formattedDate;
}

/* ==========================================================================
   PHOTO PREVIEW
   ========================================================================== */

function handlePhotoUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        usNowPhotoPreview.src = loadEvent.target.result;
        snapshotPhoto.classList.add("has-image");
    };

    reader.readAsDataURL(file);
}

/* ==========================================================================
   LIVE NOTE PREVIEW
   ========================================================================== */

function updateSnapshotNote() {
    const note = usNowNoteInput.value.slice(0, MAX_NOTE_LENGTH);

    usNowNoteInput.value = note;
    usNowNotePreview.textContent = note;

    snapshotNoteCount.textContent =
        `${note.length}/${MAX_NOTE_LENGTH}`;
}

/* ==========================================================================
   SAVE SNAPSHOT AS IMAGE
   ========================================================================== */

async function saveSnapshot() {
    if (!snapshotPhoto.classList.contains("has-image")) {
        alert("Add a photo first before creating your snapshot.");
        return;
    }

    saveSnapshotButton.disabled = true;
    saveSnapshotButton.innerHTML = `
        <i class="ti ti-loader-2"></i>
        Creating Snapshot...
    `;

    const originalTransform = snapshotPolaroid.style.transform;

    try {
        snapshotPolaroid.style.transform = "none";

        await document.fonts.ready;

        const html2canvasModule = await import(
            "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm"
        );

        const html2canvas = html2canvasModule.default;

        const canvas = await html2canvas(snapshotPolaroid, {
            scale: 3,
            backgroundColor: null,
            useCORS: true
        });

        snapshotPolaroid.style.transform = originalTransform;

        const imageURL = canvas.toDataURL("image/png");

        localStorage.setItem(
            SNAPSHOT_STORAGE_KEY,
            imageURL
        );

        window.dispatchEvent(
            new CustomEvent("snapshotSaved", {
                detail: imageURL
            })
        );

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
            `Us_on_${date}_${time}.png`;

        downloadLink.click();

    } catch (error) {
        console.error("Snapshot export failed:", error);

        snapshotPolaroid.style.transform = originalTransform;

        alert(
            "Something went wrong while creating your snapshot. Please try again."
        );

    } finally {
        snapshotPolaroid.style.transform = originalTransform;

        saveSnapshotButton.disabled = false;
        saveSnapshotButton.innerHTML = `
            <i class="ti ti-download"></i>
            Save Our Snapshot
        `;
    }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */

usNowPhotoInput.addEventListener("change", handlePhotoUpload);

usNowNoteInput.addEventListener("input", updateSnapshotNote);

saveSnapshotButton.addEventListener("click", saveSnapshot);

/* ==========================================================================
   INITIALIZE
   ========================================================================== */

setSnapshotDate();
updateSnapshotNote();