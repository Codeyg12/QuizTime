//setting variables
let startBtn = document.getElementById("startBtn");
let questionContainerEl = document.getElementById("questionsContainer");
let introContainerEl = document.getElementById("startPage");
let timerEl = document.getElementById("timer");
let progressBarEl = document.getElementById("progress");
let questionTitleEl = document.getElementById("title");
let optionsEl = document.getElementById("options");
let scoreEl = document.querySelector("#score");
let userNameEl = document.getElementById("input");
let timeLeft;
let questionIndex;
let questionShuffle;
let timedInterval;

//questions array
const questions = [
  {
    question: "What year was JavaScript released?",
    answers: [
      { text: "1993", correct: false },
      { text: "1995", correct: true },
      { text: "1998", correct: false },
      { text: "2000", correct: false },
    ],
  },
  {
    question: "When were 'let' and 'const' introduced?",
    answers: [
      { text: "2015", correct: true },
      { text: "2012", correct: false },
      { text: "2010", correct: false },
      { text: "2017", correct: false },
    ],
  },
  {
    question: "Which isn't a part of the box model?",
    answers: [
      { text: "Margin", correct: false },
      { text: "Padding", correct: false },
      { text: "Border", correct: false },
      { text: "Display", correct: true },
    ],
  },
  {
    question:
      "How can you check the files inside of your current directory from your terminal?",
    answers: [
      { text: "git status", correct: false },
      { text: "ls", correct: true },
      { text: "cd", correct: false },
      { text: "git check", correct: false },
    ],
  },
  {
    question: "Which is not a way to declare a variable?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "def", correct: true },
      { text: "const", correct: false },
    ],
  },
  {
    question: "Which is an example of a valid variable?",
    answers: [
      { text: "1Stop", correct: false },
      { text: "NewHere", correct: false },
      { text: "@number", correct: false },
      { text: "camelCase", correct: true },
    ],
  },
  {
    question: "How do you select a class in CSS?",
    answers: [
      { text: ".", correct: true },
      { text: "@", correct: false },
      { text: "$", correct: false },
      { text: "#", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Corrupt Souper Salad", correct: false },
      { text: "Computer Social Science", correct: false },
      { text: "Complex Super Simple", correct: false },
      { text: "Cascading Style Sheet", correct: true },
    ],
  },
];

//starts quiz
function startQuiz() {
  timeLeft = 60;
  progressBarEl.value = 100;
  //reveals the question container
  questionContainerEl.classList.remove("is-hidden");
  //hides the start page
  introContainerEl.classList.add("is-hidden");
  questionIndex = 0;
  questionShuffle = questions.sort(() => Math.random() - 0.5);
  generateQuestion();
  startTimer();
}

//starts timer
function startTimer() {
  timedInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timedInterval);
      finishQuiz();
    }
  }, 1000);
  startProgBar();
}

//starts progress bar
function startProgBar() {
  let progressInterval = setInterval(function () {
    progressBarEl.value--;
    if (progressBarEl.value == 0) {
      clearInterval(progressInterval);
    }
  }, 1000);
}

//sets next question
function generateQuestion() {
  freshSlate();
  showQuestion(questionShuffle[questionIndex]);
}

//sets buttons with answers
function showQuestion(question) {
  questionTitleEl.textContent = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("button");
    button.classList.add("is-dark");
    button.classList.add("mx-6");
    //indicates if correct or not
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedAnswer);
    optionsEl.appendChild(button);
  });
}

//takes off indicator
function freshSlate() {
  clearAnswerEval(document.body);
  while (optionsEl.firstChild) {
    optionsEl.removeChild(optionsEl.firstChild);
  }
}

