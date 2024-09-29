const Stock = require('../models/Stock');

class StockSimulator {
  static stocks = new Map();
  constructor() {
    this.volatility = 0.2; // Annual volatility
  }

  addStock(symbol, initialPrice) {
    StockSimulator.stocks.set(symbol, new Stock(symbol, initialPrice));
  }

  getStock(symbol) {
    return StockSimulator.stocks.get(symbol);
  }

  updateStockPrice(symbol) {
    const stock = StockSimulator.stocks.get(symbol);
    if (!stock) return;

    const dt = 1 / (252 * 6.5 * 60 * 60 * 4); // Assuming 252 trading days, 6.5 hours per day, and 4 price updates per second
    const drift = 0; // Assuming no drift for simplicity
    const randomComponent = this.volatility * Math.sqrt(dt) * (Math.random() - 0.5);

    const newPrice = stock.price * Math.exp(drift * dt + randomComponent);
    stock.updatePrice(newPrice);
  }

  startSimulation(interval) {
    setInterval(() => {
      for (const symbol of StockSimulator.stocks.keys()) {
        this.updateStockPrice(symbol);
      }
    }, interval);
  }
}

module.exports = StockSimulator;
