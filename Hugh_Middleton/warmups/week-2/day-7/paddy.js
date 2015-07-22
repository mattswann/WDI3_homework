// Talk to Paddy

var askButton = document.getElementById('ask');
var responseDiv = document.getElementById('response');
var pintAskCount = 0;
var questions = ["Happy St Patrick's!", "Do you want a pint of Guinness?", "Paddy, it's your round."];
var responses = ["Tildlely de, potatoes", "Just the luck of the Irish.", "Look, Leprechaun!"];
var questionSelect = document.getElementById('question');
var questionsHTML = '';

for (var i = 0; i < questions.length; i++) {
  questionsHTML += '<option value=' + i + '>' + questions[i] + '</option>';
}

questionSelect.innerHTML = questionsHTML;

var getResponse = function (input) {
  if (parseInt(input) === 1 && pintAskCount < 1) {
    pintAskCount ++;
    return 'zzz...';
  } else {
    pintAskCount = 0; 
    return responses[input];
  }
};

askButton.addEventListener('click', function () {
  responseDiv.innerHTML = getResponse(questionSelect.value);
});
