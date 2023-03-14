$('.simple-slider').slick({
  dots: true,
  arrows: true,
});

$('.center').slick({
  centerMode: true,
  dots: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 1,
  speed: 500,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
      },
    },
  ],
});

$('.single-item').not('.slick-initialized').slick({
  dots: true,
  arrows: false,
});

const nextArrow = document.querySelector('.carousel-container .center .slick-next.slick-arrow');

nextArrow.style.height = '100%';
nextArrow.style.zIndex = '2';
nextArrow.style.width = '50px';
nextArrow.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,1) 100%)';
nextArrow.style.right = '0px';

nextArrow.addEventListener('mouseenter', function () {
  nextArrow.style.backgroundColor = 'rgb(255,255,255, 0.5)';
});
nextArrow.addEventListener('mouseleave', function () {
  nextArrow.style.background = 'transparent';
  nextArrow.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,1) 100%)';
});

const nextArrowIMG = document.querySelector('.carousel-container .center .slick-next.slick-arrow img');
nextArrowIMG.setAttribute('src', '../../assets/img//svg/i-arrow-right-white.svg');

const prevArrow = document.querySelector('.carousel-container .center .slick-prev.slick-arrow');
prevArrow.style.height = '100%';
prevArrow.style.zIndex = '2';
prevArrow.style.width = '50px';
prevArrow.style.background = 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,1) 100%)';
prevArrow.style.left = '0px';

prevArrow.addEventListener('mouseenter', function () {
  prevArrow.style.backgroundColor = 'rgb(255,255,255, 0.5)';
});
prevArrow.addEventListener('mouseleave', function () {
  prevArrow.style.background = 'transparent';
  prevArrow.style.background =
    'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,1) 100%)';
});

const prevArrowIMG = document.querySelector('.carousel-container .center .slick-prev.slick-arrow img');
prevArrowIMG.setAttribute('src', '../../assets/img//svg/i-arrow-left-white.svg');
