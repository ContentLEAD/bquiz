Bgraphics Library

Author: Deryk w. King
Version: 0.1.0

This library is for building Brafton Interactive Graphics
To begin learn how to work with the library see the README file in the "Build" Folder

Requirements:  
    "grunt": "^1.0.1",  
    "grunt-contrib-concat": "^1.0.1",  
    "grunt-contrib-copy": "^1.0.0",  
    "grunt-contrib-uglify": "^2.0.0",  
    "grunt-contrib-watch": "^1.0.0",  
    "grunt-serve": "^0.1.6",  
    "grunt-typescript": "^0.8.0",  
    "typings": "^1.3.3"  

Install: 
type `npm install` to install all node packages required

commands:
`grunt livedev` will run a test server "localhost:9000"
after running grunt livedev hit `ctrl + C` to exit out of the server process and begin the watch process.
Watch will watch all typescript files in src/ts for updates and compile in realtime.

`grunt full` will run:
typescript: comiple your typescript files from scr/ts/* to es5 in src/partials with map files included.
concat: join all js files from src/partials into the src/js folder under bgraphics.js .
uglify: will minimize and uglify the bgraphics.js file to bgraphics.min.js.
copy: will copy the js folder into the build folder for developement testing
`grunt` will run:
typescript: comiple your typescript files from scr/ts/* to es5 in src/partials with map files included.
concat: join all js files from src/partials into the src/js folder under bgraphics.js .
uglify: will minimize and uglify the bgraphics.js file to bgraphics.min.js.

Usage:

~~~~
bGraphics.bQuiz.init({
                "selector": "#mygraphic", //css selector for the <img>
                "startMap": "zMap",
                "questionMap": ["aMap", "bMap", "cMap"], //map [name] Can be an array of question maps
                "endMap": "dMap", //map [name]
                "highlighter": "#highlighter", // css selector for the highlighter element
                "questions": [ //array of question img urls in order of use
                    "img/quiz_2_question.jpg",
                    "img/quiz_3_question.jpg",
                    "img/quiz_4_question.jpg",
                    "img/quiz_5_question.jpg",
                    "img/quiz_6_question.jpg",
                ],
                "answers": [ //array of answer img urls in order of result
                    "img/low_risk.jpg",
                    "img/medium_risk.jpg",
                    "img/high_risk.jpg"
                ],
                "resultUrls":[ //array of urls relating to the answer array for sharing unique results to social sites
                    "url1",
                    "url2"
                ]/*,
                'arch': { //optional for Arch only
                    id: 16001379, //Feed ID
                    brand: "contentlead", //Product 
                    formId: 350 //Arch Form to use
                }*/
            });
~~~~
            