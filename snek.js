const { sleep, pressedKeySource, print } = require('./8bit_io');
const up = [ 0, -1 ];
const down = [ 0, 1 ];
const left = [ -1, 0 ];
const right = [ 1, 0 ];

function clearScreen() { print('\033[2J') };

function scoreCounter() {
  let score = getScore();
  // levels
  const level = Math.floor(score/100) + 1;
  console.log(`Your score is ${score}`);
  console.log(level);
};

function getScore() {
  let score = (snekLength - 4) * 10;
  return score;
};

function addRandomApple() {
  while (true) {
    let x = Math.floor(Math.random() * 18);
    let y = Math.floor(Math.random() * 8);
    if (map[y][x] == " ") {
      changeMap(x,y,"✨");
      break;
    }
  }
};

function drawMapLine(line) { console.log(line) };
let map = ["|----------------|",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|----------------|"];
function drawMap() {
  map.forEach(drawMapLine);
};
// Scratchpad
function changeMap(x,y,symbol) {
  map[y]=changeLine(map[y],x,symbol)
};

function changeLine(line,x,symbol) {
  return line.slice(0,x) + symbol + line.slice(x+1)
};

function eatOrDeath(x,y) {
  if (["|","-"].includes(map[y][x])) {
    console.log("You crashed");
    console.log(`Your score was ${getScore()}`)
    process.exit();
  } else if (map[y][x] == "$") {
    console.log("You ate yourself");
    process.exit();
  } else if (map[y][x] == "✨") {
    snekLength += 1
    addRandomApple();
  } else {

  }
};

const getPressedKey = pressedKeySource();

let snekPos = [ 4, 4 ];
let snekVel = [ 1, 0 ];
let snekLength = 4;
let snekBody = [ ];

var i;
for (i = 0; i < 5; i++) {
  addRandomApple();
}

// main loop (it goes forever)
while (true) {
  // redraw map with snek movement
  clearScreen();
  eatOrDeath(snekPos[0], snekPos[1]);
  changeMap(snekPos[0], snekPos[1], '$');
  snekBody.push([...snekPos]);
  // draw the tail
  if (snekBody.length > snekLength) {
    let tail = snekBody.shift();
    changeMap(tail[0], tail[1], ' ');
  }
  drawMap();
  scoreCounter();

  sleep(800);

  let key = getPressedKey();

  if (key == 'q') {
    process.exit();
  }

  // up
  if (key == 'i') {
    if (equals(snekVel,down)) {
      // do nothing
    } else {
      snekVel = up;
    }
  }

  //down
  if (key == 'k') {
    if (equals(snekVel,up)) {
      // do nothing
    } else {
      snekVel = down;
    }
  }

  //left
  if (key == 'j') {
    if (equals(snekVel,right)) {
      // do nothing
    } else {
      snekVel = left;
    }
  }

  //right
  if (key == 'l') {
    if (equals(snekVel,left)) {
      // do nothing
    } else {
      snekVel = right;
    }
  }


  // update snek position (x axis)
  snekPos[0] = snekPos[0] + snekVel[0];
  // update snek position (y axis)
  snekPos[1] = snekPos[1] + snekVel[1];
}

function equals(a,b) { return JSON.stringify(a) == JSON.stringify(b) }

// console.log(changeLine("Hello world", 4, "$"));
  // Find the character on the relevant line
  // Find the character at the relevant column
  // SWITCH the existing space character for either snake/apple
