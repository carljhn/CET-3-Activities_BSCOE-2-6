//Question bank
var questionBank = [
    {
        question : "Ludwig van Beethoven was blind",
        option : ["True", "False"],
        answer : "False"
    }, 
    {
        question : "The Weeknd sampled Take On Me by A-ha for Blinding Lights.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Lady Gaga calls her fans Little Black Stars.",
        option : ["True", "False"],
        answer : "False"
    },
    {
        question : "In Katy Perry's Superbowl Halftime Show performance, she was upstaged by a dancing shark.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Taylor Swift's sold 1,578,000 units for Midnights in the first week.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Blank Space is the lead single of Taylor Swift's 1989.",
        option : ["True", "False"],
        answer : "False"
    }, 
    {
        question : "BTS is the first K-pop group to be a Grammy nominee.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Billie Eilish's middle name is Eilish Pirate Baird.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Ariana Grande has a four octave soprano vocal range.",
        option : ["True", "False"],
        answer : "True"
    },
    {
        question : "Ariana Grande was born in Texas.",
        option : ["True", "False"],
        answer : "False"
    }
]

var question = document.getElementById("question");
var quizContainer = document.getElementById("quiz-container");
var scoreCard = document.getElementById("scorecard");
var option0 = document.getElementById("option0");
var option1 = document.getElementById("option1");
var next = document.querySelector(".next");
var points = document.getElementById("score");
var span = document.querySelectorAll("span");
var i = 0;
var score = 0;

//function to display the questions
function displayQuestion(){
    for(var a = 0; a < span.length; a++){
        span[a].style.background = 'none';  
    }
    question.innerHTML = 'Q'+(i + 1)+'.'+' '+questionBank[i].question;
    option0.innerHTML = questionBank[i].option[0];
    option1.innerHTML = questionBank[i].option[1];
    stat.innerHTML = "Question"+' '+(i + 1)+' '
    +'of'+' '+questionBank.length;
}

//function to calculate the scores
function calcScore(e){
    if(e.innerHTML===questionBank[i].answer & score < questionBank.length)
    {
        score = score+1;
        document.getElementById(e.id).style.
        background = 'limegreen'
    }
    else {
        document.getElementById(e.id).style.
        background = 'tomato'
    }
    setTimeout(nextQuestion, 300);
}

//function to display next question
function nextQuestion(){
    if(i < questionBank.length-1)
    {
        i = i+1;
        displayQuestion();
    }
    else {
        points.innerHTML = score+ '/'+questionBank.length;
        quizContainer.style.display = 'none'
        scoreboard.style.display = 'block'
    }
}

//click events to next button
next.addEventListener('click', nextQuestion);

//Back to Quiz button event
function backToQuiz(){
    location.reload();
}

//function to check Answer
function checkAnswer(){
    var answerBank = document.getElementById('answerBank');
    var answers = document.getElementById('answers');
    answerBank.style.display = 'block';
    scoreboard.style.display = 'none';
    for(var a = 0; a < questionBank.length; a++)
    {
        var list = document.createElement('li');
        list.innerHTML = questionBank[a].answer;
        answers.appendChild(list);
    }
}
displayQuestion();