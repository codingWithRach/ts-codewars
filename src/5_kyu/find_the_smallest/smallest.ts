export function smallest(n: number): number[] {
  // if the lowest digit is already in position 0, ignore it and focus on the remaining digits
  // repeat until we find the lowest digit in the remaining digits that is not in position 0
  const numArray: Array<number> = [...n.toString()].map((char) => Number(char));
  let pos: number = numArray.indexOf(Math.min(...numArray));

  const remainingArray: Array<number> = numArray.slice();
  while (pos === 0) {
    remainingArray.shift();
    pos = remainingArray.indexOf(Math.min(...remainingArray));
  }
  const offset: number = numArray.length - remainingArray.length;
  const startArray: Array<number> = numArray.slice(0, offset);

  // inline function to concatenate the specified arrays and return a string
  const numString = (
    arr1: Array<number>,
    arr2: Array<number>,
    arr3: Array<number>,
    arr4: Array<number>
  ): string => {
    return arr1.concat(arr2, arr3, arr4).join("");
  };

  // considering the remaining array, there are two options for a solution
  // first consider moving the first digit out into each other position
  // we want to leave the rearranged numbers as strings so that they don't change length if they start with a zero
  const numStrings: Array<string> = [n.toString()];
  const positions: Array<Array<number>> = [[0, 0]];
  for (let i = 1; i < remainingArray.length; i++) {
    numStrings.push(
      numString(
        startArray,
        remainingArray.slice(1, i + 1),
        [remainingArray[0]],
        remainingArray.slice(i + 1)
      )
    );
    positions.push([offset, i + offset]);
  }

  // now consider moving each of the other digits into the first position
  for (let i = 1; i < remainingArray.length; i++) {
    numStrings.push(
      numString(
        startArray,
        [remainingArray[i]],
        remainingArray.slice(0, i),
        remainingArray.slice(i + 1)
      )
    );
    positions.push([i + offset, offset]);
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
