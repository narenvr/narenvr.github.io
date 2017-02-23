$(document).ready(function() {

    $('.dashboard-messages li .close').click(function() {
        $(this).parent().parent().fadeOut(300, function() {
            $(this).remove();
            if ($('.dashboard-messages li').length==0)
                $('.dashboard-messages').addClass('hide');
        });
    });
    $('.dashboard-messages .dismiss-all').click(function() {
        $(this).parent().fadeOut(300);
    });

    $('.dashboard-card .qty-header .search-activate').click(function() {
        $(this).parent().parent().addClass('qty-header-search').find('input').focus().keydown(function(e) {
            if (e.which==27) {
                $(this).parent().parent().removeClass('qty-header-search');
            }
        });
        $(this).parent().parent().find('.close').click(function() {
            $(this).parent().parent().removeClass('qty-header-search');
        });
    });


    /* .................................................................................................................
    BOTTOM BLOCKS ......................................................................................................
    ................................................................................................................. */

    // cards equal height
    $.each($('.dashboard-card'), function(i, card) {
        $(card).find('.body').css({
            height: $(card).height() - $(card).find('.head').height()
        });
        $(card).css({paddingTop: $(card).find('.head').height()});
    });
    $(window).resize(function() {
        $.each($('.dashboard-card'), function(i, card) {
            $(card).css({paddingTop: 0});
            $(card).find('.body').css({
                height: $(card).height() - $(card).find('.head').height()
            });
            $(card).css({paddingTop: $(card).find('.head').height()});
        });
    });

    // without paddings when not much cards
    if ($('.bottom-panels .dashboard-card').length<=3) {
        $('.bottom-panels').addClass('bottom-panels--less3');
    }

    $('.slick-slider').on('init', function(event, slick) {
            $.each($('.slick-slider .slick-slide'), function (i, slide) {
                $(slide).find('.right-icons .activate-dropdown').attr('data-activates', 'slick-dropdown-'+i);
                $(slide).find('.dropdown-content').prop('id', 'slick-dropdown-'+i);
            });
            $('.activate-dropdown').dropdown({
                hover: false, belowOrigin: true, gutter: 0, constrain_width: false
            });
        })
        .slick({
            centerMode: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        centerMode: true,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1
                    }
                }
            ]
        });

    // enable dashboard bottom cards change content (in dropdown)
    $.each($('.dashboard-card'), function (i, card) {
        $(card).find('.qty-header .dropdown-content li a').click(function() {
            $(card).find('.data-variants>div, .data-variants>ul').addClass('hide');
            $(card).find('.' + $(this).data('activates')).removeClass('hide');
            $(card).find('.qty-header .activate-dropdown').dropdown('close');
        });
    });


    // dashboard modals ...............
    // APPS
    $('.dashboard-card--apps .plus').click(function () {
        $('#modal-add-apps').modal('open');
    });
    $('#modal-add-apps .btn-create').click(function() {
        if ($('#modal-add-apps #app-title').val()) {
            $('#modal-add-apps .objects').append('<li><i class="icon-app"></i><span class="name">'+$('#modal-add-apps #app-title').val()+'</span><span class="msg">was created</span></li>');
            $('#modal-add-apps #app-title, #modal-add-apps #app-desc').val('');
            $('#modal-add-apps .created').removeClass('hide');
            $('#modal-add-apps .new-one h3').removeClass('hide');
            if ($('#modal-add-apps .objects li').length<4)
                $('#modal-add-apps .scroll-wrap').height($('#modal-add-apps .modal-content').height()+154);
            if ($('#modal-add-apps .objects li').length>5) {
                $('#modal-add-apps .created').addClass('created--overflow');
                $('#modal-add-apps .created').scrollTop($('#modal-add-apps .created').height());
            }
        }
    });
    $('#modal-add-apps .input-field--search input').focus(function() {
        $('#modal-add-apps .search-group-list').removeClass('hide');
        $('#modal-add-apps .scroll-wrap').scrollTop($('#modal-add-apps').height());
    }).blur(function() {
        //$('#modal-add-apps .search-group-list').addClass('hide');
    });
    $('#modal-add-apps').click(function() {
        if ($('#modal-add-apps .search-group-list input:checked').length==0)
            $('#modal-add-apps .search-group-list').addClass('hide');
    });
    $('#modal-add-apps .search-group-list').click(function(event) {
        event.stopPropagation();
        //$('#modal-add-apps .search-group-list').removeClass('hide');
    });

    // GROUPS
    $('.dashboard-card--groups .plus').click(function () {
        $('#modal-add-groups').modal('open');
    });
    $('#modal-add-groups .btn-create').click(function() {
        if ($('#modal-add-groups #group-title').val()) {
            $('#modal-add-groups .objects').append('<li><i class="icon-group"></i><span class="name">'+$('#modal-add-groups #group-title').val()+'</span><span class="msg">was created</span></li>');
            $('#modal-add-groups #group-title, #modal-add-groups #group-desc').val('');
            $('#modal-add-groups .new-one h3, #modal-add-groups .created').removeClass('hide');
            console.log($('#modal-add-groups .objects li').length);
            if ($('#modal-add-groups .objects li').length<4)
                $('#modal-add-groups .scroll-wrap').height($('#modal-add-groups .modal-content').height()+154);
            if ($('#modal-add-groups .objects li').length>5) {
                $('#modal-add-groups .created').addClass('created--overflow');
                $('#modal-add-groups .created').scrollTop($('#modal-add-groups .created').height());
            }
        }
    });

    // USERS
    $('.dashboard-card--users .plus').click(function () {
        $('#modal-add-users').modal('open');
    });
    $('#modal-add-users .btn-invite').click(function() {
        if ($('#modal-add-users #user-title').val()) {
            $('#modal-add-users .objects').append('<li><i class="icon-user"></i><span class="name">'+$('#modal-add-users #user-title').val()+'</span><span class="msg">invite sent</span></li>');
            $('#modal-add-users #user-title').val('');
            if ($('#modal-add-users .objects li').length>0) {
                $('#modal-add-users .new-one h3').removeClass('hide');
            }
            if ($('#modal-add-users .objects li').length>5) {
                $('#modal-add-users .created').addClass('created--overflow');
                $('#modal-add-users .created').scrollTop($('#modal-add-users .created').height());
            }
        }
    });


    /* .................................................................................................................
    CHARTS .............................................................................................................
    ................................................................................................................. */

    var chart_urls = {
        'Developers': 'groups_developers.html',
        'Human Resources': 'groups_developers.html',
        'Long Group Title': 'groups_developers.html'
    }
    Highcharts.chart({
        chart: {
            renderTo: 'chart-container',
            backgroundColor: 'transparent',
            zoomType: 'x',
            style: {
                fontFamily: 'Open Sans', fontSize: '10px', color: '#f00'
            }
        },
        colors: [
            '#80DEEA', '#F8E81C', '#7ED321', '#FF8A80', '#E360E4', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
        ],
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: ['01 am', '02 am', '03 am', '04 am', '05 am', '06 am',
                '07 am', '08 am', '09 am', '10 am', '11 am', '12 am'],
            lineColor: '#8E96B0',
            tickColor: '#8E96B0',
            tickWidth: 5,
            tickLength: 5
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            gridLineColor: '#DCE5F3',
            gridLineDashStyle: 'longdash'
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            line: {
                cursor: 'pointer',
                events:{
                  click: function (event, i) {
                     if (chart_urls[event.point.series.name]!=undefined) {
                         window.location.href = chart_urls[event.point.series.name];
                     }
                  }
              }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            itemHoverStyle: {
                color: '#fff'
            },
            itemMarginBottom: 8,
            itemStyle: { "color": "#DDE6F4", "fontSize": "10px", "fontWeight": "normal", "fontFamily": "Open Sans" },
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 6
        },
        series: [{
            name: 'Developers',
            data: [1000, 2000, 5000, 500, 11000, 4000, 3000, 3500, 4500, 7000, 9100, 10400],
            marker: {
                symbol: 'circle', radius: 3
            }
        },
        {
            name: 'Human Resources',
            data: [5000, 1000, 7000, 4500, 8000, 7000, 6000, 7000, 3000, 2000, 4100, 1400],
            marker: {
                symbol: 'circle', radius: 3
            }
        },
        {
            name: 'Long Group Title',
            data: [7000, 5000, 1000, 1500, 2000, 3000, 4000, 6500, 4500, 5000, 7100, 9400],
            marker: {
                symbol: 'circle', radius: 3
            }
        }
    ]
    });


    /* .................................................................................................................
    JUST SAMPLE OF DRAWING .............................................................................................
    ................................................................................................................. */

    var c = document.getElementById("report-1-canvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 9);
    ctx.lineTo($(c).width()*2, 9);
    ctx.lineWidth = 1;
    if ($(c).parent().parent().hasClass('bad'))
        ctx.strokeStyle = '#EA3248';
    else
        ctx.strokeStyle = '#b8e986';
    ctx.stroke();

    var c = document.getElementById("report-2-canvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 9);
    ctx.lineTo($(c).width()*2 * 0.2, 0);
    ctx.lineTo($(c).width()*2 * 0.4, 18);
    ctx.lineTo($(c).width()*2 * 0.6, 4);
    ctx.lineTo($(c).width()*2 * 0.8, 10);
    ctx.lineTo($(c).width()*2 * 1, 0);
    ctx.lineWidth = 1;
    if ($(c).parent().parent().hasClass('bad'))
        ctx.strokeStyle = '#EA3248';
    else
        ctx.strokeStyle = '#b8e986';
    ctx.stroke();

    var c = document.getElementById("report-3-canvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 9);
    ctx.lineTo($(c).width()*2 * 0.2, 16);
    ctx.lineTo($(c).width()*2 * 0.4, 3);
    ctx.lineTo($(c).width()*2 * 0.6, 12);
    ctx.lineTo($(c).width()*2 * 0.8, 7);
    ctx.lineTo($(c).width()*2 * 1, 18);
    ctx.lineWidth = 1;
    if ($(c).parent().parent().hasClass('bad'))
        ctx.strokeStyle = '#EA3248';
    else
        ctx.strokeStyle = '#b8e986';
    ctx.stroke();

    /* .............................................................................................................. */
});
