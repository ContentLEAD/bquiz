/// <reference path="../../typings/index.d.ts" />
var bGraphics;
(function (bGraphics) {
    var map = (function () {
        function map(selector) {
            this.name = selector;
            this.mapElement = jQuery("map[name='" + selector + "'");
            var questions = this.mapElement.attr("data-questions");
            if (questions) {
                this.forQuestions = questions.split(",").map(function (x) { return Number(x); });
            }
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
            return tmp;
        };
        return map;
    })();
    bGraphics.map = map;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_map.js.map