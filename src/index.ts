/**
 * Calculations will be done in pennies, so the coefficient is 10 ** 2 => 100.
 */
const CurrencyCoefficient = 100;

function toPennies(x: number): number {
  return x * CurrencyCoefficient;
}

export interface CurrencyOptions {
  locales: string | string[] | undefined;
  localeOptions: Intl.NumberFormatOptions | undefined;
}

/**
 * Currency.
 */
export class Currency {
  /**
   * Internal value in pennies.
   */
  private value: number;
  private numFmt: Intl.NumberFormat;

  constructor(price: number, options: Partial<CurrencyOptions> = {}) {
    let { locales, localeOptions } = options;
    this.value = toPennies(price);
    this.numFmt = new Intl.NumberFormat(locales, localeOptions);
  }

  public add: (price: number) => this = price => {
    this.value += toPennies(price);
    return this;
  };

  public subtract: (price: number) => this = price => {
    this.value -= toPennies(price);
    return this;
  };

  public sub = this.subtract;

  public divide: (divisor: number) => this = amount => {
    // Value as pennies doesn't require transformation for a divisor.
    this.value /= amount;
    return this;
  };

  public toString: () => string = () => {
    return this.numFmt.format(this.value);
  };
}
