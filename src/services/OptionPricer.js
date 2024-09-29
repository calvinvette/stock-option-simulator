const Option = require('../models/Option');

class OptionPricer {
  constructor(riskFreeRate = 0.02, impliedVolatility = 0.3) {
    this.riskFreeRate = riskFreeRate;
    this.impliedVolatility = impliedVolatility;
  }

  calculateOptionPrice(stock, strike, timeToExpiration, type) {
    const S = stock.price;
    const K = strike;
    const r = this.riskFreeRate;
    const sigma = this.impliedVolatility;
    const T = timeToExpiration;

    const d1 = (Math.log(S / K) + (r + sigma ** 2 / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const Nd1 = this.normalCDF(d1);
    const Nd2 = this.normalCDF(d2);

    let price;
    if (type === 'call') {
      price = S * Nd1 - K * Math.exp(-r * T) * Nd2;
    } else {
      price = K * Math.exp(-r * T) * (1 - Nd2) - S * (1 - Nd1);
    }

    const greeks = this.calculateGreeks(S, K, T, r, sigma, type, Nd1, Nd2);

    return { price, greeks };
  }

  calculateGreeks(S, K, T, r, sigma, type, Nd1, Nd2) {
    const d1 = (Math.log(S / K) + (r + sigma ** 2 / 2) * T) / (sigma * Math.sqrt(T));
    const Npd1 = this.normalPDF(d1);

    const delta = type === 'call' ? Nd1 : Nd1 - 1;
    const gamma = Npd1 / (S * sigma * Math.sqrt(T));
    const theta = -(S * Npd1 * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * (type === 'call' ? Nd2 : -Nd2);
    const vega = S * Math.sqrt(T) * Npd1;
    const rho = K * T * Math.exp(-r * T) * (type === 'call' ? Nd2 : -Nd2);

    return { delta, gamma, theta, vega, rho };
  }

  normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) prob = 1 - prob;
    return prob;
  }

  normalPDF(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }
}

module.exports = OptionPricer;
