const wrap = document.querySelector('#wrap');
const flashLeft = document.querySelector('#flash__left');
const flashRight = document.querySelector('#flash__right');

//form

const form = document.querySelector('#form');
const btnDeliv = document.querySelector('#buttonDeliv');
const btnClear = document.querySelector('#btnClear');
//const name = document.querySelector('#form.name');

btnDeliv.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(form.elements.street.value);
    console.log(form.elements.phone.value);
    console.log(form.elements.change.checked);
});

btnClear.addEventListener('click', function (event) {
    event.preventDefault();
  
});




////////////input phone
const phone = document.querySelector('#phone');
phone.addEventListener('keydown', function (event) {
    let isDigit = false; //флаг
    let isDash = false;
    let isControl = false;
    let isTrusted = false;



    if (event.key >= 0 || event.key <= 9) {
        isDigit = true;
    }

    if (event.key == '-') {
        isDash = true;
    }

    if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
        isControl = true;
    }

    if (event.key == "+") {
        isTrusted = true;
    }


    if (isDigit == false && !isDash && !isControl && !isTrusted) { //isDigit == false = (!isDigit) ! = non 
        event.preventDefault();
    }

});


///////////////

/////////slider

