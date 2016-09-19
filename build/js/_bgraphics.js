/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
var bGraphics = (function () {
    function bGraphics(options) {
        this.currentQuestion = 0;
        this.currentQuestionAnswered = false;
        this.currentValue = null;
        console.log(options);
        this.options = options;
        var questions = options.questions, answers = options.answers, selector = options.selector, mapSelector = options.mapSelector;
        this.questions = new preloader(questions);
        this.answers = new preloader(answers);
        this.questionsTotal = this.questions.length;
        this.imageContainer = jQuery(selector);
        console.log(mapSelector);
        this.imageMap = new map(mapSelector);
        this.imageMap.initiate();
    }
    bGraphics.prototype.registerAnswer = function (_a) {
        var shape = _a.shape, coords = _a.coords, value = _a.value;
        console.log("answer value is " + value);
        this.currentValue = value;
        this.currentQuestionAnswered = true;
    };
    bGraphics.prototype.next = function () {
        if (!this.currentQuestionAnswered) {
            alert("You have not yet provided an answer to the current question.");
            return;
        }
        console.log("moving on...");
        ++this.currentQuestion;
        this.accumulatedValue += this.currentValue;
        this.currentValue = null;
        if (this.currentQuestion == this.questionsTotal) {
            this.calculateTotal();
        }
        else {
            this.imageContainer.attr("src", this.questions[this.currentQuestion]);
        }
        this.currentQuestionAnswered = false;
    };
    bGraphics.prototype.calculateTotal = function () {
    };
    bGraphics.prototype.resolveAnswer = function () {
    };
    return bGraphics;
})();
