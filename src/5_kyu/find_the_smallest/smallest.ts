export function smallest(n: number): number[] {
  // find the first digit that isn't already in the right place
  const numArray: Array<number> = [...n.toString()].map((char) => Number(char));
  let offset: number = numArray.findIndex(
    (num, index) => num !== numArray.slice().sort((a, b) => a - b)[index]
  );
  if (offset === -1) return [n, 0, 0];

  // considering the digits not already in the right position, there are two options for a solution
  // first move the first of these digits out into each of the subsequent positions
  // we want to leave the rearranged numbers as strings so that they don't change length if they start with a zero
  const numStrings: Array<string> = [n.toString()];
  const positions: Array<Array<number>> = [[0, 0]];
  for (let i = offset + 1; i < numArray.length; i++) {
    numStrings.push(
      numArray
        .slice(0, offset)
        .concat(
          numArray.slice(offset + 1, i + 1),
          [numArray[offset]],
          numArray.slice(i + 1)
        )
        .join("")
    );
    positions.push([offset, i]);
  }

  // now move each of the subsequent digits into the position of the first digit not already in the right place
  for (let i = offset + 1; i < numArray.length; i++) {
    numStrings.push(
      numArray
        .slice(0, offset)
        .concat([numArray[i]], numArray.slice(offset, i), numArray.slice(i + 1))
        .join("")
    );
    positions.push([i, offset]);
  }

  // determine the entry containing the smallest number
  const numbers: Array<number> = numStrings.map((str) => Number(str));
  const minNum: number = numbers.reduce((a, b) => Math.min(a, b));
  const index: number = numbers.indexOf(minNum);

  // if the digit we've moved into has the same value as the preceding digit, we can reduce the index
  let posToMoveTo = positions[index][1];
  while (
    posToMoveTo > 0 &&
    numStrings[index][posToMoveTo] === numStrings[index][posToMoveTo - 1]
  )
    posToMoveTo--;

  // return the minimum number with minimum indices
  return [minNum, positions[index][0], posToMoveTo];
}
