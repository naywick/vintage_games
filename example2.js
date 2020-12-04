const { pressedKeySource, sleep } = require('./8bit_io');

const getPressedKey = pressedKeySource();

// A 'realtime' main loop that grabs the key the user pressed every 100ms
for (let i=0;i<20;i++) {
  const ch = getPressedKey();
  console.log("You pressed: "+ch);
  if (ch == 'q') process.exit(0);

  sleep(100);
}
process.exit();
