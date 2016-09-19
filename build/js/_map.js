/// <reference path="../../typings/index.d.ts" />
/// <reference path="./_areaData.ts" />
var map = (function () {
    function map(selector) {
        console.log(selector);
        console.log("new Area Map being generated");
        this.mapElement = jQuery("map[name='" + selector + "'");
        console.log(this.mapElement);
        this.questionAreas = jQuery(this.mapElement).children("area[data-function='answer']");
        console.log("logging question areas");
        console.log(this.questionAreas);
        this.continueArea = jQuery(this.mapElement).children("area[data-function='next']");
        console.log("Logging map");
        console.log(this);
    }
    map.prototype.initiate = function (ref) {
        console.log("checking reference");
        console.log(ref);
        console.log("Initializing map areas");
        this.questionAreas.map(function (area) {
            var areaData = function () {
                return {
                    "shape": jQuery(area).attr("shape"),
                    "coords": jQuery(area).attr("coords"),
                    "value": jQuery(area).attr("data-value")
                };
            }();
            jQuery(area).on("click", function (x) {
                console.log("I have been clicked");
                ref.registerAnswer(areaData);
            });
        });
        jQuery(this.continueArea).on("click", ref.next());
    };
    return map;
})();
