const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function updateCarousel() {
  slides.forEach((slide, index) => {
    // Очищуємо всі класи
    slide.classList.remove("active", "next", "prev", "far");

    if (index === currentIndex) {
      slide.classList.add("active");
    } else if (index === (currentIndex + 1) % slides.length) {
      slide.classList.add("next");
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      slide.classList.add("prev");
    } else {
      // Додаємо клас far для всіх інших, щоб вони ховалися плавно
      slide.classList.add("far");
    }
  });
}

// Функція саме для кроку вперед
function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

// Запуск автоматичного крутіння
setInterval(showNextSlide, 3000);

// Ініціалізація першого кадру при завантаженні
updateCarousel();
