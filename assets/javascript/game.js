//Global varriables
//----------------------------------------
// Define the list of words the computer will select from
var wordList = [
  "deckard", 
  "roy", 
  "tyrell", 
  "rachel",
  "blade runner",
  "voight kampff",
  "replicant"

];
// Define the list of possible letter selections
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Placeholder for wins & losses, numerical value
var wins = 0;
var losses = 0;
//number of guess left at the start of the game
var guessesLeft = 10;
var guessesMade = [];
var userGuess = null;
// Word chosen by the computer at random for the user to guess
var wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
//printWord is an array that will hold the letters of the wordToGuess
var printWord = [];
var html = "<p><h1>";

//----------------------
//Functions for game logic
//----------------------

//break up wordToGuess into an array so each character is one array
//element followed by false. 
function makeWordIntoArray() {
  for (var i=0, j=0; i<wordToGuess.length; i++) {
    printWord[j] = wordToGuess.charAt(i);
    j++
    if (wordToGuess.charAt(i) != " ") {
        printWord[j] = false;
    } else {
        printWord[j] = true;
    }
    j++
  }
};

// debuggin function
function consoleLogs() {
  console.log(wordToGuess);
  console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
  console.log("guessesLeft: " + guessesLeft + "\n");
  console.log("guessesMade: " + guessesMade + "\n");
  console.log("wordToGuess: " + wordToGuess + "\n");
  console.log("printWord: " + printWord + "\n");
  console.log("--------------------------------");
};

//function when the game is lost or won
function resetGame () {
  //rest variables/stats for the game
  guessesLeft = 10;
  guessesMade = [];
  wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
  printWord = [];
  makeWordIntoArray();
  //update the document via instructions id
  var htmlGameInstructions = "<p><h1>";
  /*populate the initial game layout with dashes on the document
  build a string for every character in the word, and place an underscore and a space for each letter in the word.*/
  for (var i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess.charAt(i) == " ") {
      htmlGameInstructions += "&nbsp;&nbsp;";
    } else {
      htmlGameInstructions += "_&nbsp;";
    }
  }
  htmlGameInstructions += "</h1></p>"
  document.querySelector("#game").innerHTML = htmlGameInstructions;
  var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3</p>";
  document.querySelector("#stats").innerHTML = htmlStats;

};


//function to display progress as game is played
function gameProgress() {
  /*show game progress in HTML, display printWord by building 
  HTML string for it, set HTML for output display*/
  for (i = 0, j = 0; i < (printWord.length / 2); i++) {
    if (printWord[j+1] == true) {
      html += printWord[j];
  } else {
      html += "_";
  }
  html += "&nbsp;";
  j=j+2;
}
html += "</h1></p>"
//place html into the game ID
document.querySelector("#game").innerHTML = html;

//build the stats string to add to the document via stats ID
htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
document.querySelector("#stats").innerHTML = htmlStats; 

// also build the guesses string to update document via guesses id
htmlGuesses = "<p><h3>"
for (var i = 0; i < guessesMade.length; i++) {
  htmlGuesses += guessesMade[i] + "&nbsp;";
}
htmlGuesses += "</h3></p>";
document.querySelector("#guesses").innerHTML = htmlGuesses;
};

//function to check users guess as valid and update the arrays
function checkUserGuess() {
  /*if user choice doesn't exist in the array of prior picks, and doesn't exist in the array of the letters of the wordToGuess, then reduce guessesLeft by one and play sound. Verify if the user's choice was a letter in the alphabet, if not ignore it. */
  if (printWord.indexOf(userGuess) < 0 && guessesMade.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
    guessesLeft--;
    var audio = new Audio ("assets/audio/mp3.mp3");
    audio.play();
  }
  // add all alphabetic guess to guessesMade if not already there
  if (guessesMade.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
    guessesMade[guessesMade.length]=userGuess;
  }

  //if userGuess exists in the array then change is associated array pair from false to true
  for (var i = 0; i < printWord.length; i++) {
    if (printWord[i] === userGuess) {
      // if the letter wasn't already guessed then play audio
      if (printWord[i+1] == false) {
        var audio = new Audio("assets/audio/mp3b.mp3");
        audio.play();
      }
      printWord[i+1] = true;
    }
  }
};

// function to see whether the user has won
function hasUserWon() {
  //check to see if the user has won
  if (printWord.indexOf(false) < 0 ) {
    console.log("USER WINS");
    //user has won, increment wins
    wins++;
    //add image and audio HTML if you have time. 
  var deckard="<img <src=\"assets/images/deckard.jpg\" class=\"img-responsive\" alt=\"Blade Runner Deckard\">";
  document.querySelector("deckard").innerHTML = deckard;
    resetGame();
  }

};

// function to see whether the user has lost
function hasUserLost() {
  //check to see if the user has won
  if (guessesLeft == 0 ) {
    console.log("USER LOSES");
    //user has won, increment wins
    losses++;
    //add image and audio HTML if you have time. 
  resetGame();
  }

};

// function to reset the html variable
function resetHtmlVariable() {
	// reset the html variable so we can rebuild it after next user guess
	html="<p><h1>";

};

//---------------------------------
//Running the Game
//-------------------------------

//make the selected word and array
makeWordIntoArray();

// reset scores
resetGame();

// debugging function
consoleLogs();

//start event listening
document.onkeyup = function(event) {

  //when user presses a key, store it in userGuess array
  userGuess = String.fromCharCode(event.keyCode).toLowerCase();

  //check if it's a letter and update array
  checkUserGuess();

  //inject progress to HTML
  gameProgress();

  //debug
  consoleLogs();

  //reset HTML variable
  resetHtmlVariable();

  //Check to see if user has won and reset if true
  hasUserWon();

  //Check to see if user has lost and reset if true
  hasUserLost();
  
  //debug
  consoleLogs();


}
// end of listening for events