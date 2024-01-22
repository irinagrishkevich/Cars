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

    const $textSelect = $('.select-text')
    let index = 0
    const $carSelect = $('#select');
    let loader = $('.loader')

    $(".btn-car").on("click", function() {
        $overlay.show();
        $formContainer.show();
        $('.yellow-line').addClass('big')
        $overlay.click(function (event) {
            if (event.target === this) {
                $overlay.hide();
                $formContainer.hide();
            }
        });
        let dataValue = $(".slide-visible").data('value');
        $("#select").val(dataValue);
        fieldsToCheck = [$name, $number, $email, $end, $start, $carSelect, $map];
    });

    const $openFormBtn = $('#openFormBtn');
    const $openPhoneBtn = $('#openPhoneBtn');
    const $sendForm = $('#sendForm');
    const $overlay = $('#overlay');
    const $formContainer = $('#formContainer');



    const $start = $('#start');
    const $map = $('#map-select');
    const $end = $('#end');
    const $name = $('#name');
    const $number = $('#number');
    const $email = $('#email');
    let fieldsToCheck = [];
    let hasError = false;
    $('.order-error').hide();

    $openFormBtn.click(function () {
        $overlay.show();
        $formContainer.show();
        $('.yellow-line').addClass('big')
        $('.rent__form-title').html('<span class="title__orange">Закажите идеальный автомобиль</span> уже сегодня');
        $('.order__car-text').text('Детали проката');
        $('.car__item-subtitle').css('display','flex');
        $('.order__car-item').css('display','flex');
        $('.another-block').css('display','flex');
        $('#email').css('display','flex');
        $sendForm.text('Отправить заявку')
        $overlay.click(function (event) {
            if (event.target === this) {
                $overlay.hide();
                $formContainer.hide();
            }
        });
        fieldsToCheck = [$name, $number, $email, $end, $start, $carSelect, $map];
    });

    $openPhoneBtn.click(function () {
        $overlay.show();
        $formContainer.show();
        $('.yellow-line').removeClass('big')
        $('.rent__form-title').html('<span class="title__orange">Заполните форму ниже</span>, и мы перезвоним вам в течение 10 минут');
        $('.order__car-text').text('Личная информация')
        $('.car__item-subtitle').css('display','none');
        $('.order__car-item').css('display','none');
        $('#email').css('display','none');
        $('#email-text').css('display','none');
        $('.another-block').css('display','flex');
        $sendForm.text('Отправить')
        fieldsToCheck = [$name, $number];
        $overlay.click(function (event) {
            if (event.target === this) {
                $overlay.hide();
                $formContainer.hide();
            }
        });


    })



    $sendForm.click(function () {
        hasError = false
        console.log(fieldsToCheck)
        fieldsToCheck.forEach(function (field) {
            let inputField = $(field);
            inputField.removeClass('error');
            inputField.next().hide()
            $('.mini').css('display','flex');
            console.log(inputField.val())
            if (!inputField.val()) {
                inputField.next().show();
                inputField.addClass('error');
                hasError = true;
            }
        });
        console.log(hasError)
        if (!hasError) {
            loader.css('display', 'flex');
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
                    loader.hide();
                    if (msg.success) {
                        $('.order__car').css('display', 'none');
                        $('.rent__form-title').css('display', 'none');
                        $('.success-form').css('display', 'flex');
                        alert('good')
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        };

    })
});
