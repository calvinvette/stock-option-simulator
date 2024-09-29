class Option {
  constructor(underlying, strike, expiration, type, price) {
    this.underlying = underlying;
    this.strike = strike;
    this.expiration = expiration;
    this.type = type; // 'call' or 'put'
    this.price = price;
    this.lastUpdated = new Date();
    this.greeks = {
      delta: 0,
      gamma: 0,
      theta: 0,
      vega: 0,
      rho: 0
    };
  }

  updatePrice(newPrice, newGreeks) {
    this.price = newPrice;
    this.greeks = { ...this.greeks, ...newGreeks };
    this.lastUpdated = new Date();
  }
}

module.exports = Option;
