import { G964 } from "./partlist";

describe("partlist", () => {
  test.each([
    [[], []],
    [
      ["az", "toto", "picaro", "zone", "kiwi"],
      [
        ["az", "toto picaro zone kiwi"],
        ["az toto", "picaro zone kiwi"],
        ["az toto picaro", "zone kiwi"],
        ["az toto picaro zone", "kiwi"],
      ],
    ],
  ])(
    "when passed %p returns %p",
    (arr: Array<string>, result: Array<Array<string>>) => {
      expect(G964.partlist(arr)).toEqual(result);
    }
  );
});
