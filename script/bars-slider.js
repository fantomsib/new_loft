var slider = document.querySelector('.bars__slider');
var left = document.querySelector('.flash__slider-left');
var right = document.querySelector('.flash__slider-right');
var sliderListLenght = slider.children.length;
var translate = 0;
var maxTrans = -100 * (sliderListLenght - 1);

right.addEventListener('click', function (e) {
    e.preventDefault();
    if (translate != maxTrans) {
        translate -= 100;
        slider.style.transform = 'translateX(' + translate + '%)';
    } else {
        translate = 0;
        slider.style.transform = 'translateX(' + translate + ' %)';

    }

});


left.addEventListener('click', function (e) {
    e.preventDefault();
    if (translate != 0) {
        translate += 100;
        slider.style.transform = 'translateX(' + translate + '%)';
    } else {
        translate = maxTrans;
        slider.style.transform = 'translateX(' + translate + '%)';
    }

});