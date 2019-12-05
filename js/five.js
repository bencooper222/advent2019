const fs = require("fs");
const INPUT = 5;
const commands = fs
  .readFileSync("./blobs/five.txt", { encoding: "utf8" })
  .split(",")
  .map(el => Number(el));

console.log(commands);

for (let i = 0; i < commands.length; i++) {
  const instruction = String(commands[i]).split("");
  let op;

  if (instruction.length > 1) op = instruction.slice(-2).join("");
  else op = "0" + instruction.slice(-1);

  let first, second;
  if (
    instruction[instruction.length - 3] == null ||
    instruction[instruction.length - 3] == 0
  )
    first = commands[commands[i + 1]];
  else first = commands[i + 1];

  if (
    op === "01" ||
    op === "02" ||
    op === "05" ||
    op === "06" ||
    op === "07" ||
    op === "08"
  ) {
    if (
      instruction[instruction.length - 4] == null ||
      instruction[instruction.length - 4] == 0
    )
      second = commands[commands[i + 2]];
    else second = commands[i + 2];
  }

  console.log(op, first, second);

  switch (op) {
    case "01": {
      commands[commands[i + 3]] = first + second;
      i += 3;
      break;
    }
    case "02": {
      commands[commands[i + 3]] = first * second;
      i += 3;
      break;
    }
    case "03": {
      commands[commands[i + 1]] = INPUT;
      i += 1;
      break;
    }
    case "04": {
      console.log("OUTPUT", first);
      i += 1;
      break;
    }
    case "05": {
      if (first !== 0) i = second - 1;
      else i += 2;
      break;
    }
    case "06": {
      if (first === 0) i = second - 1;
      else i += 2;
      break;
    }
    case "07": {
      commands[commands[i + 3]] = 0;
      if (first < second) {
        commands[commands[i + 3]]++;
      }

      i += 3;
      break;
    }
    case "08": {
      commands[commands[i + 3]] = 0;
      if (first === second) {
        commands[commands[i + 3]]++;
      }

      i += 3;
      break;
    }
    case "99": {
      i = commands.length;
      break;
    }

    default:
      console.log("INVALID OP CODE: ", op);
      break;
  }
}

// console.log(commands);
