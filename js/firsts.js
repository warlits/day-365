import { firstsData } from "./data/firsts-data.js";

(function () {
    "use strict";

    function setRotation(element, rotation) {
        element.style.setProperty(
            "--rotation",
            rotation || "0deg"
        );
    }

    function renderFirsts() {
        const list = document.getElementById("firstsList");
        const template = document.getElementById("firstItemTemplate");
        
        if (!list || !template || !Array.isArray(firstsData)) {
            return;
        }

        list.innerHTML = "";

        firstsData.forEach((item, index) => {

            const fragment = template.content.cloneNode(true);

            const root = fragment.querySelector(".first-item");
            const number = fragment.querySelector(
                ".first-item__number"
            );

            const note = fragment.querySelector(
                ".first-note"
            );

            const noteLabel = fragment.querySelector(
                ".first-note__label"
            );

            const noteDate = fragment.querySelector(
                ".first-note__date"
            );

            const noteTitle = fragment.querySelector(
                ".first-note__title"
            );

            const noteDescription = fragment.querySelector(
                ".first-note__description"
            );

            const polaroid = fragment.querySelector(
                ".first-polaroid"
            );

            const image = fragment.querySelector(
                ".first-polaroid__image"
            );

            const videoWrap = fragment.querySelector(
                ".first-polaroid__video-wrap"
            );

            const video = fragment.querySelector(
                ".first-polaroid__video"
            );

            const playButton = fragment.querySelector(
                ".first-polaroid__play"
            );

            const mediaLabel = fragment.querySelector(
                ".first-polaroid__label"
            );

            const mediaTitle = fragment.querySelector(
                ".first-polaroid__title"
            );

            const mediaDescription = fragment.querySelector(
                ".first-polaroid__description"
            );

            root.dataset.id =
                item.id || `first-${index + 1}`;

            number.textContent =
                item.number ||
                String(index + 1).padStart(2, "0");


            /* =====================================================
               TEXT
               ===================================================== */

            if (item.type === "text") {

                note.hidden = false;

                polaroid.remove();

                setRotation(
                    note,
                    item.rotation
                );

                noteLabel.textContent =
                    item.label || "A LITTLE NOTE";

                noteDate.textContent =
                    item.date || "";

                noteTitle.textContent =
                    item.title || "";

                noteDescription.textContent =
                    item.description || "";
            }


            /* =====================================================
               IMAGE
               ===================================================== */

            if (item.type === "image") {

                polaroid.hidden = false;

                note.remove();

                setRotation(
                    polaroid,
                    item.rotation
                );

                image.hidden = false;

                image.src = item.src;

                image.alt =
                    item.title || "Memory";

                videoWrap.remove();

                mediaLabel.textContent =
                    item.label || "ONE OF OUR FIRSTS";

                mediaTitle.textContent =
                    item.title || "";

                mediaDescription.textContent =
                    item.description || "";

                image.addEventListener(
                    "click",
                    function () {
                        openImageLightbox(item);
                    }
                );
            }


            /* =====================================================
               VIDEO
               ===================================================== */

            if (item.type === "video") {

                polaroid.hidden = false;

                note.remove();

                setRotation(
                    polaroid,
                    item.rotation
                );

                image.remove();

                videoWrap.hidden = false;

                video.src = item.src;

                if (item.poster) {
                    video.poster = item.poster;
                }

                video.setAttribute(
                    "aria-label",
                    item.title || "Memory video"
                );

                mediaLabel.textContent =
                    item.label || "A FAVORITE FIRST";

                mediaTitle.textContent =
                    item.title || "";

                mediaDescription.textContent =
                    item.description || "";


                playButton.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        if (video.paused) {

                            video
                                .play()
                                .then(() => {
                                    playButton.classList.add(
                                        "is-hidden"
                                    );
                                })
                                .catch(() => {
                                    console.warn(
                                        "Video playback was blocked."
                                    );
                                });

                        } else {

                            video.pause();

                        }
                    }
                );


                video.addEventListener(
                    "pause",
                    function () {

                        if (!video.ended) {
                            playButton.classList.remove(
                                "is-hidden"
                            );
                        }

                    }
                );


                video.addEventListener(
                    "ended",
                    function () {

                        playButton.classList.remove(
                            "is-hidden"
                        );

                    }
                );


                video.addEventListener(
                    "click",
                    function () {

                        if (video.paused) {

                            video
                                .play()
                                .then(() => {
                                    playButton.classList.add(
                                        "is-hidden"
                                    );
                                })
                                .catch(() => { });

                        } else {

                            video.pause();

                        }

                    }
                );
            }


            list.appendChild(fragment);

        });
    }


    /* =========================================================
       LIGHTBOX
       ========================================================= */

    function getLightboxElements() {

        return {
            lightbox:
                document.getElementById(
                    "firstsLightbox"
                ),

            image:
                document.getElementById(
                    "lightboxImage"
                ),

            label:
                document.getElementById(
                    "lightboxLabel"
                ),

            title:
                document.getElementById(
                    "lightboxTitle"
                ),

            description:
                document.getElementById(
                    "lightboxDescription"
                ),

            close:
                document.getElementById(
                    "lightboxClose"
                )
        };

    }


    function openImageLightbox(item) {

        const ui = getLightboxElements();

        if (!ui.lightbox || !ui.image) {
            return;
        }

        ui.image.src = item.src;

        ui.image.alt =
            item.title || "Memory";

        ui.label.textContent =
            item.label ||
            "ONE OF OUR FIRSTS";

        ui.title.textContent =
            item.title || "";

        ui.description.textContent =
            item.description || "";


        ui.lightbox.classList.add(
            "is-open"
        );

        ui.lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeImageLightbox() {

        const ui = getLightboxElements();

        if (!ui.lightbox) {
            return;
        }

        ui.lightbox.classList.remove(
            "is-open"
        );

        ui.lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";
    }


    function initLightbox() {

        const ui = getLightboxElements();

        if (!ui.lightbox) {
            return;
        }


        ui.close.addEventListener(
            "click",
            closeImageLightbox
        );


        const backdrop =
            ui.lightbox.querySelector(
                "[data-close-lightbox]"
            );

        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeImageLightbox
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeImageLightbox();
                }

            }
        );
    }


    /* =========================================================
       INIT
       ========================================================= */

    function init() {

        renderFirsts();

        initLightbox();

    }


    document.addEventListener(
        "DOMContentLoaded",
        init
    );

})();