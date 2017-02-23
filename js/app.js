/* .....................................................................................................................
.. Main App File (for all pages)
......................................................................................................................*/



// .. After loading ALL ................................................................................................

$(window).load(function() {
    $('body').animate({opacity: 1}, 200, function() {
        $('body').removeClass('notransition');
    });
});


// .. Document Ready ...................................................................................................

$(document).ready(function() {

    // sidebar menu
    $('.menu-burger').click(function() {
        $(this).toggleClass('active');
        $('.sidebar').toggleClass('active');
        $('.content').toggleClass('short');
    });

    // dropdowns
    $('.activate-dropdown').not('.slick-slider .activate-dropdown').dropdown({
        hover: false, belowOrigin: true, gutter: 0, constrain_width: false
    });

    $('.dropdown-content').on('click', function(event) {
        event.stopPropagation();
    });
    $('.dropdown-content .btn').click(function() {
        $('.activate-dropdown').dropdown('close');
    });


    // modal windows
    $('.modal').modal({
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            $(modal).find('.scroll-wrap').height($(modal).height());
        }
    });

    // edit in main title
    $('.main-title .edit-activate').click(function() {
        $('.main-title .edit-in-place').show();
        $('.main-title h2, .main-title h1').hide();
        $('.main-title .edit-in-place input').focus().focusToEnd();
    });
    $('.main-title .edit-in-place .btn').click(function() {
        $('.main-title .edit-in-place').hide();
        $('.main-title h2, .main-title h1').show();
        $('.main-title h2 span, .main-title h3 span').html($('.main-title .edit-in-place input').val());
    });


    /* .................................................................................................................
    .. Tables ..........................................................................................................
    ..................................................................................................................*/

    // check all rows
    $.each($('table'), function (i, table) {
        $(table).find('.check-all-rows').click(function() {
            $(table).find('tr td input[type=checkbox]').prop("checked", $(this).prop("checked"));

            if ($(table).find('td input[type=checkbox]:checked').length) {
                $(table).next().find('.delete-all-rows').removeClass('disabled');
                panel_tooltip_show(
                    $(table).find('td input[type=checkbox]:checked').length + ' selected',
                    'deselect'
                );
            }
            else {
                $(table).next().find('.delete-all-rows').addClass('disabled');
                panel_tooltip_hide();
            }
        });
    });

    // Check row ....
    $.each($('table'), function (i, table) {
        $(table).find('tr td input[type=checkbox]').click(function() {
            if (!$(this).prop("checked"))
                $(table).find('th input[type=checkbox]').prop("checked", false);
            if ($(table).find('td input[type=checkbox]:checked').length) {
                panel_tooltip_show(
                    $(table).find('td input[type=checkbox]:checked').length + ' selected',
                    'deselect'
                );
                $(table).next().find('.delete-all-rows').removeClass('disabled');
            }
            else {
                $(table).next().find('.delete-all-rows').addClass('disabled');
                panel_tooltip_hide();
            }
        });
    });

    if ($.isFunction($.fn.tooltipster)) {
        $('.tooltip').tooltipster({
            side: 'right',
            maxWidth: 212
        });
    }
});


// .. Panel Tooltip ....................................................................................................

function panel_tooltip_show (s, action) {
    $('.panel-tooltip .left').html(s);
    $('.panel-tooltip').addClass('visible');
    if (action=='deselect') {
        $('.panel-tooltip .action').click(function() {
            $('.content table td input[type=checkbox]').prop("checked", false);
            $('.after-table-buttons .btn').addClass('disabled');
            panel_tooltip_hide();
        });
    }
}
function panel_tooltip_hide () {
    $('.panel-tooltip .left').html('');
    $('.panel-tooltip').removeClass('visible');
}


// .. Caret to end .....................................................................................................

$.fn.focusToEnd = function() {
   return this.each(function() {
       var v = $(this).val();
       $(this).focus().val("").val(v);
   });
};
