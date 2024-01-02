// Retrieve high scores from local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Display high scores on the leaderboard
const displayHighScores = () => {
  const highScoresList = document.getElementById("highscores");
  highScoresList.innerHTML = highScores
    .map(score => `<li class="high-score">${score.initials} - ${score.score}</li>`)
    .join("");
};

// Function to clear high scores
const clearHighScores = () => {
  localStorage.removeItem("highScores");
  const highScoresList = document.getElementById("highscores");
  highScoresList.innerHTML = ""; // Clear the displayed high scores
};

// Event listener for the "Clear Highscores" button
document.getElementById("clear").addEventListener("click", clearHighScores);

// Call the function to display high scores when the page loads
displayHighScores();
