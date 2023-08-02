
// Select 
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