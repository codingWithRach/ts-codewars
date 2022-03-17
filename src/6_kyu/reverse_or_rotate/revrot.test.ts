import { G964 } from "./revrot";

describe("revrot function", () => {
  test.each([
    ["123456", 6, "234561"],
    ["987653", 6, "356789"],
    ["123456987654", 6, "234561876549"],
    ["123456987653", 6, "234561356789"],
    ["66443875", 4, "44668753"],
    ["66443875", 8, "64438756"],
    ["664438769", 8, "67834466"],
    ["123456779", 8, "23456771"],
    ["", 8, ""],
    ["123456779", 0, ""],
    ["563000655734469485", 4, "0365065073456944"],
  ])(
    "with string %p and chunk size %p, returns %p",
    (digitString, chunkSize, result) => {
      expect(G964.revrot(digitString, chunkSize)).toEqual(result);
    }
  );
});
