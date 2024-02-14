/* Variables */
var startBtn = document.querySelector("#start-button");
var timer = document.querySelector(".timer");
var highScoreBtn = document.querySelector("#highscore-button");
var question = document.querySelector("#question");
var assessQuestions = document.querySelector("#assess-questions");
var multipleChoice = document.querySelector("#multiple-choice");
var answer = document.querySelector("#answer");
var choiceA = document.querySelector("#multiple-choice-A");
var choiceB = document.querySelector("#multiple-choice-B");
var choiceC = document.querySelector("#multiple-choice-C");
var choiceD = document.querySelector("#multiple-choice-D");
var checkAnswerIncorrect = document.querySelector(".check-answer-incorrect");
var checkAnswerCorrect = document.querySelector("#check-answer-correct");
var scoreBtn = document.querySelector("#score-button");
var inputScore = document.querySelector("#input-score");
var initialsBox = document.querySelector("#initials-box");
var highScore = document.querySelector("#high-score");
var backBtn = document.querySelector("#back-button");
var submitBtn = document.querySelector("#submit-button");
var clearBtn = document.querySelector("#clear-button");
var start = document.querySelector(".start");
var questionContainer = document.querySelector(".main");
questionContainer.style.display = "none";
/* Fin Variables*/
/* Number Variables */
var timeLeft = 60;
var i = 0;
var s = 0;
var selection = 0;
var score = 0;
var scoreList = [];
var setTimeInterval;
loadScore();

/* Questions Array */
var questionArray = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    selection: ["<javascript>", "<scripting>", "<script>", "<js>"],
    answer: "<script>",
  },
  {
    question: "Commonly used data types DO NOT include:",
    selection: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    selection: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    selection: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "Which method returns the character at the specified index?",
    selection: [
      "charAt()",
      "getCharAt()",
      "characterAt()",
      "None of the Above",
    ],
    answer: "charAt()",
  },
  {
    question: "Which of the following is not a mouse event?",
    selection: ["onmousemove", "onmouseover", "onclick", "onmousescroller"],
    answer: "onmousescroller",
  },
  {
    question: "The 'function' and 'var' are known as:",
    selection: [
      "Keywords",
      "Declaration Statements",
      "Data Types",
      "Prototypes",
    ],
    answer: "Declaration Statements",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    selection: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
  {
    question:
      "Choose the correct snipped from the following to check if the variable 'a' is not equal to 'NULL':",
    selection: ["if (a!)", "if(a!null)", "if(a!==null)", "if(a!=null)"],
    answer: "if(a!==null)",
  },
  {
    question:
      "Among the following, which one is a ternary operator in JavaScript?",
    selection: ["#", "::", "&:", "?:"],
    answer: "?:",
  },
];
/* Fin Qand A */
/* display question and answer function */
function displayAssessment() {
  if (i < questionArray.length) {
    question.textContent = questionArray[i].question;
    choiceA.textContent = questionArray[i].selection[0];
    choiceB.textContent = questionArray[i].selection[1];
    choiceC.textContent = questionArray[i].selection[2];
    choiceD.textContent = questionArray[i].selection[3];
  } else {
    endAssessment();
    console.log(call.Assessment);
  }
}

/* Start Assessment Timer */
function startTimer() {
  setTimeInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Timer: " + timeLeft;

    if (timeLeft < 0 || i >= questionArray) {
      clearInterval(setTimeInterval);
      endAssessment();
    }
  }, 1000);
}

/* Correct/Incorrect Answer Function */
function answerSelection(event) {
  if (i >= questionArray.length) {
    endAssessment();
    clearInterval(setTimeInterval);
  } else {
    if (event === questionArray[i].answer) {
      checkAnswerCorrect.textContent = "CORRECT!";
    } else {
      timeLeft -= 10;
      checkAnswerIncorrect.textContent = "Incorrect :(";
    }
    score = timeLeft;
    i++;
    displayAssessment();
  }
}

/* End Assessment Function */
function endAssessment() {
  scoreBtn.innerHTML = score;
  assessQuestions.classList.add("hide");
  inputScore.classList.remove("hide");
  timer.classList.add("hide");
  highScoreBtn.classList.add("hide");
  scoreBoard();
}

/* retrieve scores from localStorage function and save highscore to localstorage function*/
function loadScore() {
  var savedScore = JSON.parse(localStorage.getItem("highScore"));
  if (savedScore !== null) {
    scoreList = savedScore;
  }
}

function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

/* top scores tracker function */
function scoreBoard() {
  clearScoreBoard();
  addScoreBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topScores = scoreList.slice(0, 5);

  for (var s = 0; s < topScores.length; s++) {
    var user = topScores[s].user;
    var userScore = topScores[s].score;

    var newDiv = document.createElement("div");
    scoreBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = user + ":" + userScore;
    newDiv.appendChild(newLabel);
  }
}

/* add user initials to scoreboard function */
function addScoreBoard() {
  scoreBoardDiv = document.createElement("div");
  scoreBoardDiv.setAttribute("id", "userInitials");
  document.getElementById("scoreBoard").appendChild(scoreBoardDiv);
}

/* clear score board function */
function clearScoreBoard() {
  var clearScores = document.getElementById("userInitials");
  if (clearScores !== null) {
    clearScores.remove();
  }
}

/* Event Listeners */
startBtn.addEventListener("click", function (event) {
  startTimer();
  displayAssessment();
  start.classList.add("hide");
  assessQuestions.classList.remove("hide");
  highScoreBtn.style.display = "none";
  highScore.classList.add("hide");
  questionContainer.style.display = "block";
});

multipleChoice.addEventListener("click", function (event) {
  var event = event.target;
  answerSelection(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = initialsBox.value.trim();
  var newScore = {
    user: userInitials,
    score: score,
  };

  scoreList.push(newScore);
  saveScore();
  scoreBoard();
  inputScore.classList.add("hide");
  highScore.classList.remove("hide");
});

highScoreBtn.addEventListener("click", function (event) {
  highScore.classList.remove("hide");
  highScoreBtn.classList.add("hide");
  start.classList.add("hide");
  scoreBoard();
});

backBtn.addEventListener("click", function (event) {
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  scoreBoard();
  saveScore();
});
