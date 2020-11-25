const { input, inkey, println, print } = require('./8bit_io');

const party_name = input("You are founding a new political party. What will it be called? ");

for (;;) {
  println("Leader of "+party_name);
  println();
  println("1) Hire a politician ");
  println("2) TODO");
  const option = inkey();

  if (option == "q") {
    break;
  }


}
