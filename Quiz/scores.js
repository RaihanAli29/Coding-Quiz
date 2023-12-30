const highScoresList = document.getElementById("highscores");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Show Leaderboard
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.initials} - ${score.score}</li>`;
  })
  .join("");

  // Function to clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = ""; // Clear the displayed high scores
  }
  
  // Event listener for the "Clear Highscores" button
  document.getElementById("clear").addEventListener("click", clearHighScores);
