var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;

    var slides = document.getElementsByClassName('commit__items');
    var dots = document.getElementsByClassName('reviews__items');
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("reviews__items--active");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].classList.add("reviews__items--active");
}

/*var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;

    var slides = document.getElementsByClassName('commit__items');
    var dots = document.getElementsByClassName('reviews__items');
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("reviews__items--active");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += (" reviews__items--active");
}*/