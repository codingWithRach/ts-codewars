import { G964 } from "./travel";

describe("travel function", () => {
  const clientAddresses: string =
    "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432";
  test.each([
    ["XX 99999", "XX 99999:/"],
    [
      "OH 43071",
      "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432",
    ],
  ])("with zipcode %p, returns %p", (zipCode: string, result: string) => {
    expect(G964.travel(clientAddresses, zipCode)).toEqual(result);
  });
});
