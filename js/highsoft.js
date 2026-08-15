document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // BILDEFORSTØRRELSE
    // =========================

    const lightbox = document.querySelector("#case-lightbox");
    const lightboxImage = document.querySelector("#case-lightbox-image");
    const lightboxClose = document.querySelector("#case-lightbox-close");
    const imageButtons = document.querySelectorAll("[data-lightbox-image]");

    if (lightbox && lightboxImage && lightboxClose) {
        imageButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                lightboxImage.src = button.dataset.lightboxImage;
                lightboxImage.alt = button.dataset.lightboxAlt || "";
                lightbox.showModal();
            });
        });

        lightboxClose.addEventListener("click", function () {
            lightbox.close();
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.close();
            }
        });

        lightbox.addEventListener("close", function () {
            lightboxImage.src = "";
            lightboxImage.alt = "";
        });
    }

    // =========================
    // MOBILKARUSELL
    // =========================

    const carousel = document.querySelector("#highsoft-carousel");
    const previousButton = document.querySelector("#carousel-previous");
    const nextButton = document.querySelector("#carousel-next");

    if (carousel && previousButton && nextButton) {
        function getScrollDistance() {
            const slide = carousel.querySelector(".case-carousel-slide");

            if (!slide) {
                return carousel.clientWidth;
            }

            const styles = window.getComputedStyle(carousel);
            const gap = parseFloat(styles.gap) || 0;

            return slide.offsetWidth + gap;
        }

        previousButton.addEventListener("click", function () {
            carousel.scrollBy({
                left: -getScrollDistance(),
                behavior: "smooth"
            });
        });

        nextButton.addEventListener("click", function () {
            carousel.scrollBy({
                left: getScrollDistance(),
                behavior: "smooth"
            });
        });

        carousel.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();

                carousel.scrollBy({
                    left: -getScrollDistance(),
                    behavior: "smooth"
                });
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                carousel.scrollBy({
                    left: getScrollDistance(),
                    behavior: "smooth"
                });
            }
        });
    }
});