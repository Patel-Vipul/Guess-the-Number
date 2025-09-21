let userScore = document.querySelector('#score');
let userAttempts = document.querySelector('#attempts');
let userHighScore = document.querySelector('#high-score');

let guessRange = document.querySelector('#range');

const form = document.querySelector('form');

const userInput = document.querySelector('.number-input');
let randomNumber = Math.floor(Math.random()*100+1);

const guessButton = document.querySelector('#guess-button');
const newGameButton = document.querySelector('#newgame-button');

let displayMessage = document.querySelector('#display');
let displayWarning = document.querySelector('#warning')

let playGame = true;
let totalScore = 100;
let totalAttempts = 0;
let totalBestScore = null;
let low = 1;
let high = 100;


if(playGame){
    guessButton.addEventListener('click', (event) =>{
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

//checks the validation of the userInout
function validateGuess(guess){
    if(isNaN(guess)){
        displayWarnings("Please Enter a Number")
    }
    else if(guess < 1 || guess > 100){
        displayWarnings("Please, Enter a Number Between 1 and 100")
    }
    else{
        hideWarnings();
        checkGuess(guess);
    }
}

//check the guesses is low or high
function checkGuess(guess){
    if(guess < randomNumber){
        displayAllMessages("Your Guess is TOOO Low!",-1)
        displayGuess(guess);
        displayRange(guess)
    }
    else if(guess > randomNumber){
        displayAllMessages("Your Guess is TOOO High!",1)
        displayGuess(guess)
        displayRange(guess)
    }
    else if (guess === randomNumber){
        if(totalBestScore < totalScore){
            totalBestScore = totalScore
        }
        userHighScore.innerHTML = `${totalBestScore}`
        displayAllMessages("Congratulations! You Guessed it Right",0)
        endGame();
    }
}

// calculates the score and attempts 
function displayGuess(guess){
    totalScore -= 10;

    if(totalAttempts < 10){
        userScore.innerHTML = `${totalScore}`
        userAttempts.innerHTML = `${++totalAttempts}`;
    }
    else{
        displayMessage.innerHTML = "Game Over!"
        endGame();
    }
}

function displayAllMessages(message, num){
    if(num === 1){
        displayMessage.classList.add('hint');
        displayMessage.innerHTML = `${message}`;
    }
    else if(num === -1){
        displayMessage.classList.add('hint');
        displayMessage.innerHTML = `${message}`;
    }
    else if(num===0){
        displayMessage.classList.add('win');
        displayMessage.innerHTML = `${message}`;
    }
   
    userInput.value = "";
}

//display the warnings for invalid inputs
function displayWarnings(message){
    displayWarning.innerHTML = `<p id="warnings">${message}</p>`
    userInput.value = ""
}

function hideWarnings(){
    displayWarning.style.display = "none";
}

function displayRange(guess){
    if(guess < randomNumber){
        low = guess;
        guessRange.innerHTML = `Range ${low} - ${high}`
    }
    else if (guess > randomNumber){
        high = guess;
        guessRange.innerHTML = `Range ${low} - ${high}`
    }
}

function endGame(){
    userInput.setAttribute('disabled','')
    playGame = false;
    newGame();
}

function newGame(){
    newGameButton.addEventListener('click', function(){
        totalAttempts = 0
        totalScore = 100;
        low = 1;
        high = 100
        userScore.innerHTML = "100";
        userAttempts.innerHTML = "0";
        guessRange.innerHTML = "Range 1 - 100";
        randomNumber = Math.floor(Math.random()*100+1);
        userInput.removeAttribute('disabled','')
    })
}