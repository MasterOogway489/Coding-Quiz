var highscores = document.getElementById("view-highscores");
var timer = document.getElementById("timer");
var quizTitle = document.getElementById("quiz-title");
var timeLeft = 75;
var description = document.getElementById("quiz-description");
var startButton = document.getElementById("start-button");
var answerButtons = document.getElementById("answer-buttons");
var answerIndicator = document.getElementById("answer-indicator");
var currentQuestion = 0;

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["Strings", "Booleans", "Alerts", "Numbers"],
        rightAnswer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["Quotes", "Curly Brackets", "Parentheses", "square Brackets"],
        rightAnswer: "Parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["Numbers and Strings", "Booleans", "Other Arrays", "All of the Above"],
        rightAnswer: "All of the Above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
        rightAnswer: "Quotes"
    },
    {
        question: "The best color is:",
        answers: ["White", "Purple", "Blue", "Red"],
        rightAnswer: "Purple"
    },
];

highscores.textContent = "View Highscores";

timer.textContent = "Time Remaining: 75";

quizTitle.textContent = "Coding Quiz Challenge";

description.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

startButton.addEventListener("click", function () {
    startQuiz();

});

function startQuiz() {
    startTimer();
    displayQuestion();
    displayAnswers();
    description.remove();
    startButton.remove();

}

function nextQuestion() {
    currentQuestion++;
    displayQuestion();
    displayAnswers();
}
function startTimer() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time Remaining: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.textContent = "Time Remaining: 0";
        }
    }, 1000);
}

function displayQuestion() {
    for (var i = 0; i < questions.length; i++) {
        quizTitle.textContent = questions[currentQuestion].question;

    };
}


function displayAnswers() {
    for (var i = 0; i < 4; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(questions[currentQuestion].answers[i]));
        answerButtons.appendChild(li);
        li.setAttribute("style", "background-color: black; color: white; border-radius: 10px; padding: 10px; margin: 10px; text-align: center; list-style-type: none; cursor: pointer;");

        if (li.textContent === questions[currentQuestion].rightAnswer) {
            li.addEventListener("click", function () {
                answerIndicator.setAttribute("style", "color: green;");
                answerIndicator.textContent = "Correct!";
                answerButtons.innerHTML = "";
                nextQuestion();    
             
            });
        } else {
            li.addEventListener("click", function() {
                answerIndicator.setAttribute("style", "color: red;");
                timeLeft = timeLeft - 10;
                answerIndicator.textContent = "Incorrect! -10 Seconds";
                var timeInterval = setInterval(function () {
                answerIndicator.textContent = "";
            }, 1000);
        });
    };
}
}