//selected answer
function selectedAnswer(event) {
  let userAnswer = event.target;
  let correct = userAnswer.dataset.correct;
  //lowers time and progress bar if incorrect
  if (this.value !== questions[questionIndex].correct) {
    timeLeft -= 2;
    progressBarEl.value -= 2;
  }
  answerEval(document.body, correct);
  Array.from(optionsEl.children).forEach((button) => {
    answerEval(button, button.dataset.correct);
  });
  if (questionShuffle.length > questionIndex + 1) {
    userAnswer.addEventListener("click", () => {
      questionIndex++;
      generateQuestion();
    });
  } else {
    finishQuiz();
  }
}

//adds the color indicator
function answerEval(element, correct) {
  clearAnswerEval(element);
  if (correct) {
    element.classList.add("is-success");
  } else {
    element.classList.add("is-danger");
  }
}

//removes colors
function clearAnswerEval(element) {
  element.classList.remove("is-success");
  element.classList.remove("is-danger");
}

//ends quiz amd hides the container
function finishQuiz() {
  clearInterval(timedInterval);
  questionContainerEl.classList.add("is-hidden");
  scoreEl.classList.remove("is-hidden");
  scoreSub();
}
let userScore = document.createElement("h2");
let enterBtn = document.createElement("button");
//allows submission of name and time left
function scoreSub() {
  //creating elements to inform player of score and button for saving

  userScore.textContent = "You finished with " + timeLeft + " seconds left.";
  enterBtn.textContent = "Save";
  enterBtn.classList.add("button");
  enterBtn.classList.add("is-dark");
  scoreEl.appendChild(userScore);
  scoreEl.appendChild(enterBtn);
  enterBtn.addEventListener("click", submitScore);
}

//goes through array to save place of score
function submitScore() {
  let previousSave = [];
  let playerInfo = {
    userName: userNameEl.value,
    score: timeLeft,
  };
  let previousScores = localStorage.getItem("playerInfo");
  previousSave = [JSON.parse(previousScores)];
  //if nothing is there yet just adds
  if (previousSave[0] == null) {
    localStorage.setItem("playerInfo", JSON.stringify([playerInfo]));
    //sorts through list to detirmine where to place score
  } else {
    previousSave = [...previousSave[0], playerInfo];
    let sortPrevious = previousSave
      .sort(function (a, b) {
        if (a.score > b.score) {
          return -1;
        } else {
          return 1;
        }
      })
      .slice(0, 10);
    localStorage.setItem("playerInfo", JSON.stringify(sortPrevious));
  }
  scoreboard();
}

//shows scores of past players
function scoreboard() {
  let previousPlayer = localStorage.getItem("playerInfo");
  let displayedPrevious = JSON.parse(previousPlayer);
  displayedPrevious.forEach((cat, i) => {
    let previousDisplayed = document.createElement("div");
    //Previous players scores with the number theyre in, name and score
    previousDisplayed.textContent =
      [i + 1] + ". " + cat.userName + " " + cat.score;
    //styling the list
    previousDisplayed.classList.add("has-text-centered");
    previousDisplayed.classList.add("is-uppercase");
    previousDisplayed.classList.add("is-size-4");
    scoreEl.appendChild(previousDisplayed);
  });
  playAgain();
}

//starts the quiz again
function playAgain() {
  //hides the save button, input bar and score informer
  userScore.classList.add("is-hidden");
  enterBtn.classList.add("is-hidden");
  userNameEl.classList.add("is-hidden");
  //creates and styles start over
  let redoBtn = document.createElement("button");
  redoBtn.classList.add("button");
  redoBtn.classList.add("is-dark");
  redoBtn.classList.add("is-fullwidth");
  redoBtn.classList.add("mt-6");
  redoBtn.textContent = "Start Over?";
  scoreEl.appendChild(redoBtn);
  //listens for click on start over then hides button and starts quiz
  redoBtn.addEventListener("click", function () {
    redoBtn.classList.add("is-hidden");
    scoreEl.classList.add("is-hidden");

    startQuiz();
  });
}

//listens for click on start button
startBtn.addEventListener("click", startQuiz);
