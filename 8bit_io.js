const readline = require('readline');
const deasync = require('deasync');

function pressedKeySource() {
  // Note that this module doesn't play nicely with other keyboard
  // input modules, since it turns on raw mode :)
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let key_queue = [];
  process.stdin.on('keypress', (key, data) => {
    key_queue.push(key);
  });

  return function getPressedKey() {
    const k = key_queue.pop();
    // respond to ctrl-c
    if (k == '\003') {
      process.exit(-1);
    }
    // wipe the key queue, since we really just care about what is being pressed now
    key_queue = [];
    return k;
  }
}

// find out what key is currently pressed
// Use like this:
// const keySource = pressedKeySource();
// for (;;) {
//    sleep(100);
//    console.log("You pressed " + keySource());
// }
//
// Can't be used together with input or inkey
exports.pressedKeySource = pressedKeySource;
exports.sleep = deasync.sleep;
exports.input = require("readline-sync").question;
exports.inkey = require("readline-sync").keyIn;
exports.println = console.log;
exports.print = process.stdout.write.bind(process.stdout);
