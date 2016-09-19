/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
var bGraphics = (function () {
    function bGraphics(options) {
        this.accumulatedValue = 0;
        this.currentQuestion = 0;
        this.currentQuestionAnswered = false;
        this.currentValue = null;
        this.mapElements = [];
        console.log(options);
        var _a = this.options = options, questions = _a.questions, answers = _a.answers, selector = _a.selector, questionMap = _a.questionMap, startMap = _a.startMap, endMap = _a.endMap, highlighter = _a.highlighter;
        this.questions = new preloader(questions);
        this.answers = new preloader(answers);
        this.highlighter = jQuery(highlighter);
        this.questionsTotal = this.questions.length;
        this.imageContainer = jQuery(selector);
        if (startMap) {
            this.startMap = new map(startMap);
            this.registerMap(this.startMap);
        }
        if (typeof questionMap == 'Array') {
        }
        else {
            this.imageMap = new map(questionMap);
            this.registerMap(this.imageMap);
        }
        if (endMap) {
            this.endMap = new map(endMap);
            this.registerMap(endMap);
        }
        this.initializeQuiz();
    }
    bGraphics.prototype.registerMap = function (map) {
        console.log("this is the map");
        this.mapElements["endmap"] = map;
    };
    bGraphics.prototype.initializeQuiz = function () {
        var _this = this;
        console.log(this.imageMap.questionAreas);
        this.imageMap.questionAreas.forEach(function (question) {
            console.log(question);
            question.data.quizRef = _this;
            jQuery(question.element).click(question.data, _this.registerAnswer);
        });
        this.imageMap.continueArea.forEach(function (cont) {
            jQuery(cont.element).click({ "quizRef": _this }, _this.next);
        });
        this.imageMap.swap.forEach(function (swap) {
            swap.data.quizRef = _this;
            jQuery(swap.element).click(swap.data, _this.swap);
        });
    };
    bGraphics.prototype.registerAnswer = function (event) {
        var _a = event.data, shape = _a.shape, coords = _a.coords, value = _a.value, id = _a.id, quizRef = _a.quizRef;
        console.log("value is " + value);
        console.log(quizRef);
        quizRef.currentValue = value;
        console.log("moving selector over coord areas" + coords);
        if (shape == "circle") {
            var cord = coords.split(",").map(function (x) { return Number(x); });
            var left = (cord[0] - cord[2]) + "px";
            var top_1 = (cord[1] - cord[2]) + "px";
            quizRef.highlighter.css({
                top: top_1,
                left: left,
                display: "block"
            });
        }
        else if (shape == 'rect') {
        }
        quizRef.currentQuestionAnswered = true;
    };
    bGraphics.prototype.swap = function (event) {
        var quizRef = event.data.quizRef;
    };
    bGraphics.prototype.next = function (event) {
        var quizRef = event.data.quizRef;
        if (!quizRef.currentQuestionAnswered) {
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
        if (quizRef.currentQuestion == quizRef.questionsTotal) {
            quizRef.calculateTotal();
        }
        else {
            quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);
        }
        quizRef.currentQuestionAnswered = false;
    };
    bGraphics.prototype.calculateTotal = function () {
        console.log("quiz all done");
        var res = (this.accumulatedValue / this.questionsTotal);
        console.log(res);
        var index = Math.floor(res) - 1;
        this.resolveAnswer(index);
    };
    bGraphics.prototype.resolveAnswer = function (index) {
        if (this.answers[index]) {
            this.imageContainer.attr("src", this.answers[index]);
        }
        else {
            this.imageContainer.attr("src", this.answers[this.answers.length - 1]);
        }
        if (this.endMap) {
            this.imageContainer.attr("usemap", "#" + this.mapElements["endmap"]);
        }
    };
    return bGraphics;
})();
