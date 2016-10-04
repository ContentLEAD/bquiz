var bGraphics;
(function (bGraphics) {
    var sharing = (function () {
        function sharing() {
            this.currentUrl = window.location.href;
        }
        sharing.prototype.freshWindow = function (url) {
            window.open(url, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=500');
        };
        sharing.prototype.share = function (obj) {
            var network = obj.network;
            var url = this[network]({
                "img": obj.img || "",
                "title": obj.title || ""
            });
            this.freshWindow(url);
        };
        sharing.prototype.setUrl = function (url) {
            this.currentUrl = url;
        };
        sharing.prototype.facebook = function (obj) {
            return "http://www.facebook.com/sharer/sharer.php?u=" + this.currentUrl;
        };
        sharing.prototype.twitter = function (obj) {
            return "https://twitter.com/intent/tweet?original_referer=" + this.currentUrl + "&url=" + this.currentUrl;
        };
        sharing.prototype.linkedin = function (obj) {
            return "https://www.linkedin.com/cws/share?url=" + this.currentUrl;
        };
        sharing.prototype.googleplus = function (obj) {
            return "https://plus.google.com/share?url=" + this.currentUrl;
        };
        sharing.prototype.pinterest = function (obj) {
            var img = obj.img ? obj.img : "";
            var desc = obj.title ? obj.title : "";
            return "https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&description=[post-title]";
        };
        sharing.prototype.reddit = function (obj) {
            return "http://reddit.com/submit?url=[post-url]&title=[post-title]";
        };
        sharing.prototype.mail = function (obj) {
        };
        return sharing;
    })();
    bGraphics.sharing = sharing;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_sharing.js.map