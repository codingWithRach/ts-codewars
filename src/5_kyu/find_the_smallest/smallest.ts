export function smallest(n: number): number[] {
  // if the lowest digit is already in position 0, ignore it and focus on the remaining digits
  // repeat until we find the lowest digit in the remaining digits that is not in position 1
  const numArray = [...n.toString()].map((char) => Number(char));
  let minNum = Math.min(...numArray);
  let pos = numArray.indexOf(minNum);

  const copyArray = numArray.slice();
  while (pos === 0) {
    copyArray.shift();
    minNum = Math.min(...copyArray);
    pos = copyArray.indexOf(minNum);
  }
  if (copyArray.length === 0) {
    return [n, 0, 0];
  }
  const offset = numArray.length - copyArray.length;

  const dirCanReverse = (arr: Array<number>): boolean => {
    return (
      Number(
        arr
          .slice(1, arr.length)
          .concat([copyArray[0]], copyArray.slice(arr.length))
          .join("")
      ) ===
      Number(
        [copyArray[arr.length - 1]]
          .concat(arr.slice(0, arr.length - 1), arr.slice(arr.length))
          .join("")
      )
    );
  };

  // if the lowest digit is in position 1 (and there are no other instances of the digit),
  // then move out the digit in position 0 and place it to the left of the first number it
  // encounters that is larger than it
  // if not found, move to the end
  if (pos === 1) {
    if (
      copyArray.indexOf(minNum, pos + 1) === -1 ||
      copyArray[0] > copyArray[2]
    ) {
      const digitToMove = copyArray[0];
      let posToMoveTo = copyArray.findIndex((num) => num > digitToMove);
      if (posToMoveTo === -1) {
        posToMoveTo = copyArray.length;
      }
      const copyRearranged = copyArray
        .slice(1, posToMoveTo)
        .concat([digitToMove], copyArray.slice(posToMoveTo));
      const newArray = numArray.slice(0, offset).concat(copyRearranged);
      posToMoveTo = posToMoveTo + offset - 1;
      while (
        posToMoveTo > 0 &&
        newArray[posToMoveTo] === newArray[posToMoveTo - 1]
      ) {
        posToMoveTo -= 1;
      }
      return [Number(newArray.join("")), offset, posToMoveTo];
    }
  }

  // otherwise, find the instance of the smallest digit such that it's the first instance in the last
  // block of repeated instances
  const revArray = copyArray.slice().reverse();
  let revPos = revArray.indexOf(minNum);
  while (revArray[revPos] === minNum) {
    revPos += 1;
  }
  const posToMove = copyArray.length - revPos;
  const copyRearranged = [minNum].concat(
    copyArray.slice(0, posToMove),
    copyArray.slice(posToMove + 1)
  );
  const newArray = numArray.slice(0, offset).concat(copyRearranged);
  let posToMoveTo = offset;
  while (
    posToMoveTo > 0 &&
    newArray[posToMoveTo] === newArray[posToMoveTo - 1]
  ) {
    posToMoveTo -= 1;
  }
  if (dirCanReverse(copyArray)) {
    return [
      Number(newArray.join("")),
      Math.min(posToMove + offset, posToMoveTo),
      Math.max(posToMove + offset, posToMoveTo),
    ];
  }
  return [Number(newArray.join("")), posToMove + offset, posToMoveTo];
}
