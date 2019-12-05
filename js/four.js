let count = 0;
for (let i = 271973; i <= 785961; i++) {
  const arr = String(i)
    .split("")
    .map(el => Number(el));

  let order = true;
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] < arr[j - 1]) {
      order = false;
      break;
    }
  }

  let dupe = false;
  let last = arr[0];
  let lastCount = 1;
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] === last) lastCount++;
    else {
      if (lastCount === 2) dupe = true;
      lastCount = 1;
    }

    last = arr[j];
  }

  if (lastCount == 2) dupe = true;
  if (order && dupe) count++;
}

console.log(count, 785961 - 271973);
