const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const totalItems = carouselItems.length;
const totalVisible = 3;

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
