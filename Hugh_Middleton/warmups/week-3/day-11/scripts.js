// Squeeze

function squeeze (string) {
  var newStringLetters = [];
  var previousLetter = '';

  _.each(string.split(''), function(element, index, list) {
    if (element !== previousLetter) {
      newStringLetters.push(element);
    }
    previousLetter = element;
  });

  return newStringLetters.join('');
}
