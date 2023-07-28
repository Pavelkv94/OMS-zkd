const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .imgs');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselDots = document.querySelectorAll('.carousel-dot');

let currentIndex = 0;
let slideWidth = carouselImages[0].clientWidth;
console.log(slideWidth);
// Set initial position
carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex + 80}px)`;

// Toggle buttons
prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselImages.length - 1;
  }
  carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex + 80}px)`;
  toggleActiveDot(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= carouselImages.length) {
    currentIndex = 0;
  }
  carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex + 80}px)`;

  toggleActiveDot(currentIndex);
});

// Toggle dots
carouselDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex + 80}px)`;
    toggleActiveDot(currentIndex);
  });
});


function toggleActiveDot(index) {
  carouselDots.forEach((dot) => {
    dot.classList.remove('active');
  });
  carouselDots[index].classList.add('active');
}
