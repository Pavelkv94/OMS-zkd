const carouselSlideSystem = document.querySelector('.carousel-slide-system');
const carouselImagesSystem = document.querySelectorAll('.carousel-slide-system .imgs-system');
const prevButtonSystem = document.querySelector('.carousel-prev-system');
const nextButtonSystem = document.querySelector('.carousel-next-system');
const carouselDotsSystem = document.querySelectorAll('.carousel-dot-system');

let currentIndexSystem = 1;
let slideWidthSystem = carouselImagesSystem[0].clientWidth;

// Set initial position
carouselSlideSystem.style.transform = `translateX(${-slideWidthSystem * currentIndexSystem + 80}px)`;

// Toggle buttons
prevButtonSystem.addEventListener('click', () => {
  currentIndexSystem--;
  if (currentIndexSystem < 0) {
    currentIndexSystem = carouselImagesSystem.length - 1;
  }
  carouselSlideSystem.style.transform = `translateX(${-slideWidthSystem * currentIndexSystem + 80}px)`;
  toggleActiveDotSystem(currentIndex);
});

nextButtonSystem.addEventListener('click', () => {
  currentIndexSystem++;
  if (currentIndexSystem >= carouselImagesSystem.length) {
    currentIndexSystem = 0;
  }
  carouselSlideSystem.style.transform = `translateX(${-slideWidthSystem * currentIndexSystem + 80}px)`;

  toggleActiveDotSystem(currentIndexSystem);
});

// Toggle dots
carouselDotsSystem.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndexSystem = index;
    carouselSlideSystem.style.transform = `translateX(${-slideWidthSystem * currentIndexSystem + 80}px)`;
    toggleActiveDotSystem(currentIndexSystem);
  });
});


function toggleActiveDotSystem(index) {
  carouselDotsSystem.forEach((dot) => {
    dot.classList.remove('active');
  });
  carouselDotsSystem[index].classList.add('active');
}
