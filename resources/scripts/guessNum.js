let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

guessSubmit.addEventListener('click', checkGuess);

function checkGuess() {
    const userGuess = parseInt(guessField.value);
    guesses.textContent += userGuess + ' ';

    // Main statements to determine if correct

    guessCount++;
    guessField.value = '';
    guessField.focus();

    if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right in ' + (guessCount - 1) + ' guesses!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
    } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
    } else {
    lastResult.textContent = 'Wrong! You have ' + (10 - (guessCount - 1)) + ' guesses left!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
    }
    }
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.style.display = 'block';
    resetButton.style.margin = '0 auto';
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
    resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}