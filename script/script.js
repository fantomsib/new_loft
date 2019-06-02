/*const wrap = document.querySelector('#wrap');
const flashLeft = document.querySelector('#flash__left');
const flashRight = document.querySelector('#flash__right');*/

//form

const form = document.querySelector('#form');
const btnDeliv = document.querySelector('#buttonDeliv');
const btnClear = document.querySelector('#btnClear');
//const name = document.querySelector('#form.name');
var modal = document.querySelector('#modal');
var span = document.querySelector('.model__btn');
var modelTxt = document.querySelector('.model__txt');
btnDeliv.addEventListener('click', function (e) {
    e.preventDefault();

    if (validateForm(form)) {

        var formData = new FormData();

        formData.append('name', form.elements.name.value);
        formData.append('mobile', form.elements.mobile.value);
        formData.append('street', form.elements.street.value);
        formData.append('house', form.elements.house.value);
        formData.append('floor', form.elements.floor.value);
        formData.append('textarea', form.elements.text.value);
        formData.append('to', 'fantomsib@hotmail.com');

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        //xhr.setRequestHeader('X-Requestd-With', 'XMLHttpRequest');
        xhr.send(formData);

        xhr.addEventListener('load', function () {
            if (xhr.status >= 400) {
                modelTxt.textContent = 'Не удалось отправить заявку, код ошибки' + xhr.status;
                modelTxt.style.textAlign = 'center';
            }
            modal.style.display = "flex";
            form.reset();

            modal.onclick = function () {
                modal.style.display = "none";
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";


                }
            };

        });
    }
});

function validateForm(form) {
    var valid = true;
    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.mobile)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.house)) {
        valid = false;
    }

    if (!validateField(form.elements.text)) {
        valid = false;
    }

    return valid;

}

function validateField(field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else {
        field.nextElementSibling.textContent = '';
    }
    return true;
}

btnClear.addEventListener('click', function (event) {
    event.preventDefault();
    form.reset();
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