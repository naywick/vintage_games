const { input, inkey, println, print } = require('./8bit_io');

/*
 function random_english_words(num) { const fs = require("fs"); const words = fs.readFileSync("/usr/share/dict/words").toString().split("\n"); const ws=[]; while (ws.length < num) { const w = words[Math.floor(Math.random()*words.length)]; if (w.indexOf("'")==-1 && w[0].toUpperCase() != w[0]) { ws.push(w); } } return ws; }
words = random_english_words(100);
//*/
const words = ["nullifies","armrests","asphalting","farce","rapped","croquette","tinder","shah","missed","tipple","bloom","outdated","bulky","collarbone","tricolors","uproarious","guessed","emigrating","arbor","rid","interactively","safariing","syphoned","coolness","primers","plantains","platoons","tea","sledding","purgative","distrusted","countersign","synchronizing","debility","heliotrope","privy","solitaire","hoofing","impression","unsigned","firebreak","spied","blackmail","stranglehold","concerning","allocating","exhumation","oratorical","slaloming","shucked","inattention","pressure","mumble","happiest","tousled","photosynthesis","bespeaking","conscripted","belfries","thudding","bashfulness","wen","electrifies","seventeenth","impinges","fulcra","peopling","immediacy","crumbliest","wilier","stashing","argots","burrowing","buffaloing","dads","koshered","brunettes","godlier","dissipates","recruiters","friendships","recompilation","traveling","taped","guesstimates","gingko","flinch","pieced","realists","died","soothed","householders","baritones","hardy","dominance","scruffs","snag","oddity","hording","parsonages"];

const random_word_number =  Math.floor(Math.random()*words.length);
const word = words[random_word_number];

const gallows = [`
|---|
|
|
|
|
_______
`,`
|---|
|   o
|
|
|
_______
`,`
|---|
|   o
|   |
|
|
_______
`,`
|---|
|   o
|  -|
|
|
_______
`,`
|---|
|   o
|  -|-
|
|
_______
`,`
|---|
|   o
|  -|-
|  /
|
_______
`,`
|---|
|   o
|  -|-
|  / \\
|
_______
`,`
|---|
|   x
|  -|-
|  / \\
|
_______
`,
];

let try_num = 0;

let word_guess = [];
for (let i=0; i<word.length; ++i) {
  word_guess.push('_');
}

while (try_num < gallows.length - 1) {
  println(gallows[try_num]);

  for (let i=0; i<word_guess.length; ++i) {
    print(word_guess[i] + " ");
  }
  println();
  println();

  print("Guess a letter: ");
  const guess = inkey();

  let good_guess = false;

  for (let i=0; i<word.length; ++i) {
    if (word[i] == guess) {
      word_guess[i] = guess;
      good_guess = true;
    }
  }

  if (good_guess == false) {
    try_num++;
  }

  if (guess == '1') {
    println("You gave up hope!");
    break;
  }

  if (word == word_guess.join('')) {
    break;
  }
}

if (try_num >= gallows.length-1) {
  println(gallows[try_num]);
  println("You never guessed: " + word);
  println("You are dead.");
} else {
  println(word_guess.join(' '));
  println("You escaped the gallows!");
}
