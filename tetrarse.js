const { sleep, pressedKeySource, print } = require('./8bit_io');

function clearScreen() { print('\033[2J') };

function drawMapLine(line) { console.log(line) };
let map = ["|----------------|",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|                |",
           "|*********** ****|",
           "|**********  ****|",
           "|----------------|"];
function drawMap() {
  map.forEach(drawMapLine);
};

function changeMap(x,y,symbol) {
  map[y]=changeLine(map[y],x,symbol)
};

function changeLine(line,x,symbol) {
  return line.slice(0,x) + symbol + line.slice(x+1)
};

function isFullLine(line) {
  for (let i=0; i < line.length; ++i) {
    if (line[i] == " ") {
      return false
    }
  }
  return true
};

var score = 0;

function handleCompleteLines() {
  for (i=1; i > 0 && i < (map.length - 1); ++i) {
    if (isFullLine(map[i]) == true) {
      moveLinesDown(i);
      score = (score + 10)
    }
  }
};

function moveLinesDown(i) {
  map.splice(i, 1);
  map.splice(1, 0, "|                |");
};

function scoreCounter() {
  // levels
  const level = Math.floor(score/100) + 1;
  console.log(`Your score is ${score}`);
  console.log(`You are at level ${level}`);
};

const getPressedKey = pressedKeySource();

function goodPosition(x,y) {
  return ([" "].includes(map[y][x]))
};

function drawTetromino(x,y) {
  if (goodPosition(x,y)) {
    changeMap(x,y,"*");
  }
};

function destroyTetromino(x,y) {
  changeMap(x,y," ");
};

let tetrominoPos = [ 10, 1]

// main loop (it goes forever)
while (true) {
  clearScreen();
  drawTetromino(tetrominoPos[0], tetrominoPos[1]);
  drawMap();
  scoreCounter();
  let oldPosition = tetrominoPos
  destroyTetromino(tetrominoPos[0], tetrominoPos[1]);

  let key = getPressedKey();

  if (key == 'q') {
    process.exit();
  }

  //left
  if (key == 'j') {
    if (!(tetrominoPos[0] < 2)) {
      tetrominoPos = [tetrominoPos[0] - 1, tetrominoPos[1]]
    }
  }

  //right
  if (key == 'l') {
    if (tetrominoPos[0] < (map[0].length) - 2) {
      tetrominoPos = [tetrominoPos[0] + 1, tetrominoPos[1]]
    }
  }

  //down
  if (key == 'k') {
    sleep(200);
  } else {
    sleep(800);
  };

  // rotate
  // if (key == 'r') {
  //
  // }

  if (goodPosition(tetrominoPos[0], tetrominoPos[1]) == false) {
    drawTetromino(oldPosition[0], oldPosition[1])
    tetrominoPos = [10, 1]
  };

  oldPosition = tetrominoPos;

  tetrominoPos = [tetrominoPos[0], (tetrominoPos[1] + 1)];

  if (goodPosition(tetrominoPos[0], tetrominoPos[1]) == false) {
    drawTetromino(oldPosition[0], oldPosition[1])
    tetrominoPos = [10, 1]
  };
  
  handleCompleteLines();
}
