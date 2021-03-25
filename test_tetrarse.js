const test = require('baretest')('Tetrarse tests');
const assert = require('assert');

function goodPosition(x,y,map) {
  return ([" "].includes(map[y][x]))
};

test('tetrarse can detect blocks that hit the map', function () {
  const map=["|----------------|",
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
  const tetrominoPos = [5, 5];

  assert.equal(
    goodPosition(tetrominoPos[0], tetrominoPos[1], map),
    true
  );

  assert.equal(
    goodPosition(0, 0, map),
    false
  );
});

function goodShapePosition(x, y, shape, map) {
}

test('tetrarse can detect shapes that hit the map', function () {
  const map=["|----------------|",
             "|                |",
             "|                |",
             "|                |",
             "|         * *    |",
             "|                |",
             "|                |",
             "|   *            |",
             "|   *            |",
             "|                |",
             "|                |",
             "|                |",
             "|*********** ****|",
             "|**********  ****|",
             "|----------------|"];

  assert.equal(
    goodShapePosition(
      2, 2,
      [" *  ",
       " *  ",
       " ** ",
       "    "],
      map),
    true
  );

  assert.equal(
    goodShapePosition(
      9, 2,
      [" *  ",
       " *  ",
       " ** ",
       "    "],
      map),
    false
  );

  assert.equal(
    goodShapePosition(
      10, 3,
      ["    ",
       " *  ",
       "*** ",
       "    "],
      map),
    true
  );

  assert.equal(
    goodShapePosition(
      9, 2,
      ["    ",
       " *  ",
       "*** ",
       "    "],
      map),
    false
  );
});

test.run();

