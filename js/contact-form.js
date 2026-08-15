document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // BILDEFORSTØRRELSE
    // =========================

    const lightbox = document.querySelector("#case-lightbox");
    const lightboxImage = document.querySelector("#case-lightbox-image");
    const lightboxClose = document.querySelector("#case-lightbox-close");
    const imageButtons = document.querySelectorAll("[data-lightbox-image]");

    if (lightbox && lightboxImage && lightboxClose) {
        imageButtons.forEach((button) => {
            button.addEventListener("click", () => {
                lightboxImage.src = button.dataset.lightboxImage;
                lightboxImage.alt = button.dataset.lightboxAlt || "";

                lightbox.showModal();
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.close();
        });

        lightbox.addEventListener("click", (event) => {
            const dialogArea = lightbox.getBoundingClientRect();

            const clickedOutside =
                event.clientX < dialogArea.left ||
                event.clientX > dialogArea.right ||
                event.clientY < dialogArea.top ||
                event.clientY > dialogArea.bottom;

            if (clickedOutside) {
                lightbox.close();
            }
        });

        lightbox.addEventListener("close", () => {
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
        const getScrollDistance = () => {
            const firstSlide = carousel.querySelector(".case-carousel-slide");

            if (!firstSlide) {
                return carousel.clientWidth;
            }

            const carouselStyles = window.getComputedStyle(carousel);
            const gap = Number.parseFloat(carouselStyles.columnGap) || 0;

            return firstSlide.getBoundingClientRect().width + gap;
        };

        previousButton.addEventListener("click", () => {
            carousel.scrollBy({
                left: -getScrollDistance(),
                behavior: "smooth"
            });
        });

        nextButton.addEventListener("click", () => {
            carousel.scrollBy({
                left: getScrollDistance(),
                behavior: "smooth"
            });
        });

        carousel.addEventListener("keydown", (event) => {
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