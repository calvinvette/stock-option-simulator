class Stock {
  constructor(symbol, initialPrice) {
    this.symbol = symbol;
    this.price = initialPrice;
    this.lastUpdated = new Date();
  }

  updatePrice(newPrice) {
    this.price = newPrice;
    this.lastUpdated = new Date();
  }
}

module.exports = Stock;
