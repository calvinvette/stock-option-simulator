const express = require('express');
const router = express.Router();
const StockSimulator = require('../services/StockSimulator');

const stockSimulator = new StockSimulator();

// Initialize some stocks (you can add more or load from a file)
stockSimulator.addStock('AAPL', 150);
stockSimulator.addStock('GOOGL', 2800);
stockSimulator.addStock('MSFT', 300);

router.get('/:symbol/quotes', (req, res) => {
  const { symbol } = req.params;
  const stock = stockSimulator.getStock(symbol);

  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  res.json({
    symbol: stock.symbol,
    price: stock.price,
    lastUpdated: stock.lastUpdated
  });
});

module.exports = router;
