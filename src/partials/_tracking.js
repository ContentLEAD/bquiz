var bGraphics;
(function (bGraphics) {
    var googleAnalyticsTracking = (function () {
        function googleAnalyticsTracking(obj) {
            this.category = obj.category;
            this.label = obj.title;
            this._analytics = window["_gaq"] || null;
            this._ga = window["ga"] || null;
        }
        googleAnalyticsTracking.prototype.next = function (val) {
            if (val === void 0) { val = ""; }
            console.log("tracking next");
            if (this._ga) {
                this._ga("send", "event", this.category, "next Question " + val, this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "next Question " + val, this.label]);
            }
        };
        googleAnalyticsTracking.prototype.finished = function () {
            console.log("tracking finished");
            if (this._ga) {
                this._ga("send", "event", this.category, "Quiz completed", this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "Quiz completed", this.label]);
            }
        };
        googleAnalyticsTracking.prototype.cta = function () {
            console.log("tracking cta click");
            if (this._ga) {
                this._ga("send", "event", this.category, "Call to Action", this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "Call to Action", this.label]);
            }
        };
        googleAnalyticsTracking.prototype.custom = function (action, category, label) {
            if (category === void 0) { category = this.category; }
            if (label === void 0) { label = this.label; }
            console.log("track custom event");
            if (!action) {
                console.warn("You have not provided an action for tracking");
            }
            if (this._ga) {
                this._ga("send", "event", category, action, label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', category, action, label]);
            }
        };
        return googleAnalyticsTracking;
    })();
    bGraphics.googleAnalyticsTracking = googleAnalyticsTracking;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_tracking.js.map