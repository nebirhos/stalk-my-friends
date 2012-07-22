$(document).ready(function() {

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(43.7710332, 11.2480006),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($('#map')[0], mapOptions);

});
