const fs = require("fs");
const [one, two] = fs
  .readFileSync("./blobs/three.txt", { encoding: "utf8" })
  .split("\n")
  .map(el =>
    el
      .split(",")
      .map(command => [command.slice(0, 1), Number(command.slice(1))])
  );

// console.log(one, two);

const onePoints = new Set();
onePoints.add("0,0");
let curr = [0, 0];
const oneMap = {};
let oneSteps = 0;
for (let i = 0; i < one.length; i++) {
  if (i % 100) console.log("one", i, i / one.length);
  const [dir, num] = one[i];
  switch (dir) {
    case "U": {
      const base = curr[0] + ",";
      for (let j = 1; j <= num; j++) {
        let str = base + (j + curr[1]);
        oneSteps++;
        if (oneMap[str] == null) oneMap[str] = oneSteps;
        onePoints.add(str);
      }

      curr[1] += num;
      break;
    }

    case "D": {
      const base = curr[0] + ",";
      for (let j = 1; j <= num; j++) {
        let str = base + (curr[1] - j);
        oneSteps++;
        if (oneMap[str] == null) oneMap[str] = oneSteps;
        onePoints.add(str);
      }

      curr[1] -= num;
      break;
    }
    case "L": {
      const base = "," + curr[1];
      for (let j = 1; j <= num; j++) {
        let str = curr[0] - j + base;
        oneSteps++;
        if (oneMap[str] == null) oneMap[str] = oneSteps;
        onePoints.add(str);
      }

      curr[0] -= num;
      break;
    }
    case "R": {
      const base = "," + curr[1];
      for (let j = 1; j <= num; j++) {
        let str = curr[0] + j + base;
        oneSteps++;
        if (oneMap[str] == null) oneMap[str] = oneSteps;
        onePoints.add(str);
      }

      curr[0] += num;
      break;
    }
  }
}

const twoPoints = new Set();
curr = [0, 0];
twoPoints.add("0,0");
let twoSteps = 0;

const twoMap = {};
for (let i = 0; i < two.length; i++) {
  if (i % 100) console.log("two", i, i / two.length);

  const [dir, num] = two[i];
  switch (dir) {
    case "U": {
      const base = curr[0] + ",";
      for (let j = 1; j <= num; j++) {
        let str = base + (j + curr[1]);
        twoSteps++;
        if (twoMap[str] == null) twoMap[str] = twoSteps;
        twoPoints.add(str);
      }

      curr[1] += num;
      break;
    }

    case "D": {
      const base = curr[0] + ",";
      for (let j = 1; j <= num; j++) {
        let str = base + (curr[1] - j);
        twoSteps++;
        if (twoMap[str] == null) twoMap[str] = twoSteps;
        twoPoints.add(str);
      }

      curr[1] -= num;
      break;
    }
    case "L": {
      const base = "," + curr[1];
      for (let j = 1; j <= num; j++) {
        let str = curr[0] - j + base;
        twoSteps++;
        if (twoMap[str] == null) twoMap[str] = twoSteps;
        twoPoints.add(str);
      }

      curr[0] -= num;
      break;
    }
    case "R": {
      const base = "," + curr[1];
      for (let j = 1; j <= num; j++) {
        let str = curr[0] + j + base;
        twoSteps++;
        if (twoMap[str] == null) twoMap[str] = twoSteps;
        twoPoints.add(str);
      }

      curr[0] += num;
      break;
    }
  }
}

const oneArray = Array.from(onePoints);
const twoArray = Array.from(twoPoints);

function array_intersect() {
  var a,
    b,
    c,
    d,
    e,
    f,
    g = [],
    h = {},
    i;
  i = arguments.length - 1;
  d = arguments[0].length;
  c = 0;
  for (a = 0; a <= i; a++) {
    e = arguments[a].length;
    if (e < d) {
      c = a;
      d = e;
    }
  }
  for (a = 0; a <= i; a++) {
    e = a === c ? 0 : a || c;
    f = arguments[e].length;
    for (var j = 0; j < f; j++) {
      var k = arguments[e][j];
      if (h[k] === a - 1) {
        if (a === i) {
          g.push(k);
          h[k] = 0;
        } else {
          h[k] = a;
        }
      } else if (a === 0) {
        h[k] = 0;
      }
    }
  }
  return g;
}
const intersect = array_intersect(oneArray, twoArray);

let min = Number.MAX_SAFE_INTEGER;
let minEl = "";
for (let el of intersect) {
  //   const [x, y] = el.split(",").map(n => Math.abs(Number(n)));

  if (oneMap[el] + twoMap[el] < min && el !== "0,0") {
    min = oneMap[el] + twoMap[el];
    minEl = el;
  }
}
console.log(oneArray, twoArray);
console.log(min, minEl);
