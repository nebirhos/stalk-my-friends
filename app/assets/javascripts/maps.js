App.map = function(args) {
    // private
    var myMarker;
    var myFriends = [];

    var mapCanvas = $(args.canvas)[0];
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(43.7710332, 11.2480006),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map;

    var setPosition = function(latlng) {
        // refresh view
        $('span#position').text(latlng);
        if (myMarker) myMarker.setMap(null);
        myMarker = new google.maps.Marker({position: latlng, map: map, title: "This is me"});
        map.setCenter(latlng);
    };
    var storePosition = function(latlng) {
        // store on db
        $('#user_latitude').val(latlng.lat());
        $('#user_longitude').val(latlng.lng());
        $('[data-action=update_user]').submit();
    };

    // public
    var that = {};
    that.init = function() {
        map = new google.maps.Map(mapCanvas, mapOptions);
        var latlng = new google.maps.LatLng($('#user_latitude').val(), $('#user_longitude').val());
        setPosition(latlng);
        return this;
    };
    that.geolocateMe = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(p) {
                    var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    setPosition(latlng);
                    storePosition(latlng);
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
        storePosition(latlng);
    };
    that.nearbyFriends = function(data) {
        var listNode = $('#friends ul.list');
        // reset
        listNode.html("");
        $.each(myFriends, function(i,v) {v.setMap(null);});
        myFriends = [];
        // populate
        $.each(data, function(index, value) {
            var li = $('<li>').html("<strong>" + value.name + "</strong>");
            if (value.address) li.append(": " + value.address);
            listNode.append(li);
            var latlng = new google.maps.LatLng(value.latitude, value.longitude);
            var friend = new google.maps.Marker({position: latlng, map: map, title: value.name});
            myFriends.push(friend);
        });
        if (data.length == 0) $('#friends .results').text("Sorry, no one here!");
        else $('#friends .results').text("Found " + data.length + " friends around you.");
    };
    return that;
};
