//Question bank
var questionBank = [
    {
        question : "This singer has had a Billboard No. 1 hit in each of the last four decades",
        option : ["Celine Dion", "Jennifer Lopez", "Taylor Swift", "Mariah Carey"],
        answer : "Mariah Carey"
    }, 
    {
        question : "Who was the very first American Idol winner?",
        option : ["Ariana Grande", "Taylor Swift", "Avril Lavigne", "Kelly Clarkson"],
        answer : "Kelly Clarkson"
    },
    {
        question : "Who wrote songs for Ariana Grande, Miley Cyrus, Britney Spears, and Alice Cooper?",
        option : ["Taylor Swift", "Kesha", "Ariana Grande", "Miley Cyrus"],
        answer : "Kesha"
    },
    {
        question : "Before Miley Cyrus recorded Wrecking Ball, it was offered to which singer?",
        option : ["Ariana Grande", "Kesha", "Beyoncé", "Mariah Carey"],
        answer : "Beyoncé"
    },
    {
        question : "Who was the first artist to occupy all top 10 spots on the Billboard Hot 100?",
        option : ["Taylor Swift", "Ariana Grande", "Mariah Carey", "Jennifer Lopez"],
        answer : "Taylor Swift"
    },
    {
        question : "Who was Marvin Gaye's duet partner?",
        option : ["John Lennon", "Tammi Terrell", "Dionne Warwick", "George Michael"],
        answer : "Tammi Terrell"
    }, 
    {
        question : "Which Astronomer is namedropped in 'Bohemian Rhapsody'?",
        option : ["Galileo", "Kepler", "Copernicus", "Giovanni"],
        answer : "Galileo"
    },
    {
        question : "John Mayer wrote a song about which law of physics?",
        option : ["Force", "Momentum", "Inertia", "Gravity"],
        answer : "Gravity"
    },
    {
        question : "Which Marvel movie's soundtrack won two Grammys?",
        option : ["Batman", "Black Panther", "Spiderman", "Ghost Rider"],
        answer : "Black Panther"
    },
    {
        question : "Who is the Father of Philippine Christmas Music?",
        option : ["Willie Revillame", "Ogie Alcasid", "Jose Mari Chan", "Ryan Cayabyab"],
        answer : "Jose Mari Chan"
    }
]

var question = document.getElementById("question");
var quizContainer = document.getElementById("quiz-container");
var scoreCard = document.getElementById("scorecard");
var option0 = document.getElementById("option0");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
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
    question.innerHTML = 'Q.'+(i + 1)+' '+questionBank[i].question;
    option0.innerHTML = questionBank[i].option[0];
    option1.innerHTML = questionBank[i].option[1];
    option2.innerHTML = questionBank[i].option[2];
    option3.innerHTML = questionBank[i].option[3];
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