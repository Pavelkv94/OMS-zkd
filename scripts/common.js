// Header & mobile
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})

let subMenu1 = document.querySelector('.first-submenu-mobile');
let subItem1 = document.querySelector('.first-sub-item');

subMenu1.addEventListener('click', function(){
    subItem1.classList.toggle('active');
});

let subMenu2 = document.querySelector('.second-submenu-mobile');
let subItem2 = document.querySelector('.second-sub-item');

subMenu2.addEventListener('click', function(){
    subItem2.classList.toggle('active');
});

//Go Up

document.addEventListener('DOMContentLoaded', () => {

    let toTopBtn = document.querySelector('.to-up');
    let toTopBtnMobile = document.querySelector('.to-up-mobile');

    window.onscroll = function () {
        if (window.pageYOffset > 580 && window.innerWidth > 640) {
            toTopBtn.style.display = 'block'
        } else {
            toTopBtn.style.display = 'none'
        }

        if (window.pageYOffset > 200 && window.innerWidth < 640) {
            toTopBtnMobile.style.display = 'block'
        } else {
            toTopBtnMobile.style.display = 'none'
        }
    }

    // плавный скролл наверх 
    toTopBtn.addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });

    
    toTopBtnMobile.addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});

function setCopyYear() {
    const copy = document.getElementById('copyright');
    const currentYear = new Date();
    copy.innerHTML = `Copyright © ${currentYear.getFullYear()} Zakodix Tech Group LLC. All rights reserved.`
  }
  setCopyYear();
