import { Currency } from "./index";

describe("Currency", async () => {
  it("should work", async () => {
    let c = new Currency(9.99);
    expect(c.add(1.01).toString()).toBe("11");
  });
});
