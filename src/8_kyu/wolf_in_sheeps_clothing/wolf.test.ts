import { warnTheSheep } from "./wolf";

describe("warnTheSheep function", () => {
  test.each([
    [
      ["sheep", "sheep", "sheep", "wolf", "sheep"],
      "Oi! Sheep number 1! You are about to be eaten by a wolf!",
    ],
    [["sheep", "sheep", "wolf"], "Pls go away and stop eating my sheep"],
  ])("returns expected value", (arr: Array<string>, msg: string) => {
    expect(warnTheSheep(arr)).toEqual(msg);
  });
});
