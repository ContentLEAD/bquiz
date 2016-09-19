/// <reference path="../../typings/index.d.ts" />
/// <reference path="./_areaData.ts" />
var map = (function () {
    function map(selector) {
        console.log(selector);
        console.log("new Area Map being generated");
        this.mapElement = jQuery("map[name='" + selector + "'");
        this.questionAreas = this.buildArea(jQuery(this.mapElement).children("area[data-function='answer']").toArray());
        this.swap = this.buildArea(jQuery(this.mapElement).children("area[data-function='swap']").toArray());
        this.continueArea = this.buildArea(jQuery(this.mapElement).children("area[data-function='next']").toArray());
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
