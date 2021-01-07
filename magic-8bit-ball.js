const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const answers = ["Yes","No","Maybe","Definitely not!"]
const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
readline.question("Hey, what's your question?", question => {
  console.log("Hmm, let me think...");
  console.log(randomAnswer);
  readline.close();
});
