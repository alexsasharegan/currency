import { Currency } from "./index";

describe("Currency", async () => {
  it("should work", async () => {
    let c = Currency.fromPrice(9.99);
    expect(c.add(1.01).toString()).toBe("11");
    expect(c.add(1.01).toNumber()).toBe(11);
    c = Currency.fromString("$1023.99");
    expect(c.toString()).toBe("1,023.99");
    expect(c.setLocaleOptions({ useGrouping: false }).toString()).toBe(
      "1023.99"
    );
  });
});
