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
           "|                |",
           "|                |",
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

function goodShapePosition(x, y, shape, map) {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (shape[j][i] == "*" && map[y+j][x+i] != " ") {
        return false
      }
    }
  }
  return true
};

function drawTetromino(x,y,shape) {
  if (goodShapePosition(x,y, shape, map)) {
    pasteIntoMap(x,y,shape);
  }
};

function pasteIntoMap(x,y,shape) {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (shape[j][i] == "*") {
        changeMap(x+i,y+j,"*");
      }
    }
  }
};

const theLShape = [[
  " *  ",
  " *  ",
  " ** ",
  "    "
],[
  "    ",
  "*** ",
  "*   ",
  "    "
],[
  "**  ",
  " *  ",
  " *  ",
  "    "
],[
  "  * ",
  "*** ",
  "    ",
  "    "
]];

const theBar = [[
  " *  ",
  " *  ",
  " *  ",
  " *  "
], [
  "    ",
  "****",
  "    ",
  "    "
], [
  " *  ",
  " *  ",
  " *  ",
  " *  "
], [
  "    ",
  "****",
  "    ",
  "    "
]];

const theSquare = [[
  "    ",
  " ** ",
  " ** ",
  "    "
], [
  "    ",
  " ** ",
  " ** ",
  "    "
], [
  "    ",
  " ** ",
  " ** ",
  "    "
], [
  "    ",
  " ** ",
  " ** ",
  "    "
]];

const theZigZag = [[
  "    ",
  " ** ",
  "**  ",
  "    "
], [
  " *  ",
  " ** ",
  "  * ",
  "    "
], [
  "    ",
  " ** ",
  "**  ",
  "    "
], [
  " *  ",
  " ** ",
  "  * ",
  "    "
]];

const theTShape = [[
  "*** ",
  " *  ",
  "    ",
  "    "
], [
  "  * ",
  " ** ",
  "  * ",
  "    "
], [
  "    ",
  " *  ",
  "*** ",
  "    "
], [
  "*   ",
  "**  ",
  "*   ",
  "    "
]];

let shapes = [theLShape, theBar, theSquare, theZigZag, theTShape]

function destroyTetromino(x,y,shape) {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (shape[j][i] == "*") {
        changeMap(x+i,y+j," ");
      }
    }
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let tetrominoPos = [ 10, 1]
let tetrominoRot = 2
let tetrominoSelect = getRandomInt(5)

// main loop (it goes forever)
while (true) {
  clearScreen();
  drawTetromino(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot]);
  drawMap();
  scoreCounter();
  let oldPosition = tetrominoPos
  destroyTetromino(tetrominoPos[0], tetrominoPos[1],shapes[tetrominoSelect][tetrominoRot]);

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
  if (key == 'd') {
    if (tetrominoRot < 3) {
      tetrominoRot++
    } else {
      tetrominoRot = 0
    }
  } else if (key == 'f') {
    if (tetrominoRot > 0) {
      tetrominoRot--
    } else {
      tetrominoRot = 3
    }
  }

  // Moving sideways
  if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
    tetrominoPos = [oldPosition[0], oldPosition[1]]
  };

  oldPosition = tetrominoPos;

  tetrominoPos = [tetrominoPos[0], (tetrominoPos[1] + 1)];

  // Moving down
  if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
    drawTetromino(oldPosition[0], oldPosition[1], shapes[tetrominoSelect][tetrominoRot])
    tetrominoPos = [10, 1]
    tetrominoSelect = getRandomInt(5)
    tetrominoRot = getRandomInt(4)
    if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
      process.exit();
    }
  };

  handleCompleteLines();
}
