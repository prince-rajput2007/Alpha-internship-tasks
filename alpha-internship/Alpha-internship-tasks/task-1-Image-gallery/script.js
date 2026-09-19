const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let visibleImages = [];
let currentIndex = 0;


// -----------------------------
// Filter Images
// -----------------------------

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.getAttribute("data-filter");

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// -----------------------------
// Open Lightbox
// -----------------------------

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        visibleImages = Array.from(
            document.querySelectorAll(
                '.gallery-item[style="display: block;"] img, .gallery-item:not([style*="display: none"]) img'
            )
        );

        const clickedImage = item.querySelector("img");

        currentIndex = visibleImages.indexOf(clickedImage);

        if (currentIndex === -1) {
            visibleImages = Array.from(
                document.querySelectorAll(".gallery-item img")
            );

            currentIndex = visibleImages.indexOf(clickedImage);
        }

        showImage();

        lightbox.classList.add("show");

    });

});


// -----------------------------
// Show Image
// -----------------------------

function showImage() {

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;

}


// -----------------------------
// Next Image
// -----------------------------

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();

});


// -----------------------------
// Previous Image
// -----------------------------

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();

});


// -----------------------------
// Close Lightbox
// -----------------------------

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


// Close when clicking outside image

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }

});


// -----------------------------
// Keyboard Navigation
// -----------------------------

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeBtn.click();
    }

});