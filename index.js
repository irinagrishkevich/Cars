
new WOW({
    animateClass: 'animate__animated',
}).init();
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

    let index = 0
    const $carSelect = $('#select');
    let loader = $('.loader');
    const formClose = $('#form__close');

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
        formClose.click(function () {
            $overlay.hide();
            $formContainer.hide();
        })
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
    $start.mask('00:00:00');
    const $map = $('#map-select');
    const $end = $('#end');
    $end.mask('00:00:00');
    const $name = $('#name');
    const $number = $('#number');
    $number.mask("(999) 999-9999");
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
        formClose.click(function () {
            $overlay.hide();
            $formContainer.hide();
        })
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
        formClose.click(function () {
            $overlay.hide();
            $formContainer.hide();
        })


    })



    $sendForm.click(function () {
        event.preventDefault();
        hasError = false
        console.log(fieldsToCheck)
        fieldsToCheck.forEach(function (field) {
            let inputField = $(field);
            inputField.removeClass('error');
            inputField.next().hide()
            $('.mini').css('display','flex');
            if (!inputField.val()) {
                inputField.next().show();
                inputField.addClass('error');
                hasError = true;
            }
        });
        if (!hasError) {
            loader.css('display', 'flex');
            let formData = {};

            fieldsToCheck.forEach(function (field) {
                let inputField = $(field)
                formData[inputField.attr('id')] = inputField.val();
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
                        this.reset();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        };

    })
    const $overlaySecond = $('#overlaySecond')
    const $searchContainer = $('#searchContainer')

    $(window).scroll(function() {
        const carTop = $('#car').offset().top;
        const carBottom = carTop + $('#car').outerHeight();
        const windowScrollTop = $(window).scrollTop();

        if (windowScrollTop >= carTop && windowScrollTop <= carBottom) {
            $overlaySecond.show();
            $searchContainer.show();
            $("#returnTime").mask('00:00');
            $("#searchTime").mask('00:00');
            $(function () {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);

                const commonDatepickerOptions = {
                    minDate: currentDate,
                    beforeShowDay: function (date) {
                        const dayOfWeek = date.getDay();
                        return [(dayOfWeek !== 0 && dayOfWeek !== 6)];
                    },
                };

                const datePickerConfig = {
                    searchStart: commonDatepickerOptions,
                    returnStart: commonDatepickerOptions,
                };

                function initializeDatepicker(elementId, options) {
                    $(`#${elementId}`).datepicker(options);
                }

                Object.keys(datePickerConfig).forEach((elementId) => {
                    initializeDatepicker(elementId, datePickerConfig[elementId]);
                });

                const russianLocale = {
                    closeText: 'Закрыть',
                    prevText: 'Предыдущий',
                    nextText: 'Следующий',
                    currentText: 'Сегодня',
                    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
                    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
                    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
                    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                    weekHeader: 'Не',
                    dateFormat: 'dd.mm.yy',
                    firstDay: 1,
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: '',
                };

                $.datepicker.regional['ru'] = russianLocale;
                $.datepicker.setDefaults($.datepicker.regional['ru']);
            });
        } else {
            $overlaySecond.hide();
            $searchContainer.hide();
        }

        $('#searchForm').click(function() {
            event.preventDefault()
            let selectedValue = $("#selectSearch").val()
            $("#slide" + selectedValue).show();
            $overlaySecond.hide();
            $searchContainer.hide();
        })
    });
    $('#search__close').click(function () {
            $overlaySecond.hide();
            $searchContainer.hide();

    })
    $overlaySecond.click(function (event) {
        if (event.target === this) {
            $overlaySecond.hide();
            $searchContainer.hide();
        }
    });


});
