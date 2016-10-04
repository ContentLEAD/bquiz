var bGraphics;
(function (bGraphics) {
    var acts = (function () {
        function acts() {
        }
        acts.prototype.begin = function (event) {
            console.log("starting quiz");
            var quizRef = event.data.quizRef;
            quizRef.imageContainer.attr("usemap", "#" + quizRef.mapElements.question[0].name);
            quizRef.imageContainer.attr("src", quizRef.questions[0]);
        };
        acts.prototype.answer = function (event) {
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
        };
        ;
        acts.prototype.swap = function (event) {
            console.log("swap event");
            var quizRef = event.data.quizRef;
        };
        ;
        acts.prototype.next = function (event) {
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
                if (quizRef.questionMaps.length > 0) {
                    quizRef.imageContainer.attr("usemap", "#" + quizRef.questionMaps[quizRef.currentQuestion + 1]);
                }
                quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);
            }
            quizRef.currentQuestionAnswered = false;
            quizRef.track.next();
        };
        ;
        acts.prototype.arch = function (event) {
            console.log("Arch Popup");
            var quizRef = event.data.quizRef;
            quizRef.marpro.cta();
        };
        acts.prototype.learnMore = function (event) {
            var quizRef = event.data.quizRef;
            console.log(event);
            quizRef.track.custom("Url direct");
        };
        acts.prototype.remotePost = function (event) {
            var quizRef = event.data.quizRef;
            var remoteUrl = quizRef.options.remotePostUrl;
            var answerArray = quizRef.answerKeeper;
            var callback = quizRef.options.remoteCallback ? quizRef.options.remoteCallback : function (data) {
                console.log(data);
            };
            jQuery.post(remoteUrl, {
                answers: answerArray
            }, callback);
        };
        acts.prototype.share = function (event) {
            var _a = event.data, quizRef = _a.quizRef, share = _a.share;
            console.log(quizRef);
            console.log(share);
            quizRef.sharer.share({
                "network": share,
            });
        };
        return acts;
    })();
    bGraphics.acts = acts;
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
//# sourceMappingURL=_bquiz.js.map;/// <reference path="../../typings/index.d.ts" />
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
                var tmpObj = {
                    "element": x,
                    "data": {
                        "shape": ref.attr("shape"),
                        "coords": ref.attr("coords"),
                    }
                };
                var data = ref.data();
                for (var key in data) {
                    tmpObj.data[key] = data[key];
                }
                return tmpObj;
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
    var sharing = (function () {
        function sharing() {
            this.currentUrl = window.location.href;
        }
        sharing.prototype.freshWindow = function (url) {
            window.open(url, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=500');
        };
        sharing.prototype.share = function (obj) {
            var network = obj.network;
            var url = this[network]({
                "img": obj.img || "",
                "title": obj.title || ""
            });
            this.freshWindow(url);
        };
        sharing.prototype.setUrl = function (url) {
            this.currentUrl = url;
        };
        sharing.prototype.facebook = function (obj) {
            return "http://www.facebook.com/sharer/sharer.php?u=" + this.currentUrl;
        };
        sharing.prototype.twitter = function (obj) {
            return "https://twitter.com/intent/tweet?original_referer=" + this.currentUrl + "&url=" + this.currentUrl;
        };
        sharing.prototype.linkedin = function (obj) {
            return "https://www.linkedin.com/cws/share?url=" + this.currentUrl;
        };
        sharing.prototype.googleplus = function (obj) {
            return "https://plus.google.com/share?url=" + this.currentUrl;
        };
        sharing.prototype.pinterest = function (obj) {
            var img = obj.img ? obj.img : "";
            var desc = obj.title ? obj.title : "";
            return "https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&description=[post-title]";
        };
        sharing.prototype.reddit = function (obj) {
            return "http://reddit.com/submit?url=[post-url]&title=[post-title]";
        };
        sharing.prototype.mail = function (obj) {
        };
        return sharing;
    })();
    bGraphics.sharing = sharing;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_sharing.js.map;var bGraphics;
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