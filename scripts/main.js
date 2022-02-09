
// Select Specialist
let selectOne = document.querySelector('.select-one');
let selectTwo = document.querySelector('.select-two');

selectOne.classList.toggle('active');

selectOne.addEventListener('mouseover', function(){
	selectOne.classList.add('active');
    selectTwo.classList.remove('active');
})
selectTwo.addEventListener('mouseover', function(){
	selectTwo.classList.add('active');
    selectOne.classList.remove('active');
})

// Slider
let sliderSection = document.getElementById('how-section');

if(window.innerWidth > 640) {
    sliderSection.classList.add('desktop')
} else sliderSection.classList.add('slider')

$('.slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });