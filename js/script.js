const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const totalItems = carouselItems.length;
const totalVisible = 3;

let startX = 0;
let currentX = 0;
let isDragging = false;

// Duplicar o conteúdo do carrossel para criar o efeito de rotação contínua
carouselTrack.innerHTML += carouselTrack.innerHTML; // Duplica as imagens

// Função para mover o carrossel
function moveCarousel() {
    currentIndex++;
    
    // Movimento contínuo, sem espaço em branco
    if (currentIndex >= totalItems) {
        carouselTrack.style.transition = 'none'; // Remove a transição para um loop perfeito
        currentIndex = 0; // Volta ao início
        carouselTrack.style.transform = `translateX(0)`; 
    } else {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out'; // Retorna a animação de transição
        carouselTrack.style.transform = `translateX(-${(currentIndex * 100) / totalVisible}%)`;
    }
}

// Loop infinito
setInterval(moveCarousel, 3000); // Muda de imagem a cada 3 segundos

// Função para iniciar o arraste (toque)
carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    carouselTrack.style.transition = 'none'; // Desativa a transição durante o arraste
});

// Função para detectar o movimento do arraste
carouselTrack.addEventListener('touchmove', (e) => {
    if (isDragging) {
        currentX = e.touches[0].clientX;
        const moveX = currentX - startX;
        carouselTrack.style.transform = `translateX(calc(-${(currentIndex * 100) / totalVisible}% + ${moveX}px))`;
    }
});

// Função para finalizar o arraste (toque)
carouselTrack.addEventListener('touchend', (e) => {
    isDragging = false;
    const moveX = currentX - startX;

    // Verifica se o deslize foi significativo o suficiente para mudar de slide
    if (moveX > 50) {
        currentIndex = Math.max(currentIndex - 1, 0); // Vai para o slide anterior
    } else if (moveX < -50) {
        currentIndex = Math.min(currentIndex + 1, totalItems - 1); // Vai para o próximo slide
    }

    // Aplica a transição para o novo slide
    carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    carouselTrack.style.transform = `translateX(-${(currentIndex * 100) / totalVisible}%)`;
});
