// Creating variables
var beginButton = document.getElementById("begin");
var questionContainerEl = document.getElementById("questionsContainer");
var questionEl = document.getElementById("title");
var answerEl = document.getElementById("answerOptions");

var aButton = document.getElementById("A");
var bButton = document.getElementById("B");
var cButton = document.getElementById("C");
var dButton = document.getElementById("D");

var currentQuestionIndex = 0;

function beginQuiz() {
  beginButton.classList.add("hidden");
  questionContainerEl.classList.remove("hidden");
  shuffledQuestions = questions[Math.floor(Math.random() * questions.length)];
  nextQuestion();
}

function nextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion() {
  var lastQuestionIn = questions.length - 1;
  let now = questions[currentQuestionIndex];
  questionEl.innerHTML = "<p>" + now.question + "<p>";
  aButton.innerHTML = now.aButton;
  bButton.innerHTML = now.bButton;
  cButton.innerHTML = now.cButton;
  dButton.innerHTML = now.dButton;
}

function answerSelect() {}
var questions = [
  {
    question: "What year was JavaScript released?",
    answers: { A: "1993", B: "1995", C: "1998", D: "2000" },
    correctAnswer: "B",
  },
  {
    question: "When were 'let' and 'const' introduced?",
    answers: { A: "2015", B: "2012", C: "2010", D: "2017" },
    correctAnswer: "A",
  },
  {
    question: "Which isn't a part of the box model?",
    answers: { A: "Content", B: "Padding", C: "Border", D: "Display" },
    correctAnswer: "D",
  },
  {
    question:
      "How can you check the files inside of your current directory from your terminal?",
    answers: { A: "git status", B: "ls", C: "cd", D: "git check" },
    correctAnswer: "B",
  },
  {
    question: "Which is not a way to declare a variable?",
    answers: { A: "var", B: "let", C: "def", D: "const" },
    correctAnswer: "C",
  },
  {
    question: "Which is an example of a valid variable?",
    answers: { A: "NewHere", B: "1Stop", C: "camelCase", D: "@number" },
    correctAnswer: "C",
  },
  {
    question: "How do you select a class in CSS?",
    answers: { A: ".", B: "$", C: "@", D: "#" },
    correctAnswer: "A",
  },
  {
    question: "What does CSS stand for?",
    answers: {
      A: "Corrupt Souper Salad",
      B: "Computer Social Science",
      C: "Complex Super Simple",
      D: "Cascading Style Sheet",
    },
    correctAnswer: "D",
  },
  // CSS stands for
];
// var score = 0;
// // answer.addEventListener("keyup", function() {
// //     this.toUpperCase()
// // })
// for (let i = 0; i < questions.length; i++) {
//   var answer = prompt(questions[i].prompt);
//   if (answer == questions[i].answer) {
//     score++;
//   }
// }
// alert("You got " + score + "/" + questions.length);
// When the begin button is clicked the beginQuiz function starts beginButton.addEventListener("click", beginQuiz);
// TIMER
// const questionTime = 10;
// var count = 0;
// function counterSet() {
//   if (count <= questionTime) {
//     count++; //   } else {
//     count = 0;
//     skipQuestion();
//   } // } // var timer = setInterval(counterSet, 1000)
