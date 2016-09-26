var bGraphics;
(function (bGraphics) {
    function begin(event) {
        console.log("starting quiz");
        var quizRef = event.data.quizRef;
    }
    bGraphics.begin = begin;
    function answer(event) {
        console.log("answer event");
        var _a = event.data, shape = _a.shape, coords = _a.coords, value = _a.value, id = _a.id, quizRef = _a.quizRef;
        quizRef.currentValue = value;
        console.log("moving selector over coord areas" + coords);
        var cord = coords.split(",").map(function (x) { return Number(x); });
        var top, left;
        if (shape == "circle") {
            left = (cord[0] - cord[2]) + "px";
            top = (cord[1] - cord[2]) + "px";
        }
        else if (shape == 'rect') {
            left = cord[0] + "px";
            top = cord[0] + "px";
        }
        quizRef.highlighter.css({
            top: top,
            left: left,
            display: "block"
        });
        quizRef.currentQuestionAnswered = true;
    }
    bGraphics.answer = answer;
    ;
    function swap(event) {
        console.log("swap event");
        var quizRef = event.data.quizRef;
    }
    bGraphics.swap = swap;
    ;
    function next(event) {
        console.log("next event");
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
        quizRef.answerKeeper.push(quizRef.currentValue);
        quizRef.currentValue = null;
        console.log(quizRef.currentQuestion, quizRef.questionsTotal);
        if (quizRef.currentQuestion == quizRef.questionsTotal) {
            quizRef.calculateTotal();
            return;
        }
        else {
            quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);
        }
        quizRef.currentQuestionAnswered = false;
        quizRef.track.next();
    }
    bGraphics.next = next;
    ;
    function arch(event) {
        console.log("Arch Popup");
        var quizRef = event.data.quizRef;
        quizRef.marpro.cta();
    }
    bGraphics.arch = arch;
    function learnMore(event) {
        var quizRef = event.data.quizRef;
        console.log(event);
        quizRef.track.custom("Url direct");
    }
    bGraphics.learnMore = learnMore;
    function remotePost(event) {
        var quizRef = event.data.quizRef;
        var remoteUrl = quizRef.options.remotePostUrl;
        var answerArray = quizRef.answerKeeper;
        var callback = quizRef.options.remoteCallback ? quizRef.options.remoteCallback : function (data) {
            console.log(data);
        };
        jQuery.post(remoteUrl, {
            answers: answerArray
        }, callback);
    }
    bGraphics.remotePost = remotePost;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_actions.js.map;/// <reference path="../../typings/index.d.ts"/>
var bGraphics;
(function (bGraphics) {
    var archForm = (function () {
        function archForm(obj) {
            this.feedId = obj.feedId;
            this.brand = obj.brand;
            this.formId = obj.formId;
            this.renderPumpkin();
        }
        archForm.prototype.renderPumpkin = function () {
            var tmp = "<a id=\"bGraphicArch\" href=\"javascript:void(0)\" data-br-form-id=\"" + this.formId + "\" class=\"br-form-link\" style=\"display:none;\"></a>";
            var el = jQuery(tmp);
            jQuery("body").append(el);
            jQuery("body").append("<script>\n\t(function(w,pk){var s=w.createElement('script');s.type='text/javascript';s.async=true;s.src='//pumpkin." + this.brand + ".com/pumpkin.js';var f=w.getElementsByTagName('script')[0];f.parentNode.insertBefore(s,f);if(!pk.__S){window._pk=pk;pk.__S = 1.1;}pk.host='conversion." + this.brand + ".com';pk.clientId='" + this.feedId + "';})(document,window._pk||[])\n</script>");
        };
        archForm.prototype.cta = function () {
            console.log("trigger arch");
            var el = jQuery("#bGraphicArch");
            el.trigger("click");
        };
        return archForm;
    })();
    bGraphics.archForm = archForm;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_arch.js.map;/// <reference path="./_preloader.ts"/>
/// <reference path="./_map.ts"/>
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./_tracking.ts"/>
/// <reference path="./_arch.ts"/>
var bGraphics;
(function (bGraphics) {
    bGraphics.accumulatedValue = 0, bGraphics.currentQuestion = 0, bGraphics.currentQuestionAnswered = false, bGraphics.currentValue = null, bGraphics.mapElements = [], bGraphics.answerKeeper = [];
    function init(options) {
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
    }
    bGraphics.init = init;
    ;
    function documentReady(options) {
        console.log(options);
        var _a = this.options = options, questions = _a.questions, answers = _a.answers, selector = _a.selector, questionMap = _a.questionMap, startMap = _a.startMap, endMap = _a.endMap, highlighter = _a.highlighter, arch = _a.arch;
        this.questions = new bGraphics.preloader(questions);
        this.answers = new bGraphics.preloader(answers);
        this.highlighter = jQuery(highlighter);
        this.questionsTotal = this.questions.length;
        this.imageContainer = jQuery(selector);
        this.setInfo(selector);
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
        if (typeof questionMap == 'Array') {
            for (var _i = 0; _i < questionMap.length; _i++) {
                var map_1 = questionMap[_i];
                var tMap = new map_1(map_1);
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
        this.initializeQuiz();
        console.log(this);
    }
    bGraphics.documentReady = documentReady;
    function registerMap(map, type) {
        console.log("registering a " + type + " map", map);
        if (!this.mapElements[type]) {
            this.mapElements[type] = [];
        }
        this.mapElements[type].push(map);
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
            this.imageContainer.attr("usemap", "#" + this.mapElements["end"][0].name);
        }
        this.track.finished();
    }
    bGraphics.resolveAnswer = resolveAnswer;
    ;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_bgraphics.js.map;/// <reference path="../../typings/index.d.ts" />
var bGraphics;
(function (bGraphics) {
    var map = (function () {
        function map(selector) {
            this.name = selector;
            this.mapElement = jQuery("map[name='" + selector + "'");
            var questions = this.mapElement.attr("data-questions");
            if (questions) {
                this.forQuestions = questions.split(",").map(function (x) { return Number(x); });
            }
            this.areas = this.buildArea(jQuery(this.mapElement).children("area").toArray());
        }
        map.prototype.buildArea = function (areas) {
            var tmp = areas.map(function (x) {
                var ref = jQuery(x);
                return {
                    "element": x,
                    "data": {
                        "shape": ref.attr("shape"),
                        "coords": ref.attr("coords"),
                        "value": ref.attr("data-value"),
                        "action": ref.attr("data-function")
                    }
                };
            });
            return tmp;
        };
        return map;
    })();
    bGraphics.map = map;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_map.js.map;var bGraphics;
(function (bGraphics) {
    var preloader = (function () {
        function preloader(ImageArray) {
            var _this = this;
            this.preloaded = [];
            this.ImageArray = ImageArray;
            ImageArray.forEach(function (image) {
                _this.loadImages(image);
            });
            return this.ImageArray;
        }
        preloader.prototype.loadImages = function (image) {
            var img = new Image();
            img.src = image;
            this.preloaded.push(img);
        };
        return preloader;
    })();
    bGraphics.preloader = preloader;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_preloader.js.map;var bGraphics;
(function (bGraphics) {
    var googleAnalyticsTracking = (function () {
        function googleAnalyticsTracking(obj) {
            this.category = obj.category;
            this.label = obj.title;
            this._analytics = window["_gaq"] || null;
            this._ga = window["ga"] || null;
        }
        googleAnalyticsTracking.prototype.next = function (val) {
            if (val === void 0) { val = ""; }
            console.log("tracking next");
            if (this._ga) {
                this._ga("send", "event", this.category, "next Question " + val, this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "next Question " + val, this.label]);
            }
        };
        googleAnalyticsTracking.prototype.finished = function () {
            console.log("tracking finished");
            if (this._ga) {
                this._ga("send", "event", this.category, "Quiz completed", this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "Quiz completed", this.label]);
            }
        };
        googleAnalyticsTracking.prototype.cta = function () {
            console.log("tracking cta click");
            if (this._ga) {
                this._ga("send", "event", this.category, "Call to Action", this.label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', this.category, "Call to Action", this.label]);
            }
        };
        googleAnalyticsTracking.prototype.custom = function (action, category, label) {
            if (category === void 0) { category = this.category; }
            if (label === void 0) { label = this.label; }
            console.log("track custom event");
            if (!action) {
                console.warn("You have not provided an action for tracking");
            }
            if (this._ga) {
                this._ga("send", "event", category, action, label);
            }
            else if (this._analytics) {
                this._analytics.push(['_trackEvent', category, action, label]);
            }
        };
        return googleAnalyticsTracking;
    })();
    bGraphics.googleAnalyticsTracking = googleAnalyticsTracking;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_tracking.js.map