/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./_tracking.ts"/>
/// <reference path="./_arch.ts"/>
/// <reference path="./_actions.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bGraphics;
(function (bGraphics) {
    var _bQuiz = (function (_super) {
        __extends(_bQuiz, _super);
        function _bQuiz() {
            _super.call(this);
            this.accumulatedValue = 0;
            this.currentQuestion = 0;
            this.currentQuestionAnswered = false;
            this.currentValue = null;
            this.mapElements = [];
            this.answerKeeper = [];
            this.questionMaps = [];
        }
        _bQuiz.prototype.init = function (options) {
            var _this = this;
            try {
                jQuery(function () { return _this.documentReady(options); });
            }
            catch (e) {
                if (e.message == "jQuery is not defined") {
                    console.warn(e.message + " and is required for bGraphics");
                }
                else {
                    console.log(e.message);
                }
            }
        };
        _bQuiz.prototype.documentReady = function (options) {
            console.log(options);
            var _a = this.options = options, questions = _a.questions, answers = _a.answers, selector = _a.selector, questionMap = _a.questionMap, startMap = _a.startMap, endMap = _a.endMap, highlighter = _a.highlighter, arch = _a.arch, resultUrls = _a.resultUrls;
            this.resultUrls = resultUrls;
            this.questions = new bGraphics.preloader(questions);
            this.answers = new bGraphics.preloader(answers);
            this.highlighter = jQuery(highlighter);
            this.questionsTotal = this.questions.length;
            this.imageContainer = jQuery(selector);
            this.setInfo(selector);
            this.sharer = new bGraphics.sharing();
            if (arch) {
                this.marpro = new bGraphics.archForm({
                    brand: arch.brand,
                    formId: arch.formId,
                    feedId: arch.id,
                });
            }
            this.track = new bGraphics.googleAnalyticsTracking({
                title: this.graphicInformation.title,
                category: "Interactive Graphic Quiz"
            });
            if (startMap) {
                this.startMap = new bGraphics.map(startMap);
                this.registerMap(this.startMap, "start");
            }
            if (questionMap instanceof Array) {
                for (var _i = 0; _i < questionMap.length; _i++) {
                    var qMap = questionMap[_i];
                    var tMap = new bGraphics.map(qMap);
                    this.registerMap(tMap, "question");
                }
            }
            else {
                this.imageMap = new bGraphics.map(questionMap);
                this.registerMap(this.imageMap, "question");
            }
            if (endMap) {
                this.endMap = new bGraphics.map(endMap);
                this.registerMap(this.endMap, "end");
            }
            console.log(this);
        };
        _bQuiz.prototype.registerMap = function (map, type) {
            var _this = this;
            console.log("registering a " + type + " map");
            if (!this.mapElements[type]) {
                this.mapElements[type] = [];
            }
            this.mapElements[type].push(map);
            if (map.forQuestions) {
                map.forQuestions.forEach(function (q) {
                    _this.questionMaps[q] = map.name;
                });
            }
            this.initializeQuiz(map);
        };
        _bQuiz.prototype.initializeQuiz = function (map) {
            var _this = this;
            console.log(map);
            map.areas.forEach(function (area) {
                area.data.quizRef = _this;
                var action = (function () {
                    return area.data.action;
                }());
                console.log(area.data.action);
                jQuery(area.element).click(area.data, _this[area.data.action]);
            });
        };
        _bQuiz.prototype.setInfo = function (img) {
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
        };
        _bQuiz.prototype.calculateTotal = function () {
            console.log("quiz all done");
            var res = (this.accumulatedValue / this.questionsTotal);
            console.log(res);
            var index = Math.floor(res) - 1;
            this.resolveAnswer(index);
        };
        _bQuiz.prototype.resolveAnswer = function (index) {
            if (this.answers[index]) {
                this.imageContainer.attr("src", this.answers[index]);
            }
            else {
                this.imageContainer.attr("src", this.answers[this.answers.length - 1]);
            }
            if (this.endMap) {
                this.imageContainer.attr("usemap", "#" + this.mapElements["end"][0].name);
            }
            if (this.resultUrls.length > 0) {
                this.sharer.setUrl(this.resultUrls[index]);
            }
            this.track.finished();
        };
        return _bQuiz;
    })(bGraphics.acts);
    bGraphics.bQuiz = new _bQuiz();
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_bquiz.js.map