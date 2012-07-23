// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require app
//= require maps
//= require_tree .

$(document).ready(function() {

    // Ajax globals
    $("#loading")
        .bind("ajaxSend", App.toggleLoading)
        .bind("ajaxComplete", App.toggleLoading);

    var map = App.map({canvas: "#map"}).init();

    $('[data-action=geolocate]').click(map.geolocateMe);

    $('[data-action=cheat]').click(function() {
        $.getJSON('/geocode/', {query: $('#address').val()}, map.cheat);
    });

    $('[data-action=nearby_friends]').click(function() {
        $.getJSON('/users', {radius: $(this).data('radius')}, map.nearbyFriends);
    });
});
