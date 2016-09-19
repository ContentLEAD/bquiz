/// <reference path="../../typings/index.d.ts" />
/// <reference path="./_areaData.ts" />


class map{
    public mapElement;
    public questionAreas;
    public continueArea;
    public swap;
    constructor(selector){
        console.log(selector);
        console.log("new Area Map being generated");
        this.mapElement = jQuery("map[name='"+selector+"'");
        this.questionAreas = this.buildArea(jQuery(this.mapElement).children("area[data-function='answer']").toArray());
        this.swap = this.buildArea(jQuery(this.mapElement).children("area[data-function='swap']").toArray());
        this.continueArea = this.buildArea(jQuery(this.mapElement).children("area[data-function='next']").toArray());
    }

    buildArea(areas){
        var tmp = areas.map(x => {
            let ref = jQuery(x);
            return {
                "element": x,
                "data": {
                    "shape": ref.attr("shape"),
                    "coords": ref.attr("coords"),
                    "value": ref.attr("data-value"),
                    "action": ref.attr("data-function")
                }
            }
        });
        return tmp;
    }

}
