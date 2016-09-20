var bGraphics;
(function (bGraphics) {
    var preloader = (function () {
        function preloader(ImageArray) {
            var _this = this;
            this.preloaded = [];
            this.ImageArray = ImageArray;
            ImageArray.forEach(function (image) {
                _this.loadImages(image);
            });
            return this.ImageArray;
        }
        preloader.prototype.loadImages = function (image) {
            var img = new Image();
            img.src = image;
            this.preloaded.push(img);
        };
        return preloader;
    })();
    bGraphics.preloader = preloader;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_preloader.js.map