const menu = document.querySelector('.menu');
const accoItem = document.querySelectorAll('.menu__items');
const accoItemLength = accoItem.length;


menu.addEventListener('click', function (e) {
    for (let i = 0; i < accoItemLength; i++) {
        accoItem[i].classList.remove('menu__items--active');
    }

});


for (let i = 0; i < accoItemLength; i++) {

    accoItem[i].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();


        if (accoItem[i].classList.contains('menu__items--active')) {
            accoItem[i].classList.remove('menu__items--active')
        } else {
            for (let i = 0; i < accoItemLength; i++) {
                accoItem[i].classList.remove('menu__items--active');
            }
            accoItem[i].classList.add('menu__items--active');
        }
    });
}


