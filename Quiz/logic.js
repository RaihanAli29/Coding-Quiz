// Sound effects for correct and incorrect answers
const correctSound = new Audio('correct.wav');
const incorrectSound = new Audio('incorrect.wav');

// Global variables
let startButton = document.querySelector("#start");
startButton.addEventListener("click", init);

let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let endScreen = document.querySelector("#end-screen");

let timer = document.querySelector("#time");
let countdown = 75;
let intervalID;
let choiceBox = document.querySelector('#choices');
let userScore = 0;
let questionID = 0;

// Start button to initiate timer and display the first question
function init() {
  startScreen.classList.toggle("start");
  startScreen.classList.toggle("hide");
  questionScreen.classList.toggle("hide");
  questionScreen.classList.toggle("start");
  startTimer();
  timeRemaining();
  showQuestion();
}

function startTimer() {
  intervalID = setInterval(timeRemaining, 1000);
}

function timeRemaining() {
  if (countdown > 0) {
    countdown--;
    timer.textContent = countdown;
  } else {
    clearInterval(intervalID);
  }
}

function showQuestion() {
  let question = questionList[questionID];
  document.querySelector("#question-title").textContent = question.title;
  choiceBox.innerHTML = ''; // Clear the choiceBox before adding new buttons
  for (let i = 0; i < question.choices.length; i++) {
    let choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];
    choiceBox.appendChild(choiceButton);
    choiceButton.setAttribute("choiceID", i);
    choiceButton.setAttribute("correctID", question.correctAnswer);
    choiceButton.addEventListener("click", checkAnswer);
  }
  // Add a line break under choices
  let lineBreak = document.createElement("br");
  choiceBox.appendChild(lineBreak);
}

function checkAnswer(event) {
  let button = event.target;
  let choiceID = button.getAttribute("choiceID");
  let correctID = button.getAttribute("correctID");
  let feedback = document.getElementById("feedback");
  if (choiceID === correctID) {
    userScore += 1;
    feedback.textContent = "Correct!";
    // Play the correct sound
    correctSound.play();
  } else {
    countdown -= 5; // Deduct 5 seconds for a wrong answer
    feedback.textContent = "Wrong!";
    // Play the incorrect sound
    incorrectSound.play();
  }
  // Show the feedback immediately
  feedback.classList.remove("hide");
  // Hide the feedback after 1.5 seconds
  setTimeout(function() {
    feedback.classList.add("hide");
    nextQuestion();
  }, 1500);
}

function nextQuestion() {
  if (questionID < questionList.length - 1) {
    questionID++;
    showQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz and display the end screen
function endQuiz() {
  clearInterval(intervalID);
  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  document.querySelector("#final-score").textContent = userScore;
  saveScoreToLocalStorage(userScore); // Call the function to save the score in local storage
  window.location.href = "highscores.html"; // Redirect to highscores.html
}

// Function to save the user's score in local storage for the high scores board
function saveScoreToLocalStorage(score) {
  let initials = prompt("Enter your initials:"); // Prompt the user to enter their initials
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Call the function to display high scores when the page loads
displayHighScores();
