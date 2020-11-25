const { input, inkey, println, print } = require('./8bit_io');

const name = input("What is your name? ");
println();
println("Hello " + name);
println("Press any key to quit...");
const k = inkey();
print("You pressed "+k+". ");
println("Bye!");
