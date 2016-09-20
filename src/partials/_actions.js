var bGraphics;
(function (bGraphics) {
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
        quizRef.currentValue = null;
        console.log(quizRef.currentQuestion, quizRef.questionsTotal);
        if (quizRef.currentQuestion == quizRef.questionsTotal) {
            quizRef.calculateTotal();
        }
        else {
            quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);
        }
        quizRef.currentQuestionAnswered = false;
        quizRef.tracking.next();
    }
    bGraphics.next = next;
    ;
})(bGraphics || (bGraphics = {}));
//# sourceMappingURL=_actions.js.map