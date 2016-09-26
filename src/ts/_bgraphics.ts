/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./_tracking.ts"/>
/// <reference path="./_arch.ts"/>
module bGraphics{
        export var imageContainer, //jquery object for the source img
        graphicInformation,
        options, // options object
        questions, //questions array
        answers, // answers array
        questionsTotal, // total number of questions
        accumulatedValue = 0, // value so far
        currentQuestion = 0, // current index of question array
        currentQuestionAnswered = false, // has the current question been answered yet
        currentValue = null, // holds the selected value for current question
        imageMap, // Map object holding the main image map
        highlighter,
        startMap,
        endMap,
        mapElements = [],
        track,
        marpro,
        answerKeeper = [];

        export function init(options){
            try{
                jQuery(() => this.documentReady(options));
            }catch(e){
                if(e.message == "jQuery is not defined"){
                    console.warn(e.message + " and is required for bGraphics")
                }else{
                    console.log(e.message);
                }
            }

        };
        export function documentReady(options){
            console.log(options);
            var { questions, answers, selector, questionMap, startMap, endMap, highlighter, arch } = this.options = options;
            this.questions = new preloader(questions);
            this.answers = new preloader(answers);
            this.highlighter = jQuery(highlighter);
            this.questionsTotal = this.questions.length;
            this.imageContainer = jQuery(selector);
            this.setInfo(selector);
            if(arch){
                this.marpro = new archForm({
                    brand: arch.brand,
                    formId: arch.formId,
                    feedId: arch.id,
                })
            }
            this.track = new googleAnalyticsTracking({
                title: this.graphicInformation.title,
                category: "Interactive Graphic Quiz"
            });
            if(startMap){ //will provide ability to have a starting map 
                this.startMap = new map(startMap);
                this.registerMap(this.startMap, "start");
            }
            if(typeof questionMap == 'Array'){ // account form multiple question maps
                for(let map of questionMap){
                    let tMap = new map(map);
                    this.registerMap(tMap, "question");
                }
            }else{
                this.imageMap = new map(questionMap);
                this.registerMap(this.imageMap, "question");
            }
            
            if(endMap){
                this.endMap = new map(endMap);
                this.registerMap(this.endMap, "end");
            }
            this.initializeQuiz();
            console.log(this);
        }
        export function registerMap(map, type){
            console.log("registering a " + type + " map", map);
            if(!this.mapElements[type]){
                this.mapElements[type] = [];
            }
            this.mapElements[type].push(map);
            console.log(this.mapElements);
        };
        export function initializeQuiz(){
            this.imageMap.areas.forEach(area => {
                area.data.quizRef = this;
                let action = (function(){
                    return area.data.action;
                }());
                console.log(action);
                jQuery(area.element).click(area.data, this[area.data.action]);
            })
        };

        export function setInfo(img){
            var sel = jQuery(img);
            this.graphicInformation = {
                "name": sel.attr("alt") || null,
                "title": sel.attr("title") || null,
                "selector": img,
                "originSrc": sel.attr("src"),
                "height": sel.attr("height") || null,
                "width": sel.attr("width") || null,
                "originMap": sel.attr("usemap"),
            }
            if(!this.graphicInformation.title){
                console.warn("Your graphic does not have a title.  Analytics event tracking will be disabled");
            }
        };

        export function calculateTotal(){
            console.log("quiz all done");
            let res = (this.accumulatedValue / this.questionsTotal);
            console.log(res);
            let index = Math.floor(res) - 1;
            this.resolveAnswer(index);
        };

        export function resolveAnswer(index){
            if(this.answers[index]){
                this.imageContainer.attr("src", this.answers[index]);
            }else{
                this.imageContainer.attr("src", this.answers[this.answers.length - 1]);
            }
            if(this.endMap){
                this.imageContainer.attr("usemap", "#"+this.mapElements["end"][0].name);
            }
            this.track.finished();
        };

    
}