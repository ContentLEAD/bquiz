/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>

class bGraphics{
    imageContainer; //jquery object for the source img
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
    constructor(options){
        console.log(options);
        var { questions, answers, selector, questionMap, startMap, endMap, highlighter } = this.options = options;
        this.questions = new preloader(questions);
        this.answers = new preloader(answers);
        this.highlighter = jQuery(highlighter);
        this.questionsTotal = this.questions.length;
        this.imageContainer = jQuery(selector);

        if(startMap){ //will provide ability to have a starting map 
            this.startMap = new map(startMap);
            this.registerMap(this.startMap);
        }
        if(typeof questionMap == 'Array'){ // account form multiple question maps

        }else{
            this.imageMap = new map(questionMap);
            this.registerMap(this.imageMap);
        }
        
        if(endMap){
            this.endMap = new map(endMap);
            this.registerMap(endMap);
        }
        this.initializeQuiz();
        
    }
    registerMap(map){
        console.log("this is the map");
        this.mapElements["endmap"] = map;
    }
    initializeQuiz(){
        console.log(this.imageMap.questionAreas);
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
    }
    registerAnswer(event){
        var {shape, coords, value, id, quizRef} = event.data;
        console.log("value is " + value);
        console.log(quizRef);
        quizRef.currentValue = value;
        
        //Something to move the "selected div" over the coords
        console.log("moving selector over coord areas" + coords);
        if(shape == "circle"){
            let cord = coords.split(",").map(x => Number(x));
            let left = (cord[0] - cord[2])+"px";
            let top = (cord[1] - cord[2])+"px";
            quizRef.highlighter.css({
                top: top,
                left: left,
                display: "block"
            });
        }else if(shape == 'rect'){

        }
        //current question has been answered
        quizRef.currentQuestionAnswered = true;
    }
    swap(event){
        var {quizRef} = event.data;

    }
    next(event){
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
            this.imageContainer.attr("usemap", "#"+this.mapElements["endmap"]);
        }
    }
}