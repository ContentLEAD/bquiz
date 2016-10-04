/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./_tracking.ts"/>
/// <reference path="./_arch.ts"/>
/// <reference path="./_actions.ts"/>

module bGraphics{
     class _bQuiz extends acts{
        imageContainer; //jquery object for the source img
        graphicInformation;
        options; // options object
        questions; //questions array
        answers; // answers array
        questionsTotal; // total number of questions
        accumulatedValue = 0; // value so far
        currentQuestion = 0; // current index of question array
        currentQuestionAnswered = false; // has the current question been answered yet
        currentValue = null; // holds the selected value for current question
        imageMap; // Map object holding the main image map
        highlighter;
        startMap;
        endMap;
        mapElements = [];
        track;
        marpro;
        answerKeeper = [];
        resultUrls;
        sharer;
        questionMaps = [];

        constructor(){
            super();
        }

        init(options){
            try{
                jQuery(() => this.documentReady(options));
            }catch(e){
                if(e.message == "jQuery is not defined"){
                    console.warn(e.message + " and is required for bGraphics")
                }else{
                    console.log(e.message);
                }
            }

        }
        documentReady(options){
            console.log(options);
            var { questions, answers, selector, questionMap, startMap, endMap, highlighter, arch, resultUrls } = this.options = options;
            this.resultUrls = resultUrls;
            this.questions = new preloader(questions);
            this.answers = new preloader(answers);
            this.highlighter = jQuery(highlighter);
            this.questionsTotal = this.questions.length;
            this.imageContainer = jQuery(selector);
            this.setInfo(selector);
            this.sharer = new sharing();
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
            if(questionMap instanceof Array){ // account form multiple question maps
                
                for(let qMap of questionMap){
                    let tMap = new map(qMap);
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
            //this.initializeQuiz();
            console.log(this);
        }
        registerMap(map, type){
            console.log("registering a " + type + " map");
            if(!this.mapElements[type]){
                this.mapElements[type] = [];
            }
            this.mapElements[type].push(map);
            if(map.forQuestions){
                map.forQuestions.forEach(q => {
                    this.questionMaps[q] = map.name;
                })
            }
            this.initializeQuiz(map)
        }
        initializeQuiz(map){
            console.log(map);
            map.areas.forEach(area => {
                area.data.quizRef = this;
                let action = (function(){
                    return area.data.action;
                }());
                console.log(area.data.action);
                jQuery(area.element).click(area.data, this[area.data.action]);
            })
        }

        setInfo(img){
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
        }

        calculateTotal(){
            console.log("quiz all done");
            let res = (this.accumulatedValue / this.questionsTotal);
            console.log(res);
            let index = Math.floor(res) - 1;
            this.resolveAnswer(index);
        }

        resolveAnswer(index){
            if(this.answers[index]){
                this.imageContainer.attr("src", this.answers[index]);
            }else{
                this.imageContainer.attr("src", this.answers[this.answers.length - 1]);
            }
            if(this.endMap){
                this.imageContainer.attr("usemap", "#"+this.mapElements["end"][0].name);
            }
            if(this.resultUrls.length > 0){
                this.sharer.setUrl(this.resultUrls[index]);
            }
            this.track.finished();
        }

    }    
    export var bQuiz = new _bQuiz();

}