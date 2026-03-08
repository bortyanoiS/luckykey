const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".carousel-3d-track");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

// 1. Створюємо кружечки динамічно
if (dotsContainer) {
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
}

const dots = document.querySelectorAll(".dot");

// Клік по самих слайдах
slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        resetTimer();
    });
});

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove("active", "next", "prev", "far");
        if (dots[index]) dots[index].classList.remove("active");

        if (index === currentIndex) {
            slide.classList.add("active");
            if (dots[index]) dots[index].classList.add("active");
        } else if (index === (currentIndex + 1) % slides.length) {
            slide.classList.add("next");
        } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            slide.classList.add("prev");
        } else {
            slide.classList.add("far");
        }
    });
}

// Функції для автоплею
function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

let autoPlay = setInterval(showNextSlide, 3000);

function resetTimer() {
    clearInterval(autoPlay);
    autoPlay = setInterval(showNextSlide, 3000);
}

// Ініціалізація каруселі
updateCarousel();

// --- ВІДПРАВКА ФОРМИ В ТЕЛЕГРАМ ---
document.addEventListener('submit', function (e) {
    // Перевіряємо, чи це наша форма
    if (e.target.name === 'popup-order' || e.target.classList.contains('order-form')) {
        e.preventDefault(); 
        
        const form = e.target;
        const TOKEN = "8766889285:AAEOwMtMY-Hs-9iUEBTrAXaTVksnotFbDIg";
        const CHAT_ID = "1278749746";
        const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        // Збираємо дані
        const name = form.name.value;
        const phone = form.phone.value;
        const service = form.service.options[form.service.selectedIndex].text;

        let message = `<b>🔔 Нове замовлення!</b>\n\n`;
        message += `<b>👤 Клієнт:</b> ${name}\n`;
        message += `<b>📞 Телефон:</b> ${phone}\n`;
        message += `<b>🛠 Послуга:</b> ${service}`;

        console.log('Намагаюся надіслати повідомлення...');

        fetch(URI_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            })
        })
        .then(res => {
            if (res.ok) {
                alert("Дякуємо! Замовлення успішно надіслано.");
                form.reset();
                window.location.hash = ""; 
            } else {
                alert("Помилка при відправці. Перевірте, чи запущений бот (натисніть START).");
            }
        })
        .catch(err => {
            alert("Сталася помилка. Перевірте з'єднання з інтернетом.");
            console.error(err);
        });
    }
});
