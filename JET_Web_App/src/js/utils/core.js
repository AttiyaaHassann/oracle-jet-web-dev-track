define(function () {

    function CoreUtils() {
        this.counter = 0;
    }

    CoreUtils.prototype.generateUniqueId = function () {
        return "uid-" + this.counter++;
    };

    return new CoreUtils();
});