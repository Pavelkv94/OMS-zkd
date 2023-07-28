const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .imgs');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
let slideWidth = carouselImages[0].clientWidth;
// Set initial position
carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

if (currentIndex === 0) {
  prevButton.style.display = "none"
}
if (currentIndex === 14) {
  nextButton.style.display = "none"
}
// Toggle buttons
prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselImages.length - 1
  }
  if(currentIndex === 0) {
    prevButton.style.display = "none"
  }
  if (currentIndex < 14) {
    nextButton.style.display = "flex"
  }
  carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= carouselImages.length) {
    currentIndex = 0;
  }
  if(currentIndex > 0) {
    prevButton.style.display = "flex"
  }
  if (currentIndex === 14) {
    nextButton.style.display = "none"
  }
  carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

});


