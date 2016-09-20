/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
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
        mapElements = [];

        export function init(options){
            console.log(options);
            var { questions, answers, selector, questionMap, startMap, endMap, highlighter } = this.options = options;
            this.questions = new preloader(questions);
            this.answers = new preloader(answers);
            this.highlighter = jQuery(highlighter);
            this.questionsTotal = this.questions.length;
            this.imageContainer = jQuery(selector);
            this.setInfo(selector);
            if(startMap){ //will provide ability to have a starting map 
                this.startMap = new map(startMap);
                this.registerMap(this.startMap);
            }
            if(typeof questionMap == 'Array'){ // account form multiple question maps
                for(let map of questionMap){
                    let tMap = new map(map);
                    this.registerMap(tMap);
                }
            }else{
                this.imageMap = new map(questionMap);
                this.registerMap(this.imageMap);
            }
            
            if(endMap){
                this.endMap = new map(endMap);
                this.registerMap(endMap);
            }
            this.initializeQuiz();
            
        };
        export function registerMap(map){
            console.log("adding a new map");
            this.mapElements.push(map);
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
            /*
            this.imageMap.questionAreas.forEach(question => {
                console.log(question);
            question.data.quizRef = this;
                jQuery(question.element).click(question.data, this.registerAnswer);
            });
            
            this.imageMap.continueArea.forEach(cont => {
                jQuery(cont.element).click({"quizRef": this}, this.next);
            });
            this.imageMap.swap.forEach(swap => {
                swap.data.quizRef = this;
                jQuery(swap.element).click(swap.data, this.swap);
            })
            */
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
        export function answer(event){
            console.log("answer event");
            var {shape, coords, value, id, quizRef} = event.data;

            quizRef.currentValue = value;
            
            //Something to move the "selected div" over the coords
            console.log("moving selector over coord areas" + coords);
            let cord = coords.split(",").map(x => Number(x));
            let top, left;
            if(shape == "circle"){
                left = (cord[0] - cord[2])+"px";
                top = (cord[1] - cord[2])+"px";
            }else if(shape == 'rect'){
                left = cord[0]+"px";
                top = cord[0]+"px";
                
            }
            quizRef.highlighter.css({
                    top: top,
                    left: left,
                    display: "block"
                });
            //current question has been answered
            quizRef.currentQuestionAnswered = true;
        };
        export function swap(event){
            console.log("swap event");
            var {quizRef} = event.data;

        };
        export function next(event){
            console.log("next event");
            var {quizRef} = event.data;
            if(!quizRef.currentQuestionAnswered){
                alert("You have not yet provided an answer to the current question.");
                return;
            }
            quizRef.highlighter.css({
                display: "none"
            });
            console.log("moving on...");
            ++quizRef.currentQuestion;

            quizRef.accumulatedValue += Number(quizRef.currentValue);
            quizRef.currentValue = null;
            console.log(quizRef.currentQuestion, quizRef.questionsTotal);
            if(quizRef.currentQuestion == quizRef.questionsTotal){
                quizRef.calculateTotal();
            }else{
                quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);

            }


            //reset current question answered to false
            quizRef.currentQuestionAnswered = false;
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
                this.imageContainer.attr("usemap", "#"+this.mapElements["endmap"]);
            }
        };

    
}