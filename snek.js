const { sleep, pressedKeySource, print } = require('./8bit_io');

function chomp() {}; //eats the apple thing, makes the snek longer };
function clearScreen() { print('\033[2J') };

function makeSnek() { console.log("O") };
function makeApple() { console.log("*") };

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

const getPressedKey = pressedKeySource();

let snekPos = [ 4, 4 ];
let snekVel = [ 1, 0 ];

// main loop (it goes forever)
while (true) {
  // do stuff
  clearScreen();
  changeMap(snekPos[0], snekPos[1], '$');
  drawMap();


  let key = getPressedKey();

  if (key == 'q') {
    process.exit();
  }

  // up
  if (key == 'i') {
    if (equals(snekVel,[ 0, 1 ])) {
      // do nothing
    } else {
      snekVel = [ 0, -1 ];
    }
  }

  //left
  if (key == 'j') {
    if (equals(snekVel,[ 1, 0 ])) {
      // do nothing
    } else {
      snekVel = [ -1, 0 ];
    }
  }

  //right
  if (key == 'k') {
    if (equals(snekVel,[ -1, 0 ])) {
      // do nothing
    } else {
      snekVel = [ 1, 0 ];
    }
  }

  //down
  if (key == 'm') {
    if (equals(snekVel,[ 0, -1 ])) {
      // do nothing
    } else {
      snekVel = [ 0, 1 ];
    }
  }
  sleep(2000);

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
