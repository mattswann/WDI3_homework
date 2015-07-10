// Palindromes

var palindrome = function (input) {
  var string = input.toLowerCase();
  var reverse = string.toLowerCase().split('').reverse().join('');

  if (string === reverse) {
    return true;
  } else {
    return false;
  }
};
