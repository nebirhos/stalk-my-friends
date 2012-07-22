var App = {};

App.map = function(args) {
    // private
    var myMarker;

    var mapCanvas = $(args.canvas)[0];
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(43.7710332, 11.2480006),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map;

    var setPosition = function(latlng) {
        $('span#position').text(latlng);
        if (myMarker) myMarker.setMap(null);
        myMarker = new google.maps.Marker({position: latlng, map: map, title: "This is me"});
        map.setCenter(latlng);
    };

    // public
    var that = {};
    that.init = function() {
        map = new google.maps.Map(mapCanvas, mapOptions);
        return this;
    };
    that.geolocateMe = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(p) {
                    var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    setPosition(latlng);
                },
                function(error) {
                    alert(error.message);
                    console.warn("navigator.geolocation error: ", error);
                },
                {maximumAge: 600000}
            );
        }
        else { console.error("No HTML5? What are you using, IE6?"); }
        return this;
    };
    that.cheat = function(data) {
        var latlng = new google.maps.LatLng(data[0], data[1]);
        setPosition(latlng);
    };
    return that;
};
