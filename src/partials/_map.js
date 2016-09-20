/// <reference path="../../typings/index.d.ts" />
var bGraphics;
(function (bGraphics) {
    var map = (function () {
        function map(selector) {
            console.log(selector);
            console.log("new Area Map being generated");
            this.mapElement = jQuery("map[name='" + selector + "'");
            this.questionAreas = this.buildArea(jQuery(this.mapElement).children("area[data-function='answer']").toArray());
            this.swap = this.buildArea(jQuery(this.mapElement).children("area[data-function='swap']").toArray());
            this.continueArea = this.buildArea(jQuery(this.mapElement).children("area[data-function='next']").toArray());
            this.areas = this.buildArea(jQuery(this.mapElement).children("area").toArray());
        }
        map.prototype.buildArea = function (areas) {
            var tmp = areas.map(function (x) {
                var ref = jQuery(x);
                return {
                    "element": x,
                    "data": {
                        "shape": ref.attr("shape"),
                        "coords": ref.attr("coords"),
                        "value": ref.attr("data-value"),
                        "action": ref.attr("data-function")
                    }
                };
            });
            console.log(tmp);
            return tmp;
        };
        return map;
    })();
    bGraphics.map = map;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_map.js.map