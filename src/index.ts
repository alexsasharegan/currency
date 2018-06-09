/**
 * Calculations will be done in pennies, so the coefficient is 10 ** 2 => 100.
 */
const CurrencyCoefficient = 100;

function toPennies(price: number): number {
  return price * CurrencyCoefficient;
}

function toDollars(pennies: number): number {
  return pennies / CurrencyCoefficient;
}

function parseCurrency(price: string | number): number {
  let c = typeof price == "string" ? parseFloat(price) : price;
  if (Number.isNaN(c)) {
    return 0.0;
  }

  return c;
}

const regex = /[^\d.]/g;
function stripToNumeric(x: string): string {
  return x.replace(regex, "");
}

export interface CurrencyOptions {
  locales: string | string[] | undefined;
  localeOptions: Intl.NumberFormatOptions | undefined;
}

/**
 * Currency.
 */
export class Currency {
  static stringParser = stripToNumeric;
  /**
   * Internal value in pennies.
   */
  private value: number;
  private locales: string | string[] | undefined;
  private localeOptions: Intl.NumberFormatOptions | undefined;

  constructor(pennies: number, options: Partial<CurrencyOptions> = {}) {
    let { locales = "en-US", localeOptions = {} } = options;
    this.value = pennies;
    this.locales = locales;
    this.localeOptions = localeOptions;
  }

  public setLocales(...locales: string[]): this {
    this.locales = locales;
    return this;
  }

  public setLocaleOptions(options: Intl.NumberFormatOptions): this {
    this.localeOptions = options;
    return this;
  }

  public add: (price: number) => Currency = price => {
    return new Currency(this.value + toPennies(price), {
      locales: this.locales,
      localeOptions: this.localeOptions
    });
  };

  public subtract: (price: number) => Currency = price => {
    return new Currency(this.value - toPennies(price), {
      locales: this.locales,
      localeOptions: this.localeOptions
    });
  };

  public divide: (divisor: number) => Currency = amount => {
    // Value as pennies doesn't require transformation for a divisor.
    return new Currency(this.value / amount, {
      locales: this.locales,
      localeOptions: this.localeOptions
    });
  };

  public multiply: (factor: number) => Currency = factor => {
    // Value as pennies doesn't require transformation for a factor.
    return new Currency(this.value * factor, {
      locales: this.locales,
      localeOptions: this.localeOptions
    });
  };

  public toString: () => string = () => {
    return new Intl.NumberFormat(this.locales, this.localeOptions).format(
      this.toNumber()
    );
  };

  public toNumber: () => number = () => toDollars(this.value);

  public toJSON(): number {
    return this.toNumber();
  }

  public static fromPrice(
    price: number,
    options: Partial<CurrencyOptions> = {}
  ): Currency {
    return new Currency(toPennies(price), options);
  }

  public static fromString(
    price: string,
    options: Partial<CurrencyOptions> = {}
  ): Currency {
    return new Currency(
      toPennies(parseCurrency(Currency.stringParser(price))),
      options
    );
  }
}
