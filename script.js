const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".carousel-3d-track");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

// 1. Створюємо кружечки динамічно
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
    resetTimer();
  });
  
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    // Змінюємо поточний індекс на індекс того фото, на яке натиснули
    currentIndex = index;
    
    // Оновлюємо карусель (фото розлетяться по нових позиціях)
    updateCarousel();
    
    // Скидаємо таймер автоплею, щоб воно не перескочило одразу далі
    resetTimer();
  });
});

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active", "next", "prev", "far");
    dots[index].classList.remove("active"); // Очищуємо крапки

    if (index === currentIndex) {
      slide.classList.add("active");
      dots[index].classList.add("active"); // Підсвічуємо потрібну крапку
    } else if (index === (currentIndex + 1) % slides.length) {
      slide.classList.add("next");
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      slide.classList.add("prev");
    } else {
      slide.classList.add("far");
    }
  });
}

// Функції для автоплею (як ми робили раніше)
function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

let autoPlay = setInterval(showNextSlide, 3000);

function resetTimer() {
  clearInterval(autoPlay);
  autoPlay = setInterval(showNextSlide, 3000);
}

// Ініціалізація
updateCarousel();