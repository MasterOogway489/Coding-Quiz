var highscores = document.getElementById("view-highscores");
var timer = document.getElementById("timer");
var quizTitle = document.getElementById("quiz-title");
var timeLeft = 75;
var description = document.getElementById("quiz-description");
var startButton = document.getElementById("start-button");
var answerButtons = document.getElementById("answer-buttons");
var answerIndicator = document.getElementById("answer-indicator");
var savedScores = document.getElementById("scores-saved");
var currentQuestion = 0;
var scoresList = document.getElementById("scores-list");
var score = 0;
var mainSection = document.getElementById("main");

console

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

highscores.addEventListener("click", function () {



    mainSection.textContent = "";
    savedScores.textContent = "";
    highscores.textContent = "Go Back";
    var li1 = document.createElement("li");
    if (localStorage.getItem("initials") === null) {
        li1.textContent = "";
    } else {
        li1.textContent = localStorage.getItem("initials") + " - " + localStorage.getItem("score");
    };
    li1.setAttribute("style", "background-color: black; color: white; border-radius: 10px; padding: 10px; margin: 10px; text-align: center; list-style-type: none;");
    scoresList.appendChild(li1);
    highscores.addEventListener("click", function () {
        location.reload();
    });
    var clearScoresButton = document.createElement("button");
    clearScoresButton.textContent = "Clear Highscores";
    mainSection.appendChild(clearScoresButton);
    clearScoresButton.addEventListener("click", function () {
        localStorage.clear();
        scoresList.innerHTML = "";
    });
});


function startQuiz() {
    startTimer();
    displayAnswers();
    description.remove();
    startButton.remove();

}

function nextQuestion() {
    currentQuestion++;
    displayAnswers();
}

function startTimer() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time Remaining: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timer.textContent = "Time Remaining: 0";

        }
    }, 1000);

}

function displayAnswers() {
    if (timeLeft <= 0) {
        timeLeft = 0;
    }

    if (currentQuestion === questions.length) {
        timer.remove();
        endQuiz();
    } else if (timeLeft <= 0) {
        timer.remove();
        endQuiz();
    } else {

        for (var i = 0; i < questions.length; i++) {
            quizTitle.textContent = questions[currentQuestion].question;

        };
        for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(questions[currentQuestion].answers[i]));
            answerButtons.appendChild(li);
            li.setAttribute("style", "background-color: black; color: white; border-radius: 10px; padding: 10px; margin: 10px; text-align: center; list-style-type: none; cursor: pointer;");

            if (li.textContent === questions[currentQuestion].rightAnswer) {
                li.addEventListener("click", function () {
                    score = score + 20;
                    answerIndicator.setAttribute("style", "color: green;");
                    answerIndicator.textContent = "Correct!";
                    answerButtons.innerHTML = "";
                    nextQuestion();

                });
            } else {
                li.addEventListener("click", function () {
                    answerIndicator.setAttribute("style", "color: red;");
                    timeLeft = timeLeft - 10;
                    score = score - 10;
                    answerIndicator.textContent = "Incorrect! -10 Seconds";

                    var timeInterval = setInterval(function () {
                        answerIndicator.textContent = "";
                    }, 1000);
                });
            };
        }
    }
}

function endQuiz() {

    if (timeLeft === 0) {
        quizTitle.textContent = "Time's Up!";
        answerButtons.innerHTML = "";
    }

    quizTitle.textContent = "Your final score is " + score + " out of 100.";

    quizTitle.setAttribute("style", "display: flex; flex-direction: column; align-items: center;");

    var enterInitials = document.createElement("h5");
    enterInitials.textContent = "Enter initials: ";
    quizTitle.appendChild(enterInitials);

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("style", "margin-bottom: 10px;");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("id", "initials");
    quizTitle.appendChild(initialsInput);


    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    quizTitle.appendChild(submitButton);

    submitButton.addEventListener("click", function () {
        var initials = document.getElementById("initials").value;
        localStorage.setItem("initials", initials);
        localStorage.setItem("score", score);
        submitButton.remove();
        savedScores.textContent = "Your score has been saved!";
        var viewScoresButton = document.createElement("button");
        viewScoresButton.textContent = "View Highscores";
        quizTitle.appendChild(viewScoresButton);

        function viewHighscores() {
            viewScoresButton.addEventListener("click", function () {
                mainSection.textContent = "";
                var clearScoresButton = document.createElement("button");
                clearScoresButton.textContent = "Clear Highscores";
                mainSection.appendChild(clearScoresButton);
                clearScoresButton.addEventListener("click", function () {
                    localStorage.clear();
                    scoresList.innerHTML = "";
                });
                highscores.addEventListener("click", function () {
                    location.reload();
                });
                highscores.textContent = "Go Back";
                savedScores.textContent = "";
                answerIndicator.textContent = "";
                var li1 = document.createElement("li");
                li1.textContent = localStorage.getItem("initials") + " - " + localStorage.getItem("score");
                li1.setAttribute("style", "background-color: black; color: white; border-radius: 10px; padding: 10px; margin: 10px; text-align: center; list-style-type: none;");
                scoresList.appendChild(li1);

            })
        };
        viewHighscores();
    });

}


