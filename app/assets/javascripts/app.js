var App = function() {
    var loading = false;

    var that = {};
    that.toggleLoading = function() {
        if (loading) {
            $(this).slideUp(200);
            loading = false;
        }
        else {
            $(this).slideDown(200);
            loading = true;
        }
    };
    return that;
}();
