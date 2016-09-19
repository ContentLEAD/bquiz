var preloader = (function () {
    function preloader(ImageArray) {
        var _this = this;
        this.preloaded = [];
        this.ImageArray = ImageArray;
        ImageArray.forEach(function (image) {
            _this.loadImages(image);
        });
        return this.preloaded;
    }
    preloader.prototype.loadImages = function (image) {
        var img = new Image();
        img.src = image;
        this.preloaded.push(img);
    };
    return preloader;
})();
