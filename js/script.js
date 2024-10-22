const track = document.querySelector('.carousel-track');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

track.addEventListener('mousedown', startDrag);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mousemove', dragMove);
track.addEventListener('mouseleave', endDrag);

track.addEventListener('touchstart', startDrag);
track.addEventListener('touchend', endDrag);
track.addEventListener('touchmove', dragMove);

function startDrag(event) {
  isDragging = true;
  startPos = getPositionX(event);
  track.style.cursor = 'grabbing';
  cancelAnimationFrame(animationID);
}

function endDrag() {
  isDragging = false;
  track.style.cursor = 'grab';
  const movedBy = currentTranslate - prevTranslate;

  // Mover para a próxima imagem se arrastou mais de 50px
  if (movedBy < -50 && currentIndex < track.children.length - 1) currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
}

function dragMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -track.offsetWidth / track.children.length;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
}
