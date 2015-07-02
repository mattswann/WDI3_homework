// Mini Golf Scores

// scorecards
var card1 = { name : "Bob",
              scores : [3, 2, 6, 11, 9, 2, 6, 9, 10] };
var card2 = { name : "Jimbo",
              scores : [5, 12, 9, 22, 13, 7, 16, 10, 11] };
var card3 = { name : "Fish",
              scores : [2, 2, 4, 5, 4, 3, 6, 4, 1] };
var card4 = { name : "Hugh",
              scores : [3, 4, 5, 5, 3, 3, 4, 3, 5]};
var pars = [3, 4, 5, 5, 3, 3, 4, 3, 5];

// function to calculate total
var totalScores = function(scorecards, coursePars) {
  var totals = {};

  var totalPar = 0;
  for (var i = 0; i < coursePars.length; i++) {
    totalPar += coursePars[i];
  }

  for (var card = 0; card < scorecards.length; card ++) {
    var name = scorecards[card].name;
    var total = 0;
    for (var hole = 0; hole < scorecards[card].scores.length; hole ++) {
      total += scorecards[card].scores[hole];
    }

    totals[name] = total;
  }

  console.log('=== Total Scores ===');

  for (var person in totals) {
    var parMessage = '(';
    if (totals[person] < totalPar) {
      parMessage += '-' + (totalPar - totals[person]);
    } else if (totals[person] === totalPar) {
      parMessage += 'par';
    } else {
      parMessage += '+' + (totals[person] - totalPar);
    }
    parMessage += ')';

    console.log('- ' + person + ': ' + totals[person] + ' ' + parMessage);
  }


};

// call function 
totalScores([card1, card2, card3, card4], pars);
