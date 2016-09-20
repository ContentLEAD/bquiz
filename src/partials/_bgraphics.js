/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./_tracking.ts"/>
var bGraphics;
(function (bGraphics) {
    bGraphics.accumulatedValue = 0, bGraphics.currentQuestion = 0, bGraphics.currentQuestionAnswered = false, bGraphics.currentValue = null, bGraphics.mapElements = [];
    function init(options) {
        console.log(options);
        var _a = this.options = options, questions = _a.questions, answers = _a.answers, selector = _a.selector, questionMap = _a.questionMap, startMap = _a.startMap, endMap = _a.endMap, highlighter = _a.highlighter;
        this.questions = new bGraphics.preloader(questions);
        this.answers = new bGraphics.preloader(answers);
        this.highlighter = jQuery(highlighter);
        this.questionsTotal = this.questions.length;
        this.imageContainer = jQuery(selector);
        this.setInfo(selector);
        this.track = new bGraphics.googleAnalyticsTracking({
            title: this.graphicInformation.title,
            category: "Interactive Graphic Quiz"
        });
        if (startMap) {
            this.startMap = new bGraphics.map(startMap);
            this.registerMap(this.startMap);
        }
        if (typeof questionMap == 'Array') {
            for (var _i = 0; _i < questionMap.length; _i++) {
                var map_1 = questionMap[_i];
                var tMap = new map_1(map_1);
                this.registerMap(tMap);
            }
        }
        else {
            this.imageMap = new bGraphics.map(questionMap);
            this.registerMap(this.imageMap);
        }
        if (endMap) {
            this.endMap = new bGraphics.map(endMap);
            this.registerMap(endMap);
        }
        this.initializeQuiz();
    }
    bGraphics.init = init;
    ;
    function registerMap(map) {
        console.log("adding a new map");
        this.mapElements.push(map);
        console.log(this.mapElements);
    }
    bGraphics.registerMap = registerMap;
    ;
    function initializeQuiz() {
        var _this = this;
        this.imageMap.areas.forEach(function (area) {
            area.data.quizRef = _this;
            var action = (function () {
                return area.data.action;
            }());
            console.log(action);
            jQuery(area.element).click(area.data, _this[area.data.action]);
        });
    }
    bGraphics.initializeQuiz = initializeQuiz;
    ;
    function setInfo(img) {
        var sel = jQuery(img);
        this.graphicInformation = {
            "name": sel.attr("alt") || null,
            "title": sel.attr("title") || null,
            "selector": img,
            "originSrc": sel.attr("src"),
            "height": sel.attr("height") || null,
            "width": sel.attr("width") || null,
            "originMap": sel.attr("usemap"),
        };
        if (!this.graphicInformation.title) {
            console.warn("Your graphic does not have a title.  Analytics event tracking will be disabled");
        }
    }
    bGraphics.setInfo = setInfo;
    ;
    function calculateTotal() {
        console.log("quiz all done");
        var res = (this.accumulatedValue / this.questionsTotal);
        console.log(res);
        var index = Math.floor(res) - 1;
        this.resolveAnswer(index);
    }
    bGraphics.calculateTotal = calculateTotal;
    ;
    function resolveAnswer(index) {
        if (this.answers[index]) {
            this.imageContainer.attr("src", this.answers[index]);
        }
        else {
            this.imageContainer.attr("src", this.answers[this.answers.length - 1]);
        }
        if (this.endMap) {
            this.imageContainer.attr("usemap", "#" + this.mapElements["endmap"]);
        }
        this.tracking.finished();
    }
    bGraphics.resolveAnswer = resolveAnswer;
    ;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_bgraphics.js.map