module bGraphics{
        export function begin(event){
            console.log("starting quiz");
            var {quizRef} = event.data;
        }
       export function answer(event){
            console.log("answer event");
            var {shape, coords, value, id, quizRef} = event.data;

            quizRef.currentValue = value;
            
            //Something to move the "selected div" over the coords
            console.log("moving selector over coord areas" + coords);
            let cord = coords.split(",").map(x => Number(x));
            let top, left;
            if(shape == "circle"){
                left = (cord[0] - cord[2])+"px";
                top = (cord[1] - cord[2])+"px";
            }else if(shape == 'rect'){
                left = cord[0]+"px";
                top = cord[0]+"px";
                
            }
            quizRef.highlighter.css({
                    top: top,
                    left: left,
                    display: "block"
                });
            //current question has been answered
            quizRef.currentQuestionAnswered = true;
        };
        export function swap(event){
            console.log("swap event");
            var {quizRef} = event.data;

        };
       export function next(event){
            console.log("next event");
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
            quizRef.answerKeeper.push(quizRef.currentValue);

            quizRef.currentValue = null;
            console.log(quizRef.currentQuestion, quizRef.questionsTotal);
            if(quizRef.currentQuestion == quizRef.questionsTotal){
                quizRef.calculateTotal();
                return;
            }else{
                quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);

            }


            //reset current question answered to false
            quizRef.currentQuestionAnswered = false;
            quizRef.track.next();
        };
        export function arch(event){
            console.log("Arch Popup");
            var {quizRef} = event.data;
            quizRef.marpro.cta();
        }
        export function learnMore(event){
            var {quizRef} = event.data;
            console.log(event);
            quizRef.track.custom("Url direct");
        }
        export function remotePost(event){
            var {quizRef} = event.data;
            var remoteUrl = quizRef.options.remotePostUrl; //url to send post data to
            var answerArray = quizRef.answerKeeper;
            var callback = quizRef.options.remoteCallback? quizRef.options.remoteCallback : function(data){
                console.log(data);
            };
            jQuery.post(remoteUrl, {
                answers: answerArray
            },callback)
        } 
}