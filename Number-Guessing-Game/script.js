const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const message = document.getElementById('message');
const remainingGuesses = document.getElementById('remainingGuesses');
const previousGuesses = document.getElementById('previousGuesses');
const restartButton = document.getElementById('restartButton');

let guesses = [];

submitGuess.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    guesses.push(guess);
    attempts--;

    if (guess === randomNumber) {
        message.textContent = `Correct! The number was ${randomNumber}.`;
        endGame();
    } else if (attempts === 0) {
        message.textContent = `Game Over! The number was ${randomNumber}.`;
        endGame();
    } else {
        message.textContent = guess < randomNumber ? "Too low! Try again." : "Too high! Try again.";
        remainingGuesses.textContent = `Guesses remaining: ${attempts}`;
        previousGuesses.textContent = `Previous guesses: ${guesses.join(', ')}`;
    }
});

function endGame() {
    guessInput.disabled = true;
    submitGuess.disabled = true;
    restartButton.style.display = 'inline-block';
}

restartButton.addEventListener('click', () => {
    location.reload();
});
