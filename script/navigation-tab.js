const nav = document.querySelector('#nav');
const clos = document.querySelector('#closed');
const ham = document.querySelector('#ham');


ham.addEventListener('click', function (event) {
    nav.style.display = 'flex';
    event.preventDefault();
});



clos.addEventListener('click', function (event) {
    nav.style.display = 'none';
    event.preventDefault();
});