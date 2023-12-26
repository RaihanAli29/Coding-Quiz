// Event listener for submitting initials and saving the score in local storage
document.querySelector("#initials-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const initials = document.querySelector("#initials-input").value;
    console.log("User's initials: " + initials);
    
    // Save the initials and score in local storage
    saveScore(initials, userScore);
  });

// Function to save the initials and score in local storage
function saveScore(initials, score) {
  // Retrieve existing scores from local storage or initialize an empty array
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the new score to the array
  highScores.push({ initials: initials, score: score });

  // Sort the scores in descending order based on the score
  highScores.sort((a, b) => b.score - a.score);

  // Store the updated scores back in local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
