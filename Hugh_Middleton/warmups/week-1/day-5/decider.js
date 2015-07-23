// The Ultimate Life Decider

var tailsScoreDiv = document.getElementById('tailsScore');
var headsScoreDiv = document.getElementById('headsScore');
var flipResultDiv = document.getElementById('flipResult');
var gameResultDiv = document.getElementById('gameResult');
var coinImage = document.getElementById('coinImage');

var headsTotal;
var tailsTotal;

var resetScores = function() {
  headsTotal = 0;
  tailsTotal = 0;
};

var updateScoreDivs = function() {
  headsScoreDiv.innerHTML = headsTotal;
  tailsScoreDiv.innerHTML = tailsTotal;
};

resetScores();
updateScoreDivs();

var coinFlip = function() {
  if (Math.random() >= 0.5) {
    return 'H';
  } else {
    return 'T';
  }
};

var checkTotals = function() {
  if (headsTotal >= 5) {
    gameResultDiv.innerHTML = 'Game Over. HEADS IS THE WINNER!';
    resetScores();
  } else if (tailsTotal >= 5) {
    gameResultDiv.innerHTML = 'Game Over. TAILS IS THE WINNER!';
    resetScores();
  }
};

var play = function() {
  var winner;
  gameResultDiv.innerHTML = '';

  if (coinFlip() === 'H') {
    winner = 'Heads';
    headsTotal ++;
    coinImage.src = 'coin-heads.jpg';
  } else {
    winner = 'Tails';
    tailsTotal ++;
    coinImage.src = 'coin-tails.jpg';
  }

  updateScoreDivs();
  flipResultDiv.innerHTML = winner + ' wins!';
  checkTotals();
};

coinImage.addEventListener('click', play);
