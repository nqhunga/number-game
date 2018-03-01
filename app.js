// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
 
// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Linstener for guess
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    // check if won
    if(guess === winningNum) {
      gameOver(true, `${winningNum} is correct!, YOU WIN`);
    } else {
      // Wrong number
      guessesLeft -= 1;

      if(guessesLeft === 0) {
        gameOver(false, `Gamer Over, you lost. The correct number is ${winningNum}`);
      } else {
        // Game continues - answer wrong
        // change border color
        guessInput.style.borderColor = 'red';
        // Clear the input
        guessInput.value = '';
        // Tell user it is the wrong answer
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }
});

// Game over
const gameOver = (won, msg) => {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set message
  setMessage(msg, color);

  // play again
  guessBtn.value = 'Play again?';
  guessBtn.className += 'play-again';
}

// set message
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

// get winning num
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
