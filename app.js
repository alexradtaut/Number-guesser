// Game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    console.log(e.target.value);
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function (e) {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number betwee ${min} & ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct!`);
    // Disable input
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      //Clear input
      guessInput.value = "";
      // Game continues - asnwer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});
// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  setMessage(msg, color);

  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Set message
function setMessage(msg, color) {
  guessInput.style.borderColor = color;
  message.style.color = color;
  message.textContent = msg;
}

// Get winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
