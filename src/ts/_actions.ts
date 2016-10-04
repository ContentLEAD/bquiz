module bGraphics{
     export class acts {
        constructor(){

        }
        begin(event){
            console.log("starting quiz");
            var {quizRef} = event.data;
            quizRef.imageContainer.attr("usemap", "#"+quizRef.mapElements.question[0].name);
            quizRef.imageContainer.attr("src", quizRef.questions[0]);
        }

       answer(event){  
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
        swap(event){
            console.log("swap event");
            var {quizRef} = event.data;

        };
       next(event){
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
            if(quizRef.currentQuestion == quizRef.questionsTotal){ //quiz is finished
                quizRef.calculateTotal();
                return;
            }else{ //there are questions left to answer
                if(quizRef.questionMaps.length > 0){
                    quizRef.imageContainer.attr("usemap", "#"+quizRef.questionMaps[quizRef.currentQuestion + 1]);
                }
                quizRef.imageContainer.attr("src", quizRef.questions[quizRef.currentQuestion]);

            }


            //reset current question answered to false
            quizRef.currentQuestionAnswered = false;
            quizRef.track.next();
        };
        arch(event){
            console.log("Arch Popup");
            var {quizRef} = event.data;
            quizRef.marpro.cta();
        }
        learnMore(event){
            var {quizRef} = event.data;
            console.log(event);
            quizRef.track.custom("Url direct");
        }
        remotePost(event){
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
       share(event){
            var {quizRef, share} = event.data;
            console.log(quizRef);
            console.log(share);
            quizRef.sharer.share({
                "network": share,
            });

        }
    }
}