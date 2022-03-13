import { flip } from "./gravity_flip";

describe("flip function", () => {
  test.each([
    ["R", [3, 2, 1, 2], [1, 2, 2, 3]],
    ["L", [1, 4, 5, 3, 5], [5, 5, 4, 3, 1]],
  ])(
    "returns expected value",
    (dir: string, arr: Array<number>, flippedArr: Array<number>) => {
      expect(flip(dir, arr)).toEqual(flippedArr);
    }
  );
});
