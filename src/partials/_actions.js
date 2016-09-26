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
//# sourceMappingURL=_actions.js.map