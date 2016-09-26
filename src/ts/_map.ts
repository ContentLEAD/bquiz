/// <reference path="../../typings/index.d.ts" />

module bGraphics{
   export class map{
        public mapElement;
        public forQuestions;
        public name;
        public areas;
        constructor(selector){
            this.name = selector;
            this.mapElement = jQuery("map[name='"+selector+"'");
            let questions = this.mapElement.attr("data-questions");
            if(questions){
                this.forQuestions = questions.split(",").map(x => Number(x));
            }
            this.areas = this.buildArea(jQuery(this.mapElement).children("area").toArray());
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
}