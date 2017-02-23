$(document).ready(function() {
    $('body.login main .login-panel-wrap .buttons .change-to-signup, header .btn--1').click(function() {
        $('header .btn--1').hide();
        $('header .btn--2').css({display: 'inline-block'});
        $('body.login main .login-panel-wrap').addClass('login-panel-wrap--margin');
        return false;
    });
    $('body.login main .login-panel-wrap .buttons .change-to-login, header .btn--2').click(function() {
        $('header .btn--2').hide();
        $('header .btn--1').css({display: 'inline-block'});
        $('body.login main .login-panel-wrap').removeClass('login-panel-wrap--margin');
        return false;
    });
});
