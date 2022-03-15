import { Kata } from "./nice_array";

describe("Kata class", () => {
  test.each([[[1, 2]], [[2, 10, 9, 3]]])(
    "returns true when passed %p",
    (arr: Array<number>) => {
      expect(Kata.isNice(arr)).toBeTruthy();
    }
  );
});

describe("Kata class", () => {
  test.each([[[]], [[3, 4, 5, 7]]])(
    "returns false when passed %p",
    (arr: Array<number>) => {
      expect(!Kata.isNice(arr)).toBeTruthy();
    }
  );
});
