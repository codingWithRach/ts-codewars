export class Kata {
  static isNice(arr) {
    return arr.length > 0
      ? arr.every((num) => arr.includes(num - 1) || arr.includes(num + 1))
      : false;
  }
}
