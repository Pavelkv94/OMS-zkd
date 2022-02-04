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


