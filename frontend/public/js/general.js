// Headhesive init
var options = {  // set options
    offset: 350,
    classes: {
        clone:   'at-clone',
        stick:   'at-stick',
        unstick: 'at-unstick'
    },
    onInit: function() {
        $('.at-clone .at-btn').removeClass('at-btn-white');
        $('.at-clone .logo img').prop('src', "photos/logo-sticky.png");
    }
};

var at_fixed_menu = new Headhesive('.header-navbar', options); // init

// One page nav
$('.main-nav ul').onePageNav({
    changeHash: true,
});