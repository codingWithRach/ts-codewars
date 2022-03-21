export function smallest(n: number): number[] {
  // if the lowest digit is already in position 0, ignore it and focus on the remaining digits
  // repeat until we find the lowest digit in the remaining digits that is not in position 0
  const numArray = [...n.toString()].map((char) => Number(char));
  let minNum = Math.min(...numArray);
  let pos = numArray.indexOf(minNum);

  const remainingArray = numArray.slice();
  while (pos === 0) {
    remainingArray.shift();
    minNum = Math.min(...remainingArray);
    pos = remainingArray.indexOf(minNum);
  }
  const offset = numArray.length - remainingArray.length;
  const startArray = numArray.slice(0, offset);

  // if there are no remaining digits, the number was already in the correct order
  if (remainingArray.length === 0) {
    return [n, 0, 0];
  }

  // Inline function to determine whether the direction of the moved digit can be reversed to give the same result
  const dirCanReverse = (arr: Array<number>): boolean => {
    return (
      Number(
        arr
          .slice(1, arr.length)
          .concat([remainingArray[0]], remainingArray.slice(arr.length))
          .join("")
      ) ===
      Number(
        [remainingArray[arr.length - 1]]
          .concat(arr.slice(0, arr.length - 1), arr.slice(arr.length))
          .join("")
      )
    );
  };

  // inline function to check for duplicates
  // if the digit in the position we're moving to is the same as the digit in the previous position
  // we can effectively move it to the previous position
  const adjPosForDuplicates = (arr: Array<number>, pos: number) => {
    while (pos > 0 && arr[pos] === arr[pos - 1]) pos--;
    return pos;
  };

  // initialise variables
  let resultArray = [];
  let posToMove = 0;
  let posToMoveTo = 0;

  // move the digit in position 0 if the lowest digit is in position 1 and either:
  // - there are no other instances of the digit, or
  // - the digit at the start is greater than the digit after the lowest
  if (
    pos === 1 &&
    (remainingArray.indexOf(minNum, pos + 1) === -1 ||
      remainingArray[0] > remainingArray[2])
  ) {
    posToMove = offset;

    // the digit will be moved to the left of the first digit larger than it
    posToMoveTo = remainingArray.findIndex((num) => num > remainingArray[0]);
    // if a digit larger than the one being moved is not found, the digit will be moved to the end
    if (posToMoveTo === -1) {
      posToMoveTo = remainingArray.length;
    }

    // populate a new array starting with the bit that was already in the correct order, and
    // followed by a rearrangment of the remaining numbers with the first digit moved
    resultArray = startArray.concat(
      remainingArray
        .slice(1, posToMoveTo)
        .concat([remainingArray[0]], remainingArray.slice(posToMoveTo))
    );

    // calculate the position to move to relative to the full number (rather than just the remaining digits),
    // and adjust it if duplicate digits are found
    posToMoveTo = adjPosForDuplicates(resultArray, posToMoveTo + offset - 1);
  } else {
    // otherwise, find the instance of the smallest digit such that it's the first instance in the last
    // block of repeated instances
    const revArray = remainingArray.slice().reverse();
    let revPos = revArray.indexOf(minNum);
    while (revArray[revPos] === minNum) {
      revPos += 1;
    }
    const remainingPosToMove = remainingArray.length - revPos;

    // populate a new array starting with the bit that was already in the correct order, and
    // followed by a rearrangment of the remaining numbers with the appropriate smallest one
    // moved to position 0
    resultArray = startArray.concat(
      [minNum].concat(
        remainingArray.slice(0, remainingPosToMove),
        remainingArray.slice(remainingPosToMove + 1)
      )
    );

    // calculate the position to move to relative to the full number (rather than just the remaining digits),
    // and adjust it if duplicate digits are found
    posToMoveTo = adjPosForDuplicates(resultArray, offset);

    // calculate the position being moved relative to the full number (rather than just the remaining digits)
    posToMove = remainingPosToMove + offset;

    // if the direction of the move can be reversed, the solution is the one with the smallest index
    if (dirCanReverse(remainingArray)) {
      [posToMove, posToMoveTo] = [posToMoveTo, posToMove];
    }
  }
  return [Number(resultArray.join("")), posToMove, posToMoveTo];
}
