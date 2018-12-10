$(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
        $('header').addClass("sticky");
        $('#logOutBtn').removeClass("btn-outline-danger")
        $('#logOutBtn').addClass("btn-danger")
    }
    else {
        $('header').removeClass("sticky");
        $('#logOutBtn').removeClass("btn-danger")
        $('#logOutBtn').addClass("btn-outline-danger")
    }
});