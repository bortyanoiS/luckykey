let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active", "next", "prev", "far");

    if (index === currentIndex) {
      slide.classList.add("active");
    } else if (index === (currentIndex + 1) % slides.length) {
      slide.classList.add("next");
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      slide.classList.add("prev");
    } else {
      slide.classList.add("far");
    }
  });
  currentIndex = (currentIndex + 1) % slides.length;
}

// Запуск автоматичного крутіння кожні 3 секунди
setInterval(updateCarousel, 3000);
