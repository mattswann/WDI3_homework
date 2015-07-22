var word = {
  secret: "",

  list: ['ruby', 'rails', 'javascript', 'array', 'hash', 'underscore', 'sinatra', 'model', 'controller', 'view', 'devise', 'authentication', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon', 'development', 'data', 'design', 'inheritance', 'prototype', 'gist', 'github', 'agile', 'fizzbuzz', 'route', 'gem', 'deployment', 'database'],

  // Selects a random word from the word list sets the secret word
  setSecret: function () {
    word.secret = _.sample(word.list);
  },

  // Takes an array of letters as input and returns an array of two items:
  // 1) A string with the parts of the secret word that have been guessed correctly and underscore for the parts that haven't
  // 2) An array of all the guessed letters that were not in the secret word
  checkLetters: function (guessedLetters) {
    var gameStatus = word.secret.toLowerCase().split('');
    var incorrectGuesses = [];

    _.each(guessedLetters, function(element, index, list) {
      if (gameStatus.indexOf(element) === -1) {
        incorrectGuesses.push(element);
      }
    });

    _.each(gameStatus, function(element, index, list) {
      if (guessedLetters.indexOf(element) === -1) {
        list[index] = "_";
      }
    });

    return [gameStatus.join(' '), incorrectGuesses];
  }
};


var player = {
  MAX_GUESSES: 8,
  guessedLetters: [],

  // Check if the player has won and end the game if so
  checkWin: function () {
    if (word.checkLetters(player.guessedLetters)[0].indexOf("_") === -1) {
      return true;
    }
    return false;
  },

  // Check if the player has lost and end the game if so
  checkLose: function () {
    if (!player.checkWin() && word.checkLetters(player.guessedLetters)[1].length >= player.MAX_GUESSES) {
      return true;
    }
    return false;
  },

  reset: function () {
    player.guessedLetters = [];
  }
};

var game = {
  // Takes a new letter as input and updates the game
  makeGuess: function (letter) {
    letter = letter.toLowerCase();

    if (player.guessedLetters.indexOf(letter) === -1) {
      player.guessedLetters.push(letter);

      var guessResult = word.checkLetters(player.guessedLetters);
      var secretWordWithBlanks = guessResult[0];
      var incorrectLetters = guessResult[1];
      var guessesLeft = player.MAX_GUESSES - incorrectLetters.length;

      game.updateDisplay(secretWordWithBlanks, incorrectLetters, guessesLeft);
      game.domLetterField.val('');

      if (player.checkWin()) {
        game.domWordString.addClass('win');
        game.stopTimer();
        game.active = false;
      } else if (player.checkLose()) {
        game.domWordString.text(word.secret);
        game.domWordString.addClass('lose');
        game.stopTimer();
        game.active = false;
      }
    }
  },

  // Resets the game
  resetGame: function () {
    player.reset();
    word.setSecret();
    game.stopTimer();
    game.resetTimer();

    game.updateDisplay(word.checkLetters(player.guessedLetters)[0], player.guessedLetters, player.MAX_GUESSES);
    game.domLetterField.attr( 'disabled', false);
    game.domWordString.removeClass();

    game.active = true;
    game.startTimer();
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function () {
    if (!player.checkWin() && game.active) {
      game.updateDisplay(word.secret, word.checkLetters(player.guessedLetters)[1], 0);
      game.domLetterField.attr( 'disabled', true);
      game.domWordString.addClass('lose');
      game.stopTimer();
      game.active = false;
    }
  },

  domGuessesLeft: $('#guessesLeft'),
  domGuessedLetters: $('#guessedLetters'),
  domWordString: $('#wordString'),
  domLetterField: $('#letterField'),

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function (secretWordWithBlanks, guessedLetters, guessesLeft) {
    game.domGuessesLeft.html(guessesLeft);
    game.domGuessedLetters.html(guessedLetters.join(' | '));
    game.domWordString.html(secretWordWithBlanks);
  },

  elapsedTime: 0,
  timer: null,

  startTimer: function () {
    game.timer = setInterval(function(){
      game.elapsedTime++;
      var formattedTime = ("0" + Math.floor(game.elapsedTime / 60)).slice(-2) + ':' + ("0" + game.elapsedTime % 60).slice(-2);
      $('#timer').text(formattedTime);
    }, 1000);
  },

  stopTimer: function () {
    if (game.timer !== null) {
      clearInterval(game.timer);
    }
  },

  resetTimer: function () {
    game.elapsedTime = 0;
    var formattedTime = ("0" + Math.floor(game.elapsedTime / 60)).slice(-2) + ':' + ("0" + game.elapsedTime % 60).slice(-2);
    $('#timer').text(formattedTime);
  },

  active: true
};

window.onload = function(){
  // Start a new game
  // Add event listener to the letter input field to grab letters that are guessed
  // Add event listener to the reset button to reset the game when clicked
  // Add event listener to the give up button to give up when clicked
  game.resetGame();

  $( document ).keypress(function () {
    if (game.active) {
      var letter = String.fromCharCode(event.charCode);
      game.makeGuess(letter);
    }
  });

  var resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', function () {
    game.resetGame();
  });

  var giveUpButton = document.getElementById('giveUpButton');
  giveUpButton.addEventListener('click', function () {
    game.giveUp();
  });

};
