const SNAPSHOT_STORAGE_KEY = "savedUsRightNowSnapshot";

const endingPhoto = document.getElementById(
    "endingTakenPhoto"
);

const endingPhotoContainer = document.querySelector(
    ".ending-photo"
);

const endingPolaroid = document.getElementById(
    "endingPolaroid"
);


/* ==========================================================================
   DISPLAY SNAPSHOT
   ========================================================================== */

function displayEndingSnapshot(snapshot) {

    if (!snapshot) {
        return;
    }

    endingPhoto.src = snapshot;

    endingPhotoContainer.classList.add(
        "has-photo"
    );

    endingPolaroid.classList.add(
        "has-photo"
    );

}


/* ==========================================================================
   LOAD SAVED SNAPSHOT
   ========================================================================== */

function loadEndingSnapshot() {

    const savedSnapshot = localStorage.getItem(
        SNAPSHOT_STORAGE_KEY
    );

    displayEndingSnapshot(savedSnapshot);

}


/* ==========================================================================
   LISTEN FOR NEW SNAPSHOTS
   ========================================================================== */

window.addEventListener(
    "snapshotSaved",
    (event) => {

        displayEndingSnapshot(event.detail);

    }
);


/* ==========================================================================
   INITIALIZE
   ========================================================================== */

loadEndingSnapshot();