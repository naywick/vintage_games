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

while (true) {
  // do stuff
  clearScreen();
  changeMap(snekPos[0], snekPos[1], '$');
  drawMap();


  let key = getPressedKey();

  console.log("You pressed " + key);

  if (key == 'q') {
    process.exit();
  }
  sleep(1000);

  // update snek position (x axis)
  snekPos[0] = snekPos[0] + snekVel[0];
  // update snek position (y axis)
  snekPos[1] = snekPos[1] + snekVel[1];
}

// console.log(changeLine("Hello world", 4, "$"));
  // Find the character on the relevant line
  // Find the character at the relevant column
  // SWITCH the existing space character for either snake/apple
