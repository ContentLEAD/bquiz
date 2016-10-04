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
//# sourceMappingURL=_actions.js.map