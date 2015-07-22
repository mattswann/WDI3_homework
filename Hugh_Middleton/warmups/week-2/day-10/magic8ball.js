// Magic 8 Ball.

var magic8ball = {

  answers : ["No", "Not today", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it yes", "Most likely", "Outlook good", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"],

  ask : function () {
    return magic8ball.answers[Math.floor(Math.random() * magic8ball.answers.length)];
  },

  domElement : document.getElementById('magic8ball')

};

magic8ball.domElement.addEventListener('click', function () {
  magic8ball.domElement.innerHTML = magic8ball.ask();
});
