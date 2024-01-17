$(document).ready(function () {
    $('#burger').click(function() {
        $('#menu').addClass('open');
        $('#menu__close').addClass('close');
        $('.menu__open-title').addClass('open');

    });

    $('#menu > *').click(function() {
        $('#menu').removeClass('open');
        $('.menu__open-title').removeClass('open');
    });

    $('#menu').click(function() {
        $(this).removeClass('open');
        $('.menu__open-title').removeClass('open');
    });

    const $openFormBtn = $('#openFormBtn');
    const $openPhoneBtn = $('#openPhoneBtn');
    const $sendForm = $('#sendForm');
    const $overlay = $('#overlay');
    const $formContainer = $('#formContainer');


    const $carSelect = $('#car-select');
    const $start = $('#start');
    const $map = $('#map-select');
    const $end = $('#end');
    const $name = $('#name');
    const $number = $('#number');
    const $email = $('#email');
    let fieldsToCheck = [$name, $number, $email, $end, $start, $carSelect, $map];
    let hasError = false;
    $('.order-error').hide();


    $openPhoneBtn.click(function () {
        $overlay.show();
        $('.rent__form-title').html('<span class="title__orange">Заполните форму ниже</span>, и мы перезвоним вам в течение 10 минут');
        $('.order__car-text').text('Личная информация')
        $('.car__item-subtitle').css('display','none');
        $('.order__car-item').css('display','none');
        $('.another-block').css('display','flex');
        console.log($name)
        $sendForm.text('Отправить')
        $overlay.click(function (event) {
            if (event.target === this) {
                $overlay.hide();
            }
        });
    })


    $openFormBtn.click(function () {
        $overlay.show();
        $formContainer.show();
        $overlay.click(function (event) {
            if (event.target === this) {
                $overlay.hide();
                $formContainer.hide();
            }
        });
    });

    $sendForm.click(function () {

        // $overlay.hide();
        // $formContainer.hide();
        fieldsToCheck.forEach(function (field) {
            let inputField = $(field);
            inputField.removeClass('error');

            if (!inputField.val()) {
                inputField.next().show();
                inputField.addClass('error');
                hasError = true;
                console.log(inputField)
            }
        });
        if (!hasError) {
            // loader.css('display', 'flex');
            let formData = {};

            fieldsToCheck.forEach(function (field) {
                let inputField = $(field)
                console.log(inputField)
                console.log('----')
                formData[inputField.attr('id')] = inputField.val();
                console.log(formData)
            });

            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: formData
            })
                .done(function (msg) {
                    // loader.hide();
                    if (msg.success) {
                        $('.order__car').css('display', 'none');
                        $('.rent__form-title').css('display', 'none');
                        $('.success-form').css('display', 'flex');
                        // $('.order__info').addClass('success');
                        alert('good')
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    });
});
